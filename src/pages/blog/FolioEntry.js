import ArchiveLink from "./ArchiveLink";
import FolioPlate from "./FolioPlate";
import { isSummary, isoMonth, leadImage, postRoute } from "./archive";

/** Topic, date, and reading time: the facts every entry and folio shows. */
export function FolioMeta({ post, className = "" }) {
  return (
    <p className={`pv-folio-meta ${className}`.trim()}>
      <span className="pv-folio-meta__topic">
        <span className="pv-visually-hidden">Topic: </span>
        {post.tag}
      </span>
      <time dateTime={isoMonth(post.date) || undefined}>{post.date}</time>
      <span>{post.readTime}</span>
      {isSummary(post) && <span className="pv-folio-meta__format">Summary</span>}
    </p>
  );
}

/**
 * One writing in the catalogue. The title is the entry's only link; it is
 * stretched over the whole entry so the plate and excerpt are clickable too.
 */
export default function FolioEntry({ post, featured = false, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  const titleId = `pv-folio-${post.slug}`;
  return (
    <article className={`pv-folio${featured ? " pv-folio--featured" : ""}`} data-post={post.slug} aria-labelledby={titleId}>
      <FolioPlate image={leadImage(post)} eager={featured} decorative className="pv-folio__plate" />
      <div className="pv-folio__text">
        <FolioMeta post={post} />
        <Heading id={titleId} className="pv-folio__title">
          <ArchiveLink to={postRoute(post.slug)} className="pv-folio__link">
            {post.title}
          </ArchiveLink>
        </Heading>
        <p className="pv-folio__excerpt">{post.excerpt}</p>
        {featured && (
          <p className="pv-folio__cue" aria-hidden="true">
            Read the folio
          </p>
        )}
      </div>
    </article>
  );
}
