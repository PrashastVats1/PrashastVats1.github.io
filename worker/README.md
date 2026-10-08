# Laboratory AI Worker

The server-side boundary for the three AI-powered instruments in the Wizard's Laboratory
(Prompt Debugger, Code Review Rater, JIRA Ticket Scorer). It runs as a Cloudflare Worker,
separately from the static site on GitHub Pages, and is the only place the OpenAI key exists.

```
Browser (GitHub Pages)                Cloudflare Worker                     OpenAI
POST {AI_API_URL}/api/<instrument>    checks origin, rate limit, size       POST /v1/responses
{ "text": "..." }              --->   adds the key, calls OpenAI     --->   (Structured Outputs,
                               <---   { ok, result } or { ok, error } <---   store: false)
```

The browser never sees the key and never calls OpenAI directly. The four browser-only
instruments do not use this Worker at all.

## Endpoints

| Method | Path | Input limit |
| --- | --- | --- |
| POST | `/api/prompt-debugger` | 4,000 characters |
| POST | `/api/code-review` | 8,000 characters |
| POST | `/api/jira-ticket` | 6,000 characters |

Request: `Content-Type: application/json`, body `{ "text": "..." }`, from an origin listed in
`ALLOWED_ORIGINS`. Success is `200 { "ok": true, "result": { ... } }`. Failures are
`{ "ok": false, "error": "<code>", "message": "..." }` with codes such as `forbidden_origin` (403),
`rate_limited` (429), `input_too_long` (413), `not_configured` (503), `timeout` (504), and
`unavailable` (502). Upstream error bodies are never passed on, and the Worker logs only the route
and an error code, never input, output, or keys.

## Configuration

| Name | Where | Secret? | Purpose |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | `wrangler secret put` | Yes | OpenAI API key. Never commit it or put it in `wrangler.toml`. |
| `ALLOWED_ORIGINS` | `wrangler.toml` `[vars]` | No | Comma-separated origins allowed to call the Worker. |
| `OPENAI_MODEL` | `wrangler.toml` `[vars]` | No | Model ID. Defaults to `gpt-6-luna`. |
| `OPENAI_BASE_URL` | optional | No | Override the API base, for local mocks only. |
| `AI_RATE_LIMITER` | `wrangler.toml` `[[ratelimits]]` | No | Required for the deployed Worker: without it every request is refused with 503 `not_configured`. 6 requests per visitor, per instrument, per minute. The local Node dev server runs without it. |

The site needs one public build variable, `REACT_APP_AI_API_URL`: the Worker's base URL, for
example `https://prashast-lab-ai.<account>.workers.dev`. It is an address, not a secret. Never
put an API key in any `REACT_APP_` variable: Create React App copies those into the public bundle.

## Setup

1. Install and sign in: `cd worker && npm install && npx wrangler login`.
2. Store the key as a Worker secret (you will be prompted for the value):
   `npx wrangler secret put OPENAI_API_KEY`
3. Check `ALLOWED_ORIGINS` and `OPENAI_MODEL` in `wrangler.toml`, then deploy: `npm run deploy`.
   Note the `*.workers.dev` URL it prints.
4. In the GitHub repository, add a repository variable (Settings, Secrets and variables, Actions,
   Variables) named `AI_API_URL` with that URL. The deploy workflow passes it to the build as
   `REACT_APP_AI_API_URL`.
5. In the OpenAI dashboard, set a monthly budget limit for the project that owns the key.

Without step 4 the site still builds and the AI instruments explain that they are not connected.

## Local development

- Against Cloudflare's runtime: copy `.dev.vars.example` to `.dev.vars` (git-ignored), fill it in,
  and run `npm run dev`.
- Without a Cloudflare account: `OPENAI_API_KEY=... ALLOWED_ORIGINS=http://localhost:3000 npm run dev:node`
  serves the same handler on port 8787.

Then start the site with `REACT_APP_AI_API_URL=http://localhost:8787 npm start`.

## Limits of the protection

Origin checks stop other websites from using the Worker through visitors' browsers, but scripts
can forge the `Origin` header. The rate limiter and the OpenAI budget limit are what bound the cost
of abuse; keep both in place.
