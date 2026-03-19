import React from "react";
import posts from "../blog/posts/index";
import { Link, useLocation } from "../router";
import Navbar from "./Navbar";
import Footer from "./Footer";
function useSEO(title,desc){React.useEffect(()=>{document.title=`${title} | Prashast Vats`;let m=document.querySelector('meta[name="description"]');if(!m){m=document.createElement("meta");m.name="description";document.head.appendChild(m);}m.content=desc;return()=>{document.title="Prashast Vats | Software Engineer";};},[title,desc]);}
function Block({block}){
  switch(block.type){
    case"heading":return<h2 className="font-sans font-bold mt-10 mb-4" style={{fontSize:"1.3rem",color:"var(--text)",lineHeight:1.3}}>{block.text}</h2>;
    case"paragraph":return<p className="mb-5 leading-[1.9] text-[1.02rem]" style={{color:"var(--muted)"}}>{block.text}</p>;
    case"list":return<ul className="mb-5 flex flex-col gap-2.5 pl-2">{block.items.map((item,i)=><li key={i} className="flex items-start gap-3 text-[1.02rem] leading-relaxed" style={{color:"var(--muted)"}}><span style={{color:"var(--accent)",marginTop:"6px",flexShrink:0}}>›</span><span>{item}</span></li>)}</ul>;
    case"code":return<div className="mb-4 rounded-xl overflow-hidden" style={{border:"1px solid var(--border)"}}>{block.label&&<div className="px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest" style={{background:"var(--surface)",color:"var(--dim)",borderBottom:"1px solid var(--border)"}}>{block.label}</div>}<pre className="px-5 py-4 overflow-x-auto font-mono text-sm leading-relaxed" style={{background:"var(--bg2)",color:"var(--accent)",margin:0}}><code>{block.text}</code></pre></div>;
    default:return null;
  }
}
export default function BlogArticlePage(){
  const path=useLocation();
  const slug=path.replace("/blog/","");
  const post=posts.find(p=>p.slug===slug);
  useSEO(post?post.title:"Post not found",post?post.excerpt:"");
  if(!post)return<div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--text)"}}><Navbar/><div className="max-w-2xl mx-auto px-6 pt-40 text-center"><p className="font-mono text-6xl mb-6">404</p><p className="text-lg mb-8" style={{color:"var(--muted)"}}>Post not found.</p><Link to="/blog" className="btn-outline">← All Posts</Link></div><Footer/></div>;
  const idx=posts.indexOf(post),prev=posts[idx+1]||null,next=posts[idx-1]||null;
  return(
    <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--text)"}}>
      <Navbar/>
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-24">
        <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest mb-10 transition-opacity hover:opacity-70 block" style={{color:"var(--muted)"}}>← All Posts</Link>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="pill">{post.tag}</span>
            <span className="font-mono text-[0.65rem]" style={{color:"var(--dim)"}}>{post.date} · {post.readTime}</span>
          </div>
          <h1 className="font-sans font-extrabold leading-tight mb-5" style={{fontSize:"clamp(1.75rem,4vw,2.4rem)",color:"var(--text)"}}>{post.title}</h1>
          <p className="text-base leading-relaxed" style={{color:"var(--muted)"}}>{post.excerpt}</p>
          <div className="mt-6 h-px" style={{background:"var(--border)"}}/>
        </header>
        <article>{post.content.map((block,i)=><Block key={i} block={block}/>)}</article>
        <div className="mt-14 pt-8 flex items-center gap-4" style={{borderTop:"1px solid var(--border)"}}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0" style={{background:"linear-gradient(135deg,var(--accent),var(--accent3))",color:"var(--bg)"}}>PV</div>
          <div><p className="font-sans font-semibold text-sm" style={{color:"var(--text)"}}>Prashast Vats</p><p className="font-mono text-[0.68rem]" style={{color:"var(--muted)"}}>Software Engineer · Mphasis</p></div>
          <Link to="/" className="ml-auto font-mono text-[0.68rem] transition-opacity hover:opacity-70" style={{color:"var(--accent)"}}>Portfolio →</Link>
        </div>
        {(prev||next)&&<nav className="mt-10 grid grid-cols-2 gap-4">
          {prev?<Link to={`/blog/${prev.slug}`} className="card p-4 group" style={{textDecoration:"none"}}><p className="font-mono text-[0.6rem] uppercase tracking-widest mb-1" style={{color:"var(--dim)"}}>← Older</p><p className="text-sm font-semibold leading-snug" style={{color:"var(--text)"}}>{prev.title}</p></Link>:<div/>}
          {next?<Link to={`/blog/${next.slug}`} className="card p-4 text-right group" style={{textDecoration:"none"}}><p className="font-mono text-[0.6rem] uppercase tracking-widest mb-1" style={{color:"var(--dim)"}}>Newer →</p><p className="text-sm font-semibold leading-snug" style={{color:"var(--text)"}}>{next.title}</p></Link>:<div/>}
        </nav>}
      </main>
      <Footer/>
    </div>
  );
}