/*
 * Regex Alchemist logic. Matching uses the browser's own RegExp; the
 * explanation is a best-effort reading of common syntax, not a full parser.
 */

export const MAX_MATCHES = 500;
export const MAX_TEXT = 10000;

export const FLAGS = [
  { flag: "g", name: "global", hint: "Find every match, not just the first" },
  { flag: "i", name: "ignore case", hint: "Treat upper and lower case as equal" },
  { flag: "m", name: "multiline", hint: "^ and $ match at each line break" },
  { flag: "s", name: "dot all", hint: ". also matches line breaks" },
  { flag: "u", name: "unicode", hint: "Full Unicode mode, stricter escapes" },
];

const ESCAPES = {
  d: "Any digit (0-9)",
  D: "Any character that is not a digit",
  w: "Any word character (letter, digit, or underscore)",
  W: "Any character that is not a word character",
  s: "Any whitespace (space, tab, line break)",
  S: "Any character that is not whitespace",
  b: "A word boundary: the edge between a word character and a non-word character",
  B: "A position that is not a word boundary",
  n: "A line feed (new line)",
  r: "A carriage return",
  t: "A tab",
  f: "A form feed",
  v: "A vertical tab",
  0: "A null character",
};

const CLASS_ESCAPES = { d: "any digit", D: "any non-digit", w: "any word character", W: "any non-word character", s: "any whitespace", S: "any non-whitespace", n: "a line feed", r: "a carriage return", t: "a tab" };

const show = (s) => (s === " " ? "a space" : `"${s}"`);

function readEscape(src, i) {
  const next = src[i + 1];
  if (next === undefined) return { code: "\\", end: i + 1, kind: "literal", text: "\\" };
  if (/[1-9]/.test(next)) {
    const n = src.slice(i + 1).match(/^\d+/)[0];
    return { code: `\\${n}`, end: i + 1 + n.length, kind: "backref", description: `Repeats exactly the text captured by group ${n}` };
  }
  if (next === "k" && src[i + 2] === "<") {
    const close = src.indexOf(">", i + 3);
    if (close > -1) {
      const name = src.slice(i + 3, close);
      return { code: src.slice(i, close + 1), end: close + 1, kind: "backref", description: `Repeats exactly the text captured by the group named "${name}"` };
    }
  }
  if ((next === "p" || next === "P") && src[i + 2] === "{") {
    const close = src.indexOf("}", i + 3);
    if (close > -1) {
      const prop = src.slice(i + 3, close);
      return { code: src.slice(i, close + 1), end: close + 1, kind: "class", description: `${next === "P" ? "Any character without" : "Any character with"} the Unicode property ${prop} (needs the u flag)` };
    }
  }
  const hex = { x: 2, u: 4 }[next];
  if (hex && new RegExp(`^[0-9a-fA-F]{${hex}}$`).test(src.slice(i + 2, i + 2 + hex))) {
    const digits = src.slice(i + 2, i + 2 + hex);
    return { code: src.slice(i, i + 2 + hex), end: i + 2 + hex, kind: "literal", text: String.fromCharCode(parseInt(digits, 16)) };
  }
  if (ESCAPES[next]) {
    const kind = next === "b" || next === "B" ? "anchor" : "class";
    return { code: `\\${next}`, end: i + 2, kind, description: ESCAPES[next] };
  }
  return { code: `\\${next}`, end: i + 2, kind: "literal", text: next };
}

function readClass(src, i) {
  let j = i + 1;
  const negated = src[j] === "^";
  if (negated) j += 1;
  const items = [];
  while (j < src.length && src[j] !== "]") {
    let item;
    if (src[j] === "\\" && j + 1 < src.length) {
      const c = src[j + 1];
      item = CLASS_ESCAPES[c] || show(c);
      j += 2;
    } else {
      item = src[j];
      j += 1;
    }
    if (src[j] === "-" && src[j + 1] && src[j + 1] !== "]" && item.length === 1) {
      const to = src[j + 1] === "\\" ? src[j + 2] : src[j + 1];
      j += src[j + 1] === "\\" ? 3 : 2;
      items.push(`${item}-${to}`);
    } else {
      items.push(item.length === 1 ? show(item) : item);
    }
  }
  if (src[j] !== "]") return null;
  const list = items.length ? items.join(", ") : "nothing";
  return {
    code: src.slice(i, j + 1),
    end: j + 1,
    kind: "class",
    description: negated ? `Any one character except: ${list}` : `One character from: ${list}`,
  };
}

const GROUP_OPENERS = [
  ["(?:", "Starts a non-capturing group: groups items without saving the match"],
  ["(?=", "Starts a lookahead: the position must be followed by this, without consuming it"],
  ["(?!", "Starts a negative lookahead: the position must not be followed by this"],
  ["(?<=", "Starts a lookbehind: the position must be preceded by this"],
  ["(?<!", "Starts a negative lookbehind: the position must not be preceded by this"],
];

function describeQuantifier(q) {
  const lazy = q.length > 1 && q.endsWith("?") && q !== "?";
  const core = lazy ? q.slice(0, -1) : q;
  const mode = lazy ? " (lazy: as few as possible)" : "";
  if (core === "*") return `Repeats the previous item zero or more times${mode}`;
  if (core === "+") return `Repeats the previous item one or more times${mode}`;
  if (core === "?") return `Makes the previous item optional${mode}`;
  const [, min, comma, max] = core.match(/^\{(\d+)(,?)(\d*)\}$/);
  if (!comma) return `Repeats the previous item exactly ${min} time${min === "1" ? "" : "s"}${mode}`;
  if (!max) return `Repeats the previous item at least ${min} times${mode}`;
  return `Repeats the previous item between ${min} and ${max} times${mode}`;
}

/** Breaks a pattern into explained parts. Also returns capture-group names in order (null when unnamed). */
export function explainPattern(src) {
  const tokens = [];
  const captures = [];
  let depth = 0;
  let i = 0;

  // Literal runs are kept as parts so a quantifier can peel off just the last character.
  const pushLiteral = (code, text) => {
    const last = tokens[tokens.length - 1];
    if (last && last.kind === "literal") last.parts.push({ code, text });
    else tokens.push({ kind: "literal", depth, parts: [{ code, text }] });
  };

  while (i < src.length) {
    const ch = src[i];
    const rest = src.slice(i);
    const quant = rest.match(/^(?:[*+?]|\{\d+(?:,\d*)?\})\??/);

    if (quant && tokens.length) {
      const last = tokens[tokens.length - 1];
      if (last.kind === "literal" && last.parts.length > 1) {
        tokens.push({ kind: "literal", depth, parts: [last.parts.pop()] });
      }
      tokens.push({ code: quant[0], kind: "quantifier", depth, description: describeQuantifier(quant[0]) });
      i += quant[0].length;
      continue;
    }

    if (ch === "\\") {
      const esc = readEscape(src, i);
      if (esc.kind === "literal") pushLiteral(esc.code, esc.text);
      else tokens.push({ ...esc, depth });
      i = esc.end;
      continue;
    }

    if (ch === "[") {
      const cls = readClass(src, i);
      if (cls) {
        tokens.push({ ...cls, depth });
        i = cls.end;
        continue;
      }
    }

    if (ch === "(") {
      const opener = GROUP_OPENERS.find(([o]) => rest.startsWith(o));
      const named = rest.match(/^\(\?<([A-Za-z_$][\w$]*)>/);
      if (opener) {
        tokens.push({ code: opener[0], kind: "group", depth, description: opener[1] });
        i += opener[0].length;
      } else if (named) {
        captures.push(named[1]);
        tokens.push({ code: named[0], kind: "group", depth, description: `Starts capture group ${captures.length}, named "${named[1]}"` });
        i += named[0].length;
      } else {
        captures.push(null);
        tokens.push({ code: "(", kind: "group", depth, description: `Starts capture group ${captures.length}: saves the matched text` });
        i += 1;
      }
      depth += 1;
      continue;
    }

    if (ch === ")") {
      depth = Math.max(0, depth - 1);
      tokens.push({ code: ")", kind: "group", depth, description: "Ends the group" });
      i += 1;
      continue;
    }

    const single = {
      "|": ["alternation", "Or: matches either the part before or the part after"],
      "^": ["anchor", "Start of the text (or of a line with the m flag)"],
      $: ["anchor", "End of the text (or of a line with the m flag)"],
      ".": ["class", "Any single character except a line break (including line breaks with the s flag)"],
    }[ch];
    if (single) {
      tokens.push({ code: ch, kind: single[0], depth, description: single[1] });
      i += 1;
      continue;
    }

    pushLiteral(ch, ch);
    i += 1;
  }

  const explained = tokens.map(({ parts, ...t }) => {
    if (t.kind !== "literal") return t;
    const text = parts.map((p) => p.text).join("");
    return {
      ...t,
      code: parts.map((p) => p.code).join(""),
      description: parts.length === 1 ? `The character ${show(text)}` : `The text "${text}" exactly`,
    };
  });
  return { tokens: explained, captures };
}

const FRIENDLY_ERRORS = [
  [/unterminated group|missing \)/i, "A group was opened with ( but never closed with )."],
  [/unmatched '?\)'?|unbalanced parenthes/i, "There is a ) without a matching (."],
  [/nothing to repeat/i, "A quantifier such as *, + or ? has nothing in front of it to repeat."],
  [/unterminated character class|missing \]/i, "A [ character set is missing its closing ]."],
  [/range out of order/i, "A range inside [ ] runs backwards, such as z-a."],
  [/\\ at end of pattern/i, "The pattern ends with a lone backslash."],
  [/invalid (?:named )?capture group name|invalid group/i, "This group syntax is not recognised."],
  [/invalid escape|invalid unicode escape|invalid property name/i, "An escape sequence is not valid here. The u flag is stricter about escapes."],
  [/incomplete quantifier|numbers out of order/i, "A { } quantifier is incomplete or its numbers are in the wrong order."],
  [/invalid flags/i, "One of the flags is not recognised."],
];

/** Compiles and runs a pattern. Never throws: invalid patterns return a readable error. */
export function runRegex(pattern, flags, text) {
  const subject = String(text || "").slice(0, MAX_TEXT);
  let re;
  try {
    re = new RegExp(pattern, flags);
  } catch (e) {
    const friendly = FRIENDLY_ERRORS.find(([test]) => test.test(e.message));
    return {
      ok: false,
      friendly: friendly ? friendly[1] : "Check the brackets, parentheses, and escapes in the pattern.",
      technical: e.message,
    };
  }

  const { captures } = explainPattern(pattern);
  const toMatch = (m) => ({
    index: m.index,
    end: m.index + m[0].length,
    text: m[0],
    groups: m.slice(1).map((value, n) => ({ number: n + 1, name: captures[n] || null, value })),
  });

  let matches = [];
  let capped = false;
  if (re.global) {
    for (const m of subject.matchAll(re)) {
      if (matches.length === MAX_MATCHES) {
        capped = true;
        break;
      }
      matches.push(toMatch(m));
    }
  } else {
    const m = re.exec(subject);
    if (m) matches = [toMatch(m)];
  }

  return { ok: true, source: re.toString(), global: re.global, matches, capped, segments: highlight(subject, matches), truncated: String(text || "").length > MAX_TEXT };
}

function highlight(text, matches) {
  const parts = [];
  let cursor = 0;
  matches.forEach((m, n) => {
    if (m.end === m.index) return;
    if (m.index > cursor) parts.push({ text: text.slice(cursor, m.index), match: null });
    parts.push({ text: text.slice(m.index, m.end), match: n + 1 });
    cursor = m.end;
  });
  if (cursor < text.length) parts.push({ text: text.slice(cursor), match: null });
  return parts;
}

export const SAMPLE = {
  pattern: "(?<user>[\\w.+-]+)@(?<domain>[\\w-]+\\.[\\w.]+)",
  flags: "g",
  text: "Write to ada@example.com or grace.hopper@navy.mil, but not to @nobody.",
};
