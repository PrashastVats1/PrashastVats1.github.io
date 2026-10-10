import posts from "../../blog/posts";

/*
 * The Scholar's Archive reads the posts in src/blog/posts as its source of
 * truth. Their order (newest first), text, dates, reading times, topics, and
 * image references are used exactly as written; nothing here rewrites them.
 */
export const POSTS = posts;

export const postRoute = (slug) => `/blog/${slug}`;

export function findPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}

/** "/blog/the-loop-is-tightening" -> "the-loop-is-tightening"; "/blog" -> null. */
export function slugFromPath(path) {
  const match = /^\/blog\/([^/]+)/.exec(path || "");
  return match ? decodeURIComponent(match[1]) : null;
}

/** Topics in the order they first appear, i.e. by their newest post. */
export const TOPICS = [...new Set(POSTS.map((p) => p.tag))];

export const postsInTopic = (topic) => (topic ? POSTS.filter((p) => p.tag === topic) : POSTS);

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "February 2026" -> "2026-02" for <time dateTime>; null for any other form. */
export function isoMonth(date) {
  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(date || "");
  const month = match ? MONTHS.indexOf(match[1]) : -1;
  return month < 0 ? null : `${match[2]}-${String(month + 1).padStart(2, "0")}`;
}

/** "2026-05-03" -> "3 May 2026"; independent of the reader's locale. */
export function longDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return match ? `${Number(match[3])} ${MONTHS[Number(match[2]) - 1]} ${match[1]}` : null;
}

/** Posts reference images by site-root path ("/images/x.jpeg"). */
export const imageUrl = (src) => (src.startsWith("/") ? `${process.env.PUBLIC_URL}${src}` : src);

export const leadImage = (post) => post.content.find((block) => block.type === "image") || null;

/** See src/blog/schema.js: a summary links out to the full original. */
export const isSummary = (post) => post.format === "summary";

/** Every published part of the post's series, in part order; [] outside a series. */
export function seriesParts(post) {
  if (!post.series) return [];
  return POSTS.filter((p) => p.series && p.series.name === post.series.name).sort((a, b) => a.series.part - b.series.part);
}
