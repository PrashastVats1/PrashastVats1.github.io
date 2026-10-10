import { useEffect, useRef, useState } from "react";

const canCopy = () => typeof navigator !== "undefined" && !!(navigator.clipboard && navigator.clipboard.writeText);

/** Copies the email address for visitors whose mail links open nothing. Hidden where the Clipboard API is unavailable. */
export default function CopyAddress({ address }) {
  const [status, setStatus] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  if (!canCopy()) return null;

  const copy = () => {
    navigator.clipboard.writeText(address).then(
      () => setStatus("Email address copied."),
      () => setStatus("Could not copy. Select the address instead.")
    );
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 4000);
  };

  return (
    <>
      <button type="button" className="pv-copy" onClick={copy}>
        Copy address
      </button>
      <span className="pv-copy__status" role="status">
        {status}
      </span>
    </>
  );
}
