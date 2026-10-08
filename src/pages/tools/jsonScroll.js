/*
 * JSON Scribe logic. JSON.parse decides validity; when it fails, a small
 * scanner finds where and why, because engine messages differ by browser.
 */

export function lineColumn(text, offset) {
  const before = text.slice(0, offset);
  const lines = before.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

/** Returns { offset, reason } for the first problem in invalid JSON. */
export function locateError(text) {
  let i = 0;
  const fail = (reason, at = i) => {
    const error = new Error(reason);
    error.offset = at;
    throw error;
  };
  const ws = () => {
    while (i < text.length && " \t\n\r".includes(text[i])) i += 1;
  };
  const describe = (ch) => (ch === undefined ? "the end of the text" : `"${ch}"`);

  function value() {
    ws();
    const ch = text[i];
    if (ch === "{") return object();
    if (ch === "[") return array();
    if (ch === '"') return string();
    if (ch === "'") fail("Strings and property names must use double quotes, not single quotes.");
    if (ch === "/" && (text[i + 1] === "/" || text[i + 1] === "*")) fail("Comments are not allowed in JSON.");
    if (ch === "-" || (ch >= "0" && ch <= "9")) return number();
    for (const word of ["true", "false", "null"]) {
      if (text.startsWith(word, i)) {
        i += word.length;
        return;
      }
    }
    if (ch === undefined) fail("The text ends where a value was expected.");
    const bare = text.slice(i).match(/^(undefined|NaN|-?Infinity)/);
    if (bare) fail(`${bare[1]} is not a JSON value. Use null, a number, or a quoted string.`);
    fail(`Expected a value (an object, array, string, number, true, false, or null) but found ${describe(ch)}.`);
  }

  function object() {
    i += 1;
    ws();
    if (text[i] === "}") {
      i += 1;
      return;
    }
    for (;;) {
      ws();
      if (text[i] === "}") fail("Trailing comma: remove the comma before the closing }.", text.lastIndexOf(",", i));
      if (text[i] === "'") fail("Property names must use double quotes, not single quotes.");
      if (text[i] !== '"') fail(text[i] === undefined ? "The text ends inside an object; a closing } is missing." : `Property names must be double-quoted strings, but found ${describe(text[i])}.`);
      string();
      ws();
      if (text[i] !== ":") fail(`Expected a colon after the property name but found ${describe(text[i])}.`);
      i += 1;
      value();
      ws();
      if (text[i] === ",") {
        i += 1;
        continue;
      }
      if (text[i] === "}") {
        i += 1;
        return;
      }
      fail(text[i] === undefined ? "The text ends inside an object; a closing } is missing." : `Expected a comma or a closing } but found ${describe(text[i])}. A comma may be missing.`);
    }
  }

  function array() {
    i += 1;
    ws();
    if (text[i] === "]") {
      i += 1;
      return;
    }
    for (;;) {
      ws();
      if (text[i] === "]") fail("Trailing comma: remove the comma before the closing ].", text.lastIndexOf(",", i));
      value();
      ws();
      if (text[i] === ",") {
        i += 1;
        continue;
      }
      if (text[i] === "]") {
        i += 1;
        return;
      }
      fail(text[i] === undefined ? "The text ends inside an array; a closing ] is missing." : `Expected a comma or a closing ] but found ${describe(text[i])}. A comma may be missing.`);
    }
  }

  function string() {
    const start = i;
    i += 1;
    while (i < text.length) {
      const ch = text[i];
      if (ch === '"') {
        i += 1;
        return;
      }
      if (ch === "\\") {
        const esc = text[i + 1];
        if (esc === "u") {
          if (!/^[0-9a-fA-F]{4}$/.test(text.slice(i + 2, i + 6))) fail("A \\u escape needs exactly four hexadecimal digits.");
          i += 6;
          continue;
        }
        if (!'"\\/bfnrt'.includes(esc) || esc === undefined) fail(`"\\${esc || ""}" is not a valid escape inside a string.`);
        i += 2;
        continue;
      }
      if (ch === "\n" || ch < " ") fail("Strings cannot contain raw line breaks or control characters; use \\n instead.");
      i += 1;
    }
    fail("A string is never closed; a double quote is missing.", start);
  }

  function number() {
    const m = text.slice(i).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);
    if (!m) fail(`This is not a valid number: ${describe(text[i])}.`);
    const next = text[i + m[0].length];
    if (m[0].replace("-", "") === "0" && next >= "0" && next <= "9") fail("Numbers cannot have leading zeros.");
    i += m[0].length;
  }

  try {
    ws();
    if (i === text.length) fail("There is nothing to parse.");
    value();
    ws();
    if (i < text.length) fail(`Unexpected ${describe(text[i])} after the end of the JSON value.`);
    return null;
  } catch (e) {
    return { offset: Math.max(0, e.offset ?? i), reason: e.message };
  }
}

function summarise(value) {
  if (Array.isArray(value)) return `an array of ${value.length} item${value.length === 1 ? "" : "s"}`;
  if (value && typeof value === "object") {
    const n = Object.keys(value).length;
    return `an object with ${n} propert${n === 1 ? "y" : "ies"}`;
  }
  if (value === null) return "null";
  return `a ${typeof value}`;
}

/**
 * Parses and (optionally) re-serialises JSON.
 * mode: "format" | "minify" | "validate". indent: number of spaces or "\t".
 */
export function transformJson(text, mode, indent = 2) {
  const source = String(text || "");
  if (!source.trim()) return { ok: false, empty: true };
  try {
    const value = JSON.parse(source);
    const output = mode === "minify" ? JSON.stringify(value) : mode === "format" ? JSON.stringify(value, null, indent) : null;
    return { ok: true, summary: summarise(value), output };
  } catch (e) {
    const found = locateError(source) || { offset: 0, reason: "The text is not valid JSON." };
    const { line, column } = lineColumn(source, found.offset);
    const lineText = source.split("\n")[line - 1] || "";
    return { ok: false, reason: found.reason, line, column, lineText, technical: e.message };
  }
}

export const SAMPLE_SCROLL = '{"scribe":"JSON Scribe","runsIn":"your browser","features":["format","minify","validate"],"sendsData":false}';
