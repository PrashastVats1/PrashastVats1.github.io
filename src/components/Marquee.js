import React from "react";
import config from "../config";
export default function Marquee() {
  const items = [...config.marqueeItems, ...config.marqueeItems];
  return (
    <div style={{ background:"var(--surface)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"14px 0", overflow:"hidden" }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-6 font-mono uppercase tracking-widest" style={{ fontSize:"0.68rem", color:"var(--muted)", flexShrink:0 }}>
            {item}
            <span className="w-1 h-1 rounded-full inline-block" style={{ background:"var(--accent)", opacity:0.6 }} />
          </span>
        ))}
      </div>
    </div>
  );
}