import { conforms } from "./instruments.js";

export const DEFAULT_MODEL = "gpt-6-luna";
export const DEFAULT_BASE_URL = "https://api.openai.com/v1";
export const UPSTREAM_TIMEOUT_MS = 25000;
const MAX_OUTPUT_TOKENS = 2500;

/** A failure talking to OpenAI, described only by a code: upstream messages are never passed on. */
export class UpstreamError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

function statusCode(status) {
  if (status === 401 || status === 403) return "upstream_auth";
  if (status === 429) return "busy";
  if (status === 400 || status === 404 || status === 422) return "upstream_rejected";
  return "unavailable";
}

function extractOutput(data) {
  for (const item of data.output || []) {
    if (item.type !== "message") continue;
    for (const part of item.content || []) {
      if (part.type === "refusal") return { refusal: true };
      if (part.type === "output_text") return { text: part.text };
    }
  }
  return {};
}

/**
 * Runs one analysis through the OpenAI Responses API with a strict JSON schema.
 * Resolves to the parsed, schema-conforming result or throws an UpstreamError.
 */
export async function runAnalysis(instrument, input, env, { fetch, timeoutMs = UPSTREAM_TIMEOUT_MS }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const base = (env.OPENAI_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");

  let response;
  try {
    response = await fetch(`${base}/responses`, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || DEFAULT_MODEL,
        instructions: instrument.instructions,
        input: instrument.wrap(input),
        max_output_tokens: MAX_OUTPUT_TOKENS,
        reasoning: { effort: "low" },
        store: false,
        text: { format: { type: "json_schema", name: instrument.schemaName, schema: instrument.schema, strict: true } },
      }),
      signal: controller.signal,
    });
  } catch {
    clearTimeout(timer);
    throw new UpstreamError(controller.signal.aborted ? "timeout" : "unavailable");
  }

  if (!response.ok) {
    clearTimeout(timer);
    throw new UpstreamError(statusCode(response.status));
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new UpstreamError(controller.signal.aborted ? "timeout" : "bad_response");
  } finally {
    clearTimeout(timer);
  }
  if (!data || data.status === "incomplete") throw new UpstreamError("incomplete");

  const { text, refusal } = extractOutput(data);
  if (refusal) throw new UpstreamError("refused");

  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new UpstreamError("bad_response");
  }
  if (!conforms(result, instrument.schema)) throw new UpstreamError("bad_response");
  return result;
}
