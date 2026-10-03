import PageHeader from "../components/fantasy/PageHeader";
import FantasyButton from "../components/fantasy/FantasyButton";

export default function NotFoundPage() {
  return (
    <section>
      <PageHeader
        title="A Blank Page"
        plain="Page not found"
        description="This page of the spellbook has not been written. The link may be old or mistyped."
      />
      <div className="pv-actions">
        <FantasyButton to="/home" hint="Go to the home page">Return to the Spellbook</FantasyButton>
      </div>
    </section>
  );
}
