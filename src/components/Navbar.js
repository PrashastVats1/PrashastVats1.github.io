import React, { useState, useEffect } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate, useLocation } from "../router";
import config from "../config";

const LINKS = [
  {label:"About",id:"about"},{label:"Projects",id:"projects"},
  {label:"Skills",id:"skills"},{label:"Experience",id:"experience"},
  {label:"Education",id:"education"},{label:"Contact",id:"contact"},
];

function SunIcon(){return(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>);}
function MoonIcon(){return(<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>);}
function CloseIcon(){return(<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);}

export default function Navbar(){
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const path = useLocation();
  const isBlog = path.startsWith("/blog");
  const isTools = path.startsWith("/tools");
  const isAway = isBlog || isTools;

  // Close menu whenever route changes
  useEffect(() => { setMenuOpen(false); }, [path]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ESC key closes menu
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navBg = scrolled
    ? (theme === "dark" ? "rgba(7,7,15,0.92)" : "rgba(245,246,250,0.95)")
    : "transparent";

  const handleSection = (id) => {
    setMenuOpen(false);
    if (isAway) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 350);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar bar — always on top */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: scrolled ? "0.6rem 0" : "1rem 0",
        background: navBg,
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-mono font-bold transition-opacity hover:opacity-75 shrink-0"
                style={{ fontSize: "0.9rem", color: "var(--text)" }}>
            <span style={{ color: "var(--accent)" }}>&lt;</span>PV<span style={{ color: "var(--accent)" }}>/&gt;</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-4 xl:gap-5">
            {LINKS.map(({ label, id }) => {
              const isActive = !isAway && active === id;
              return (
                <li key={id}>
                  <button onClick={() => handleSection(id)}
                          className="relative font-mono pb-0.5 transition-colors duration-200 bg-transparent border-0 p-0"
                          style={{ fontSize: "0.63rem", letterSpacing: "0.13em", textTransform: "uppercase",
                                   color: isActive ? "var(--accent)" : "var(--muted)" }}>
                    {label}
                    <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
                                   background: "var(--accent)", transform: isActive ? "scaleX(1)" : "scaleX(0)",
                                   transformOrigin: "left", transition: "transform 0.3s ease" }} />
                  </button>
                </li>
              );
            })}
            <li>
              <Link to="/blog" className="relative font-mono pb-0.5 transition-colors duration-200"
                    style={{ fontSize: "0.63rem", letterSpacing: "0.13em", textTransform: "uppercase",
                             color: isBlog ? "var(--accent)" : "var(--muted)" }}>
                Blog
                <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
                               background: "var(--accent)", transform: isBlog ? "scaleX(1)" : "scaleX(0)",
                               transformOrigin: "left", transition: "transform 0.3s ease" }} />
              </Link>
            </li>
            <li>
              <Link to="/tools" className="relative font-mono pb-0.5 transition-colors duration-200"
                    style={{ fontSize: "0.63rem", letterSpacing: "0.13em", textTransform: "uppercase",
                             color: isTools ? "var(--accent)" : "var(--muted)" }}>
                Tools
                <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
                               background: "var(--accent)", transform: isTools ? "scaleX(1)" : "scaleX(0)",
                               transformOrigin: "left", transition: "transform 0.3s ease" }} />
              </Link>
            </li>
            <li>
              <button onClick={toggle}
                      style={{ width: "30px", height: "30px", border: "1px solid var(--border)", borderRadius: "7px",
                               background: "var(--surface)", color: "var(--muted)", display: "flex",
                               alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}>
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </li>
            <li>
              <a href={config.resumeFile} download="Prashast_Vats_Resume.pdf" className="font-mono transition-all duration-200"
                 style={{ fontSize: "0.63rem", letterSpacing: "0.13em", textTransform: "uppercase",
                          padding: "0.4rem 0.85rem", border: "1px solid var(--accent)", color: "var(--accent)", borderRadius: "6px" }}
                 onMouseOver={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; }}
                 onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; }}>
                Resume ↓
              </a>
            </li>
          </ul>

          {/* Mobile right: theme + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={toggle} style={{ color: "var(--muted)", padding: "4px", lineHeight: 0 }}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"}
                    style={{ padding: "6px", lineHeight: 0, color: "var(--text)", background: "transparent", border: "none" }}>
              {menuOpen ? <CloseIcon /> : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay — separate from nav so it sits below the nav bar */}
      {menuOpen && (
        <div
          className="lg:hidden"
          style={{
            position: "fixed", inset: 0,
            zIndex: 99, // below nav (100) so nav bar stays visible with close button
            background: theme === "dark" ? "rgba(7,7,15,0.98)" : "rgba(245,246,250,0.98)",
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            paddingTop: "5rem", // clear the nav bar
            overflowY: "auto",
            animation: "fadeUp 0.2s ease both",
          }}
          // Click backdrop (outside links) also closes
          onClick={e => { if (e.target === e.currentTarget) setMenuOpen(false); }}
        >
          {/* Explicit close button at top right */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: "absolute", top: "1.1rem", right: "1.25rem",
              color: "var(--muted)", background: "transparent", border: "none",
              padding: "6px", lineHeight: 0,
            }}>
            <CloseIcon />
          </button>

          {LINKS.map(({ label, id }) => (
            <button key={id} onClick={() => handleSection(id)}
                    className="font-mono bg-transparent border-0 transition-colors"
                    style={{ fontSize: "1.05rem", letterSpacing: "0.14em", textTransform: "uppercase",
                             color: active === id && !isAway ? "var(--accent)" : "var(--muted)",
                             padding: "0.35rem 0" }}>
              {label}
            </button>
          ))}

          <Link to="/blog" onClick={() => setMenuOpen(false)} className="font-mono transition-colors"
                style={{ fontSize: "1.05rem", letterSpacing: "0.14em", textTransform: "uppercase",
                         color: isBlog ? "var(--accent)" : "var(--muted)", padding: "0.35rem 0" }}>
            Blog
          </Link>

          <Link to="/tools" onClick={() => setMenuOpen(false)} className="font-mono transition-colors"
                style={{ fontSize: "1.05rem", letterSpacing: "0.14em", textTransform: "uppercase",
                         color: isTools ? "var(--accent)" : "var(--muted)", padding: "0.35rem 0" }}>
            Tools
          </Link>

          <a href={config.resumeFile} download="Prashast_Vats_Resume.pdf"
             onClick={() => setMenuOpen(false)}
             style={{ marginTop: "0.5rem", border: "1px solid var(--accent)", color: "var(--accent)",
                      borderRadius: "8px", padding: "0.75rem 2.5rem",
                      fontFamily: "'Space Mono',monospace", fontSize: "0.85rem" }}>
            Resume ↓
          </a>
        </div>
      )}
    </>
  );
}
