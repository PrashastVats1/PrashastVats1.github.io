import { handle } from "./handler.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const result = await handle(
      {
        method: request.method,
        path: url.pathname,
        origin: request.headers.get("Origin"),
        clientKey: request.headers.get("CF-Connecting-IP") || "",
        contentType: request.headers.get("Content-Type"),
        contentLength: request.headers.get("Content-Length"),
        readBody: () => request.text(),
      },
      env,
      { fetch: (resource, init) => fetch(resource, init) },
    );
    return new Response(result.body === null ? null : JSON.stringify(result.body), {
      status: result.status,
      headers: result.headers,
    });
  },
};
