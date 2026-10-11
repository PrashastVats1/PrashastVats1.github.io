import { Divider } from "../../components/fantasy/Ornaments";
import ArtifactArt from "./ArtifactArt";
import ArtifactStatus from "./ArtifactStatus";
import HallChamber from "./HallChamber";
import HallLink from "./HallLink";
import { ARTIFACTS, artifactRoute, linkLabel } from "./artifacts";

export function HallBreadcrumb({ current }) {
  return (
    <nav className="pv-hall-crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <HallLink to="/projects">
            Hall of Artifacts <span className="pv-hall-crumbs__plain">(Projects)</span>
          </HallLink>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

function RecordSection({ id, title, plain, children }) {
  return (
    <section className="pv-artifact-record__section" aria-labelledby={id}>
      <h2 id={id} className="pv-artifact-record__heading">
        {title} <span className="pv-artifact-record__heading-plain">{plain}</span>
      </h2>
      {children}
    </section>
  );
}

const Bullets = ({ items }) => (
  <ul className="pv-artifact-record__list">
    {items.map((text) => (
      <li key={text}>{text}</li>
    ))}
  </ul>
);

/** The detail view: examining a single artifact. */
export default function ArtifactRecord({ artifact }) {
  const index = ARTIFACTS.indexOf(artifact);
  const previous = ARTIFACTS[index - 1];
  const next = ARTIFACTS[index + 1];
  const has = (list) => Array.isArray(list) && list.length > 0;

  return (
    <HallChamber className="pv-artifact-page">
      <HallBreadcrumb current={artifact.name} />

      <article className="pv-artifact-record" data-artifact={artifact.slug} data-accent={artifact.accent} aria-labelledby="pv-artifact-title">
        <header className="pv-artifact-record__header">
          <p className="pv-artifact-record__eyebrow">Artifact record</p>
          <h1 id="pv-artifact-title" className="pv-artifact-record__title">
            {artifact.name}
          </h1>
          {artifact.subtitle && <p className="pv-artifact-record__subtitle">{artifact.subtitle}</p>}
          <Divider className="pv-artifact-record__divider" />
          <p className="pv-artifact-record__lead">{artifact.shortDescription}</p>
        </header>

        <div className="pv-artifact-record__exhibit">
          <div className="pv-artifact-record__display">
            <ArtifactArt artifact={artifact} eager />
          </div>
          <dl className="pv-artifact-record__facts">
            <div>
              <dt>Status</dt>
              <dd>
                <ArtifactStatus artifact={artifact} />
              </dd>
            </div>
            {artifact.year && (
              <div>
                <dt>Year</dt>
                <dd>{artifact.year}</dd>
              </div>
            )}
            <div>
              <dt>Category</dt>
              <dd>{artifact.category}</dd>
            </div>
          </dl>
          {has(artifact.links) && (
            <section className="pv-artifact-record__links" aria-labelledby="pv-artifact-links">
              <h2 id="pv-artifact-links" className="pv-artifact-record__links-title">
                Where to find it
              </h2>
              <ul>
                {artifact.links.map((link, i) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`pv-button ${i === 0 ? "pv-button--primary" : "pv-button--secondary"}`}
                      aria-describedby={link.note ? `pv-artifact-link-note-${i}` : undefined}
                    >
                      <span className="pv-button__label">{linkLabel(link)}</span>
                      <span className="pv-button__hint">
                        {new URL(link.href).host}
                        <span className="pv-visually-hidden"> (opens in a new tab)</span>
                      </span>
                    </a>
                    {link.note && (
                      <p id={`pv-artifact-link-note-${i}`} className="pv-link-note">
                        {link.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="pv-artifact-record__body">
          {artifact.problem && (
            <RecordSection id="pv-artifact-quest" title="The Quest" plain="The problem">
              <p>{artifact.problem}</p>
            </RecordSection>
          )}
          {has(artifact.work) && (
            <RecordSection id="pv-artifact-work" title="The Work" plain="What I built">
              <Bullets items={artifact.work} />
            </RecordSection>
          )}
          {has(artifact.approach) && (
            <RecordSection id="pv-artifact-approach" title="The Approach" plain="How it works">
              <Bullets items={artifact.approach} />
            </RecordSection>
          )}
          <RecordSection id="pv-artifact-arsenal" title="The Arsenal" plain="Technologies">
            <ul className="pv-tags" aria-label={`Technologies used in ${artifact.name}`}>
              {artifact.technologies.map((tech) => (
                <li key={tech} className="pv-tag">
                  {tech}
                </li>
              ))}
            </ul>
          </RecordSection>
          {has(artifact.results) && (
            <RecordSection id="pv-artifact-result" title="The Result" plain="Outcomes">
              <Bullets items={artifact.results} />
            </RecordSection>
          )}
        </div>
      </article>

      <nav className="pv-artifact-pager" aria-label="More artifacts">
        {previous ? (
          <HallLink to={artifactRoute(previous.slug)} className="pv-artifact-pager__link pv-artifact-pager__link--prev">
            <span className="pv-artifact-pager__dir">Previous artifact</span>
            <span className="pv-artifact-pager__name">{previous.name}</span>
          </HallLink>
        ) : (
          <span />
        )}
        <HallLink to="/projects" className="pv-artifact-pager__hall">
          Return to the Hall of Artifacts
        </HallLink>
        {next ? (
          <HallLink to={artifactRoute(next.slug)} className="pv-artifact-pager__link pv-artifact-pager__link--next">
            <span className="pv-artifact-pager__dir">Next artifact</span>
            <span className="pv-artifact-pager__name">{next.name}</span>
          </HallLink>
        ) : (
          <span />
        )}
      </nav>
    </HallChamber>
  );
}
