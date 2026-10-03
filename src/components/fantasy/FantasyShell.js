import { useEffect, useRef } from "react";
import { useLocation } from "../../router";
import { documentTitleFor, findNavItem } from "../../navigation";
import config from "../../config";
import FantasyNav from "./FantasyNav";
import ParchmentFrame from "./ParchmentFrame";
import AudioControl from "./AudioControl";

/**
 * Global frame: dark wood/stone environment, ribbon navigation, the parchment
 * content surface, and the persistent audio control. Persists across routes.
 */
export default function FantasyShell({ children }) {
  const path = useLocation();
  const item = findNavItem(path);
  const mainRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    document.title = documentTitleFor(item);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (mainRef.current) mainRef.current.focus({ preventScroll: true });
  }, [path, item]);

  const skipToContent = (e) => {
    e.preventDefault();
    if (mainRef.current) mainRef.current.focus();
  };

  return (
    <div className="pv-world" data-page={item ? item.id : "not-found"}>
      {/* preventDefault: a real #main-content hash would be read as a route. */}
      <a className="pv-skip-link" href="#main-content" onClick={skipToContent}>
        Skip to content
      </a>

      <FantasyNav />

      <main id="main-content" ref={mainRef} tabIndex={-1} className="pv-main">
        <ParchmentFrame key={path}>{children}</ParchmentFrame>
      </main>

      <footer className="pv-footer">
        <p>
          &copy; {new Date().getFullYear()} {config.name}
          <span aria-hidden="true"> &middot; </span>
          <a href={`mailto:${config.email}`}>Email</a>
          <span aria-hidden="true"> &middot; </span>
          <a href={config.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span aria-hidden="true"> &middot; </span>
          <a href={config.github} target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </footer>

      <AudioControl />

      <p className="pv-visually-hidden" aria-live="polite">
        {item ? `${item.label}, ${item.plain}` : "Page not found"}
      </p>
    </div>
  );
}
