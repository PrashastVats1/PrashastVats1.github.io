import React from "react";
import config from "../config";
import { useInView } from "../hooks/useInView";
const BG = ["rgba(99,210,255,0.05)","rgba(255,107,157,0.05)","rgba(167,139,250,0.05)","rgba(99,210,255,0.03)","rgba(255,107,157,0.03)","rgba(167,139,250,0.07)"];
export default function MentalModels() {
  const [ref, visible] = useInView();
  return (
    <section style={{ background:"var(--bg2)", borderTop:"1px solid var(--border)" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className={"reveal " + (visible?"in":"") + " text-center mb-12"}>
          <p className="section-label justify-center">How I Think</p>
          <h2 className="section-title" style={{ marginBottom:"0.75rem" }}>Engineering Principles</h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color:"var(--muted)" }}>Mental models I apply consistently — to code, to prompts, to problems.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {config.mentalModels.map((m, i) => (
            <div key={i}
                 className={"reveal " + (visible?"in":"") + " rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300"}
                 style={{ transitionDelay:`${0.07*i}s`, background:BG[i], border:"1px solid var(--border)" }}
                 onMouseOver={e=>e.currentTarget.style.borderColor="rgba(99,210,255,0.25)"}
                 onMouseOut={e=>e.currentTarget.style.borderColor="var(--border)"}>
              <span className="absolute -bottom-3 -right-1 font-sans font-extrabold select-none pointer-events-none" style={{ fontSize:"6rem", opacity:0.04, color:"var(--text)", lineHeight:1 }}>
                {String(i+1).padStart(2,"0")}
              </span>
              <div className="text-2xl mb-4">{m.icon}</div>
              <h3 className="font-sans font-bold mb-2 text-sm sm:text-[0.95rem]" style={{ color:"var(--text)" }}>{m.title}</h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color:"var(--muted)" }}>{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}