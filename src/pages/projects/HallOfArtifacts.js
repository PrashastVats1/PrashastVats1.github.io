import { Divider } from "../../components/fantasy/Ornaments";
import ArtifactCard from "./ArtifactCard";
import HallChamber from "./HallChamber";
import { ARTIFACTS, COLLECTION, FEATURED } from "./artifacts";

function Wing({ id, title, plain, artifacts, eager = false }) {
  return (
    <section className="pv-wing" aria-labelledby={id}>
      <header className="pv-wing__header">
        <h2 id={id} className="pv-wing__title">
          {title}
        </h2>
        <p className="pv-wing__plain">{plain}</p>
      </header>
      <ul className="pv-wing__grid" data-count={artifacts.length}>
        {artifacts.map((artifact) => (
          <li key={artifact.slug} className="pv-wing__item">
            <ArtifactCard artifact={artifact} eager={eager} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The gallery: every artifact on display, featured pieces first. */
export default function HallOfArtifacts() {
  return (
    <HallChamber className="pv-hall">
      <header className="pv-hall__header">
        <p className="pv-hall__eyebrow">Things I have designed, built, and shipped</p>
        <h1 className="pv-hall__title">Hall of Artifacts</h1>
        <p className="pv-hall__plain">Projects</p>
        <Divider className="pv-hall__divider" />
        <p className="pv-hall__description">
          Each artifact is a real project. Examine one to see what it does, how it was built, and where to try it.
        </p>
        <p className="pv-hall__count">{ARTIFACTS.length} artifacts on display</p>
      </header>

      <Wing id="pv-wing-featured" title="The Featured Wing" plain="Featured projects" artifacts={FEATURED} eager />
      <Wing id="pv-wing-collection" title="The Collection" plain="More projects" artifacts={COLLECTION} />
    </HallChamber>
  );
}
