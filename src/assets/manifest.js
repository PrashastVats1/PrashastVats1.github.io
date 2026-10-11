import availableFiles from "../generated/assetManifest";

// Asset slots. A slot may be empty; check hasAsset() before rendering so a
// missing file becomes a designed fallback rather than a broken image.
const available = new Set(availableFiles);

export function hasAsset(relativePath) {
  return available.has(relativePath);
}

export function assetUrl(relativePath) {
  return `${process.env.PUBLIC_URL}/${relativePath}`;
}

/**
 * srcSet for the committed `<stem>-<width>.webp` variants of an image
 * (scripts/make-image-variants.py). Only variants present in the manifest are
 * listed; returns undefined when there are none so the plain src is used.
 */
export function variantSrcSet(stem, widths) {
  const entries = widths
    .map((width) => [`${stem}-${width}.webp`, width])
    .filter(([path]) => hasAsset(path));
  return entries.length ? entries.map(([path, width]) => `${assetUrl(path)} ${width}w`).join(", ") : undefined;
}

export const AVATAR_FILES = {
  regular: "avatar/regular.webp",
  scholar: "avatar/scholar.webp",
};

export const AVATAR_VARIANT_STEMS = {
  regular: "assets/avatar/regular",
  scholar: "assets/avatar/scholar",
};
export const AVATAR_WIDTHS = [96, 192, 384];
export const ARTIFACT_WIDTHS = [480, 720, 960];
export const LAB_WIDTHS = [320, 560];

export const SCENES = {
  home: "assets/scenes/home.webp",
  resume: "assets/scenes/resume.webp",
  projects: "assets/artifacts/projects.webp",
  tools: "assets/lab/laboratory.webp",
  blog: "assets/scenes/blog.webp",
  hire: "assets/scenes/hire.webp",
};

export const EFFECTS = {
  spellCast: "assets/effects/spell-cast.webp",
  spellExplosion: "assets/effects/spell-explosion.webp",
};

export const AUDIO = {
  ambient: "assets/audio/ambient.mp3",
};

export const navIconPath = (id) => `assets/icons/nav-${id}.svg`;
export const artifactPath = (name) => `assets/artifacts/${name}.webp`;
export const labPath = (slug) => `assets/lab/${slug}.webp`;
