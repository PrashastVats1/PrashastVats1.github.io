import { useEffect, useRef, useState } from "react";
import FantasyButton from "../../../components/fantasy/FantasyButton";
import { CopyButton, Field, LabButton, OutputHeading } from "../labKit";
import { AI_ENDPOINTS, AiRequestError, aiApiUrl, describeError, requestAnalysis } from "./aiClient";

/** Plain statement, shown before anything is sent, of where the text goes. */
export function AiDisclosure({ id, className = "" }) {
  return (
    <p id={id} className={`pv-ai-disclosure ${className}`.trim()}>
      <span className="pv-kind-badge" data-kind="ai">
        AI-powered
      </span>{" "}
      When you press the button, the text you entered is sent to this site's AI service and on to OpenAI for analysis. Nothing is
      sent while you type. Do not include passwords, keys, or personal data.
    </p>
  );
}

/**
 * Shared shell for the AI instruments: input with a character limit, one
 * request at a time, cancel, and loading, empty, error, and result states.
 */
export default function AiWorkbench({ id, endpoint, inputLabel, inputHint, code = false, rows = 12, actionLabel, sample, sampleLabel, outputTitle, emptyText, renderResult }) {
  const limit = AI_ENDPOINTS[endpoint].limit;
  const configured = Boolean(aiApiUrl());
  const [input, setInput] = useState("");
  const [view, setView] = useState({ status: "idle" });
  const [notice, setNotice] = useState("");
  const controllerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => () => controllerRef.current && controllerRef.current.abort(), []);

  const loading = view.status === "loading";
  const fail = (code) => {
    const error = describeError(new AiRequestError(code));
    setView({ status: "error", error });
    setNotice(`${error.title}. ${error.message}`);
  };

  const analyse = async () => {
    if (controllerRef.current) return;
    if (!configured) return fail("not_configured");
    if (!input.trim()) {
      setView({ status: "empty" });
      setNotice("Enter some text first.");
      return;
    }
    if (input.length > limit) return fail("input_too_long");

    const controller = new AbortController();
    controllerRef.current = controller;
    setView({ status: "loading" });
    setNotice("Sending your text to the AI service. This can take up to half a minute.");
    try {
      const result = await requestAnalysis(endpoint, input, { signal: controller.signal });
      setView({ status: "success", result });
      setNotice(`${outputTitle} ready.`);
    } catch (err) {
      const error = describeError(err);
      if (error.code === "cancelled") {
        setView({ status: "idle" });
        setNotice("Request cancelled. Nothing more will be received.");
      } else {
        setView({ status: "error", error });
        setNotice(`${error.title}. ${error.message}`);
      }
    } finally {
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  };

  const cancel = () => controllerRef.current && controllerRef.current.abort();

  const clear = () => {
    if (loading) return;
    setInput("");
    setView({ status: "idle" });
    setNotice("Cleared.");
  };

  const loadSample = () => {
    if (loading) return;
    setInput(sample);
    setView({ status: "idle" });
    setNotice("Example loaded. Press the button to send it for analysis.");
  };

  const atLimit = input.length >= limit;

  return (
    <div className="pv-tool pv-tool--ai">
      <div className="pv-tool__input">
        <Field id={`${id}-input`} label={inputLabel} hint={inputHint}>
          {(hintId) => (
            <textarea
              id={`${id}-input`}
              ref={inputRef}
              className={`pv-input pv-input--area${code ? " pv-input--code" : ""}`}
              rows={rows}
              value={input}
              maxLength={limit}
              aria-describedby={`${hintId} ${id}-count ${id}-disclosure`}
              spellCheck={!code}
              readOnly={loading}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
        </Field>
        <p id={`${id}-count`} className="pv-tool__count" data-limit={atLimit ? "reached" : undefined}>
          {input.length.toLocaleString()} of {limit.toLocaleString()} characters
          {input.length > limit
            ? `. ${(input.length - limit).toLocaleString()} over the limit.`
            : atLimit && ". Limit reached: anything longer was not added."}
        </p>
        <AiDisclosure id={`${id}-disclosure`} />
        <div className="pv-tool__actions">
          <FantasyButton onClick={analyse} disabled={loading} aria-describedby={`${id}-disclosure`} hint="Sends text to OpenAI" className="pv-tool__primary">
            {loading ? "Analysing..." : actionLabel}
          </FantasyButton>
          {loading ? (
            <LabButton onClick={cancel}>Cancel request</LabButton>
          ) : (
            <>
              <LabButton onClick={loadSample}>{sampleLabel}</LabButton>
              <LabButton onClick={clear}>Clear</LabButton>
            </>
          )}
        </div>
      </div>

      <section className="pv-tool__output pv-output" aria-labelledby={`${id}-out`} aria-busy={loading}>
        <OutputHeading id={`${id}-out`}>{outputTitle}</OutputHeading>
        <p className="pv-visually-hidden" role="status">
          {notice}
        </p>

        {!configured && view.status !== "error" && (
          <p className="pv-output__warning">
            This copy of the site is not connected to its AI service, so this instrument cannot run here. The four browser instruments still work.
          </p>
        )}
        {configured && view.status === "idle" && <p className="pv-output__empty">{emptyText}</p>}
        {view.status === "empty" && <p className="pv-output__warning">Enter some text first.</p>}

        {loading && (
          <div className="pv-ai-loading">
            <span className="pv-ai-loading__orb" aria-hidden="true" />
            <p>Consulting the AI. This usually takes a few seconds and can take up to half a minute.</p>
          </div>
        )}

        {view.status === "error" && (
          <div className="pv-output__error" role="alert">
            <p className="pv-output__error-title">{view.error.title}</p>
            <p>{view.error.message}</p>
            {view.error.technical && <p className="pv-output__technical">{view.error.technical}</p>}
            {view.error.code !== "not_configured" && <LabButton onClick={() => inputRef.current && inputRef.current.focus()}>Try again</LabButton>}
          </div>
        )}

        {view.status === "success" && (
          <div className="pv-output__result pv-ai-result" data-testid={`${id}-result`}>
            {renderResult(view.result)}
          </div>
        )}

        <p className="pv-output__footnote">
          AI-generated by an OpenAI model. It can be wrong, incomplete, or overconfident, so treat it as a second opinion rather than a verdict.
        </p>
      </section>
    </div>
  );
}

const RATING_SLUG = { Weak: "weak", "Needs work": "needs-work", Good: "good", Strong: "strong" };

/** A rating word plus its explanation. The word is always shown; colour is only decoration. */
export function Assessment({ label, value }) {
  if (!value) return null;
  return (
    <div className="pv-assessment" data-rating={RATING_SLUG[value.rating] || "unknown"}>
      <p className="pv-assessment__head">
        <span className="pv-assessment__label">{label}</span>
        <strong className="pv-assessment__rating">{value.rating}</strong>
      </p>
      <p className="pv-assessment__summary">{value.summary}</p>
    </div>
  );
}

export function Findings({ title, items, empty }) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  return (
    <div className="pv-findings">
      <h4 className="pv-findings__title">{title}</h4>
      {list.length ? (
        <ul className="pv-findings__list">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="pv-findings__none">{empty}</p>
      )}
    </div>
  );
}

export function Revision({ id, label, text, copyLabel, code = false }) {
  return (
    <div className="pv-revision">
      <label className="pv-field__label" htmlFor={id}>
        {label}
      </label>
      <textarea id={id} className={`pv-input pv-input--area pv-input--readonly${code ? " pv-input--code" : ""}`} rows={10} value={text || ""} readOnly />
      <div className="pv-tool__actions pv-tool__actions--output">
        <CopyButton text={text || ""} label={copyLabel} />
      </div>
    </div>
  );
}
