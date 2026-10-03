import { fireEvent, render, screen } from "@testing-library/react";
import Avatar from "../components/fantasy/Avatar";

// Emulates the owner supplying avatar/regular.png but not scholar.png.
jest.mock("../generated/assetManifest", () => ({ __esModule: true, default: ["avatar/regular.png"] }));

const LABEL = "Prashast Vats as a software archmage";

test("shows the crest while the supplied artwork loads, then the artwork", () => {
  const { container } = render(<Avatar variant="regular" />);
  const img = container.querySelector("img");
  expect(img).toHaveAttribute("src", "/avatar/regular.png");
  expect(img).toHaveAttribute("hidden");
  expect(screen.getByRole("img", { name: LABEL }).tagName.toLowerCase()).toBe("svg");

  fireEvent.load(img);
  expect(img).not.toHaveAttribute("hidden");
  expect(screen.getByRole("img", { name: LABEL })).toBe(img);
  expect(container.querySelector("svg")).toBeNull();
});

test("falls back to the crest if the supplied artwork fails to load", () => {
  const { container } = render(<Avatar variant="regular" />);
  fireEvent.error(container.querySelector("img"));
  expect(container.querySelector("img")).toBeNull();
  expect(screen.getByRole("img", { name: LABEL }).tagName.toLowerCase()).toBe("svg");
});

test("a variant with no supplied artwork never requests an image", () => {
  const { container } = render(<Avatar variant="scholar" />);
  expect(container.querySelector("img")).toBeNull();
  expect(screen.getByRole("img", { name: "Prashast Vats as a scholar" })).toBeInTheDocument();
});
