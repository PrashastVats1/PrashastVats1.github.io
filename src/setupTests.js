import "@testing-library/jest-dom";

// jsdom lacks matchMedia and scrollTo. Tests can set
// window.__reducedMotion = true to emulate prefers-reduced-motion.
beforeEach(() => {
  window.__reducedMotion = false;
  window.matchMedia = (query) => ({
    matches: query.includes("prefers-reduced-motion") ? Boolean(window.__reducedMotion) : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  });
  window.scrollTo = () => {};
  window.sessionStorage.clear();
  window.history.replaceState(null, "", "/");
});
