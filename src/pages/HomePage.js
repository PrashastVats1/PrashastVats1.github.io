import config from "../config";
import Avatar from "../components/fantasy/Avatar";
import FantasyButton from "../components/fantasy/FantasyButton";
import { Divider } from "../components/fantasy/Ornaments";
import PlaceholderNote from "../components/fantasy/PlaceholderNote";

export default function HomePage() {
  return (
    <section className="pv-home" aria-labelledby="home-title">
      <Avatar variant="regular" size="lg" className="pv-home__avatar" />
      <p className="pv-page-header__eyebrow">The Adventures of</p>
      <h1 id="home-title" className="pv-home__title">{config.name}</h1>
      <p className="pv-home__class">Software Archmage</p>
      <p className="pv-page-header__plain">{config.title}</p>
      <Divider className="pv-page-header__divider" />
      <p className="pv-home__tagline">{config.tagline}</p>
      <div className="pv-actions">
        <FantasyButton to="/resume" hint="View my resume">Open the Character Record</FantasyButton>
        <FantasyButton to="/projects" variant="secondary" hint="See what I've built">Enter the Hall of Artifacts</FantasyButton>
      </div>
      <PlaceholderNote>The full spellbook, with turning pages, arrives in the next phase.</PlaceholderNote>
    </section>
  );
}
