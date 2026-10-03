import config from "../config";
import PageHeader from "../components/fantasy/PageHeader";
import FantasyButton from "../components/fantasy/FantasyButton";
import PlaceholderNote from "../components/fantasy/PlaceholderNote";

export default function ResumePage() {
  return (
    <section>
      <PageHeader
        eyebrow="Software Engineer"
        title="Character Record"
        plain="Resume"
        description="Professional experience, technical skills, education, and certifications."
      />
      <div className="pv-actions">
        <FantasyButton href={config.resumeFile} download="Prashast_Vats_Resume.pdf" hint="Download resume (PDF)">
          Summon my record
        </FantasyButton>
      </div>
      <PlaceholderNote />
    </section>
  );
}
