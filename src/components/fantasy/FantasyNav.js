import { useEffect, useRef, useState } from "react";
import { Link, matchPath, useLocation } from "../../router";
import { NAV_ITEMS } from "../../navigation";
import config from "../../config";
import Avatar from "./Avatar";
import NavIcon from "./NavIcon";

/**
 * Bookmark-ribbon navigation hanging above the parchment. Below ~768px the
 * ribbons collapse behind a menu toggle.
 */
export default function FantasyNav() {
  const path = useLocation();
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        if (toggleRef.current) toggleRef.current.focus();
      }
    };
    const onPointer = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className="pv-masthead" ref={navRef}>
      <div className="pv-masthead__bar">
        <Link to="/home" className="pv-brand" aria-label={`${config.name}, ${config.title}. Go to home`}>
          <Avatar variant="regular" size="sm" alt="" />
          <span className="pv-brand__text">
            <span className="pv-brand__name">{config.name}</span>
            <span className="pv-brand__title">{config.title}</span>
          </span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="pv-nav-toggle"
          aria-expanded={open}
          aria-controls="pv-nav-list"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      <nav className="pv-nav" aria-label="Main">
        <ul id="pv-nav-list" className={`pv-nav__list${open ? " is-open" : ""}`}>
          {NAV_ITEMS.map((item) => {
            const active = matchPath(item.path, path);
            return (
              <li key={item.id} className="pv-nav__item">
                <Link
                  to={item.path}
                  className={`pv-nav__link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <NavIcon id={item.id} />
                  <span className="pv-nav__text">
                    <span className="pv-nav__label">{item.label}</span>{" "}
                    <span className="pv-nav__plain">{item.plain}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
