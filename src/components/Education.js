import React from "react";
import config from "../config";
import { useInView } from "../hooks/useInView";
export default function Education() {
  const [ref, visible] = useInView();
  return (
    <section id="education" className="py-16 sm:py-20 lg:py-28" style={{background:"var(--bg2)"}} ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={"reveal "+(visible?"in":"")}><p className="section-label">05. Education</p><h2 className="section-title">Academic Background</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <div className={"reveal "+(visible?"in":"")+" [transition-delay:0.08s]"}>
            <p className="font-mono text-[0.63rem] uppercase tracking-widest mb-3" style={{color:"var(--accent)"}}>Degree</p>
            {config.education.map((e,i)=><div key={i} className="card p-4 sm:p-5"><div className="text-xl sm:text-2xl mb-3">🎓</div><p className="font-sans font-semibold text-sm leading-snug mb-2" style={{color:"var(--text)"}}>{e.degree}</p><p className="font-mono text-[0.7rem] mb-3" style={{color:"var(--accent)"}}>{e.institution}</p><div className="flex flex-wrap gap-2"><span className="pill">{e.period}</span><span className="pill">{e.gpa}</span></div></div>)}
          </div>
          <div className={"reveal "+(visible?"in":"")+" [transition-delay:0.16s]"}>
            <p className="font-mono text-[0.63rem] uppercase tracking-widest mb-3" style={{color:"var(--accent)"}}>Certifications</p>
            <div className="flex flex-col gap-2">{config.certifications.map((c,i)=><div key={i} className="card p-3 sm:p-4"><p className="text-xs sm:text-[0.82rem] leading-snug mb-1" style={{color:"var(--text)"}}>{c.label}</p><p className="font-mono text-[0.6rem]" style={{color:"var(--dim)"}}>{c.issuer}</p></div>)}</div>
          </div>
          <div className={"reveal "+(visible?"in":"")+" [transition-delay:0.24s] sm:col-span-2 lg:col-span-1"}>
            <p className="font-mono text-[0.63rem] uppercase tracking-widest mb-3" style={{color:"var(--accent)"}}>Achievements</p>
            <div className="flex flex-col gap-2">{config.achievements.map((a,i)=><div key={i} className="card p-3 sm:p-4 flex items-start gap-3"><span className="text-base sm:text-lg shrink-0">{a.icon}</span><p className="text-xs sm:text-[0.82rem] leading-snug" style={{color:"var(--muted)"}}>{a.text}</p></div>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}