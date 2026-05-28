import React, { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Router, Route } from "./router";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import FeaturedProjects from "./components/FeaturedProjects";
import StatsStrip from "./components/StatsStrip";
import Skills from "./components/Skills";
import MentalModels from "./components/MentalModels";
import Experience from "./components/Experience";
import Education from "./components/Education";
import QuoteStrip from "./components/QuoteStrip";
import ToolsTeaser from "./components/ToolsTeaser";
import WritingTeaser from "./components/WritingTeaser";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BlogListPage from "./components/BlogListPage";
import BlogArticlePage from "./components/BlogArticlePage";
import ToolsPage from "./components/ToolsPage";

function PortfolioHome() {
  useEffect(() => {
    document.title = "Prashast Vats | Software Engineer";
    const setMeta = (n,v) => { let el=document.querySelector(`meta[name="${n}"]`); if(!el){el=document.createElement("meta");el.name=n;document.head.appendChild(el);} el.content=v; };
    setMeta("description","Prashast Vats — Software Engineer at Mphasis. Builds AI tools, automation systems, and full-stack apps.");
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <FeaturedProjects />
        <StatsStrip />
        <Skills />
        <MentalModels />
        <Experience />
        <Education />
        <QuoteStrip />
        <ToolsTeaser />
        <WritingTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Route path="/blog/"><BlogArticlePage /></Route>
        <Route path="/blog"><BlogListPage /></Route>
        <Route path="/tools"><ToolsPage /></Route>
        <Route path="/"><PortfolioHome /></Route>
      </Router>
    </ThemeProvider>
  );
}