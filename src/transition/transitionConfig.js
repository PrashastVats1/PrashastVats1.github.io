// Navigation count is per browser session, so a returning visitor in a new
// session sees the full transition again.
export const FULL_TRANSITION_COUNT = 2;
const STORAGE_KEY = "pv:transitionCount";

// cover: overlay grows over the page. hold: route swaps underneath.
// reveal: overlay clears to show the destination.
export const TRANSITION_TIMINGS = {
  full:    { cover: 450, hold: 350, reveal: 450 },
  short:   { cover: 150, hold: 0,   reveal: 150 },
  reduced: { cover: 100, hold: 0,   reveal: 150 },
};

export function chooseTransitionMode(navigationCount, prefersReducedMotion) {
  if (prefersReducedMotion) return "reduced";
  return navigationCount < FULL_TRANSITION_COUNT ? "full" : "short";
}

export function readTransitionCount() {
  try {
    return Number(window.sessionStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function incrementTransitionCount() {
  const next = readTransitionCount() + 1;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // Storage can be unavailable (private mode); transitions just stay "full".
  }
  return next;
}
