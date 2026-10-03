// Mirrors the breakpoints used in index.css and tailwind.config.js.
export const BREAKPOINTS = {
  mobileMax: 767.98,
  tabletMax: 1023.98,
  laptopMax: 1279.98,
};

export const MEDIA = {
  mobile: `(max-width: ${BREAKPOINTS.mobileMax}px)`,
  tablet: `(min-width: ${BREAKPOINTS.mobileMax + 0.02}px) and (max-width: ${BREAKPOINTS.tabletMax}px)`,
  reducedMotion: "(prefers-reduced-motion: reduce)",
};
