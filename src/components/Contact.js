import React, { useState } from "react";
import config from "../config";
import { useInView } from "../hooks/useInView";
const ITEMS = [
  {key:"email",icon:"✉",label:"Email",val:()=>config.email,href:()=>`https://mail.google.com/mail/?view=cm&to=${config.email}`,external:true},
  {key:"phone",icon:"📱",label:"Phone",val:()=>config.phone,href:()=>`tel:${config.phone}`,external:false},
  {key:"location",icon:"📍",label:"Location",val:()=>config.location,href:null,external:false},
  {key:"github",icon:"{}",label:"GitHub",val:()=>config.github.replace("https://github.com/","@"),href:()=>config.github,external:true},
];
export default function Contact() {
  const [ref,visible]=useInView();
  const [copied,setCopied]=useState(null);
  const copy=(val,key)=>{navigator.clipboard.writeText(val).then(()=>{setCopied(key);setTimeout(()=>setCopied(null),2000);});};
  const items=[...ITEMS,...(config.linkedin?[{key:"linkedin",icon:"in",label:"LinkedIn",val:()=>"View Profile",href:()=>config.linkedin,external:true}]:[])];
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden" style={{background:"var(--bg)"}} ref={ref}>
      <div className="absolute top-0 inset-x-0 h-px" style={{background:"linear-gradient(to right,transparent,var(--accent2),transparent)",opacity:0.25}}/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={"reveal "+(visible?"in":"")}><p className="section-label">06. Contact</p><h2 className="section-title">Let's Build Something</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className={"reveal-l "+(visible?"in":"")+" [transition-delay:0.1s]"}>
            <p className="leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base" style={{color:"var(--muted)"}}>I enjoy solving interesting problems — AI, automation, or tools that make teams more productive. Have an idea? Want to collaborate? Or just want to say hi? Drop me a line.</p>
            <a href={`https://mail.google.com/mail/?view=cm&to=${config.email}`} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 font-mono px-5 sm:px-6 py-3 rounded-lg transition-all duration-200"
               style={{fontSize:"0.78rem",border:"1px solid var(--accent2)",color:"var(--accent2)"}}
               onMouseOver={e=>{e.currentTarget.style.background="var(--accent2)";e.currentTarget.style.color="var(--bg)";}}
               onMouseOut={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--accent2)";}}>
              Get in Touch →
            </a>
            <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4" style={{background:"var(--surface)",border:"1px solid var(--border)"}}>
              <div><p className="font-sans font-semibold text-sm" style={{color:"var(--text)"}}>Need my resume?</p><p className="font-mono text-[0.6rem] mt-0.5" style={{color:"var(--dim)"}}>Always the latest version</p></div>
              <a href={config.resumeFile} download="Prashast_Vats_Resume.pdf" className="btn-primary" style={{padding:"0.55rem 1.1rem",fontSize:"0.78rem"}}>↓ PDF</a>
            </div>
          </div>
          <div className={"reveal-r "+(visible?"in":"")+" [transition-delay:0.15s] flex flex-col gap-2.5 sm:gap-3"}>
            {items.map(c=>{
              const val=c.val(),href=c.href?c.href():null,isCopied=copied===c.key;
              return (
                <div key={c.key} className="card flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 transition-all duration-200 hover:translate-x-1">
                  <span className="font-mono text-sm w-5 sm:w-6 text-center shrink-0" style={{color:"var(--accent)"}}>{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em]" style={{color:"var(--dim)"}}>{c.label}</p>
                    {href?<a href={href} target={c.external?"_blank":undefined} rel="noreferrer" className="text-xs sm:text-sm truncate block transition-colors hover:opacity-70" style={{color:"var(--text)"}}>{val}</a>:<span className="text-xs sm:text-sm" style={{color:"var(--text)"}}>{val}</span>}
                  </div>
                  <button onClick={()=>copy(href||val,c.key)} title="Copy" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-sm shrink-0 transition-all duration-200 bg-transparent" style={{border:"1px solid var(--border)",color:isCopied?"#4ade80":"var(--dim)",borderColor:isCopied?"rgba(74,222,128,0.4)":"var(--border)"}}>
                    {isCopied?"✓":"⎘"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}