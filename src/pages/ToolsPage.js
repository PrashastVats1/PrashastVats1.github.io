import PageHeader from "../components/fantasy/PageHeader";
import PlaceholderNote from "../components/fantasy/PlaceholderNote";

export default function ToolsPage() {
  return (
    <section>
      <PageHeader
        eyebrow="Witness the wonders and creations of the Software Archmage"
        title="Wizard's Laboratory"
        plain="Interactive Tools"
        description="Small, working developer tools you can try right in the browser."
      />
      <PlaceholderNote />
    </section>
  );
}
