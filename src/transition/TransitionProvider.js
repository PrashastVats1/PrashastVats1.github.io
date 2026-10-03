import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { NavigationProvider, normalizePath, useLocation, useRawNavigate } from "../router";
import { useAudio } from "../audio/AudioProvider";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import {
  TRANSITION_TIMINGS,
  chooseTransitionMode,
  incrementTransitionCount,
  readTransitionCount,
} from "./transitionConfig";
import TransitionOverlay from "./TransitionOverlay";

const TransitionContext = createContext(null);
const IDLE = { phase: "idle", mode: null };

function clearTimers(timers) {
  timers.current.forEach(clearTimeout);
  timers.current = [];
}

function schedule(timers, ms, fn) {
  timers.current.push(setTimeout(fn, ms));
}

/**
 * Intercepts in-app navigation and plays a cover -> hold -> reveal sequence.
 * The route changes at the start of "hold", while the overlay fully covers
 * the page. Clicking the overlay or pressing Escape skips straight to the end.
 */
export function TransitionProvider({ children }) {
  const rawNavigate = useRawNavigate();
  const path = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { playEffect } = useAudio();
  const [state, setState] = useState(IDLE);
  const timers = useRef([]);
  const pendingTarget = useRef(null);

  const commit = useCallback(() => {
    if (pendingTarget.current === null) return;
    rawNavigate(pendingTarget.current);
    pendingTarget.current = null;
  }, [rawNavigate]);

  const skip = useCallback(() => {
    clearTimers(timers);
    commit();
    setState(IDLE);
  }, [commit]);

  const navigate = useCallback(
    (to) => {
      const target = normalizePath(to);
      if (target === path && pendingTarget.current === null) return;

      clearTimers(timers);
      const mode = chooseTransitionMode(readTransitionCount(), prefersReducedMotion);
      incrementTransitionCount();
      const t = TRANSITION_TIMINGS[mode];
      pendingTarget.current = target;

      setState({ phase: "cover", mode });
      playEffect(mode === "full" ? "spell" : "navigation", mode === "full" ? "cast" : "turn");

      schedule(timers, t.cover, () => {
        commit();
        setState({ phase: "hold", mode });
        schedule(timers, t.hold, () => {
          setState({ phase: "reveal", mode });
          schedule(timers, t.reveal, () => setState(IDLE));
        });
      });
    },
    [path, prefersReducedMotion, playEffect, commit]
  );

  useEffect(() => {
    if (state.phase === "idle") return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.phase, skip]);

  useEffect(() => () => clearTimers(timers), []);

  const value = useMemo(
    () => ({ navigate, skip, phase: state.phase, mode: state.mode, isTransitioning: state.phase !== "idle" }),
    [navigate, skip, state]
  );

  return (
    <TransitionContext.Provider value={value}>
      <NavigationProvider value={navigate}>
        {children}
        <TransitionOverlay phase={state.phase} mode={state.mode} onSkip={skip} />
      </NavigationProvider>
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used inside <TransitionProvider>");
  return ctx;
}
