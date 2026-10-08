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

export const AVATAR_FILES = {
  regular: "avatar/regular.png",
  scholar: "avatar/scholar.png",
};

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
