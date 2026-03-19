import React, { useState, useCallback } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "../router";

function useSEO(title, desc) {
  React.useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = desc;
    return () => { document.title = "Prashast Vats | Software Engineer"; };
  }, [title, desc]);
}

/* ── Shared AI call helper ── */
const ENV_KEY = process.env.REACT_APP_OPENAI_KEY || "";

async function callOpenAI(apiKey, systemPrompt, userContent) {
  const key = ENV_KEY || apiKey;
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 600,
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

/* ── API Key input — only shown if no env key is configured ── */
function ApiKeyInput({ apiKey, setApiKey }) {
  const [show, setShow] = useState(false);
  // If env key is set, show a small status pill instead of the full input
  if (ENV_KEY) {
    return (
      <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl"
           style={{ background: "var(--surface)", border: "1px solid var(--border)", width: "fit-content" }}>
        <span className="w-2 h-2 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
        <span className="font-mono text-[0.65rem]" style={{ color: "var(--muted)" }}>AI tools ready</span>
      </div>
    );
  }
  // Fallback: let visitor enter their own key
  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl mb-6"
         style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.65rem] uppercase tracking-widest" style={{ color: "var(--dim)" }}>
          OpenAI API Key — required for AI-powered tools
        </span>
        <span className="font-mono text-[0.6rem]" style={{ color: apiKey ? "#4ade80" : "var(--accent2)" }}>
          {apiKey ? "✓ Key set" : "Not set"}
        </span>
      </div>
      <div className="flex gap-2">
        <input
          type={show ? "text" : "password"}
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="tool-input flex-1"
          style={{ fontFamily: "monospace", fontSize: "0.8rem" }}
        />
        <button onClick={() => setShow(s => !s)}
                className="font-mono text-[0.65rem] px-3 rounded-lg transition-opacity hover:opacity-70"
                style={{ border: "1px solid var(--border)", color: "var(--muted)", background: "var(--bg2)", whiteSpace: "nowrap" }}>
          {show ? "Hide" : "Show"}
        </button>
      </div>
      <p className="font-mono text-[0.58rem]" style={{ color: "var(--dim)" }}>
        Used only in this session to call OpenAI directly from your browser.
      </p>
    </div>
  );
}

/* ── Loading spinner ── */
function Spinner() {
  return (
    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Thinking...
    </div>
  );
}

/* ── TOOL 1: Prompt Debugger (AI-powered) ── */
function PromptDebugger({ apiKey }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SYSTEM = `You are an expert prompt engineer who has written prompts for production AI systems. You understand that a prompt is a specification, not a conversation.

First, detect the intent of the prompt: code generation, summarization, data extraction, classification, creative writing, question answering, or other. Apply intent-specific scoring criteria:
- Code generation: must specify language, constraints (don't change X), and output format (return only code / explain tradeoffs)
- Summarization: must specify length, audience, and what to preserve vs drop
- Data extraction: must specify schema/format, handling of missing data, and output structure
- Classification: must specify categories, handling of ambiguous cases, and output format
- All intents: single responsibility (one clear task), explicit constraints, no ambiguity about what "good" looks like

Score strictly on these five dimensions:
1. Clarity (is the task unambiguous?)
2. Constraints (are boundaries explicit — what to do AND what not to do?)
3. Context (does the model have enough background to succeed?)
4. Output spec (is the expected format/length/style defined?)
5. Single responsibility (is it one task, not five?)

Return ONLY a JSON object with no markdown, no code fences:
{
  "score": <integer 1-10>,
  "intent": "<detected intent: code_generation / summarization / data_extraction / classification / creative / qa / other>",
  "label": "<one of: Weak / Needs Work / Decent / Strong / Excellent>",
  "issues": ["<specific, actionable issue — e.g. 'No output format specified' not 'Be more specific'>", ...],
  "improvements": ["<concrete fix with example wording where possible>", ...],
  "rewritten": "<improved version that addresses all issues — keep the original intent intact>"
}

Scoring: 1-2 = vague one-liner with no constraints, 3-4 = has a task but missing constraints/output spec, 5-6 = structured but has gaps, 7-8 = constrained, context-aware, output-specified, 9-10 = production-grade, single-responsibility, fully specified. Be strict — most prompts score 4-6. Max 3 issues, max 3 improvements.`;

  const analyze = async () => {
    if (!prompt.trim()) return;
    if (!ENV_KEY && !apiKey) { setError("No API key configured. Add your key in the field above."); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const raw = await callOpenAI(apiKey, SYSTEM, `Analyze this prompt:\n\n"${prompt}"`);
      const clean = raw.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally { setLoading(false); }
  };

  const scoreColor = result
    ? (result.score >= 8 ? "#4ade80" : result.score >= 5 ? "var(--accent)" : "var(--accent2)")
    : "var(--accent)";

  return (
    <div className="flex flex-col gap-3">
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
        placeholder={`e.g. "Refactor this function for readability. Don't change behavior. Return only the code."`}
        className="tool-input" rows={4} style={{ resize: "vertical" }} />
      <button onClick={analyze} disabled={loading}
              className="btn-primary justify-center" style={{ fontSize: "0.78rem", padding: "0.6rem 1.2rem", opacity: loading ? 0.7 : 1 }}>
        {loading ? "Analyzing..." : "Analyze with AI"}
      </button>
      {loading && <Spinner />}
      {error && <p className="text-xs" style={{ color: "var(--accent2)" }}>{error}</p>}
      {result && (
        <div className="tool-result flex flex-col gap-3">
          <div className="flex items-center gap-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="font-sans font-extrabold" style={{ fontSize: "2rem", color: scoreColor, lineHeight: 1 }}>
              {result.score}<span className="text-base font-normal" style={{ color: "var(--dim)" }}>/10</span>
            </div>
            <div>
              <div className="font-sans font-semibold text-sm" style={{ color: "var(--text)" }}>{result.label}</div>
              <div className="font-mono text-[0.6rem] mt-0.5" style={{ color: "var(--muted)" }}>
                Clarity Score
                {result.intent && (
                  <span className="ml-2 px-1.5 py-0.5 rounded" style={{ background: "var(--surface)", color: "var(--accent)", border: "1px solid var(--border)", textTransform: "capitalize" }}>
                    {result.intent.replace(/_/g, " ")}
                  </span>
                )}
              </div>
            </div>
          </div>
          {result.issues?.length > 0 && (
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-widest mb-1.5" style={{ color: "var(--dim)" }}>Issues</p>
              {result.issues.map((iss, i) => (
                <div key={i} className="flex items-start gap-2 text-xs mb-1" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent2)", flexShrink: 0 }}>✗</span>{iss}
                </div>
              ))}
            </div>
          )}
          {result.improvements?.length > 0 && (
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-widest mb-1.5" style={{ color: "var(--dim)" }}>Fixes</p>
              {result.improvements.map((fix, i) => (
                <div key={i} className="flex items-start gap-2 text-xs mb-1" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "#4ade80", flexShrink: 0 }}>›</span>{fix}
                </div>
              ))}
            </div>
          )}
          {result.rewritten && (
            <div className="rounded-lg p-3" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
              <p className="font-mono text-[0.58rem] uppercase tracking-widest mb-1.5" style={{ color: "var(--accent)" }}>Rewritten</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>{result.rewritten}</p>
              <button onClick={() => navigator.clipboard.writeText(result.rewritten)}
                      className="font-mono text-[0.6rem] mt-2 transition-opacity hover:opacity-70" style={{ color: "var(--dim)" }}>
                ⎘ Copy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── TOOL 2: Git Commit Formatter (pure logic) ── */
function GitCommitFormatter() {
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("feat");
  const [result, setResult] = useState("");
  const TYPES = ["feat","fix","refactor","docs","test","chore","style","perf","ci","build"];

  const generate = () => {
    if (!desc.trim()) return;
    const clean = desc.trim().toLowerCase()
      .replace(/[.!?]+$/, "")
      .replace(/^(i |added |updated |fixed |changed |removed )/i, "");
    const scope = clean.match(/\b(auth|api|ui|db|test|login|nav|form|modal|config|deploy|ci|cd)\b/i)?.[1]?.toLowerCase() || "";
    const msg = clean.charAt(0).toLowerCase() + clean.slice(1);
    const commit = scope ? `${type}(${scope}): ${msg}` : `${type}: ${msg}`;
    setResult(commit.length > 72 ? commit.slice(0, 69) + "..." : commit);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="font-mono text-[0.6rem] uppercase tracking-widest block mb-1.5" style={{ color: "var(--dim)" }}>Commit Type</label>
        <div className="flex flex-wrap gap-1.5">
          {TYPES.map(t => (
            <button key={t} onClick={() => setType(t)} className="font-mono text-[0.6rem] px-2.5 py-1 rounded transition-all"
                    style={{ background: type === t ? "var(--accent)" : "var(--surface)", color: type === t ? "var(--bg)" : "var(--muted)", border: "1px solid var(--border)" }}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="font-mono text-[0.6rem] uppercase tracking-widest block mb-1.5" style={{ color: "var(--dim)" }}>Describe your change</label>
        <input value={desc} onChange={e => setDesc(e.target.value)}
               onKeyDown={e => e.key === "Enter" && generate()}
               placeholder="e.g. add login button to navbar"
               className="tool-input" />
      </div>
      <button onClick={generate} className="btn-primary justify-center" style={{ fontSize: "0.78rem", padding: "0.6rem 1.2rem" }}>
        Generate Commit
      </button>
      {result && (
        <div className="tool-result">
          <div className="font-mono text-sm mb-2" style={{ color: "var(--accent)" }}>{result}</div>
          <button onClick={() => navigator.clipboard.writeText(result)}
                  className="font-mono text-[0.65rem] transition-opacity hover:opacity-70" style={{ color: "var(--dim)" }}>
            ⎘ Copy
          </button>
        </div>
      )}
    </div>
  );
}

/* ── TOOL 3: Code Review Rater (AI-powered) ── */
function CodeReviewRater({ apiKey }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SYSTEM = `You are a senior software engineer with 10+ years of experience doing code reviews across C#, Python, JavaScript, TypeScript, Java, and Go. You give direct, specific feedback — not generic advice.

Step 1: Detect the language. Apply language-specific conventions:
- C# / .NET: PascalCase for methods/classes, camelCase for locals, null checks, using statements, LINQ correctness, async/await patterns, no magic strings
- Python: snake_case, type hints, docstrings, list comprehensions over loops where appropriate, exception specificity, no bare excepts
- JavaScript/TypeScript: const over let, no var, proper async handling, TS type coverage, no implicit any
- All languages: single responsibility per function, no functions over 30 lines, no hardcoded values (use constants/config), meaningful variable names (no single letters except loop counters), DRY principle, error handling present

Score each dimension 1-10 strictly:
- naming: variable/function/class names are meaningful, follow conventions, self-documenting
- readability: code is easy to follow, proper indentation, not overly clever, comments where needed, function length reasonable
- robustness: error handling present, edge cases considered, no magic numbers, no silent failures, null/undefined handled

Return ONLY a JSON object with no markdown, no code fences:
{
  "language": "<detected language>",
  "naming": <integer 1-10>,
  "readability": <integer 1-10>,
  "robustness": <integer 1-10>,
  "overall": <integer 1-10>,
  "issues": ["<specific issue with line reference if possible — e.g. 'Variable x on line 3 is a single letter — rename to index or counter'>", ...],
  "positives": ["<something genuinely done well>", ...],
  "suggestion": "<the single most impactful change — be specific about what to do and why>"
}

Be strict. A score of 7+ means production-ready. Most snippets score 4-6. overall = Math.round((naming + readability + robustness) / 3). Max 3 issues, max 2 positives.`;

  const analyze = async () => {
    if (!code.trim()) return;
    if (!ENV_KEY && !apiKey) { setError("No API key configured. Add your key in the field above."); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const raw = await callOpenAI(apiKey, SYSTEM, `Review this code:\n\n${code}`);
      const clean = raw.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally { setLoading(false); }
  };

  const bar = (score) => (
    <div className="w-full rounded-full overflow-hidden" style={{ height: "5px", background: "var(--border)" }}>
      <div style={{ width: `${score * 10}%`, height: "100%", borderRadius: "9999px", transition: "width 0.6s ease",
                    background: score >= 7 ? "#4ade80" : score >= 5 ? "var(--accent)" : "var(--accent2)" }} />
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      <textarea value={code} onChange={e => setCode(e.target.value)}
                placeholder="Paste your code snippet here..."
                className="tool-input font-mono text-xs" rows={6} style={{ resize: "vertical" }} />
      <button onClick={analyze} disabled={loading} className="btn-primary justify-center"
              style={{ fontSize: "0.78rem", padding: "0.6rem 1.2rem", opacity: loading ? 0.7 : 1 }}>
        {loading ? "Reviewing..." : "Review with AI"}
      </button>
      {loading && <Spinner />}
      {error && <p className="text-xs" style={{ color: "var(--accent2)" }}>{error}</p>}
      {result && (
        <div className="tool-result flex flex-col gap-3">
          <div className="flex items-center gap-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="font-sans font-extrabold" style={{ fontSize: "2rem", lineHeight: 1,
                  color: result.overall >= 7 ? "#4ade80" : result.overall >= 5 ? "var(--accent)" : "var(--accent2)" }}>
              {result.overall}<span className="text-base font-normal" style={{ color: "var(--dim)" }}>/10</span>
            </div>
            <div>
              <span className="font-sans font-semibold text-sm" style={{ color: "var(--text)" }}>Overall Score</span>
              {result.language && (
                <div className="font-mono text-[0.6rem] mt-0.5" style={{ color: "var(--accent)" }}>{result.language}</div>
              )}
            </div>
          </div>
          {[["Naming", result.naming], ["Readability", result.readability], ["Robustness", result.robustness]].map(([label, score]) => (
            <div key={label} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs">
                <span style={{ color: "var(--muted)" }}>{label}</span>
                <span className="font-mono" style={{ color: "var(--accent)" }}>{score}/10</span>
              </div>
              {bar(score)}
            </div>
          ))}
          {result.issues?.length > 0 && (
            <div className="pt-2" style={{ borderTop: "1px solid var(--border)" }}>
              <p className="font-mono text-[0.58rem] uppercase tracking-widest mb-1.5" style={{ color: "var(--dim)" }}>Issues</p>
              {result.issues.map((iss, i) => (
                <div key={i} className="flex items-start gap-2 text-xs mb-1" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent2)", flexShrink: 0 }}>✗</span>{iss}
                </div>
              ))}
            </div>
          )}
          {result.positives?.length > 0 && (
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-widest mb-1.5" style={{ color: "var(--dim)" }}>Positives</p>
              {result.positives.map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-xs mb-1" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "#4ade80", flexShrink: 0 }}>✓</span>{p}
                </div>
              ))}
            </div>
          )}
          {result.suggestion && (
            <div className="rounded-lg p-3" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
              <p className="font-mono text-[0.58rem] uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>Top Priority Fix</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>{result.suggestion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── TOOL 4: Tech Stack Advisor (pure logic) ── */
function TechStackAdvisor() {
  const [answers, setAnswers] = useState({ scale: "small", team: "solo", type: "web", priority: "speed" });
  const set = (k, v) => setAnswers(a => ({ ...a, [k]: v }));

  const getStack = () => {
    const { scale, team, type, priority } = answers;
    if (type === "mobile") return { frontend: ["React Native", "Expo"], backend: ["Node.js", "Express"], db: ["Firebase", "SQLite"], note: "React Native gives you one codebase for iOS & Android. Expo speeds up setup significantly." };
    if (type === "api") return { frontend: ["Swagger / OpenAPI (docs)"], backend: ["FastAPI (Python)", "or .NET Web API (your strength)"], db: ["PostgreSQL"], note: "FastAPI gives you auto-generated docs and pairs well with your Python/AI work. .NET Web API if you want to leverage C#." };
    if (priority === "scale" && scale === "large") return { frontend: ["React", "Next.js"], backend: ["Go", "or .NET Core"], db: ["PostgreSQL", "Redis (cache)"], note: "Go/Postgres is battle-tested at high scale. Add Redis for caching hot queries. .NET Core is also a strong choice here." };
    if (team === "solo" && priority === "speed") return { frontend: ["React", "Vite"], backend: ["Node.js + Express", "or .NET Core (your strength)"], db: ["SQLite", "or MongoDB"], note: "You already know .NET — leverage it. React + Vite for the frontend. SQLite for prototyping, swap later." };
    return { frontend: ["React", "TypeScript"], backend: [".NET Core", "C# (your strength)"], db: ["SQL Server", "or PostgreSQL"], note: "Your existing stack — lean into it. Strong for maintainability and familiar territory." };
  };

  const stack = getStack();

  const Q = ({ label, k, opts }) => (
    <div>
      <label className="font-mono text-[0.6rem] uppercase tracking-widest block mb-1.5" style={{ color: "var(--dim)" }}>{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {opts.map(([val, display]) => (
          <button key={val} onClick={() => set(k, val)} className="font-mono text-[0.62rem] px-2.5 py-1 rounded transition-all"
                  style={{ background: answers[k] === val ? "var(--accent)" : "var(--surface)", color: answers[k] === val ? "var(--bg)" : "var(--muted)", border: "1px solid var(--border)" }}>
            {display}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <Q label="Project scale" k="scale" opts={[["small","Small"],["medium","Medium"],["large","Large"]]} />
      <Q label="Team size"     k="team"  opts={[["solo","Solo"],["small","Small team"],["large","Large team"]]} />
      <Q label="Project type"  k="type"  opts={[["web","Web app"],["api","API / Backend"],["mobile","Mobile"]]} />
      <Q label="Priority"      k="priority" opts={[["speed","Ship fast"],["scale","Scale"],["maintain","Maintainability"]]} />
      <div className="tool-result flex flex-col gap-3">
        <div className="font-mono text-[0.6rem] uppercase tracking-widest mb-1" style={{ color: "var(--dim)" }}>Recommended Stack</div>
        {[["Frontend", stack.frontend], ["Backend", stack.backend], ["Database", stack.db]].map(([label, items]) => (
          <div key={label} className="flex items-start gap-3">
            <span className="font-mono text-[0.58rem] uppercase tracking-widest shrink-0 mt-0.5 w-16" style={{ color: "var(--dim)" }}>{label}</span>
            <div className="flex flex-wrap gap-1.5">{items.map(i => <span key={i} className="pill">{i}</span>)}</div>
          </div>
        ))}
        <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--muted)", borderTop: "1px solid var(--border)", paddingTop: "0.75rem" }}>{stack.note}</p>
      </div>
    </div>
  );
}

/* ── TOOL 5: Regex Explainer (pure logic) ── */
function RegexExplainer() {
  const [regex, setRegex] = useState("");
  const [result, setResult] = useState(null);

  const PATTERNS = [
    [/^\^/, "^ — anchors match at the start of the string"],
    [/\$$/, "$ — anchors match at the end of the string"],
    [/\\d\+/, "\\d+ — matches one or more digits (0-9)"],
    [/\\d\*/, "\\d* — matches zero or more digits"],
    [/\\d\?/, "\\d? — matches an optional single digit"],
    [/\\d(?!\+|\*|\?)/, "\\d — matches any single digit (0-9)"],
    [/\\w\+/, "\\w+ — matches one or more word characters (letters, digits, underscore)"],
    [/\\w(?!\+|\*|\?)/, "\\w — matches any word character"],
    [/\\s/, "\\s — matches any whitespace (space, tab, newline)"],
    [/\\S/, "\\S — matches any non-whitespace character"],
    [/\\\\./, "\\. — matches a literal dot (escaped)"],
    [/\.\+/, ".+ — matches one or more of any character except newline"],
    [/\.\*/, ".* — matches zero or more of any character"],
    [/\[\^/, "[^ — negated character class: matches anything NOT listed inside the brackets"],
    [/\(\?:/, "(?:...) — non-capturing group: groups without saving the match"],
    [/\(\?=/, "(?=...) — lookahead: matches if followed by this pattern"],
    [/\(\?!/, "(?!...) — negative lookahead: matches if NOT followed by this pattern"],
    [/\((?!\?)[^)]*\)/, "(...) — capturing group: saves the matched text for backreference"],
    [/\|/, "| — alternation (OR): matches the expression on either side"],
    [/\{[\d,]+\}/, "{n,m} — quantifier: specifies exact count or min/max repetitions"],
    [/\[a-z\]/, "[a-z] — matches any lowercase letter a through z"],
    [/\[A-Z\]/, "[A-Z] — matches any uppercase letter A through Z"],
    [/\[0-9\]/, "[0-9] — matches any digit 0 through 9"],
    [/\\b(?!a-z)/, "\\b — word boundary: position between a word char and a non-word char"],
    [/\?(?!\?|=|!)/, "? — makes the preceding element optional (zero or one occurrence)"],
    [/\+(?!\?)/, "+ — one or more of the preceding element"],
    [/\*(?!\?)/, "* — zero or more of the preceding element"],
    [/\^(?=\[)/, "^ inside [...] — negates the character class"],
    [/\\./, "\\ — escape character: treats next char as literal"],
  ];

  const explain = () => {
    if (!regex.trim()) return;
    let valid = true;
    try { new RegExp(regex); } catch { valid = false; }
    const seen = new Set();
    const matches = PATTERNS
      .filter(([pattern]) => pattern.test(regex))
      .map(([, desc]) => desc)
      .filter(desc => { if (seen.has(desc)) return false; seen.add(desc); return true; });
    setResult({ parts: matches, valid });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="font-mono text-[0.6rem] uppercase tracking-widest block mb-1.5" style={{ color: "var(--dim)" }}>
          Paste regex (without slashes)
        </label>
        <input value={regex} onChange={e => setRegex(e.target.value)}
               onKeyDown={e => e.key === "Enter" && explain()}
               placeholder="e.g. ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
               className="tool-input font-mono text-sm" />
      </div>
      <button onClick={explain} className="btn-primary justify-center" style={{ fontSize: "0.78rem", padding: "0.6rem 1.2rem" }}>
        Explain
      </button>
      {result && (
        <div className="tool-result flex flex-col gap-2">
          {!result.valid && <div className="text-xs font-mono" style={{ color: "var(--accent2)" }}>⚠ Invalid regex syntax — check for unmatched brackets or escape sequences.</div>}
          {result.valid && result.parts.length === 0 && <div className="text-xs" style={{ color: "var(--muted)" }}>Basic literal pattern — no special constructs detected. It matches that exact string.</div>}
          {result.parts.map((p, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }}>›</span>
              <span style={{ color: "var(--muted)" }}>{p}</span>
            </div>
          ))}
          {result.valid && result.parts.length > 0 && (
            <p className="text-xs italic mt-1" style={{ color: "var(--dim)" }}>
              Tip: Test live at <a href="https://regex101.com" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>regex101.com</a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── TOOL 6: JIRA Ticket Scorer (AI-powered) ── */
function JiraTicketScorer({ apiKey }) {
  const [ticket, setTicket] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SYSTEM = `You are a strict engineering manager who has read thousands of JIRA tickets and knows exactly what makes them actionable or not. You do not give benefit of the doubt — you score what is written, not what the author might have meant.

Step 1: Detect ticket type from the description:
- Bug: needs steps to reproduce, expected behavior, actual behavior, environment/version, severity
- Feature: needs user story (As a... I want... So that...), acceptance criteria, definition of done, out-of-scope items
- Task/Chore: needs clear deliverable, definition of done, any dependencies
- Improvement: needs current state, desired state, measurable success criteria

Step 2: Score based on ticket type. Apply these checks:
- hasWho: is the affected user/role/system clearly identified?
- hasWhat: is the desired outcome or action unambiguous?
- hasAcceptance: are there explicit acceptance criteria or definition of done? (bullet list, Given/When/Then, or clear pass/fail conditions)
- hasContext: for bugs — steps to reproduce + expected vs actual; for features — background/motivation; for tasks — why this needs doing
- hasPriority: is severity/priority stated or clearly implied?

Scoring (be strict — real tickets average 4-5):
0-2 = unusable (one-liner, no context, cannot be acted on)
3-4 = poor (missing most of what's needed, engineer would have to ask 3+ questions)
5-6 = needs work (core idea is there but missing AC or steps or context)
7-8 = good (actionable with minor questions)
9-10 = excellent (engineer can pick this up cold with zero questions)

Return ONLY a JSON object with no markdown, no code fences:
{
  "score": <integer 0-10>,
  "ticketType": "<bug / feature / task / improvement / unclear>",
  "label": "<one of: Unusable / Poor / Needs Work / Acceptable / Good / Excellent>",
  "hasWho": <boolean>,
  "hasWhat": <boolean>,
  "hasAcceptance": <boolean>,
  "hasContext": <boolean>,
  "hasPriority": <boolean>,
  "missing": ["<specific missing element and why an engineer needs it — be direct>", ...],
  "rewritten": "<rewritten ticket that fills all gaps — use the detected ticket type's format, keep it concise but complete>"
}

Max 3 missing items. The rewritten version must be genuinely better, not just the original with a header added.`;

  const analyze = async () => {
    if (!ticket.trim()) return;
    if (!ENV_KEY && !apiKey) { setError("No API key configured. Add your key in the field above."); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const raw = await callOpenAI(apiKey, SYSTEM, `Score this JIRA ticket:\n\n${ticket}`);
      const clean = raw.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally { setLoading(false); }
  };

  const scoreColor = result
    ? (result.score >= 7 ? "#4ade80" : result.score >= 5 ? "var(--accent)" : "var(--accent2)")
    : "var(--accent)";

  return (
    <div className="flex flex-col gap-3">
      <textarea value={ticket} onChange={e => setTicket(e.target.value)}
                placeholder={"Paste your JIRA ticket description here...\n\nTip: include who, what, why, acceptance criteria, and steps to reproduce."}
                className="tool-input" rows={6} style={{ resize: "vertical" }} />
      <button onClick={analyze} disabled={loading} className="btn-primary justify-center"
              style={{ fontSize: "0.78rem", padding: "0.6rem 1.2rem", opacity: loading ? 0.7 : 1 }}>
        {loading ? "Scoring..." : "Score with AI"}
      </button>
      {loading && <Spinner />}
      {error && <p className="text-xs" style={{ color: "var(--accent2)" }}>{error}</p>}
      {result && (
        <div className="tool-result flex flex-col gap-3">
          <div className="flex items-center gap-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="font-sans font-extrabold" style={{ fontSize: "2rem", color: scoreColor, lineHeight: 1 }}>
              {result.score}<span className="text-base font-normal" style={{ color: "var(--dim)" }}>/10</span>
            </div>
            <div>
              <div className="font-sans font-semibold text-sm" style={{ color: "var(--text)" }}>{result.label}</div>
              <div className="font-mono text-[0.6rem] mt-0.5" style={{ color: "var(--muted)" }}>
                Ticket Quality
                {result.ticketType && result.ticketType !== "unclear" && (
                  <span className="ml-2 px-1.5 py-0.5 rounded" style={{ background: "var(--surface)", color: "var(--accent)", border: "1px solid var(--border)", textTransform: "capitalize" }}>
                    {result.ticketType}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              [result.hasWho,         "Who"],
              [result.hasWhat,        "What"],
              [result.hasAcceptance,  "Acceptance Criteria"],
              [result.hasContext,     "Context"],
              [result.hasPriority,    "Priority"],
            ].map(([pass, label]) => (
              <span key={label} className="font-mono text-[0.6rem] px-2 py-0.5 rounded"
                    style={{ background: pass ? "rgba(74,222,128,0.1)" : "rgba(255,107,157,0.1)",
                             color: pass ? "#4ade80" : "var(--accent2)",
                             border: `1px solid ${pass ? "rgba(74,222,128,0.3)" : "rgba(255,107,157,0.3)"}` }}>
                {pass ? "✓" : "✗"} {label}
              </span>
            ))}
          </div>
          {result.missing?.length > 0 && (
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-widest mb-1.5" style={{ color: "var(--dim)" }}>Missing</p>
              {result.missing.map((m, i) => (
                <div key={i} className="flex items-start gap-2 text-xs mb-1" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent2)", flexShrink: 0 }}>✗</span>{m}
                </div>
              ))}
            </div>
          )}
          {result.rewritten && (
            <div className="rounded-lg p-3" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
              <p className="font-mono text-[0.58rem] uppercase tracking-widest mb-1.5" style={{ color: "var(--accent)" }}>Improved Version</p>
              <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text)" }}>{result.rewritten}</p>
              <button onClick={() => navigator.clipboard.writeText(result.rewritten)}
                      className="font-mono text-[0.6rem] mt-2 transition-opacity hover:opacity-70" style={{ color: "var(--dim)" }}>
                ⎘ Copy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main page ── */
export default function ToolsPage() {
  useSEO("Dev Tools | Prashast Vats", "Interactive developer tools — prompt debugger, git commit formatter, code review rater, and more.");
  const [apiKey, setApiKey] = useState("");

  const TOOLS = [
    { id: "prompt", title: "Prompt Debugger",      tag: "AI ✦",        ai: true,  desc: "Paste any AI prompt and get a clarity score, specific issues, concrete fixes, and a rewritten version.",       component: <PromptDebugger apiKey={apiKey} /> },
    { id: "commit", title: "Git Commit Formatter",  tag: "Git",         ai: false, desc: "Describe your change and get a properly formatted conventional commit message with type and optional scope.",   component: <GitCommitFormatter /> },
    { id: "code",   title: "Code Review Rater",     tag: "Code ✦",      ai: true,  desc: "Paste a snippet and get AI scores for naming, readability, and robustness — with specific flags and a top fix.", component: <CodeReviewRater apiKey={apiKey} /> },
    { id: "stack",  title: "Tech Stack Advisor",    tag: "Architecture", ai: false, desc: "Answer 4 questions about your project and get a recommended stack with tradeoff notes, tailored to your background.", component: <TechStackAdvisor /> },
    { id: "regex",  title: "Regex Explainer",       tag: "Dev Tools",   ai: false, desc: "Paste any regex and get a plain-English breakdown of every construct — no more Googling what \\d+ means.",    component: <RegexExplainer /> },
    { id: "jira",   title: "JIRA Ticket Scorer",    tag: "Process ✦",   ai: true,  desc: "Paste a ticket and get an AI quality score, checklist (who/what/AC/context/priority), and an improved version.", component: <JiraTicketScorer apiKey={apiKey} /> },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest mb-10 transition-opacity hover:opacity-70 block"
              style={{ color: "var(--muted)" }}>
          ← Back to Portfolio
        </Link>
        <p className="section-label">Dev Lab</p>
        <h1 className="font-sans font-extrabold mb-2" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text)", lineHeight: 1.1 }}>
          Interactive Tools
        </h1>
        <p className="text-sm sm:text-base mb-8 max-w-lg" style={{ color: "var(--muted)" }}>
          Six tools built around real engineering problems. Tools marked <span className="font-mono text-[0.75rem]" style={{ color: "var(--accent)" }}>✦</span> use AI for deeper analysis.
        </p>

        <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {TOOLS.map((tool) => (
            <div key={tool.id} className="card flex flex-col">
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="font-sans font-bold text-sm sm:text-[0.95rem] leading-snug" style={{ color: "var(--text)" }}>
                    {tool.title}
                  </h2>
                  <span className="pill shrink-0" style={tool.ai ? { color: "var(--accent3)", borderColor: "rgba(167,139,250,0.3)", background: "rgba(167,139,250,0.07)" } : {}}>
                    {tool.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
                  {tool.desc}
                </p>
                <div className="mt-auto">{tool.component}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
