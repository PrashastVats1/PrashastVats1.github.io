import React from "react";
import config from "../config";
import { Link } from "../router";
export default function Footer() {
  return (
    <footer className="py-6 sm:py-8" style={{background:"var(--bg2)",borderTop:"1px solid var(--border)"}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-mono font-bold transition-opacity hover:opacity-75" style={{fontSize:"0.85rem",color:"var(--muted)"}}>
          <span style={{color:"var(--accent)"}}>&lt;</span>PV<span style={{color:"var(--accent)"}}>/&gt;</span>
        </Link>
        <p className="font-mono text-[0.62rem] text-center" style={{color:"var(--dim)"}}>© {new Date().getFullYear()} {config.name} · Built with React & Tailwind</p>
        <div className="flex gap-4 sm:gap-5">
          {[{label:"GitHub",href:config.github},{label:"Email",href:`mailto:${config.email}`},{label:"Blog",href:"#/blog",internal:true},{label:"Tools",href:"#/tools",internal:true}].map(l=>(
            <a key={l.label} href={l.internal?l.href:l.href} target={l.href&&l.href.startsWith("http")?"_blank":undefined} rel="noreferrer"
               className="font-mono text-[0.62rem] uppercase tracking-widest transition-colors" style={{color:"var(--dim)"}}
               onMouseOver={e=>e.currentTarget.style.color="var(--accent)"} onMouseOut={e=>e.currentTarget.style.color="var(--dim)"}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}