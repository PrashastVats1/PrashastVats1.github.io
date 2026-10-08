import { render } from "@testing-library/react";
import App from "../App";
import { INSTRUMENTS } from "../pages/tools/instruments";

// As if every Laboratory slot had been supplied.
jest.mock("../generated/assetManifest", () => ({
  __esModule: true,
  default: [
    "assets/lab/laboratory.webp",
    "assets/lab/prompt-injection-inspector.webp",
    "assets/lab/regex-alchemist.webp",
    "assets/lab/json-scribe.webp",
    "assets/lab/commit-scribe.webp",
    "assets/lab/prompt-debugger.webp",
    "assets/lab/code-review-rater.webp",
    "assets/lab/jira-ticket-scorer.webp",
  ],
}));

beforeEach(() => {
  window.history.replaceState(null, "", "/#/tools");
  render(<App />);
});

test("each instrument uses its own lab artwork slot, decoratively, with reserved space", () => {
  INSTRUMENTS.forEach(({ slug }) => {
    const img = document.querySelector(`.pv-instrument[data-instrument="${slug}"] img`);
    expect(img).toHaveAttribute("src", `/assets/lab/${slug}.webp`);
    expect(img).toHaveAttribute("alt", "");
    expect(img).toHaveAttribute("width", "1200");
    expect(img).toHaveAttribute("height", "900");
    expect(img).not.toHaveAttribute("hidden");
  });
});

test("the laboratory scene sits behind the room and is hidden from assistive technology", () => {
  const scene = document.querySelector(".pv-lab-scene");
  expect(scene).toHaveAttribute("aria-hidden", "true");
  expect(scene.querySelector("img")).toHaveAttribute("src", "/assets/lab/laboratory.webp");
  expect(document.querySelector(".pv-lab").contains(scene)).toBe(false);
});
