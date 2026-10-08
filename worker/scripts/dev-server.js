// Runs the Worker's handler under plain Node for local development, without a Cloudflare account.
// Settings come from the environment, for example:
//   OPENAI_API_KEY=... ALLOWED_ORIGINS=http://localhost:3000 node scripts/dev-server.js
import { createServer } from "node:http";
import { handle, MAX_BODY_BYTES } from "../src/handler.js";

const PORT = Number(process.env.PORT) || 8787;
const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000",
};

function readBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES + 1) {
        request.destroy();
        resolve("x".repeat(MAX_BODY_BYTES + 1));
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const result = await handle(
    {
      method: request.method,
      path: url.pathname,
      origin: request.headers.origin || null,
      clientKey: request.socket.remoteAddress || "",
      contentType: request.headers["content-type"],
      contentLength: request.headers["content-length"],
      readBody: () => readBody(request),
    },
    env,
    { fetch: globalThis.fetch, allowMissingRateLimiter: true },
  );
  response.writeHead(result.status, result.headers);
  response.end(result.body === null ? undefined : JSON.stringify(result.body));
}).listen(PORT, () => {
  console.log(`Laboratory AI endpoint on http://localhost:${PORT} (key ${env.OPENAI_API_KEY ? "set" : "NOT set"})`);
});
