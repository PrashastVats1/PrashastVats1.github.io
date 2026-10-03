import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AUDIO, assetUrl, hasAsset } from "../assets/manifest";

export const AUDIO_CHANNELS = ["ambient", "navigation", "spell", "artifact"];

// Effect files are registered here as they are added to public/assets/audio/,
// e.g. spell: { cast: "assets/audio/spell-cast.mp3" }.
const EFFECTS = {
  navigation: {},
  spell: {},
  artifact: {},
};

const AMBIENT_VOLUME = 0.35;
const EFFECT_VOLUME = 0.5;

const AudioContext = createContext(null);

/**
 * Lives above the router so route changes never reset it. Sound is opt-in:
 * nothing plays until the visitor presses Play, and Stop silences every channel.
 */
export function AudioProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const ambientRef = useRef(null);
  const ambientSrc = hasAsset(AUDIO.ambient) ? assetUrl(AUDIO.ambient) : null;

  const play = useCallback(() => {
    setEnabled(true);
    if (!ambientSrc) return;
    if (!ambientRef.current) {
      const el = new Audio(ambientSrc);
      el.loop = true;
      el.volume = AMBIENT_VOLUME;
      ambientRef.current = el;
    }
    ambientRef.current.play().catch(() => setEnabled(false));
  }, [ambientSrc]);

  const stop = useCallback(() => {
    setEnabled(false);
    if (ambientRef.current) ambientRef.current.pause();
  }, []);

  const toggle = useCallback(() => (enabled ? stop() : play()), [enabled, play, stop]);

  const playEffect = useCallback(
    (channel, name) => {
      const file = EFFECTS[channel] && EFFECTS[channel][name];
      if (!enabled || !file || !hasAsset(file)) return;
      const el = new Audio(assetUrl(file));
      el.volume = EFFECT_VOLUME;
      el.play().catch(() => {});
    },
    [enabled]
  );

  useEffect(() => () => ambientRef.current && ambientRef.current.pause(), []);

  const value = useMemo(
    () => ({ enabled, ambientAvailable: Boolean(ambientSrc), play, stop, toggle, playEffect }),
    [enabled, ambientSrc, play, stop, toggle, playEffect]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
