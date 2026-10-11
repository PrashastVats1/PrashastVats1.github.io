import { Link } from "../../router";
import { Divider } from "../../components/fantasy/Ornaments";
import { ARTIFACTS } from "./homeContent";

export default function ArtifactsPage() {
  return (
    <div className="pv-artifacts-preview">
      <p className="pv-book-eyebrow">Things I have made</p>
      <h2 className="pv-book-title">Notable Artifacts</h2>
      <p className="pv-page-header__plain">Selected projects</p>
      <Divider className="pv-book-divider" />
      <ul className="pv-artifacts-preview__list">
        {ARTIFACTS.map((artifact) => (
          <li key={artifact.slug} className="pv-artifacts-preview__item">
            <h3 className="pv-artifacts-preview__name">
              <Link to={artifact.route} className="pv-artifacts-preview__link">
                {artifact.name}
              </Link>
              {artifact.subtitle && <span className="pv-artifacts-preview__subtitle">{artifact.subtitle}</span>}
            </h3>
            <p className="pv-artifacts-preview__status">{artifact.status}</p>
            <p className="pv-artifacts-preview__summary">{artifact.summary}</p>
          </li>
        ))}
      </ul>
      <p className="pv-artifacts-preview__more">
        <Link to="/projects">See every artifact in the Hall of Artifacts (Projects)</Link>
      </p>
    </div>
  );
}
