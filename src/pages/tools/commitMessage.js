/* Commit Scribe logic: deterministic Conventional Commits formatting. */

export const COMMIT_TYPES = [
  { type: "feat", meaning: "A new feature" },
  { type: "fix", meaning: "A bug fix" },
  { type: "docs", meaning: "Documentation only" },
  { type: "style", meaning: "Formatting, no code change" },
  { type: "refactor", meaning: "Restructuring without changing behaviour" },
  { type: "perf", meaning: "A performance improvement" },
  { type: "test", meaning: "Adding or correcting tests" },
  { type: "build", meaning: "Build system or dependencies" },
  { type: "ci", meaning: "Continuous integration configuration" },
  { type: "chore", meaning: "Maintenance that touches no source or tests" },
  { type: "revert", meaning: "Reverts an earlier commit" },
];

export const HEADER_LIMIT = 72;

const tidy = (s) => String(s || "").trim().replace(/\s+/g, " ");

export function buildCommit({ type = "feat", scope = "", description = "", breaking = false, body = "", breakingNote = "" }) {
  const cleanScope = tidy(scope).replace(/[()]/g, "").replace(/ /g, "-");
  const cleanDescription = tidy(description).replace(/\.+$/, "");
  if (!cleanDescription) return { ok: false, header: "", message: "", notes: [] };

  const header = `${type}${cleanScope ? `(${cleanScope})` : ""}${breaking ? "!" : ""}: ${cleanDescription}`;
  const sections = [header];
  const cleanBody = String(body || "").trim();
  if (cleanBody) sections.push(cleanBody);
  const note = tidy(breakingNote);
  if (breaking && note) sections.push(`BREAKING CHANGE: ${note}`);

  const notes = [];
  if (header.length > HEADER_LIMIT) notes.push(`The first line is ${header.length} characters; many teams keep it under ${HEADER_LIMIT}.`);
  if (/^[A-Z][a-z]/.test(cleanDescription)) notes.push("Conventional Commits descriptions usually start with a lowercase letter.");
  if (/^(added|adds|fixed|fixes|updated|updates|removed|removes|changed|changes)\b/i.test(cleanDescription)) {
    notes.push('Describe the change in the imperative mood, e.g. "add" rather than "added".');
  }

  return { ok: true, header, message: sections.join("\n\n"), notes };
}
