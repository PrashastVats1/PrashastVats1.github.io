import React from "react";
import { useInView } from "../hooks/useInView";

export default function QuoteStrip() {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ background:"var(--bg)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", position:"relative", overflow:"hidden" }}>
      {/* Large decorative quote mark */}
      <div className="absolute select-none pointer-events-none font-sans font-extrabold" style={{ fontSize:"20rem", lineHeight:1, top:"-2rem", left:"2rem", opacity:0.03, color:"var(--text)" }}>"</div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center relative z-10">
        <div className={"reveal " + (visible ? "in" : "")}>
          <p className="font-sans font-bold leading-relaxed mb-6" style={{ fontSize:"clamp(1.1rem,2.5vw,1.5rem)", color:"var(--text)" }}>
            "Want to talk about AI, automation, or building tools that actually get used?
            Over a coffee — virtual or otherwise — just say hello."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px" style={{ background:"var(--accent)", opacity:0.5 }} />
            <span className="font-mono text-[0.68rem] uppercase tracking-widest" style={{ color:"var(--accent)" }}>
              Prashast Vats · Software Engineer
            </span>
            <div className="w-8 h-px" style={{ background:"var(--accent)", opacity:0.5 }} />
          </div>
        </div>
      </div>
    </section>
  );
}