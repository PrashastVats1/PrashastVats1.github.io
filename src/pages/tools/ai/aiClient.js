/*
 * Browser side of the AI instruments. The browser only ever talks to the
 * Laboratory's own endpoint (REACT_APP_AI_API_URL, a public address, not a
 * secret); the OpenAI key lives on that server and never reaches this bundle.
 */

export const AI_ENDPOINTS = {
  "prompt-debugger": { path: "/api/prompt-debugger", limit: 4000 },
  "code-review": { path: "/api/code-review", limit: 8000 },
  "jira-ticket": { path: "/api/jira-ticket", limit: 6000 },
};

export const CLIENT_TIMEOUT_MS = 35000;

export function aiApiUrl() {
  return (process.env.REACT_APP_AI_API_URL || "").trim().replace(/\/+$/, "");
}

// Messages are chosen here by error code; text from the server is never displayed.
const MESSAGES = {
  not_configured: ["AI service not connected", "This copy of the site is not connected to its AI service, so this instrument cannot run."],
  network: ["Could not reach the AI service", "Check your connection and try again."],
  timeout: ["The AI service took too long", "Try again, perhaps with shorter input."],
  rate_limited: ["Too many requests", "Wait a minute, then try again."],
  busy: ["The AI service is busy", "Try again in a little while."],
  empty_input: ["Nothing to analyse", "Enter some text first."],
  input_too_long: ["The text is too long", "Shorten it to fit the character limit and try again."],
  payload_too_large: ["The text is too long", "Shorten it to fit the character limit and try again."],
  refused: ["The AI declined this text", "It would not analyse what was submitted. Try rephrasing or removing sensitive content."],
  incomplete: ["The answer was cut short", "Try again with shorter input."],
  bad_response: ["The answer could not be read", "The AI returned something this instrument could not display. Try again."],
  forbidden_origin: ["This site is not allowed to use the AI service", "The AI service is not accepting requests from this address."],
  unavailable: ["The AI service is unavailable", "Try again later."],
};

export class AiRequestError extends Error {
  constructor(code, status = null) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

/** Turns any failure into { code, title, message, technical } for display. */
export function describeError(error) {
  const code = error instanceof AiRequestError ? error.code : "network";
  if (code === "cancelled") return { code, title: "Cancelled", message: "The request was cancelled.", technical: "" };
  const key = MESSAGES[code] ? code : "unavailable";
  const [title, message] = MESSAGES[key];
  const status = error instanceof AiRequestError && error.status ? ` (HTTP ${error.status})` : "";
  return { code, title, message, technical: `Error code: ${/^[a-z_]{1,40}$/.test(code) ? code : "unknown"}${status}` };
}

/** Sends text to one AI instrument and resolves to its structured result. */
export async function requestAnalysis(endpoint, text, { signal, timeoutMs = CLIENT_TIMEOUT_MS } = {}) {
  const base = aiApiUrl();
  if (!base) throw new AiRequestError("not_configured");

  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const forwardAbort = () => controller.abort();
  if (signal) signal.addEventListener("abort", forwardAbort);
  const abortedCode = () => (timedOut ? "timeout" : signal && signal.aborted ? "cancelled" : null);

  try {
    let response;
    try {
      response = await fetch(`${base}${AI_ENDPOINTS[endpoint].path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        credentials: "omit",
        signal: controller.signal,
      });
    } catch {
      throw new AiRequestError(abortedCode() || "network");
    }

    let data = null;
    try {
      data = await response.json();
    } catch {
      const code = abortedCode();
      if (code) throw new AiRequestError(code);
    }

    if (response.ok && data && data.ok === true && data.result && typeof data.result === "object") return data.result;
    if (response.ok) throw new AiRequestError("bad_response", response.status);
    throw new AiRequestError(data && typeof data.error === "string" ? data.error : "unavailable", response.status);
  } finally {
    clearTimeout(timer);
    if (signal) signal.removeEventListener("abort", forwardAbort);
  }
}
