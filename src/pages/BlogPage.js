import Avatar from "../components/fantasy/Avatar";
import PageHeader from "../components/fantasy/PageHeader";
import PlaceholderNote from "../components/fantasy/PlaceholderNote";

export default function BlogPage() {
  return (
    <section className="pv-blog-placeholder">
      <Avatar variant="scholar" size="md" className="pv-blog-placeholder__avatar" />
      <PageHeader
        title="Archmage's Notes"
        plain="Blog & Writing"
        description="Essays on software engineering, AI, and building things."
      />
      <PlaceholderNote />
    </section>
  );
}
