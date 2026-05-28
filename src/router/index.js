import { useState, useEffect, createContext, useContext } from "react";
const RouterContext = createContext({ path: "/", navigate: () => {} });
export function Router({ children }) {
  const getPath = () => { const h = window.location.hash.replace("#","") || "/"; return h.startsWith("/") ? h : "/"+h; };
  const [path, setPath] = useState(getPath);
  useEffect(() => {
    const onHash = () => setPath(getPath());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.hash = "#/";
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (to) => { window.location.hash = "#"+to; window.scrollTo({ top:0, behavior:"smooth" }); };
  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}
export function Route({ path: rp, children }) {
  const { path } = useContext(RouterContext);
  if (rp === "/" && path === "/") return children;
  if (rp !== "/" && path.startsWith(rp)) return children;
  return null;
}
export function useNavigate() { return useContext(RouterContext).navigate; }
export function useLocation() { return useContext(RouterContext).path; }
export function Link({ to, children, className, style, onClick }) {
  const { navigate } = useContext(RouterContext);
  return <a href={"#"+to} className={className} style={style} onClick={e => { e.preventDefault(); navigate(to); if(onClick) onClick(e); }}>{children}</a>;
}
