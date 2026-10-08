import { AI_INSTRUMENTS } from "./instruments.js";
import { UpstreamError, runAnalysis } from "./openai.js";

export const ROUTES = {
  "/api/prompt-debugger": "prompt-debugger",
  "/api/code-review": "code-review",
  "/api/jira-ticket": "jira-ticket",
};

// Comfortably above the largest input limit once JSON-escaped.
export const MAX_BODY_BYTES = 64 * 1024;

const ERRORS = {
  not_found: [404, "There is no instrument at this address."],
  method_not_allowed: [405, "Use POST for this instrument."],
  forbidden_origin: [403, "Requests from this site are not accepted."],
  not_configured: [503, "The AI service is not configured yet."],
  rate_limited: [429, "Too many requests. Wait a minute and try again."],
  unsupported_media_type: [415, "Send the request as JSON."],
  payload_too_large: [413, "The request is too large."],
  invalid_json: [400, "The request could not be read."],
  empty_input: [400, "Enter some text first."],
  input_too_long: [413, "The text is longer than this instrument accepts."],
  timeout: [504, "The AI service took too long to respond. Try again, perhaps with shorter input."],
  busy: [503, "The AI service is busy right now. Try again shortly."],
  upstream_auth: [502, "The AI service rejected the server's configuration."],
  upstream_rejected: [502, "The AI service could not process this request."],
  unavailable: [502, "The AI service is unavailable right now. Try again later."],
  refused: [422, "The AI declined to analyse this text."],
  incomplete: [502, "The AI's answer was cut short. Try again with shorter input."],
  bad_response: [502, "The AI returned an answer this instrument could not read. Try again."],
  internal: [500, "Something went wrong on the server."],
};

const BASE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

function allowedOrigins(env) {
  return (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function reply(status, body, cors) {
  return { status, headers: { ...BASE_HEADERS, ...(cors || {}) }, body };
}

function failure(code, cors, extra = {}) {
  const [status, message] = ERRORS[code] || ERRORS.internal;
  return reply(status, { ok: false, error: code, message, ...extra }, cors);
}

// Only the route and an error code are ever logged: never input, output, headers, or keys.
function note(route, code, log) {
  log(`[lab-ai] ${route} ${code}`);
}

/**
 * Handles one request. `req` is a plain description of the HTTP request so the
 * logic can be tested without the Workers runtime; see index.js for the adapter.
 *
 * req:  { method, path, origin, clientKey, contentType, contentLength, readBody }
 * deps: { fetch, log?, timeoutMs?, allowMissingRateLimiter? }
 *
 * Without an AI_RATE_LIMITER binding the request is refused, unless the caller
 * opts out with allowMissingRateLimiter (the local Node dev server only).
 */
export async function handle(req, env, deps) {
  const log = deps.log || ((line) => console.warn(line));
  const slug = ROUTES[req.path];
  const origins = allowedOrigins(env);
  const originAllowed = Boolean(req.origin) && origins.includes(req.origin);
  const cors = originAllowed ? corsHeaders(req.origin) : null;

  if (!slug) return failure("not_found", cors);
  if (req.method === "OPTIONS") {
    return originAllowed ? { status: 204, headers: { ...cors, "Cache-Control": "no-store" }, body: null } : failure("forbidden_origin");
  }
  if (req.method !== "POST") return failure("method_not_allowed", cors);
  if (!originAllowed) return failure("forbidden_origin");
  if (!env.OPENAI_API_KEY) {
    note(slug, "not_configured", log);
    return failure("not_configured", cors);
  }

  if (env.AI_RATE_LIMITER) {
    const { success } = await env.AI_RATE_LIMITER.limit({ key: `${req.clientKey || "anonymous"}:${slug}` });
    if (!success) return failure("rate_limited", cors);
  } else if (!deps.allowMissingRateLimiter) {
    note(slug, "rate_limiter_missing", log);
    return failure("not_configured", cors);
  }

  if (!/^application\/json\b/i.test(req.contentType || "")) return failure("unsupported_media_type", cors);
  if (Number(req.contentLength) > MAX_BODY_BYTES) return failure("payload_too_large", cors);

  const raw = await req.readBody();
  if (raw.length > MAX_BODY_BYTES) return failure("payload_too_large", cors);

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return failure("invalid_json", cors);
  }
  const input = payload && typeof payload.text === "string" ? payload.text : null;
  if (input === null) return failure("invalid_json", cors);

  const instrument = AI_INSTRUMENTS[slug];
  if (!input.trim()) return failure("empty_input", cors);
  if (input.length > instrument.maxInput) return failure("input_too_long", cors, { limit: instrument.maxInput });

  try {
    const result = await runAnalysis(instrument, input, env, deps);
    return reply(200, { ok: true, result }, cors);
  } catch (error) {
    const code = error instanceof UpstreamError ? error.code : "internal";
    note(slug, code, log);
    return failure(code, cors);
  }
}
