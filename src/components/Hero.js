import React, { useEffect, useRef, useState } from "react";
import config from "../config";
function TypeWriter({ text, delay=75 }) {
  const [out, setOut] = useState(""); const [done, setDone] = useState(false);
  useEffect(() => {
    let i=0; const t=setInterval(()=>{ setOut(text.slice(0,++i)); if(i>=text.length){clearInterval(t);setDone(true);} },delay);
    return ()=>clearInterval(t);
  },[text,delay]);
  return <span>{out}<span style={{color:"var(--accent2)",fontWeight:300}} className={done?"animate-blink":""}>|</span></span>;
}
export default function Hero() {
  const canvasRef=useRef(null);
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext("2d"); let raf; const pts=[];
    const resize=()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;};
    resize(); window.addEventListener("resize",resize,{passive:true});
    for(let i=0;i<45;i++) pts.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.2+.4,a:Math.random()*.3+.06});
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p=>{p.x=(p.x+p.vx+canvas.width)%canvas.width;p.y=(p.y+p.vy+canvas.height)%canvas.height;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(99,210,255,${p.a})`;ctx.fill();});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(99,210,255,${.045*(1-d/110)})`;ctx.lineWidth=.6;ctx.stroke();}}
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{paddingTop:"5rem"}}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none"/>
      <div className="absolute -top-40 -left-32 w-96 h-96 md:w-[480px] md:h-[480px] rounded-full pointer-events-none" style={{background:"radial-gradient(circle,rgba(99,210,255,0.08) 0%,transparent 70%)",animation:"orb 18s ease-in-out infinite"}}/>
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] md:w-[560px] md:h-[560px] rounded-full pointer-events-none" style={{background:"radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%)",animation:"orb 24s ease-in-out infinite reverse"}}/>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex items-center gap-3 mb-4 sm:mb-5" style={{animation:"fadeUp 0.6s 0.05s ease both"}}>
          <span className="w-6 sm:w-8 h-px" style={{background:"var(--accent)"}}/>
          <span className="text-sm sm:text-base font-semibold" style={{color:"var(--accent)"}}>Hello, I'm</span>
        </div>
        <h1 className="font-sans font-extrabold leading-tight mb-3 sm:mb-4" style={{fontSize:"clamp(2.2rem,6vw,5rem)",background:"linear-gradient(110deg,var(--text) 0%,var(--text) 45%,var(--accent) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"fadeUp 0.65s 0.15s ease both"}}>{config.name}</h1>
        <p className="font-mono mb-3 sm:mb-4" style={{fontSize:"clamp(0.9rem,2vw,1.2rem)",color:"var(--accent)",animation:"fadeUp 0.65s 0.28s ease both"}}><TypeWriter text={config.title}/></p>
        <p className="mb-8 sm:mb-10 leading-relaxed" style={{color:"var(--muted)",fontSize:"clamp(0.9rem,1.5vw,1rem)",maxWidth:"520px",animation:"fadeUp 0.65s 0.38s ease both"}}>{config.tagline}</p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-14" style={{animation:"fadeUp 0.65s 0.48s ease both"}}>
          <a href={config.resumeFile} download="Prashast_Vats_Resume.pdf" className="btn-primary">↓ Resume</a>
          <a href="#contact" className="btn-outline">Let's Talk</a>
          <div className="flex items-center gap-3 ml-1">
            <a href={config.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-all duration-200 hover:opacity-80" style={{color:"var(--dim)"}}>
              <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            {config.linkedin && (
              <a href={config.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-all duration-200 hover:opacity-80" style={{color:"var(--dim)"}}>
                <svg width="19" height="19" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-6 sm:gap-10" style={{animation:"fadeUp 0.65s 0.6s ease both"}}>
          {config.stats.map((s,i)=>(
            <div key={i} className="flex flex-col min-w-[70px]">
              <span className="font-sans font-extrabold" style={{fontSize:"clamp(1.4rem,3vw,1.75rem)",color:"var(--text)",lineHeight:1}}>{s.value}</span>
              <span className="font-mono mt-1" style={{fontSize:"0.58rem",color:"var(--muted)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <a href="#about" aria-label="Scroll" className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style={{animation:"fadeUp 0.6s 1.1s ease both"}}>
        <div className="w-5 h-8 rounded-full flex justify-center pt-1.5" style={{border:"1.5px solid rgba(99,210,255,0.3)"}}>
          <span className="w-0.5 h-1.5 rounded-full animate-scroll-dot block" style={{background:"var(--accent)"}}/>
        </div>
      </a>
    </section>
  );
}