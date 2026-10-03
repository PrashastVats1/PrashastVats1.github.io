import config from "../config";
import Spellbook from "../components/spellbook/Spellbook";
import IdentityPage from "./home/IdentityPage";
import WelcomePage from "./home/WelcomePage";
import SchoolsPage from "./home/SchoolsPage";
import ArtifactsPage from "./home/ArtifactsPage";

// Order matters: on desktop, pages pair into spreads (0-1, 2-3).
const PAGES = [
  { id: "identity", title: "Who I am", content: <IdentityPage /> },
  { id: "welcome", title: "Where to begin", content: <WelcomePage /> },
  { id: "schools", title: "What I build", content: <SchoolsPage /> },
  { id: "artifacts", title: "What I have built", content: <ArtifactsPage /> },
];

export default function HomePage() {
  return (
    <>
      <h1 className="pv-visually-hidden">
        {config.name}, {config.title}: The Spellbook
      </h1>
      <Spellbook label="The Spellbook" pages={PAGES} />
    </>
  );
}
