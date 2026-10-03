import { useAudio } from "../../audio/AudioProvider";

export default function AudioControl() {
  const { enabled, ambientAvailable, toggle } = useAudio();
  const status = !ambientAvailable ? "Soundscape not yet added" : enabled ? "Ambience playing" : "Sound is off";

  return (
    <div className="pv-audio" role="region" aria-label="Sound">
      <button type="button" className="pv-audio__button" aria-pressed={enabled} onClick={toggle}>
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
          <span className="pv-audio__status">{status}</span>
        </span>
      </button>
    </div>
  );
}
