import { useEffect, useRef, useState } from "react";

/** A labelled control with an optional hint wired up through aria-describedby. */
export function Field({ id, label, hint, optional = false, children, className = "" }) {
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={`pv-field ${className}`.trim()}>
      <label className="pv-field__label" htmlFor={id}>
        {label}
        {optional && <span className="pv-field__optional"> (optional)</span>}
      </label>
      {hint && (
        <p id={hintId} className="pv-field__hint">
          {hint}
        </p>
      )}
      {children(hintId)}
    </div>
  );
}

/** Compact secondary action used across the workbench. */
export function LabButton({ children, className = "", ...rest }) {
  return (
    <button type="button" className={`pv-button pv-button--secondary pv-lab-button ${className}`.trim()} {...rest}>
      <span className="pv-button__label">{children}</span>
    </button>
  );
}

async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Falls through to the selection-based copy below.
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

/** Copies text and reports the outcome in words, both visibly and to screen readers. */
export function CopyButton({ text, label = "Copy", className = "" }) {
  const [state, setState] = useState("idle");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    const ok = await copyText(text);
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2500);
  };

  return (
    <span className="pv-copy">
      <LabButton onClick={copy} disabled={!text} className={className}>
        {state === "copied" ? "Copied" : label}
      </LabButton>
      <span className={state === "failed" ? "pv-copy__status" : "pv-visually-hidden"} role="status">
        {state === "failed" ? "Copy failed. Select the text and copy it manually." : state === "copied" ? "Copied to the clipboard." : ""}
      </span>
    </span>
  );
}

/** A small engraved section label inside the workbench output. */
export function OutputHeading({ id, children }) {
  return (
    <h3 id={id} className="pv-output__heading">
      {children}
    </h3>
  );
}
