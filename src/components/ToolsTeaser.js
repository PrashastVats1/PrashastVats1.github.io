import React from "react";
import { Link } from "../router";
import { useInView } from "../hooks/useInView";

const TOOL_PREVIEWS = [
  { icon:"🔍", name:"Prompt Debugger",      tag:"AI"           },
  { icon:"📝", name:"Git Commit Formatter", tag:"Git"          },
  { icon:"⭐", name:"Code Review Rater",    tag:"Code Quality" },
  { icon:"🏗",  name:"Tech Stack Advisor",  tag:"Architecture" },
  { icon:"🔤", name:"Regex Explainer",      tag:"Dev Tools"    },
  { icon:"🎫", name:"JIRA Ticket Scorer",   tag:"Process"      },
];

export default function ToolsTeaser() {
  const [ref, visible] = useInView();
  return (
    <section style={{ background:"var(--bg)", borderTop:"1px solid var(--border)" }} ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className={"reveal " + (visible ? "in" : "") + " flex flex-wrap items-end justify-between gap-4 mb-10"}>
          <div>
            <p className="section-label">Dev Lab</p>
            <h2 className="font-sans font-bold" style={{ fontSize:"clamp(1.3rem,2.5vw,1.6rem)", color:"var(--text)", marginBottom:0 }}>
              I built tools for problems I hit daily.
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm" style={{ color:"var(--muted)" }}>
              Six interactive tools — prompts, commits, code review, stacks, regex, tickets.
            </p>
          </div>
          <Link to="/tools" className="font-mono text-[0.7rem] uppercase tracking-widest transition-opacity hover:opacity-70 shrink-0" style={{ color:"var(--accent)" }}>
            Open Lab →
          </Link>
        </div>

        {/* Tool grid — just names, no interactivity, acts as a preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TOOL_PREVIEWS.map((tool, i) => (
            <Link key={i} to="/tools" style={{ textDecoration:"none" }}>
              <div className={"reveal " + (visible ? "in" : "") + " card p-4 flex flex-col items-center text-center gap-2 group transition-all duration-200"}
                   style={{ transitionDelay:`${0.05*i}s` }}
                   onMouseOver={e => e.currentTarget.style.borderColor = "rgba(99,210,255,0.3)"}
                   onMouseOut={e => e.currentTarget.style.borderColor = "var(--border)"}>
                <span className="text-xl">{tool.icon}</span>
                <span className="font-sans font-semibold text-[0.72rem] leading-snug" style={{ color:"var(--text)" }}>{tool.name}</span>
                <span className="font-mono text-[0.55rem] uppercase tracking-wider" style={{ color:"var(--accent)", opacity:0.8 }}>{tool.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}