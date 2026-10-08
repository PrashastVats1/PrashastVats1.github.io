import { useState } from "react";
import FantasyButton from "../../components/fantasy/FantasyButton";
import { Field, LabButton, OutputHeading } from "./labKit";
import { FLAGS, MAX_TEXT, SAMPLE, explainPattern, runRegex } from "./regexAlchemy";

const ID = "pv-regex";

const visible = (s) => (s === "" ? "(empty match)" : s);

export default function RegexAlchemist() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [run, setRun] = useState(null);
  const [notice, setNotice] = useState("");

  const toggleFlag = (flag) =>
    setFlags((current) => (current.includes(flag) ? current.replace(flag, "") : FLAGS.map((f) => f.flag).filter((f) => current.includes(f) || f === flag).join("")));

  const transmute = (p = pattern, f = flags, t = text) => {
    if (!p) {
      setRun({ empty: true });
      setNotice("Enter a pattern first.");
      return;
    }
    const result = runRegex(p, f, t);
    const steps = result.ok ? explainPattern(p).tokens : [];
    setRun({ ...result, steps, pattern: p });
    setNotice(
      result.ok
        ? result.matches.length
          ? `Match. ${result.matches.length}${result.capped ? "+" : ""} match${result.matches.length === 1 ? "" : "es"} found.`
          : "No match."
        : "The pattern could not be read."
    );
  };

  const loadExample = () => {
    setPattern(SAMPLE.pattern);
    setFlags(SAMPLE.flags);
    setText(SAMPLE.text);
    transmute(SAMPLE.pattern, SAMPLE.flags, SAMPLE.text);
  };

  const clear = () => {
    setPattern("");
    setFlags("g");
    setText("");
    setRun(null);
    setNotice("Cleared.");
  };

  return (
    <div className="pv-tool">
      <div className="pv-tool__input">
        <Field id={`${ID}-pattern`} label="Pattern" hint="A JavaScript regular expression, without the surrounding slashes.">
          {(hintId) => (
            <div className="pv-regex-pattern">
              <span className="pv-regex-pattern__slash" aria-hidden="true">
                /
              </span>
              <input
                id={`${ID}-pattern`}
                className="pv-input pv-input--code"
                value={pattern}
                aria-describedby={hintId}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                onChange={(e) => setPattern(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && transmute()}
              />
              <span className="pv-regex-pattern__slash" aria-hidden="true">
                /{flags}
              </span>
            </div>
          )}
        </Field>

        <fieldset className="pv-flags">
          <legend className="pv-field__label">Flags</legend>
          <div className="pv-flags__list">
            {FLAGS.map(({ flag, name, hint }) => (
              <label key={flag} className="pv-flag" title={hint}>
                <input type="checkbox" checked={flags.includes(flag)} onChange={() => toggleFlag(flag)} />
                <span>
                  <code>{flag}</code> {name}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field id={`${ID}-text`} label="Test string" hint="The text to search.">
          {(hintId) => (
            <textarea
              id={`${ID}-text`}
              className="pv-input pv-input--area pv-input--code"
              rows={6}
              maxLength={MAX_TEXT}
              value={text}
              aria-describedby={hintId}
              spellCheck={false}
              onChange={(e) => setText(e.target.value)}
            />
          )}
        </Field>

        <div className="pv-tool__actions">
          <FantasyButton onClick={() => transmute()} hint="Test the pattern" className="pv-tool__primary">
            Transmute
          </FantasyButton>
          <LabButton onClick={loadExample}>Load an example</LabButton>
          <LabButton onClick={clear}>Clear</LabButton>
        </div>
      </div>

      <section className="pv-tool__output pv-output" aria-labelledby={`${ID}-out`}>
        <OutputHeading id={`${ID}-out`}>Result</OutputHeading>
        <p className="pv-visually-hidden" role="status">
          {notice}
        </p>

        {!run && <p className="pv-output__empty">Give the alchemist a pattern and some text, then press Transmute to see every match and what each part of the pattern means.</p>}
        {run && run.empty && <p className="pv-output__warning">Enter a pattern first.</p>}

        {run && run.ok === false && (
          <div className="pv-output__error" role="alert">
            <p className="pv-output__error-title">The alchemist could not read this pattern</p>
            <p>{run.friendly}</p>
            <p className="pv-output__technical">
              Browser message: <code>{run.technical}</code>
            </p>
          </div>
        )}

        {run && run.ok && (
          <div className="pv-output__result" data-testid="regex-result">
            <p className="pv-verdict" data-verdict={run.matches.length ? "match" : "none"}>
              <strong>{run.matches.length ? "Match" : "No match"}</strong>
              <span>
                {run.matches.length
                  ? ` ${run.matches.length}${run.capped ? "+" : ""} match${run.matches.length === 1 ? "" : "es"} for `
                  : " for "}
                <code>{run.source}</code>
              </span>
            </p>
            {!run.global && run.matches.length > 0 && (
              <p className="pv-output__note">Showing the first match only. Turn on the g flag to find every match.</p>
            )}

            {run.matches.length > 0 && (
              <>
                <h4 className="pv-output__subheading">In the text</h4>
                <pre className="pv-output__preview" tabIndex={0} aria-label="Test string with matches marked">
                  {run.segments.map((part, n) =>
                    part.match ? (
                      <mark key={n} data-match={part.match}>
                        {part.text}
                      </mark>
                    ) : (
                      <span key={n}>{part.text}</span>
                    )
                  )}
                </pre>

                <h4 className="pv-output__subheading">Matches</h4>
                <ol className="pv-matches">
                  {run.matches.slice(0, 50).map((m, n) => (
                    <li key={`${m.index}-${n}`} className="pv-match">
                      <p className="pv-match__head">
                        <code className="pv-code-chip">{visible(m.text)}</code>
                        <span className="pv-match__pos">
                          characters {m.index} to {m.end}
                        </span>
                      </p>
                      {m.groups.length > 0 && (
                        <dl className="pv-match__groups">
                          {m.groups.map((g) => (
                            <div key={g.number}>
                              <dt>
                                Group {g.number}
                                {g.name ? ` (${g.name})` : ""}
                              </dt>
                              <dd>{g.value === undefined ? <em>did not take part</em> : <code>{visible(g.value)}</code>}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </li>
                  ))}
                </ol>
                {run.matches.length > 50 && <p className="pv-output__note">Listing the first 50 matches; all are marked in the text above.</p>}
              </>
            )}

            <h4 className="pv-output__subheading">How the pattern reads</h4>
            <ol className="pv-steps">
              {run.steps.map((step, n) => (
                <li key={n} className="pv-step" style={{ "--pv-depth": step.depth }}>
                  <code className="pv-step__code">{step.code}</code>
                  <span className="pv-step__meaning">{step.description}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <p className="pv-output__footnote">Matching uses your browser's own JavaScript regular expressions. The explanation covers common syntax and is a reading aid, not a full parser.</p>
      </section>
    </div>
  );
}
