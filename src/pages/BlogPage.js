import { useLocation } from "../router";
import ArticleFolio from "./blog/ArticleFolio";
import FolioMissing from "./blog/FolioMissing";
import ScholarsArchive from "./blog/ScholarsArchive";
import { findPost, slugFromPath } from "./blog/archive";

export default function BlogPage() {
  const slug = slugFromPath(useLocation());
  if (!slug) return <ScholarsArchive />;
  const post = findPost(slug);
  return post ? <ArticleFolio post={post} /> : <FolioMissing />;
}
