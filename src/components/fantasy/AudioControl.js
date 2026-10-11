import { useAudio } from "../../audio/AudioProvider";

const STATUS = {
  unavailable: "Soundscape unavailable",
  off: "Sound is off",
  loading: "Loading ambience…",
  playing: "Ambience playing",
  "autoplay-blocked": "Press to play the music",
  blocked: "Browser blocked playback. Press to try again",
  error: "Ambience could not load. Press to try again",
};

// Only changes worth interrupting for are announced; the button's own label covers the rest.
const ANNOUNCE = {
  playing: "Ambience playing",
  "autoplay-blocked": "Ambient music is available. Use the Play ambience button to turn it on.",
  blocked: "The browser blocked the ambience.",
  error: "The ambience could not be loaded.",
};

export default function AudioControl() {
  const { ambient, enabled, ambientAvailable, toggle } = useAudio();

  return (
    <div className="pv-audio" role="region" aria-label="Sound" data-ambient-control>
      <button
        type="button"
        className="pv-audio__button"
        aria-pressed={enabled}
        aria-busy={ambient === "loading" || undefined}
        disabled={!ambientAvailable}
        data-state={ambient}
        onClick={toggle}
      >
        <svg className="pv-audio__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 9h4l5-4v14l-5-4H4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          {enabled ? (
            <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <path d="M17 9.5l5 5M22 9.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          )}
        </svg>
        <span className="pv-audio__text">
          <span className="pv-audio__label">{enabled ? "Stop ambience" : "Play ambience"}</span>
          <span className="pv-audio__status">{STATUS[ambient]}</span>
        </span>
      </button>
      <span className="pv-visually-hidden" role="status" aria-live="polite">
        {ANNOUNCE[ambient] || ""}
      </span>
    </div>
  );
}
