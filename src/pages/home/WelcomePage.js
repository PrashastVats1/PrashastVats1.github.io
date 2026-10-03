import { Link } from "../../router";
import FantasyButton from "../../components/fantasy/FantasyButton";
import { Divider } from "../../components/fantasy/Ornaments";

export default function WelcomePage() {
  return (
    <div className="pv-welcome">
      <p className="pv-book-eyebrow">A word of welcome</p>
      <h2 className="pv-book-title">Welcome, Traveller</h2>
      <p className="pv-page-header__plain">Start here</p>
      <Divider className="pv-book-divider" />
      <p className="pv-book-lead">
        You have opened the spellbook of a software engineer. Within these pages lies the record of my work: where I
        have worked, what I have built, and the tools I have made along the way.
      </p>

      <div className="pv-welcome__actions">
        <FantasyButton to="/resume" hint="View my resume">Open the Character Record</FantasyButton>
        <FantasyButton to="/projects" variant="secondary" hint="See what I've built">Enter the Hall of Artifacts</FantasyButton>
      </div>

      <p className="pv-welcome__more">
        Also within: the <Link to="/tools">Wizard's Laboratory</Link>, a set of interactive developer tools.
      </p>
    </div>
  );
}
