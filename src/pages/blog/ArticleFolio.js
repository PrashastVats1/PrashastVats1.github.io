import { Link } from "../../router";
import config from "../../config";
import Avatar from "../../components/fantasy/Avatar";
import { Divider } from "../../components/fantasy/Ornaments";
import ArchiveLink from "./ArchiveLink";
import ArchiveRoom from "./ArchiveRoom";
import FolioPlate from "./FolioPlate";
import { FolioMeta } from "./FolioEntry";
import { POSTS, isSummary, longDate, postRoute, seriesParts } from "./archive";

export function ArchiveBreadcrumb({ current }) {
  return (
    <nav className="pv-archive-crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <ArchiveLink to="/blog">
            Archmage's Notes <span className="pv-archive-crumbs__plain">(Blog)</span>
          </ArchiveLink>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

function Block({ block, index }) {
  switch (block.type) {
    case "heading":
      return <h2 className="pv-article__heading">{block.text}</h2>;
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return (
        <ul className="pv-article__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <figure className="pv-slate">
          {block.label && <figcaption className="pv-slate__label">{block.label}</figcaption>}
          <pre className="pv-slate__board">
            <code>{block.text}</code>
          </pre>
        </figure>
      );
    case "image":
      return (
        <figure className="pv-article__figure">
          <FolioPlate image={block} eager={index === 0} omitIfMissing />
        </figure>
      );
    default:
      return null;
  }
}

function SourceLink({ source, children, className }) {
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className={className}>
      {children}
      <span className="pv-visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

/** Where the writing first appeared; shown on any post that records a source. */
function SourceNote({ source }) {
  const published = longDate(source.publishedOn);
  return (
    <p className="pv-article__source">
      Originally published on <SourceLink source={source}>{source.platform}</SourceLink>
      {published && (
        <>
          {" "}on <time dateTime={source.publishedOn}>{published}</time>
        </>
      )}
      .
    </p>
  );
}

function SeriesIndex({ post }) {
  const parts = seriesParts(post);
  return (
    <nav className="pv-series" aria-label={`${post.series.name} series`}>
      <p className="pv-series__title">{post.series.name}</p>
      <ol className="pv-series__list">
        {parts.map((part) => (
          <li key={part.slug} value={part.series.part}>
            {part === post ? (
              <span aria-current="page">{part.title}</span>
            ) : (
              <ArchiveLink to={postRoute(part.slug)}>{part.title}</ArchiveLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The reading view: a single post, set as a folio on the scholar's desk. */
export default function ArticleFolio({ post }) {
  const index = POSTS.indexOf(post);
  const newer = POSTS[index - 1];
  const older = POSTS[index + 1];
  const summary = isSummary(post);

  return (
    <ArchiveRoom className="pv-folio-page">
      <ArchiveBreadcrumb current={post.title} />

      <article className="pv-article" data-post={post.slug} aria-labelledby="pv-article-title">
        <header className="pv-article__header">
          <FolioMeta post={post} className="pv-article__meta" />
          {post.series && (
            <p className="pv-article__series">
              Part {post.series.part} of {post.series.name}
            </p>
          )}
          <h1 id="pv-article-title" className="pv-article__title">
            {post.title}
          </h1>
          <p className="pv-article__lead">{post.excerpt}</p>
          {post.source && <SourceNote source={post.source} />}
          {post.tags && (
            <ul className="pv-article__tags" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t}>{t.replace(/-/g, " ")}</li>
              ))}
            </ul>
          )}
          <Divider className="pv-article__divider" />
        </header>

        <div className="pv-article__body">
          {post.content.map((block, i) => (
            <Block key={i} block={block} index={i} />
          ))}
        </div>

        {summary && (
          <aside className="pv-article__original" aria-label="Full original">
            <p>This folio is a summary. The complete piece lives on {post.source.platform}.</p>
            <SourceLink source={post.source} className="pv-button pv-button--primary">
              <span className="pv-button__label">Read the original on {post.source.platform}</span>
            </SourceLink>
          </aside>
        )}

        {post.series && <SeriesIndex post={post} />}

        <footer className="pv-article__signature">
          <Avatar variant="scholar" size={64} alt="" />
          <p>
            <span className="pv-article__signature-label">Written by</span>
            <span className="pv-article__signature-name">{config.name}</span>
            <span className="pv-article__signature-role">{config.title}</span>
          </p>
          <Link to="/resume" className="pv-article__signature-link">
            Character Record <span className="pv-article__signature-plain">(Resume)</span>
          </Link>
        </footer>
      </article>

      <nav className="pv-folio-pager" aria-label="More writings">
        {older ? (
          <ArchiveLink to={postRoute(older.slug)} className="pv-folio-pager__link pv-folio-pager__link--older">
            <span className="pv-folio-pager__dir">Older folio</span>
            <span className="pv-folio-pager__name">{older.title}</span>
          </ArchiveLink>
        ) : (
          <span />
        )}
        <ArchiveLink to="/blog" className="pv-folio-pager__home">
          Return to the Archive
        </ArchiveLink>
        {newer ? (
          <ArchiveLink to={postRoute(newer.slug)} className="pv-folio-pager__link pv-folio-pager__link--newer">
            <span className="pv-folio-pager__dir">Newer folio</span>
            <span className="pv-folio-pager__name">{newer.title}</span>
          </ArchiveLink>
        ) : (
          <span />
        )}
      </nav>
    </ArchiveRoom>
  );
}
