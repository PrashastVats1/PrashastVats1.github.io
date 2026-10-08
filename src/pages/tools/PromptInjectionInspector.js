import { useState } from "react";
import FantasyButton from "../../components/fantasy/FantasyButton";
import { Link } from "../../router";
import { Field, LabButton, OutputHeading } from "./labKit";
import { MAX_INPUT, RISK_LEVELS, RULE_LABELS, SAMPLES, inspectPrompt } from "./inspectPrompt";

const ID = "pv-pii";
const EMPTY = "Paste some text to inspect first.";

export default function PromptInjectionInspector() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [notice, setNotice] = useState("");

  const inspect = (value = text) => {
    if (!value.trim()) {
      setResult(null);
      setNotice(EMPTY);
      return;
    }
    const next = inspectPrompt(value);
    setResult(next);
    setNotice(`Inspection complete. Risk: ${RISK_LEVELS[next.risk].label}. ${next.signals.length} indicator${next.signals.length === 1 ? "" : "s"} found.`);
  };

  const load = (sample) => {
    setText(SAMPLES[sample]);
    inspect(SAMPLES[sample]);
  };

  const clear = () => {
    setText("");
    setResult(null);
    setNotice("Cleared.");
  };

  return (
    <div className="pv-tool">
      <div className="pv-tool__input">
        <Field id={`${ID}-text`} label="Text to inspect" hint="Paste a prompt, an email, or page content that an AI system might read.">
          {(hintId) => (
            <textarea
              id={`${ID}-text`}
              className="pv-input pv-input--area"
              rows={10}
              maxLength={MAX_INPUT}
              value={text}
              aria-describedby={hintId}
              spellCheck={false}
              onChange={(e) => setText(e.target.value)}
            />
          )}
        </Field>
        <p className="pv-tool__count">
          {text.length.toLocaleString()} / {MAX_INPUT.toLocaleString()} characters
        </p>
        <div className="pv-tool__actions">
          <FantasyButton onClick={() => inspect()} hint="Run the checks" className="pv-tool__primary">
            Inspect
          </FantasyButton>
          <LabButton onClick={() => load("injection")}>Try a suspicious sample</LabButton>
          <LabButton onClick={() => load("benign")}>Try a harmless sample</LabButton>
          <LabButton onClick={clear}>Clear</LabButton>
        </div>
      </div>

      <section className="pv-tool__output pv-output" aria-labelledby={`${ID}-out`}>
        <OutputHeading id={`${ID}-out`}>Inspection result</OutputHeading>
        <p className="pv-visually-hidden" role="status">
          {notice}
        </p>

        {!result && (
          <div className="pv-output__empty">
            {notice === EMPTY && <p className="pv-output__warning">{EMPTY}</p>}
            <p>Results appear here. The inspector looks for these kinds of signal:</p>
            <ul className="pv-output__checklist">
              {RULE_LABELS.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        )}

        {result && (
          <div className="pv-output__result" data-testid="pii-result">
            <p className="pv-risk" data-risk={result.risk}>
              <span className="pv-risk__label">Risk:</span> <strong>{RISK_LEVELS[result.risk].label}</strong>
            </p>
            <p className="pv-output__summary">{RISK_LEVELS[result.risk].summary}</p>

            {result.signals.length > 0 && (
              <>
                <h4 className="pv-output__subheading">Indicators detected</h4>
                <ul className="pv-signals">
                  {result.signals.map((signal) => (
                    <li key={signal.id} className="pv-signal" data-signal={signal.id}>
                      <p className="pv-signal__title">
                        <span className="pv-signal__name">{signal.label}</span>
                        <span className="pv-signal__strength" data-strength={signal.weight}>
                          {signal.strength} indicator
                        </span>
                      </p>
                      <p className="pv-signal__why">{signal.why}</p>
                      <p className="pv-signal__evidence">
                        <span>Matched{signal.count > signal.evidence.length ? ` (${signal.count} times)` : ""}: </span>
                        {signal.evidence.map((e) => (
                          <code key={e} className="pv-code-chip">
                            {e}
                          </code>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>

                <h4 className="pv-output__subheading">Where it was found</h4>
                <pre className="pv-output__preview" tabIndex={0} aria-label="Inspected text with flagged passages marked">
                  {result.segments.map((part, n) => (part.flagged ? <mark key={n}>{part.text}</mark> : <span key={n}>{part.text}</span>))}
                </pre>
              </>
            )}
          </div>
        )}

        <p className="pv-output__footnote">
          A lightweight, rule-based check that runs in your browser. It is not Remora's detection engine and it cannot catch every injection. For hidden payloads in live web pages, see{" "}
          <Link to="/projects/remora">the Remora artifact</Link>.
        </p>
      </section>
    </div>
  );
}
