import { useEffect, useState } from "react";
import { MEDIA } from "../theme/breakpoints";

function query(q) {
  return typeof window !== "undefined" && window.matchMedia ? window.matchMedia(q) : null;
}

export function useMediaQuery(q) {
  const [matches, setMatches] = useState(() => Boolean(query(q)?.matches));

  useEffect(() => {
    const mql = query(q);
    if (!mql) return undefined;
    const onChange = () => setMatches(mql.matches);
    onChange();
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [q]);

  return matches;
}

/** True below ~768px, where the spellbook shows one page at a time. */
export const useIsMobile = () => useMediaQuery(MEDIA.mobile);
export const usePrefersReducedMotion = () => useMediaQuery(MEDIA.reducedMotion);
