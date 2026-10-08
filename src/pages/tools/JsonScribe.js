import { useRef, useState } from "react";
import FantasyButton from "../../components/fantasy/FantasyButton";
import { CopyButton, Field, LabButton, OutputHeading } from "./labKit";
import { SAMPLE_SCROLL, transformJson } from "./jsonScroll";

const ID = "pv-json";
const INDENTS = { 2: "2 spaces", 4: "4 spaces", tab: "Tabs" };
const VERB = { format: "Formatted", minify: "Minified", validate: "Validated" };

export default function JsonScribe() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState("2");
  const [result, setResult] = useState(null);
  const [notice, setNotice] = useState("");
  const inputRef = useRef(null);

  const transcribe = (mode, source = input) => {
    const next = { ...transformJson(source, mode, indent === "tab" ? "\t" : Number(indent)), mode, inputLength: source.length };
    setResult(next);
    if (next.empty) setNotice("Paste some JSON first.");
    else if (next.ok) setNotice(`${VERB[mode]}. Valid JSON: ${next.summary}.`);
    else setNotice(`The JSON could not be parsed. ${next.reason} Line ${next.line}, column ${next.column}.`);
  };

  const loadSample = () => {
    setInput(SAMPLE_SCROLL);
    transcribe("format", SAMPLE_SCROLL);
  };

  const clear = () => {
    setInput("");
    setResult(null);
    setNotice("Cleared.");
  };

  const output = result && result.ok ? result.output : null;

  return (
    <div className="pv-tool">
      <div className="pv-tool__input">
        <Field id={`${ID}-input`} label="JSON" hint="Paste the tangled scroll: any JSON object, array, or value.">
          {(hintId) => (
            <textarea
              id={`${ID}-input`}
              ref={inputRef}
              className="pv-input pv-input--area pv-input--code"
              rows={12}
              value={input}
              aria-describedby={hintId}
              spellCheck={false}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
        </Field>
        <Field id={`${ID}-indent`} label="Indentation" className="pv-field--inline">
          {() => (
            <select id={`${ID}-indent`} className="pv-input pv-input--select" value={indent} onChange={(e) => setIndent(e.target.value)}>
              {Object.entries(INDENTS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          )}
        </Field>
        <div className="pv-tool__actions">
          <FantasyButton onClick={() => transcribe("format")} hint="Pretty-print" className="pv-tool__primary">
            Format
          </FantasyButton>
          <LabButton onClick={() => transcribe("minify")}>Minify</LabButton>
          <LabButton onClick={() => transcribe("validate")}>Validate</LabButton>
          <LabButton onClick={loadSample}>Load a sample</LabButton>
          <LabButton onClick={clear}>Clear</LabButton>
        </div>
      </div>

      <section className="pv-tool__output pv-output" aria-labelledby={`${ID}-out`}>
        <OutputHeading id={`${ID}-out`}>Result</OutputHeading>
        <p className="pv-visually-hidden" role="status">
          {notice}
        </p>

        {!result && <p className="pv-output__empty">Format, minify, or validate your JSON. Errors are pointed out by line and column.</p>}
        {result && result.empty && <p className="pv-output__warning">Paste some JSON first.</p>}

        {result && result.ok === false && !result.empty && (
          <div className="pv-output__error" role="alert">
            <p className="pv-output__error-title">The scroll could not be parsed</p>
            <p>{result.reason}</p>
            <p className="pv-output__where">
              Line {result.line}, column {result.column}
            </p>
            <pre className="pv-output__snippet" aria-hidden="true">
              {result.lineText.slice(0, 160)}
              {"\n"}
              {`${" ".repeat(Math.max(0, Math.min(result.column - 1, 160)))}^`}
            </pre>
            <p className="pv-output__technical">
              Browser message: <code>{result.technical}</code>
            </p>
            <LabButton onClick={() => inputRef.current && inputRef.current.focus()}>Try again</LabButton>
          </div>
        )}

        {result && result.ok && (
          <div className="pv-output__result" data-testid="json-result">
            <p className="pv-verdict" data-verdict="match">
              <strong>Valid JSON</strong>
              <span>: {result.summary}.</span>
            </p>
            {output !== null && (
              <>
                <label className="pv-field__label" htmlFor={`${ID}-output`}>
                  {VERB[result.mode]} JSON
                </label>
                <textarea id={`${ID}-output`} className="pv-input pv-input--area pv-input--code pv-input--readonly" rows={12} value={output} readOnly spellCheck={false} />
                <p className="pv-tool__count">
                  {result.inputLength.toLocaleString()} characters in, {output.length.toLocaleString()} characters out
                </p>
              </>
            )}
          </div>
        )}

        <div className="pv-tool__actions pv-tool__actions--output">
          <CopyButton text={output || ""} label="Copy result" />
        </div>

        <p className="pv-output__footnote">Parsing happens in your browser with JSON.parse. Your JSON is never uploaded.</p>
      </section>
    </div>
  );
}
