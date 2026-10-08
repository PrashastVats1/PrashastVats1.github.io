import { useState } from "react";
import { CopyButton, Field, LabButton, OutputHeading } from "./labKit";
import { COMMIT_TYPES, HEADER_LIMIT, buildCommit } from "./commitMessage";

const ID = "pv-commit";
const BLANK = { type: "feat", scope: "", description: "", body: "", breaking: false, breakingNote: "" };

export default function CommitScribe() {
  const [form, setForm] = useState(BLANK);
  const [notice, setNotice] = useState("");
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const commit = buildCommit(form);

  const clear = () => {
    setForm(BLANK);
    setNotice("Cleared.");
  };

  return (
    <div className="pv-tool">
      <div className="pv-tool__input">
        <div className="pv-tool__row">
          <Field id={`${ID}-type`} label="Type" hint={COMMIT_TYPES.find((t) => t.type === form.type).meaning}>
            {(hintId) => (
              <select id={`${ID}-type`} className="pv-input pv-input--select" value={form.type} aria-describedby={hintId} onChange={set("type")}>
                {COMMIT_TYPES.map(({ type }) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field id={`${ID}-scope`} label="Scope" optional hint="The area changed, e.g. portfolio or auth.">
            {(hintId) => (
              <input id={`${ID}-scope`} className="pv-input pv-input--code" value={form.scope} aria-describedby={hintId} autoComplete="off" autoCapitalize="off" spellCheck={false} onChange={set("scope")} />
            )}
          </Field>
        </div>
        <Field id={`${ID}-description`} label="Description" hint='A short summary in the imperative, e.g. "add laboratory tools".'>
          {(hintId) => (
            <input id={`${ID}-description`} className="pv-input" value={form.description} aria-describedby={hintId} autoComplete="off" onChange={set("description")} />
          )}
        </Field>
        <Field id={`${ID}-body`} label="Body" optional hint="Why the change was made, if the summary is not enough.">
          {(hintId) => <textarea id={`${ID}-body`} className="pv-input pv-input--area" rows={4} value={form.body} aria-describedby={hintId} onChange={set("body")} />}
        </Field>
        <label className="pv-check">
          <input type="checkbox" checked={form.breaking} onChange={set("breaking")} />
          <span>This is a breaking change</span>
        </label>
        {form.breaking && (
          <Field id={`${ID}-breaking`} label="What breaks?" optional hint="Added as a BREAKING CHANGE footer.">
            {(hintId) => <input id={`${ID}-breaking`} className="pv-input" value={form.breakingNote} aria-describedby={hintId} autoComplete="off" onChange={set("breakingNote")} />}
          </Field>
        )}
        <div className="pv-tool__actions">
          <LabButton onClick={clear}>Clear</LabButton>
        </div>
      </div>

      <section className="pv-tool__output pv-output" aria-labelledby={`${ID}-out`}>
        <OutputHeading id={`${ID}-out`}>Commit message</OutputHeading>
        <p className="pv-visually-hidden" role="status">
          {notice}
        </p>

        {!commit.ok && <p className="pv-output__empty">Choose a type and write a description; the scribe writes the message here as you type.</p>}

        {commit.ok && (
          <div className="pv-output__result" data-testid="commit-result">
            <pre className="pv-output__commit" tabIndex={0} aria-label="Generated commit message">
              {commit.message}
            </pre>
            <p className="pv-tool__count" data-over={commit.header.length > HEADER_LIMIT || undefined}>
              First line: {commit.header.length} / {HEADER_LIMIT} characters
            </p>
            {commit.notes.length > 0 && (
              <ul className="pv-output__notes" aria-label="Suggestions">
                {commit.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="pv-tool__actions pv-tool__actions--output">
          <CopyButton text={commit.ok ? commit.message : ""} label="Copy message" />
        </div>

        <p className="pv-output__footnote">
          Follows the <a href="https://www.conventionalcommits.org/en/v1.0.0/" target="_blank" rel="noreferrer">Conventional Commits 1.0.0<span className="pv-visually-hidden"> (opens in a new tab)</span></a> format. Built in your browser from what you type; no AI involved.
        </p>
      </section>
    </div>
  );
}
