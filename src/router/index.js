import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Hash routing keeps direct links and refreshes working on GitHub Pages,
// which has no server-side fallback to index.html.
export const DEFAULT_PATH = "/home";

export function normalizePath(raw) {
  let p = (raw || "").replace(/^#/, "");
  if (!p.startsWith("/")) p = "/" + p;
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p;
}

function readPath() {
  const p = normalizePath(window.location.hash);
  return p === "/" ? DEFAULT_PATH : p;
}

export function matchPath(pattern, path) {
  return path === pattern || path.startsWith(pattern + "/");
}

const RouterContext = createContext({ path: DEFAULT_PATH, navigate: () => {} });
const NavigationContext = createContext(null);

export const NavigationProvider = NavigationContext.Provider;

export function Router({ children }) {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const sync = () => {
      const p = readPath();
      if (normalizePath(window.location.hash) !== p) window.history.replaceState(null, "", "#" + p);
      setPath(p);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const navigate = useCallback((to) => {
    const target = normalizePath(to);
    if (normalizePath(window.location.hash) !== target) window.location.hash = "#" + target;
    setPath(target);
    window.scrollTo(0, 0);
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useLocation() {
  return useContext(RouterContext).path;
}

/** Navigates immediately, bypassing any page transition. */
export function useRawNavigate() {
  return useContext(RouterContext).navigate;
}

/** Navigates through the page transition system when one is mounted. */
export function useNavigate() {
  const intercepted = useContext(NavigationContext);
  const raw = useContext(RouterContext).navigate;
  return intercepted || raw;
}

export function Link({ to, children, onClick, ...rest }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={"#" + to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
