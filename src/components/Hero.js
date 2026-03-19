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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex items-center gap-3 mb-4 sm:mb-5" style={{animation:"fadeUp 0.6s 0.05s ease both"}}>
          <span className="w-6 sm:w-8 h-px" style={{background:"var(--accent)"}}/>
          <span className="text-sm sm:text-base font-semibold" style={{color:"var(--accent)"}}>Hello, I'm</span>
        </div>
        <h1 className="font-sans font-extrabold leading-tight mb-3 sm:mb-4" style={{fontSize:"clamp(2.2rem,6vw,5rem)",color:"var(--text)",animation:"fadeUp 0.65s 0.15s ease both"}}>{config.name}</h1>
        <p className="font-mono mb-3 sm:mb-4" style={{fontSize:"clamp(0.9rem,2vw,1.2rem)",color:"var(--accent)",animation:"fadeUp 0.65s 0.28s ease both"}}><TypeWriter text={config.title}/></p>
        <p className="mb-8 sm:mb-10 leading-relaxed" style={{color:"var(--muted)",fontSize:"clamp(0.9rem,1.5vw,1rem)",maxWidth:"520px",animation:"fadeUp 0.65s 0.38s ease both"}}>{config.tagline}</p>
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-14" style={{animation:"fadeUp 0.65s 0.48s ease both"}}>
          <a href={config.resumeFile} download="Prashast_Vats_Resume.pdf" className="btn-primary">↓ Resume</a>
          <a href="#contact" className="btn-outline">Let's Talk</a>
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