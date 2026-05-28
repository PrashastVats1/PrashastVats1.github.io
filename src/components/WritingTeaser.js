import React from "react";
import posts from "../blog/posts/index";
import { Link } from "../router";
import { useInView } from "../hooks/useInView";
export default function WritingTeaser() {
  const [ref,visible]=useInView();
  const latest=posts.slice(0,3);
  if(!latest.length) return null;
  return (
    <section className="py-16 sm:py-20" style={{background:"var(--bg2)",borderTop:"1px solid var(--border)"}} ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={"reveal "+(visible?"in":"")+" flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10"}>
          <div><p className="section-label">Writing</p><h2 className="font-sans font-bold" style={{fontSize:"clamp(1.3rem,2.5vw,1.6rem)",color:"var(--text)",marginBottom:0}}>I write about things I learn.</h2><p className="mt-1.5 text-xs sm:text-sm" style={{color:"var(--muted)"}}>Engineering, AI, and the occasional unexpected analogy.</p></div>
          <Link to="/blog" className="font-mono text-[0.7rem] uppercase tracking-widest transition-opacity hover:opacity-70 shrink-0" style={{color:"var(--accent)"}}>All Posts →</Link>
        </div>
        <div className="flex flex-col">
          {latest.map((post,i)=>(
            <div key={post.slug} className={"reveal "+(visible?"in":"")} style={{transitionDelay:`${0.08*i}s`}}>
              <Link to={`/blog/${post.slug}`} style={{textDecoration:"none"}}>
                <div className="group flex items-center justify-between gap-4 sm:gap-6 py-3 sm:py-4 transition-colors" style={{borderBottom:"1px solid var(--border)"}}>
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span className="font-mono text-[0.58rem] px-2 py-0.5 rounded shrink-0" style={{background:"var(--surface)",color:"var(--accent)",border:"1px solid var(--border)"}}>{post.tag}</span>
                    <span className="font-sans font-medium text-xs sm:text-sm truncate group-hover:text-accent transition-colors" style={{color:"var(--text)"}}>{post.title}</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <span className="font-mono text-[0.6rem] hidden sm:block" style={{color:"var(--dim)"}}>{post.readTime}</span>
                    <span className="font-mono text-sm transition-transform duration-200 group-hover:translate-x-1" style={{color:"var(--accent)"}}>→</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}