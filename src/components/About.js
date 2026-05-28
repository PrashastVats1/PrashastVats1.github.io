import React from "react";
import config from "../config";
import { useInView } from "../hooks/useInView";
export default function About() {
  const [ref, visible] = useInView();
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28" style={{background:"var(--bg2)"}} ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={"reveal "+(visible?"in":"")}><p className="section-label">01. About</p><h2 className="section-title">A bit about me</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start">
          <div className={"reveal "+(visible?"in":"")+" [transition-delay:0.1s]"}>
            <p className="leading-[1.9] text-sm sm:text-base mb-5" style={{color:"var(--muted)"}}>I'm a Software Engineer at Mphasis with 2+ years of experience delivering technical solutions for international clients. My work spans plugin development, firmware test automation, full-stack tooling, and hands-on client support across multiple time zones.</p>
            <p className="leading-[1.9] text-sm sm:text-base mb-8" style={{color:"var(--muted)"}}>I enjoy bridging technical complexity with clear communication — whether that's resolving a tricky ticket, shipping an AI model, or building a tool that makes a team's day dramatically smoother.</p>
            <div className="flex flex-col gap-2 mb-8">
              {[{label:"Location",value:config.location,href:null},{label:"Email",value:config.email,href:"mailto:"+config.email},{label:"Phone",value:config.phone,href:"tel:"+config.phone},{label:"GitHub",value:config.github.replace("https://github.com/","@"),href:config.github},...(config.linkedin?[{label:"LinkedIn",value:"View Profile",href:config.linkedin}]:[])].map(d=>(
                <div key={d.label} className="flex items-center gap-4 px-4 py-2.5 rounded-xl" style={{background:"var(--surface)",border:"1px solid var(--border)"}}>
                  <span className="font-mono text-[0.58rem] w-14 sm:w-16 shrink-0 uppercase tracking-widest" style={{color:"var(--dim)"}}>{d.label}</span>
                  {d.href?<a href={d.href} target={d.href.startsWith("http")?"_blank":undefined} rel="noreferrer" className="text-xs sm:text-sm truncate transition-opacity hover:opacity-70" style={{color:"var(--accent)"}}>{d.value}</a>:<span className="text-xs sm:text-sm truncate" style={{color:"var(--text)"}}>{d.value}</span>}
                </div>
              ))}
            </div>
            <a href={config.resumeFile} download="Prashast_Vats_Resume.pdf" className="btn-outline text-sm">↓ Download Resume</a>
          </div>
          <div className={"reveal-r "+(visible?"in":"")+" [transition-delay:0.18s]"}>
            <div className="card p-6 sm:p-8 flex flex-col items-center gap-5 relative overflow-hidden">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none" style={{background:"radial-gradient(circle,rgba(99,210,255,0.08) 0%,transparent 70%)"}}/>
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center font-bold text-2xl sm:text-3xl" style={{background:"linear-gradient(135deg,var(--accent),var(--accent3))",color:"var(--bg)"}}>PV</div>
                <div className="absolute inset-[-6px] rounded-full border-dashed animate-spin-slow" style={{border:"1.5px dashed var(--border)"}}/>
              </div>
              <div className="text-center">
                <p className="font-sans font-bold text-base sm:text-lg" style={{color:"var(--text)"}}>{config.name}</p>
                <p className="font-mono text-[0.68rem] mt-1" style={{color:"var(--accent)"}}>{config.title}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">{["C#",".NET","React","Angular","SQL","Python"].map(t=><span key={t} className="pill">{t}</span>)}</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{background:"#4ade80",boxShadow:"0 0 8px #4ade80"}}/>
                <span className="font-mono text-[0.65rem]" style={{color:"var(--muted)"}}>Open to opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}