import { fireEvent, render } from "@testing-library/react";
import App from "../App";
import { ARTIFACTS, COLLECTION, FEATURED } from "../pages/projects/artifacts";

// The supplied Hall artwork, exactly as it sits in public/assets/.
jest.mock("../generated/assetManifest", () => ({
  __esModule: true,
  default: [
    "assets/artifacts/ai-agent-auth-gateway.webp",
    "assets/artifacts/dnd-beginner-guide.webp",
    "assets/artifacts/event-intelligence-dashboard.webp",
    "assets/artifacts/movie-discovery-app.webp",
    "assets/artifacts/priya-voice-agent.webp",
    "assets/artifacts/projects.webp",
    "assets/artifacts/remora.webp",
  ],
}));

const EXPECTED_FILES = {
  remora: "/assets/artifacts/remora.webp",
  "ai-agent-auth-gateway": "/assets/artifacts/ai-agent-auth-gateway.webp",
  priya: "/assets/artifacts/priya-voice-agent.webp",
  "event-intelligence": "/assets/artifacts/event-intelligence-dashboard.webp",
  "movie-discovery": "/assets/artifacts/movie-discovery-app.webp",
  "dnd-guide": "/assets/artifacts/dnd-beginner-guide.webp",
};

function renderAt(hash) {
  window.history.replaceState(null, "", `/${hash}`);
  return render(<App />);
}

const cardImage = (slug) => document.querySelector(`article[data-artifact="${slug}"] .pv-artifact-art__image`);
const sceneImage = () => document.querySelector(".pv-hall-scene img");

test("each card shows its own artwork with descriptive alt text and its real size reserved", () => {
  renderAt("#/projects");
  ARTIFACTS.forEach((artifact) => {
    const img = cardImage(artifact.slug);
    expect(img).toHaveAttribute("src", EXPECTED_FILES[artifact.slug]);
    expect(img).toHaveAttribute("alt", artifact.artwork.alt);
    expect(artifact.artwork.alt.startsWith(`${artifact.name}'s artifact: `)).toBe(true);
    expect(img).toHaveAttribute("width", "1402");
    expect(img).toHaveAttribute("height", "1122");
    expect(img).toHaveAttribute("decoding", "async");
    // The image itself is exposed; only the overlay link is hidden from assistive tech.
    expect(img.closest('[aria-hidden="true"]')).toBeNull();
  });
  expect(new Set(ARTIFACTS.map((a) => a.artwork.src)).size).toBe(ARTIFACTS.length);
});

test("featured artwork loads first; the collection loads lazily but stays rendered so it is fetched", () => {
  renderAt("#/projects");
  FEATURED.forEach((a) => {
    expect(cardImage(a.slug)).toHaveAttribute("loading", "eager");
    expect(cardImage(a.slug)).toHaveAttribute("fetchpriority", "high");
  });
  COLLECTION.forEach((a) => {
    const img = cardImage(a.slug);
    expect(img).toHaveAttribute("loading", "lazy");
    // A `hidden` lazy image is never requested, so loading state is a data attribute instead.
    expect(img).not.toHaveAttribute("hidden");
    expect(img).toHaveAttribute("data-loading", "true");
  });
});

test("the placeholder holds the case until the artwork loads, then steps aside", () => {
  renderAt("#/projects");
  const placeholder = () => document.querySelector('article[data-artifact="remora"] svg[data-placeholder]');
  expect(placeholder()).toBeInTheDocument();
  fireEvent.load(cardImage("remora"));
  expect(cardImage("remora")).not.toHaveAttribute("data-loading");
  expect(placeholder()).toBeNull();
});

test("the record shows the same artwork, eagerly, and falls back to the placeholder on error", () => {
  renderAt("#/projects/priya");
  const img = document.querySelector(".pv-artifact-record img.pv-artifact-art__image");
  expect(img).toHaveAttribute("src", EXPECTED_FILES.priya);
  expect(img).toHaveAttribute("alt", ARTIFACTS.find((a) => a.slug === "priya").artwork.alt);
  expect(img).toHaveAttribute("loading", "eager");
  fireEvent.error(img);
  expect(document.querySelector(".pv-artifact-record img.pv-artifact-art__image")).toBeNull();
  expect(document.querySelector('.pv-artifact-record svg[data-placeholder="true"]')).toBeInTheDocument();
});

test.each(["#/projects", "#/projects/remora", "#/projects/not-a-real-thing"])(
  "the Hall scene is the decorative environment on %s",
  (hash) => {
    renderAt(hash);
    const layer = document.querySelector(".pv-hall-scene");
    expect(layer).toHaveAttribute("aria-hidden", "true");
    expect(sceneImage()).toHaveAttribute("src", "/assets/artifacts/projects.webp");
    expect(sceneImage()).toHaveAttribute("alt", "");
    expect(sceneImage()).toHaveAttribute("fetchpriority", "low");
    expect(document.querySelector(".pv-chamber")).toHaveClass("pv-chamber--scene");
    // The scene sits beside the chamber, not inside it, so the chamber's stone draws over it.
    expect(document.querySelector(".pv-chamber").contains(layer)).toBe(false);
  }
);

test("the scene never renders on other pages", () => {
  renderAt("#/resume");
  expect(document.querySelector(".pv-hall-scene")).toBeNull();
});
