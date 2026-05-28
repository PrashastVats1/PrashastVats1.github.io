import React, { useState } from "react";
import config from "../config";
import { useInView } from "../hooks/useInView";
export default function Experience() {
  const [ref, visible] = useInView();
  const [open, setOpen] = useState(null);
  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-28" style={{background:"var(--bg)"}} ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={"reveal "+(visible?"in":"")}><p className="section-label">04. Experience</p><h2 className="section-title">Where I've Worked</h2></div>
        {config.experience.map((job,ji)=>(
          <div key={ji} className={"reveal "+(visible?"in":"")+" [transition-delay:0.1s]"}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6 sm:mb-8">
              <div><h3 className="font-sans font-bold text-xl sm:text-2xl" style={{color:"var(--text)"}}>{job.role}</h3><p className="font-mono text-[0.72rem] sm:text-[0.78rem] mt-1" style={{color:"var(--accent)"}}>{job.company} · {job.location}</p></div>
              <span className="pill">{job.period}</span>
            </div>
            <div className="relative pl-5 sm:pl-8 flex flex-col gap-3" style={{borderLeft:"1px solid var(--border)"}}>
              {job.projects.map((proj,pi)=>{
                const key=`${ji}-${pi}`,isOpen=open===key;
                return (
                  <div key={pi} className="relative">
                    <div className="absolute rounded-full border-2 transition-colors duration-300" style={{left:"-29px",top:"18px",width:"12px",height:"12px",borderColor:isOpen?"var(--accent)":"var(--dim)",background:isOpen?"rgba(99,210,255,0.2)":"var(--bg)"}}/>
                    <div className="card overflow-hidden" style={{borderColor:isOpen?"rgba(99,210,255,0.3)":undefined}}>
                      <button onClick={()=>setOpen(isOpen?null:key)} className="w-full text-left flex items-start justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-transparent border-0">
                        <div className="flex-1 min-w-0"><span className="block font-sans font-semibold text-sm sm:text-[0.95rem]" style={{color:"var(--text)"}}>{proj.name}</span><span className="font-mono block mt-0.5 text-[0.6rem]" style={{color:"var(--dim)"}}>{proj.period}</span></div>
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0 mt-0.5">
                          <div className="hidden md:flex flex-wrap gap-1.5">{proj.tags.map(t=><span key={t} className="pill">{t}</span>)}</div>
                          <span className="text-lg leading-none transition-transform duration-300" style={{color:"var(--accent)",transform:isOpen?"rotate(180deg)":"none"}}>⌄</span>
                        </div>
                      </button>
                      <div className="overflow-hidden transition-all duration-300" style={{maxHeight:isOpen?"300px":"0",opacity:isOpen?1:0}}>
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 sm:pt-4" style={{borderTop:"1px solid var(--border)"}}>
                          <p className="text-xs sm:text-sm leading-[1.85]" style={{color:"var(--muted)"}}>{proj.summary}</p>
                          <div className="flex md:hidden flex-wrap gap-1.5 mt-3">{proj.tags.map(t=><span key={t} className="pill">{t}</span>)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}