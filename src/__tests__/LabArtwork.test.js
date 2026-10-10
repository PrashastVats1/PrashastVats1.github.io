import { fireEvent, render } from "@testing-library/react";
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
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).not.toHaveAttribute("hidden");
    expect(document.querySelector(`.pv-instrument[data-instrument="${slug}"] svg[data-placeholder]`)).toBeInTheDocument();
  });
});

test("the laboratory scene sits behind the room and is hidden from assistive technology", () => {
  const scene = document.querySelector(".pv-lab-scene");
  expect(scene).toHaveAttribute("aria-hidden", "true");
  expect(scene.querySelector("img")).toHaveAttribute("src", "/assets/lab/laboratory.webp");
  expect(document.querySelector(".pv-lab").contains(scene)).toBe(false);
  expect(document.querySelector(".pv-lab")).toHaveClass("pv-lab--scene");
});

test("once an instrument's artwork loads, its drawn stand-in is removed", () => {
  const button = document.querySelector('.pv-instrument[data-instrument="regex-alchemist"]');
  fireEvent.load(button.querySelector("img"));
  expect(button.querySelector("svg[data-placeholder]")).toBeNull();
  expect(button.querySelector("img")).not.toHaveAttribute("data-loading");
});
