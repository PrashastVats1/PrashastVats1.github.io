import "@testing-library/jest-dom";

// jsdom lacks matchMedia and scrollTo. Tests can set:
//   window.__viewportWidth = 375      to emulate a viewport width (default 1280)
//   window.__reducedMotion = true     to emulate prefers-reduced-motion
function evaluateMediaQuery(query) {
  if (query.includes("prefers-reduced-motion")) return Boolean(window.__reducedMotion);
  const width = window.__viewportWidth;
  const conditions = [...query.matchAll(/\((min|max)-width:\s*([\d.]+)px\)/g)];
  if (!conditions.length) return false;
  return conditions.every(([, kind, px]) => (kind === "min" ? width >= Number(px) : width <= Number(px)));
}

beforeEach(() => {
  window.__reducedMotion = false;
  window.__viewportWidth = 1280;
  window.matchMedia = (query) => ({
    matches: evaluateMediaQuery(query),
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
