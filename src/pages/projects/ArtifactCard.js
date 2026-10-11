import { useAudio } from "../../audio/AudioProvider";
import ArtifactArt from "./ArtifactArt";
import ArtifactStatus from "./ArtifactStatus";
import HallLink from "./HallLink";
import { artifactRoute, linkLabel } from "./artifacts";

const TAG_LIMIT = 4;

/** One artifact on display in the Hall: its case, its plaque, and its actions. */
export default function ArtifactCard({ artifact, headingLevel = 3, eager = false }) {
  const { playEffect } = useAudio();
  const Heading = `h${headingLevel}`;
  const titleId = `pv-artifact-${artifact.slug}`;
  const route = artifactRoute(artifact.slug);
  const external = artifact.links && artifact.links[0];
  // "+1 more" takes the same room as the tag it hides, so show it instead.
  const tags = artifact.technologies.length > TAG_LIMIT + 1 ? artifact.technologies.slice(0, TAG_LIMIT) : artifact.technologies;
  const hidden = artifact.technologies.length - tags.length;
  const examine = () => playEffect("artifact", "examine");

  return (
    <article
      className={`pv-artifact${artifact.featured ? " pv-artifact--featured" : ""}`}
      data-artifact={artifact.slug}
      data-accent={artifact.accent}
      aria-labelledby={titleId}
    >
      <div className="pv-artifact__display">
        <ArtifactArt artifact={artifact} eager={eager} />
        {/* Mouse shortcut laid over the artwork; keyboard and screen-reader users get the labelled link below. */}
        <HallLink to={route} className="pv-artifact__display-link" tabIndex={-1} aria-hidden="true" onClick={examine} />
      </div>

      <div className="pv-artifact__plaque">
        <p className="pv-artifact__meta">
          <ArtifactStatus artifact={artifact} />
          {artifact.year && <span className="pv-artifact__year">{artifact.year}</span>}
          <span className="pv-artifact__category">{artifact.category}</span>
        </p>
        <Heading id={titleId} className="pv-artifact__name">
          {artifact.name}
        </Heading>
        {artifact.subtitle && <p className="pv-artifact__subtitle">{artifact.subtitle}</p>}
        <p className="pv-artifact__summary">{artifact.shortDescription}</p>

        <ul className="pv-tags pv-artifact__tags" aria-label={`Technologies used in ${artifact.name}`}>
          {tags.map((tech) => (
            <li key={tech} className="pv-tag">
              {tech}
            </li>
          ))}
          {hidden > 0 && (
            <li className="pv-tag pv-tag--more">
              +{hidden} more<span className="pv-visually-hidden"> in the artifact record</span>
            </li>
          )}
        </ul>

        <div className="pv-artifact__actions">
          <HallLink
            to={route}
            className="pv-button pv-button--primary pv-artifact__examine"
            aria-label={`Examine artifact: ${artifact.name}`}
            onClick={examine}
          >
            <span className="pv-button__label">Examine artifact</span>
          </HallLink>
          {external && (
            <a
              href={external.href}
              target="_blank"
              rel="noreferrer"
              className="pv-button pv-button--secondary pv-artifact__external"
              aria-label={`${linkLabel(external)} for ${artifact.name} (opens in a new tab)`}
              aria-describedby={external.note ? `${titleId}-link-note` : undefined}
            >
              <span className="pv-button__label">{linkLabel(external)}</span>
            </a>
          )}
        </div>
        {external && external.note && (
          <p id={`${titleId}-link-note`} className="pv-link-note">
            {external.note}
          </p>
        )}
      </div>
    </article>
  );
}
