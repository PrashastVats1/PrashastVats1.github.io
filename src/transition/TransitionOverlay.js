import { TRANSITION_TIMINGS } from "./transitionConfig";

// Temporary visuals. A later phase replaces FullTransition with the
// avatar spell-cast / explosion sequence; the provider does not change.
function FullTransition() {
  return (
    <>
      <svg className="pv-transition__sigil" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="1.5 10.5" opacity="0.8" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" />
        <path d="M60 22 Q64 56 98 60 Q64 64 60 98 Q56 64 22 60 Q56 56 60 22 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="60" cy="60" r="4" fill="currentColor" />
      </svg>
      <span className="pv-transition__hint">Click anywhere or press Escape to skip</span>
    </>
  );
}

function ShortTransition() {
  return null;
}

function ReducedTransition() {
  return null;
}

const RENDERERS = {
  full: FullTransition,
  short: ShortTransition,
  reduced: ReducedTransition,
};

export default function TransitionOverlay({ phase, mode, onSkip }) {
  if (phase === "idle" || !mode) return null;
  const Renderer = RENDERERS[mode];
  const t = TRANSITION_TIMINGS[mode];

  return (
    <button
      type="button"
      className="pv-transition"
      data-phase={phase}
      data-mode={mode}
      data-testid="page-transition"
      aria-label="Skip page transition"
      onClick={onSkip}
      style={{ "--pv-cover-ms": `${t.cover}ms`, "--pv-reveal-ms": `${t.reveal}ms` }}
    >
      <Renderer />
    </button>
  );
}
