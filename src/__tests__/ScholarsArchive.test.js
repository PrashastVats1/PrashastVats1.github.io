import fs from "fs";
import path from "path";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import posts from "../blog/posts";
import { validateArchive, validatePost } from "../blog/schema";
import { POSTS, TOPICS, isoMonth, longDate, postsInTopic, slugFromPath } from "../pages/blog/archive";
import { TRANSITION_TIMINGS } from "../transition/transitionConfig";

// Only the avatars exist: the archive scene slot must fall back to the designed room.
jest.mock("../generated/assetManifest", () => ({
  __esModule: true,
  default: ["avatar/regular.webp", "avatar/scholar.webp"],
}));

function renderAt(hash) {
  window.history.replaceState(null, "", `/${hash}`);
  return render(<App />);
}

const nav = () => screen.getByRole("navigation", { name: "Main" });
const navLink = (label) => within(nav()).getByRole("link", { name: new RegExp(label) });
const h1 = () => screen.getByRole("heading", { level: 1 });
const entry = (slug) => document.querySelector(`article[data-post="${slug}"]`);
const overlay = () => document.querySelector(".pv-transition");
const signature = () => document.querySelector(".pv-article__signature");
const pager = () => screen.getByRole("navigation", { name: "More writings" });

function finishTransition(mode) {
  const t = TRANSITION_TIMINGS[mode];
  act(() => jest.advanceTimersByTime(t.cover + t.hold + t.reveal));
}

describe("the archive landing", () => {
  test("renders as an unframed room with the blog tab active", () => {
    renderAt("#/blog");
    expect(h1()).toHaveTextContent("Archmage's Notes");
    expect(screen.getByText("Blog & Writing")).toBeInTheDocument();
    expect(navLink("Archmage's Notes")).toHaveAttribute("aria-current", "page");
    expect(document.querySelector(".pv-parchment")).toBeNull();
    expect(document.querySelector(".pv-archive")).toBeInTheDocument();
    expect(document.querySelector(".pv-archive-scene")).toBeNull();
    expect(document.title).toBe("Archmage's Notes (Blog) | Prashast Vats");
  });

  test("shows the scholar portrait and the archive size", () => {
    renderAt("#/blog");
    const portrait = document.querySelector(".pv-archive__portrait img");
    expect(portrait.getAttribute("src")).toMatch(/avatar\/scholar\.webp$/);
    expect(portrait.getAttribute("alt")).not.toBe("");
    expect(screen.getByText(`${POSTS.length} writings in the archive`)).toBeInTheDocument();
  });

  test("features the newest post and lists every other post once, newest first", () => {
    renderAt("#/blog");
    const latest = screen.getByRole("heading", { name: /The Latest Folio/ }).closest("section");
    expect(latest).toContainElement(entry(POSTS[0].slug));

    const catalogue = screen.getByRole("heading", { name: /The Catalogue/ }).closest("section");
    const listed = [...catalogue.querySelectorAll("article[data-post]")].map((el) => el.dataset.post);
    expect(listed).toEqual(POSTS.slice(1).map((p) => p.slug));
  });

  test("each entry shows its title link, excerpt, topic, date and reading time exactly as written", () => {
    renderAt("#/blog");
    POSTS.forEach((post) => {
      const el = within(entry(post.slug));
      expect(el.getByRole("link", { name: post.title })).toHaveAttribute("href", `#/blog/${post.slug}`);
      expect(el.getByText(post.excerpt)).toBeInTheDocument();
      expect(el.getByText(post.date).tagName).toBe("TIME");
      expect(el.getByText(post.readTime)).toBeInTheDocument();
      expect(entry(post.slug).querySelector(".pv-folio-meta__topic")).toHaveTextContent(`Topic: ${post.tag}`);
    });
  });

  test("topic shelves filter the catalogue and announce the result", () => {
    renderAt("#/blog");
    const shelves = screen.getByRole("group", { name: "Browse by topic" });
    const all = within(shelves).getByRole("button", { name: /All writings/ });
    expect(all).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(`Showing all ${POSTS.length} writings`)).toBeInTheDocument();

    TOPICS.forEach((topic) => {
      fireEvent.click(within(shelves).getByRole("button", { name: new RegExp(`^${topic}`) }));
      const expected = postsInTopic(topic);
      expect(document.querySelectorAll("article[data-post]")).toHaveLength(expected.length);
      expected.forEach((post) => expect(entry(post.slug)).toBeInTheDocument());
      expect(all).toHaveAttribute("aria-pressed", "false");
      expect(screen.getByText(`Showing ${expected.length} ${expected.length === 1 ? "writing" : "writings"} on ${topic}`)).toBeInTheDocument();
    });

    fireEvent.click(all);
    expect(document.querySelectorAll("article[data-post]")).toHaveLength(POSTS.length);
  });

  test("post images are decorative plates in the catalogue", () => {
    renderAt("#/blog");
    document.querySelectorAll(".pv-folio .pv-plate__image").forEach((img) => expect(img).toHaveAttribute("alt", ""));
    expect(document.querySelectorAll(".pv-plate--emblem").length).toBeGreaterThan(0);
  });
});

describe("reading a folio", () => {
  test.each(POSTS.map((p) => [p.slug, p]))("%s renders every block of its content", (slug, post) => {
    renderAt(`#/blog/${slug}`);
    expect(h1()).toHaveTextContent(post.title);
    expect(document.title).toBe(`${post.title} | Archmage's Notes | Prashast Vats`);
    const article = document.querySelector(`article.pv-article[data-post="${slug}"]`);
    const body = article.querySelector(".pv-article__body");

    post.content.forEach((block) => {
      if (block.type === "heading") expect(within(body).getByRole("heading", { level: 2, name: block.text })).toBeInTheDocument();
      if (block.type === "paragraph") expect(within(body).getByText(block.text)).toBeInTheDocument();
      if (block.type === "list") block.items.forEach((item) => expect(within(body).getByText(item).tagName).toBe("LI"));
      if (block.type === "code") expect(within(body).getByText((_, el) => el.tagName === "CODE" && el.textContent === block.text)).toBeInTheDocument();
      if (block.type === "image") expect(within(body).getByAltText(block.alt)).toHaveAttribute("src", block.src);
    });
  });

  test("the breadcrumb, signature and pager link back into the archive", () => {
    renderAt(`#/blog/${POSTS[1].slug}`);
    const crumbs = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(crumbs).getByRole("link", { name: /Archmage's Notes/ })).toHaveAttribute("href", "#/blog");
    expect(within(signature()).getByRole("link", { name: /Character Record/ })).toHaveAttribute("href", "#/resume");
    expect(within(signature()).getByText("Written by")).toBeInTheDocument();

    expect(within(pager()).getByRole("link", { name: /Older folio/ })).toHaveAttribute("href", `#/blog/${POSTS[2].slug}`);
    expect(within(pager()).getByRole("link", { name: /Newer folio/ })).toHaveAttribute("href", `#/blog/${POSTS[0].slug}`);
    expect(within(pager()).getByRole("link", { name: "Return to the Archive" })).toHaveAttribute("href", "#/blog");
  });

  test("the newest and oldest folios have one-sided pagers", () => {
    renderAt(`#/blog/${POSTS[0].slug}`);
    expect(within(pager()).queryByRole("link", { name: /Newer folio/ })).toBeNull();
    expect(within(pager()).getByRole("link", { name: /Older folio/ })).toBeInTheDocument();
  });

  test("a broken image is dropped from the article instead of leaving a gap", () => {
    const post = POSTS.find((p) => p.content.some((b) => b.type === "image"));
    const block = post.content.find((b) => b.type === "image");
    renderAt(`#/blog/${post.slug}`);
    fireEvent.error(screen.getByAltText(block.alt));
    expect(screen.queryByAltText(block.alt)).toBeNull();
  });

  test("an unknown slug shows a missing folio that lists every post", () => {
    renderAt("#/blog/no-such-post");
    expect(h1()).toHaveTextContent("A Missing Folio");
    expect(document.title).toBe("Folio not found | Archmage's Notes | Prashast Vats");
    POSTS.forEach((post) => expect(screen.getByRole("link", { name: post.title })).toHaveAttribute("href", `#/blog/${post.slug}`));
    expect(screen.getByRole("link", { name: "Return to the Archive" })).toHaveAttribute("href", "#/blog");
  });
});

describe("navigation", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("opening a folio and returning skip the global spell", () => {
    renderAt("#/blog");
    fireEvent.click(within(entry(POSTS[2].slug)).getByRole("link", { name: POSTS[2].title }));
    expect(overlay()).toBeNull();
    expect(window.location.hash).toBe(`#/blog/${POSTS[2].slug}`);
    expect(h1()).toHaveTextContent(POSTS[2].title);
    expect(document.getElementById("main-content")).toHaveFocus();

    fireEvent.click(within(pager()).getByRole("link", { name: /Older folio/ }));
    expect(overlay()).toBeNull();
    expect(h1()).toHaveTextContent(POSTS[3].title);

    fireEvent.click(within(pager()).getByRole("link", { name: "Return to the Archive" }));
    expect(overlay()).toBeNull();
    expect(h1()).toHaveTextContent("Archmage's Notes");
  });

  test("leaving a folio for another page still uses the global transition", () => {
    renderAt(`#/blog/${POSTS[0].slug}`);
    fireEvent.click(within(signature()).getByRole("link", { name: /Character Record/ }));
    expect(overlay()).toBeInTheDocument();
    finishTransition("full");
    expect(h1()).toHaveTextContent("Character Record");
  });

  test("reduced-motion users get the reduced transition into the archive", () => {
    window.__reducedMotion = true;
    renderAt("#/home");
    fireEvent.click(navLink("Archmage's Notes"));
    expect(overlay()).toHaveAttribute("data-mode", "reduced");
    finishTransition("reduced");
    expect(h1()).toHaveTextContent("Archmage's Notes");
    window.__reducedMotion = false;
  });
});

describe("the content system", () => {
  test("every published post passes the schema", () => {
    expect(validateArchive(posts)).toEqual([]);
  });

  test("the schema reports malformed posts", () => {
    const good = POSTS.find((p) => !p.source);
    expect(validatePost({ ...good, slug: "Not A Slug" })).toEqual([expect.stringMatching(/slug/)]);
    expect(validatePost({ ...good, date: "2026-04" })).toEqual([expect.stringMatching(/date/)]);
    expect(validatePost({ ...good, content: [{ type: "video" }] })).toEqual([expect.stringMatching(/unknown block type/)]);
    expect(validatePost({ ...good, format: "summary" })).toEqual([expect.stringMatching(/summary must link/)]);
    expect(validatePost({ ...good, source: { platform: "LinkedIn", url: "http://x" } })).toEqual([expect.stringMatching(/https/)]);
    expect(validatePost({ ...good, series: { name: "S", part: 0 } })).toEqual([expect.stringMatching(/series.part/)]);
    expect(validateArchive([good, good])).toEqual([`${good.slug}: duplicate slug`]);
  });

  test("helpers", () => {
    expect(slugFromPath("/blog/a-b")).toBe("a-b");
    expect(slugFromPath("/blog")).toBeNull();
    expect(isoMonth("February 2026")).toBe("2026-02");
    expect(isoMonth("Spring")).toBeNull();
    expect(longDate("2026-05-03")).toBe("3 May 2026");
  });

  test("reduced motion removes the folio entrance animation", () => {
    const css = fs.readFileSync(path.join(__dirname, "..", "index.css"), "utf8");
    const reduced = css.slice(css.lastIndexOf("@media (prefers-reduced-motion: reduce)"));
    expect(reduced).toMatch(/\.pv-folio-page \.pv-archive__content\s*\{\s*animation:\s*none/);
  });
});
