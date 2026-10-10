import { render, screen, within } from "@testing-library/react";
import App from "../App";
import { validateArchive } from "../blog/schema";

// Fixture writings, not real content: the presentation of imported and serial posts.
jest.mock("../blog/posts", () => {
  const body = [{ type: "paragraph", text: "Fixture body." }];
  const base = { date: "May 2026", readTime: "3 min read", tag: "AI", content: body };
  const linkedIn = (id) => ({ platform: "LinkedIn", url: `https://www.linkedin.com/posts/fixture-${id}`, publishedOn: "2026-05-03" });
  return {
    __esModule: true,
    default: [
      { ...base, slug: "series-two", title: "Series Two", excerpt: "Second.", source: linkedIn(2), series: { name: "The Fixture Series", part: 2 } },
      { ...base, slug: "summary-post", title: "Summary Post", excerpt: "A summary.", format: "summary", source: linkedIn("s") },
      { ...base, slug: "series-one", title: "Series One", excerpt: "First.", series: { name: "The Fixture Series", part: 1 } },
      { ...base, slug: "plain-post", title: "Plain Post", excerpt: "Plain." },
    ],
  };
});
jest.mock("../generated/assetManifest", () => ({ __esModule: true, default: [] }));

function renderAt(hash) {
  window.history.replaceState(null, "", `/${hash}`);
  return render(<App />);
}

test("fixtures are valid under the schema", () => {
  expect(validateArchive(require("../blog/posts").default)).toEqual([]);
});

test("a summary is marked in the catalogue and links prominently to its original", () => {
  const { unmount } = renderAt("#/blog");
  expect(within(document.querySelector('[data-post="summary-post"]')).getByText("Summary")).toBeInTheDocument();
  expect(within(document.querySelector('[data-post="plain-post"]')).queryByText("Summary")).toBeNull();
  unmount();

  renderAt("#/blog/summary-post");
  const original = screen.getByRole("complementary", { name: "Full original" });
  const link = within(original).getByRole("link", { name: "Read the original on LinkedIn (opens in a new tab)" });
  expect(link).toHaveAttribute("href", "https://www.linkedin.com/posts/fixture-s");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noreferrer");
});

test("a full post with a source credits where it was first published", () => {
  renderAt("#/blog/series-two");
  const note = document.querySelector(".pv-article__source");
  expect(note).toHaveTextContent("Originally published on LinkedIn (opens in a new tab) on 3 May 2026.");
  expect(within(note).getByRole("link")).toHaveAttribute("href", "https://www.linkedin.com/posts/fixture-2");
  expect(within(note).getByText("3 May 2026")).toHaveAttribute("dateTime", "2026-05-03");
  expect(screen.queryByRole("complementary", { name: "Full original" })).toBeNull();
});

test("series parts are listed in part order with the current part marked", () => {
  renderAt("#/blog/series-two");
  expect(screen.getByText("Part 2 of The Fixture Series")).toBeInTheDocument();
  const series = screen.getByRole("navigation", { name: "The Fixture Series series" });
  const items = within(series).getAllByRole("listitem");
  expect(items.map((li) => li.textContent)).toEqual(["Series One", "Series Two"]);
  expect(within(series).getByRole("link", { name: "Series One" })).toHaveAttribute("href", "#/blog/series-one");
  expect(within(series).getByText("Series Two")).toHaveAttribute("aria-current", "page");
});

test("posts without source or series show neither", () => {
  renderAt("#/blog/plain-post");
  expect(document.querySelector(".pv-article__source")).toBeNull();
  expect(document.querySelector(".pv-series")).toBeNull();
  expect(screen.queryByText(/^Part \d/)).toBeNull();
});
