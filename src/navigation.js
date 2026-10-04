import { matchPath } from "./router";
import { findArtifact, slugFromPath } from "./pages/projects/artifacts";

// Every fantasy label is paired with a plain professional label so the site
// stays usable without learning the fantasy vocabulary.
export const NAV_ITEMS = [
  { id: "home",     path: "/home",     label: "The Spellbook",       plain: "Home" },
  { id: "resume",   path: "/resume",   label: "Character Record",    plain: "Resume" },
  { id: "projects", path: "/projects", label: "Hall of Artifacts",   plain: "Projects" },
  { id: "tools",    path: "/tools",    label: "Wizard's Laboratory", plain: "Tools" },
  { id: "blog",     path: "/blog",     label: "Archmage's Notes",    plain: "Blog" },
  { id: "hire",     path: "/hire",     label: "Guild Recruitment",   plain: "Hire Me" },
];

export function findNavItem(path) {
  return NAV_ITEMS.find((item) => matchPath(item.path, path)) || null;
}

export function documentTitleFor(item, path = "") {
  if (!item) return "Page not found | Prashast Vats";
  if (item.id === "home") return "Prashast Vats | Software Engineer";
  const slug = item.id === "projects" && slugFromPath(path);
  if (slug) {
    const artifact = findArtifact(slug);
    return `${artifact ? artifact.name : "Artifact not found"} | ${item.label} | Prashast Vats`;
  }
  return `${item.label} (${item.plain}) | Prashast Vats`;
}
