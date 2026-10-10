import { Divider } from "../../components/fantasy/Ornaments";
import ArchiveLink from "./ArchiveLink";
import ArchiveRoom from "./ArchiveRoom";
import { ArchiveBreadcrumb } from "./ArticleFolio";
import { POSTS, postRoute } from "./archive";

/** Shown for /blog/<slug> when no post has that slug. */
export default function FolioMissing() {
  return (
    <ArchiveRoom className="pv-folio-page">
      <ArchiveBreadcrumb current="Folio not found" />
      <section className="pv-article pv-folio-missing" aria-labelledby="pv-folio-missing-title">
        <h1 id="pv-folio-missing-title" className="pv-article__title">
          A Missing Folio
        </h1>
        <p className="pv-archive__plain pv-archive__plain--ink">Post not found</p>
        <Divider className="pv-article__divider" />
        <p>No writing in the Archive matches this address. The link may be old or mistyped.</p>
        <h2 className="pv-folio-missing__subtitle">Writings in the Archive</h2>
        <ul className="pv-folio-missing__list">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <ArchiveLink to={postRoute(post.slug)}>{post.title}</ArchiveLink>
            </li>
          ))}
        </ul>
        <p>
          <ArchiveLink to="/blog" className="pv-button pv-button--primary">
            <span className="pv-button__label">Return to the Archive</span>
          </ArchiveLink>
        </p>
      </section>
    </ArchiveRoom>
  );
}
