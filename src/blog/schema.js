/*
 * The shape every post in src/blog/posts must follow. Posts are plain data;
 * the Scholar's Archive (src/pages/blog) only presents them.
 *
 * Required: slug, title, date ("Month YYYY"), readTime, tag, excerpt, content.
 *   tag     the post's category; the archive's topic shelves filter on it.
 * Optional:
 *   tags    kebab-case keywords shown on the folio, e.g. ["ai-agents", "debugging"].
 * Optional, for writing that also lives elsewhere (e.g. LinkedIn):
 *   format  "full" (default): content is the whole piece.
 *           "summary": content is an owner-approved summary; source.url is
 *           required so readers can reach the original.
 *   source  { platform: "LinkedIn", url: "https://…", publishedOn: "YYYY-MM-DD" }
 *   series  { name: "…", part: 1 } groups parts of a multi-post series.
 */

export const FORMATS = ["full", "summary"];
export const BLOCK_TYPES = ["heading", "paragraph", "list", "code", "image"];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MONTH_YEAR = /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const isText = (value) => typeof value === "string" && value.trim() !== "";

function blockErrors(block, at) {
  if (!block || !BLOCK_TYPES.includes(block.type)) return [`${at}: unknown block type "${block && block.type}"`];
  switch (block.type) {
    case "list":
      return Array.isArray(block.items) && block.items.length && block.items.every(isText) ? [] : [`${at}: list needs non-empty items`];
    case "image":
      return isText(block.src) && isText(block.alt) ? [] : [`${at}: image needs src and alt`];
    default:
      return isText(block.text) ? [] : [`${at}: ${block.type} needs text`];
  }
}

/** Every problem with one post, as readable strings; [] when it is valid. */
export function validatePost(post) {
  const name = (post && post.slug) || "(post without slug)";
  const errors = [];
  if (!post || !SLUG.test(post.slug || "")) errors.push(`${name}: slug must be kebab-case`);
  if (!post) return errors;
  ["title", "readTime", "tag", "excerpt"].forEach((field) => {
    if (!isText(post[field])) errors.push(`${name}: ${field} is required`);
  });
  if (!MONTH_YEAR.test(post.date || "")) errors.push(`${name}: date must look like "February 2026"`);
  if (!Array.isArray(post.content) || post.content.length === 0) {
    errors.push(`${name}: content must be a non-empty array`);
  } else {
    post.content.forEach((block, i) => errors.push(...blockErrors(block, `${name} block ${i}`)));
  }

  if (post.tags !== undefined) {
    const valid = Array.isArray(post.tags) && post.tags.length > 0 && post.tags.every((t) => SLUG.test(t || ""));
    if (!valid) errors.push(`${name}: tags must be a non-empty array of kebab-case keywords`);
    else if (new Set(post.tags).size !== post.tags.length) errors.push(`${name}: tags must not repeat`);
  }

  const format = post.format || "full";
  if (!FORMATS.includes(format)) errors.push(`${name}: format must be one of ${FORMATS.join(", ")}`);

  if (post.source !== undefined) {
    const { platform, url, publishedOn } = post.source || {};
    if (!isText(platform)) errors.push(`${name}: source.platform is required`);
    if (!/^https:\/\//.test(url || "")) errors.push(`${name}: source.url must be an https URL`);
    if (publishedOn !== undefined && !ISO_DATE.test(publishedOn)) errors.push(`${name}: source.publishedOn must be YYYY-MM-DD`);
  } else if (format === "summary") {
    errors.push(`${name}: a summary must link to its source`);
  }

  if (post.series !== undefined) {
    const { name: seriesName, part } = post.series || {};
    if (!isText(seriesName)) errors.push(`${name}: series.name is required`);
    if (!Number.isInteger(part) || part < 1) errors.push(`${name}: series.part must be a positive integer`);
  }
  return errors;
}

/** Problems across the whole registry: duplicate slugs, sources, and series parts. */
export function validateArchive(posts) {
  const errors = posts.flatMap(validatePost);
  const seen = new Set();
  const sources = new Set();
  const parts = new Set();
  posts.forEach((post) => {
    if (seen.has(post.slug)) errors.push(`${post.slug}: duplicate slug`);
    seen.add(post.slug);
    if (post.source && post.source.url) {
      if (sources.has(post.source.url)) errors.push(`${post.slug}: another post already imports ${post.source.url}`);
      sources.add(post.source.url);
    }
    if (post.series) {
      const key = `${post.series.name}#${post.series.part}`;
      if (parts.has(key)) errors.push(`${post.slug}: duplicate part ${post.series.part} of "${post.series.name}"`);
      parts.add(key);
    }
  });
  return errors;
}
