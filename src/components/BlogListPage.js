import React from "react";
import posts from "../blog/posts/index";
import { Link } from "../router";
import Navbar from "./Navbar";
import Footer from "./Footer";
function useSEO(title,desc){React.useEffect(()=>{document.title=title;let m=document.querySelector('meta[name="description"]');if(!m){m=document.createElement("meta");m.name="description";document.head.appendChild(m);}m.content=desc;return()=>{document.title="Prashast Vats | Software Engineer";};},[title,desc]);}
const TAG_COLORS = {"AI":{bg:"rgba(99,210,255,0.08)",color:"var(--accent)"},"Engineering":{bg:"rgba(167,139,250,0.08)",color:"var(--accent3)"}};
function tagStyle(tag){return TAG_COLORS[tag]||{bg:"rgba(255,255,255,0.05)",color:"var(--muted)"};}
export default function BlogListPage(){
  useSEO("Blog | Prashast Vats","Writing about AI, software engineering, automation, and the occasional unexpected lesson from everyday life.");
  return(
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--text)"}}>
      <Navbar/>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest mb-8 block transition-opacity hover:opacity-70" style={{color:"var(--muted)"}}>← Back to Portfolio</Link>
        <p className="section-label">Writing</p>
        <h1 className="font-sans font-extrabold mt-1 mb-3" style={{fontSize:"clamp(2rem,4vw,3rem)",color:"var(--text)",lineHeight:1.15}}>Articles & Posts</h1>
        <p className="mt-1 mb-12 text-base leading-relaxed" style={{color:"var(--muted)",maxWidth:"480px"}}>I write about AI, software engineering, automation, and the occasional unexpected lesson from everyday life.</p>
        <div className="flex flex-col gap-4">
          {posts.map(post=>(
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{textDecoration:"none"}}>
              <article className="card p-5 sm:p-6 group" onMouseOver={e=>e.currentTarget.style.transform="translateX(4px)"} onMouseOut={e=>e.currentTarget.style.transform="none"} style={{transition:"border-color 0.2s,transform 0.2s"}}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="font-mono text-[0.62rem] px-2.5 py-0.5 rounded" style={{...tagStyle(post.tag),border:`1px solid ${tagStyle(post.tag).color}30`}}>{post.tag}</span>
                      <span className="font-mono text-[0.62rem]" style={{color:"var(--dim)"}}>{post.date} · {post.readTime}</span>
                    </div>
                    <h2 className="font-sans font-bold mb-2" style={{fontSize:"1.05rem",color:"var(--text)",lineHeight:1.35}}>{post.title}</h2>
                    <p className="text-sm leading-relaxed" style={{color:"var(--muted)"}}>{post.excerpt}</p>
                  </div>
                  <span className="font-mono text-lg shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1" style={{color:"var(--accent)"}}>→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
}