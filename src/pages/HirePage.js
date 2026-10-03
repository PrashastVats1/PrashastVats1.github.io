import config from "../config";
import PageHeader from "../components/fantasy/PageHeader";
import FantasyButton from "../components/fantasy/FantasyButton";
import PlaceholderNote from "../components/fantasy/PlaceholderNote";

export default function HirePage() {
  return (
    <section>
      <PageHeader
        eyebrow="Does thy guild have a quest worthy of an Archmage?"
        title="Guild Recruitment"
        plain="Contact & Hire Me"
        description="Get in touch about roles, projects, or collaborations."
      />
      <div className="pv-actions">
        <FantasyButton href={`mailto:${config.email}`} hint="Email me directly">Send a raven</FantasyButton>
        <FantasyButton href={config.linkedin} target="_blank" rel="noreferrer" variant="secondary" hint="Open LinkedIn">
          Consult the guild
        </FantasyButton>
        <FantasyButton href={config.resumeFile} download="Prashast_Vats_Resume.pdf" variant="secondary" hint="Download resume (PDF)">
          Summon my record
        </FantasyButton>
      </div>
      <PlaceholderNote />
    </section>
  );
}
