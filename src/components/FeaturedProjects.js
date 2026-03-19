import React, { useState } from "react";
import config from "../config";
import { useInView } from "../hooks/useInView";
export default function FeaturedProjects() {
  const [ref, visible] = useInView();
  const [expanded, setExpanded] = useState(null);
  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-28" style={{background:"var(--bg2)"}} ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={"reveal "+(visible?"in":"")}><p className="section-label">02. Projects</p><h2 className="section-title">Featured Work</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {config.featuredProjects.map((proj,i)=>{
            const isOpen=expanded===i;
            return (
              <div key={i} className={"reveal card flex flex-col "+(visible?"in":"")} style={{transitionDelay:`${0.08*i}s`,borderColor:isOpen?"rgba(99,210,255,0.3)":undefined}}>
                <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-2"><span className="font-mono text-[0.6rem] tracking-wider" style={{color:"var(--accent3)"}}>{proj.badge}</span></div>
                <div className="px-4 sm:px-5 pb-4"><h3 className="font-sans font-bold leading-snug mb-3 text-sm sm:text-[0.95rem]" style={{color:"var(--text)"}}>{proj.name}</h3><div className="flex flex-wrap gap-1.5">{proj.tags.map(t=><span key={t} className="pill">{t}</span>)}</div></div>
                <button onClick={()=>setExpanded(isOpen?null:i)} className="mx-4 sm:mx-5 mb-4 text-left font-mono flex items-center gap-1.5 transition-colors bg-transparent border-0 p-0" style={{fontSize:"0.67rem",color:isOpen?"var(--accent)":"var(--dim)"}}>
                  <span style={{display:"inline-block",transition:"transform 0.3s",transform:isOpen?"rotate(90deg)":"none"}}>▸</span>{isOpen?"Hide details":"View details"}
                </button>
                <div className="overflow-hidden transition-all duration-300" style={{maxHeight:isOpen?"500px":"0",opacity:isOpen?1:0}}>
                  <div className="px-4 sm:px-5 pb-5 pt-4 flex flex-col gap-4" style={{borderTop:"1px solid var(--border)"}}>
                    {[["Challenge",proj.challenge],["Solution",proj.solution]].map(([label,text])=>(
                      <div key={label}><p className="font-mono text-[0.58rem] uppercase tracking-widest mb-1" style={{color:"var(--dim)"}}>{label}</p><p className="text-xs sm:text-sm leading-relaxed" style={{color:"var(--muted)"}}>{text}</p></div>
                    ))}
                    <div><p className="font-mono text-[0.58rem] uppercase tracking-widest mb-2" style={{color:"var(--dim)"}}>Impact</p>
                      <ul className="flex flex-col gap-1.5">{proj.impact.map((item,j)=><li key={j} className="flex items-start gap-2 text-xs sm:text-sm" style={{color:"var(--muted)"}}><span style={{color:"var(--accent)",marginTop:"2px"}}>›</span>{item}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}