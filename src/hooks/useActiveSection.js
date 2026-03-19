import { useEffect, useState } from "react";
const SECTIONS = ["hero","about","projects","skills","experience","education","blog","contact"];
export function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = [];
    SECTIONS.forEach(id => {
      const el = document.getElementById(id); if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, { rootMargin: "-38% 0px -55% 0px" });
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);
  return active;
}
