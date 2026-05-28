import React from "react";
import { useInView } from "../hooks/useInView";
const STATS = [
  { value:"3",  suffix:"+", label:"Projects in\nproduction" },
  { value:"80", suffix:"%", label:"First-contact\nresolution rate" },
  { value:"30", suffix:"+", label:"Engineers\nsupported daily" },
  { value:"20", suffix:"%", label:"Faster client\nworkflows delivered" },
];
export default function StatsStrip() {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ background:"var(--bg)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={i}
                 className={"reveal " + (visible ? "in" : "") + " flex flex-col items-center justify-center py-10 sm:py-14 text-center transition-colors duration-200"}
                 style={{ transitionDelay:`${0.1*i}s`, borderRight:i<3?"1px solid var(--border)":"none", borderBottom:i<2?"1px solid var(--border)":"none" }}
                 onMouseOver={e=>e.currentTarget.style.background="rgba(99,210,255,0.04)"}
                 onMouseOut={e=>e.currentTarget.style.background="transparent"}>
              <div className="font-sans font-extrabold leading-none mb-2" style={{ fontSize:"clamp(2.4rem,5vw,3.5rem)", color:"var(--text)" }}>
                {s.value}<span style={{ color:"var(--accent)" }}>{s.suffix}</span>
              </div>
              <div className="font-mono uppercase tracking-widest" style={{ fontSize:"0.6rem", color:"var(--dim)", whiteSpace:"pre-line", lineHeight:1.6 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}