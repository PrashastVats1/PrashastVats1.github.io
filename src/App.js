import { Router, useLocation } from "./router";
import { findNavItem } from "./navigation";
import { AudioProvider } from "./audio/AudioProvider";
import { TransitionProvider } from "./transition/TransitionProvider";
import FantasyShell from "./components/fantasy/FantasyShell";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import ProjectsPage from "./pages/ProjectsPage";
import ToolsPage from "./pages/ToolsPage";
import BlogPage from "./pages/BlogPage";
import HirePage from "./pages/HirePage";
import NotFoundPage from "./pages/NotFoundPage";

const PAGES = {
  home: HomePage,
  resume: ResumePage,
  projects: ProjectsPage,
  tools: ToolsPage,
  blog: BlogPage,
  hire: HirePage,
};

function CurrentPage() {
  const item = findNavItem(useLocation());
  const Page = item ? PAGES[item.id] : NotFoundPage;
  return <Page />;
}

// AudioProvider sits outside the router so route changes never reset sound.
export default function App() {
  return (
    <AudioProvider>
      <Router>
        <TransitionProvider>
          <FantasyShell>
            <CurrentPage />
          </FantasyShell>
        </TransitionProvider>
      </Router>
    </AudioProvider>
  );
}
