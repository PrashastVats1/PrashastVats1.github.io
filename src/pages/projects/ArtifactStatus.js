import { STATUSES } from "./artifacts";

const GLYPHS = {
  published: (
    <>
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="2.6" fill="currentColor" />
    </>
  ),
  "open-source": <path d="M12.6 4.4 A6.2 6.2 0 1 0 13.6 9.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  winner: <path d="M8 1.6 L9.9 5.9 L14.4 6.2 L10.9 9.1 L12 13.6 L8 11.1 L4 13.6 L5.1 9.1 L1.6 6.2 L6.1 5.9 Z" fill="currentColor" />,
  live: (
    <>
      <circle cx="8" cy="8" r="2.8" fill="currentColor" />
      <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    </>
  ),
};

/** A status seal: the glyph is decorative, the text carries the meaning. */
export default function ArtifactStatus({ artifact, className = "" }) {
  const status = STATUSES[artifact.status];
  if (!status) return null;
  return (
    <span className={`pv-status ${className}`.trim()} data-status={artifact.status} title={status.description}>
      <svg className="pv-status__glyph" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        {GLYPHS[artifact.status]}
      </svg>
      <span className="pv-status__label">{status.label}</span>
      {artifact.statusDetail && <span className="pv-status__detail">{artifact.statusDetail}</span>}
    </span>
  );
}
