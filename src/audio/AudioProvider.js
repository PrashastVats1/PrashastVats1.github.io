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

/**
 * Ambient playback states:
 * unavailable      - no ambient file is published, so there is nothing to play
 * off              - not playing, by the visitor's choice
 * loading          - requested, buffering
 * playing          - audible
 * autoplay-blocked - the browser refused autoplay on entry; the visitor's first interaction or one press plays
 * blocked          - the browser refused a requested play; pressing again retries
 * error            - the file failed to load or decode; pressing again retries
 */
export const AMBIENT_STATES = ["unavailable", "off", "loading", "playing", "autoplay-blocked", "blocked", "error"];

const AudioContext = createContext(null);

/**
 * Lives above the router so route changes never reset it. The ambience is
 * tried once when the portfolio opens. Browsers refuse audible playback until
 * the visitor has interacted with the page, so if that attempt is refused it
 * is tried once more on the visitor's first click or key press anywhere
 * outside the sound control, and the control invites a press meanwhile.
 * Route changes never re-attempt, so a visitor's Stop holds for the rest of
 * the visit, and Stop silences every channel. Nothing is stored between visits.
 */
export function AudioProvider({ children }) {
  const ambientSrc = hasAsset(AUDIO.ambient) ? assetUrl(AUDIO.ambient) : null;
  const [ambient, setAmbient] = useState(ambientSrc ? "off" : "unavailable");
  const ambientRef = useRef(null);
  const wantedRef = useRef(false);
  const gestureTriedRef = useRef(false);

  const discard = useCallback(() => {
    const el = ambientRef.current;
    ambientRef.current = null;
    if (!el) return;
    el.onplaying = el.onwaiting = el.onerror = el.onpause = null;
    el.pause();
    el.removeAttribute("src");
  }, []);

  const createAmbient = useCallback(() => {
    const el = new Audio();
    el.preload = "auto";
    el.loop = true;
    el.volume = AMBIENT_VOLUME;
    el.onplaying = () => wantedRef.current && setAmbient("playing");
    el.onwaiting = () => wantedRef.current && setAmbient("loading");
    el.onpause = () => {
      if (!el.ended && wantedRef.current && ambientRef.current === el) {
        wantedRef.current = false;
        setAmbient("off");
      }
    };
    el.onerror = () => {
      if (ambientRef.current !== el) return;
      wantedRef.current = false;
      discard();
      setAmbient("error");
    };
    el.src = ambientSrc;
    return el;
  }, [ambientSrc, discard]);

  const play = useCallback((auto = false) => {
    if (!ambientSrc) return;
    wantedRef.current = true;
    if (!ambientRef.current) ambientRef.current = createAmbient();
    const el = ambientRef.current;
    setAmbient("loading");
    let attempt;
    try {
      attempt = el.play();
    } catch (err) {
      attempt = Promise.reject(err);
    }
    Promise.resolve(attempt).then(
      () => {
        if (wantedRef.current && ambientRef.current === el) setAmbient("playing");
      },
      (err) => {
        if (ambientRef.current !== el || !wantedRef.current) return;
        wantedRef.current = false;
        if (err && err.name === "NotAllowedError") {
          setAmbient(auto ? "autoplay-blocked" : "blocked");
        } else {
          discard();
          setAmbient("error");
        }
      }
    );
  }, [ambientSrc, createAmbient, discard]);

  const stop = useCallback(() => {
    wantedRef.current = false;
    if (ambientRef.current) ambientRef.current.pause();
    setAmbient(ambientSrc ? "off" : "unavailable");
  }, [ambientSrc]);

  // The single autoplay attempt: this provider mounts once per page load.
  useEffect(() => {
    play(true);
  }, [play]);

  // After a refused autoplay: one further attempt on the first interaction.
  // Gestures on the sound control are left to its own toggle, and Escape does
  // not count as user activation in browsers.
  useEffect(() => {
    if (ambient !== "autoplay-blocked" || gestureTriedRef.current) return undefined;
    const onGesture = (event) => {
      if (event.type === "keydown" && event.key === "Escape") return;
      if (event.target instanceof Element && event.target.closest("[data-ambient-control]")) return;
      gestureTriedRef.current = true;
      remove();
      play(true);
    };
    const remove = () => {
      document.removeEventListener("click", onGesture, true);
      document.removeEventListener("keydown", onGesture, true);
    };
    document.addEventListener("click", onGesture, true);
    document.addEventListener("keydown", onGesture, true);
    return remove;
  }, [ambient, play]);

  const enabled = ambient === "loading" || ambient === "playing";
  const toggle = useCallback(() => (enabled ? stop() : play()), [enabled, play, stop]);

  const playEffect = useCallback(
    (channel, name) => {
      const file = EFFECTS[channel] && EFFECTS[channel][name];
      if (!enabled || !file || !hasAsset(file)) return;
      const el = new Audio(assetUrl(file));
      el.volume = EFFECT_VOLUME;
      Promise.resolve(el.play()).catch(() => {});
    },
    [enabled]
  );

  useEffect(() => () => {
    wantedRef.current = false;
    discard();
  }, [discard]);

  const value = useMemo(
    () => ({ ambient, enabled, ambientAvailable: Boolean(ambientSrc), play, stop, toggle, playEffect }),
    [ambient, enabled, ambientSrc, play, stop, toggle, playEffect]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
