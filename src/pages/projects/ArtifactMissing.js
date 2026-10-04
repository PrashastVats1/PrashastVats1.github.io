import { Divider } from "../../components/fantasy/Ornaments";
import HallChamber from "./HallChamber";
import HallLink from "./HallLink";
import { HallBreadcrumb } from "./ArtifactRecord";
import { ARTIFACTS, artifactRoute } from "./artifacts";

/** Shown for /projects/<slug> when no artifact has that slug. */
export default function ArtifactMissing() {
  return (
    <HallChamber className="pv-artifact-page">
      <HallBreadcrumb current="Artifact not found" />
      <section className="pv-artifact-missing" aria-labelledby="pv-artifact-missing-title">
        <h1 id="pv-artifact-missing-title" className="pv-artifact-record__title">
          An Empty Pedestal
        </h1>
        <p className="pv-hall__plain pv-hall__plain--ink">Project not found</p>
        <Divider className="pv-artifact-record__divider" />
        <p>No artifact in the Hall matches this address. The link may be old or mistyped.</p>
        <h2 className="pv-artifact-missing__subtitle">Artifacts on display</h2>
        <ul className="pv-artifact-missing__list">
          {ARTIFACTS.map((artifact) => (
            <li key={artifact.slug}>
              <HallLink to={artifactRoute(artifact.slug)}>{artifact.name}</HallLink>
            </li>
          ))}
        </ul>
        <p>
          <HallLink to="/projects" className="pv-button pv-button--primary">
            <span className="pv-button__label">Return to the Hall of Artifacts</span>
          </HallLink>
        </p>
      </section>
    </HallChamber>
  );
}
