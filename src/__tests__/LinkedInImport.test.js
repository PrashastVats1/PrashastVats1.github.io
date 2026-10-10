import crypto from "crypto";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import posts from "../blog/posts";
import { validateArchive } from "../blog/schema";
import { isoMonth } from "../pages/blog/archive";

jest.mock("../generated/assetManifest", () => ({
  __esModule: true,
  default: ["avatar/regular.webp", "avatar/scholar.webp"],
}));

function renderAt(hash) {
  window.history.replaceState(null, "", `/${hash}`);
  return render(<App />);
}

const LI = "https://www.linkedin.com/posts/prashast-vats_";

// The 11 LinkedIn posts supplied by the owner (lnkd.in links resolved to canonical URLs).
const SUPPLIED = {
  "when-did-minimalism-start-being-equated-to-modern-design": `${LI}when-did-minimalism-start-being-equated-share-7514277898850041856-a62Y`,
  "why-do-ai-coding-agents-always-want-to-fix-the-code": `${LI}why-do-ai-coding-agents-always-want-to-fix-share-7513141740896403457-sXh7`,
  "i-can-sometimes-tell-a-website-was-built-with-ai": `${LI}i-can-sometimes-tell-a-website-was-built-share-7511027779283427328-XeRU`,
  "this-tutorial-was-supposed-to-take-me-one-week": `${LI}this-tutorial-was-supposed-to-take-me-one-share-7510674073505538048-Zp7R`,
  "two-measurements-same-automation-different-results": `${LI}two-measurements-same-automation-different-share-7509559361170681856-nk9r`,
  "when-your-ai-agent-browses-the-web": `${LI}when-your-ai-agent-browses-the-web-it-sees-ugcPost-7471590224456876032-PVpc`,
  "the-loop-is-tightening": `${LI}the-loop-is-tightening-and-youre-inside-share-7456688050274979840-bARv`,
  "youre-not-paying-for-ai-youre-subsidizing-it": `${LI}youre-not-paying-for-ai-youre-subsidizing-share-7454168393361936385-zPft`,
  "vibe-coding-isnt-magic-its-faster-iteration": `${LI}vibe-coding-isnt-magic-its-faster-iteration-share-7435660555694256128-yicR`,
  "prompt-engineering-is-system-design": `${LI}prompt-engineering-is-often-treated-like-share-7414973578703716371-w3UB`,
  "stories-like-these-are-everywhere-these-days": `${LI}stories-like-these-are-everywhere-these-days-share-7352789891430207489-VcVj`,
};

const IMPORTED = Object.keys(SUPPLIED).slice(0, 6);
const bySlug = (slug) => posts.find((p) => p.slug === slug);

// Content fingerprints of the six posts that predate the import, taken before it.
const ORIGINAL = {
  "the-loop-is-tightening": "050cc5dcad3c8aae",
  "youre-not-paying-for-ai-youre-subsidizing-it": "d83bbbdec05fb7ec",
  "what-baking-cookies-taught-me-about-software-engineering": "ba2979a90b30e672",
  "prompt-engineering-is-system-design": "0fb3a83db10e12fa",
  "vibe-coding-isnt-magic-its-faster-iteration": "69eee0677a938886",
  "stories-like-these-are-everywhere-these-days": "2fdc292eb0305ee3",
};
const fingerprint = (p) =>
  crypto.createHash("sha256").update(JSON.stringify([p.slug, p.title, p.date, p.readTime, p.tag, p.excerpt, p.content])).digest("hex").slice(0, 16);

describe("the registry", () => {
  test("every post is valid, with unique slugs and sources", () => {
    expect(validateArchive(posts)).toEqual([]);
    expect(posts).toHaveLength(12);
  });

  test("each supplied LinkedIn post is represented exactly once", () => {
    Object.entries(SUPPLIED).forEach(([slug, url]) => {
      const matches = posts.filter((p) => p.source && p.source.url === url);
      expect(matches.map((p) => p.slug)).toEqual([slug]);
    });
    expect(posts.filter((p) => p.source)).toHaveLength(11);
  });

  test("the six earlier posts keep their content, titles and dates", () => {
    Object.entries(ORIGINAL).forEach(([slug, hash]) => expect(fingerprint(bySlug(slug))).toBe(hash));
  });

  test("earlier posts link to LinkedIn without asserting a conflicting date", () => {
    Object.keys(ORIGINAL)
      .filter((slug) => SUPPLIED[slug])
      .forEach((slug) => expect(bySlug(slug).source).toEqual({ platform: "LinkedIn", url: SUPPLIED[slug] }));
  });

  test("imported posts carry their original publication date and keywords", () => {
    IMPORTED.forEach((slug) => {
      const post = bySlug(slug);
      expect(post.source.publishedOn).toMatch(/^2026-\d{2}-\d{2}$/);
      expect(isoMonth(post.date)).toBe(post.source.publishedOn.slice(0, 7));
      expect(post.tags.length).toBeGreaterThan(0);
    });
  });

  test("posts are ordered newest first", () => {
    const months = posts.map((p) => isoMonth(p.date));
    expect([...months].sort().reverse()).toEqual(months);
  });
});

describe("in the archive", () => {
  test("imported posts are filed under their categories", () => {
    renderAt("#/blog");
    const shelves = screen.getByRole("group", { name: "Browse by topic" });
    expect(screen.getByText("12 writings in the archive")).toBeInTheDocument();

    fireEvent.click(within(shelves).getByRole("button", { name: /^Design/ }));
    expect([...document.querySelectorAll("article[data-post]")].map((el) => el.dataset.post)).toEqual([
      "when-did-minimalism-start-being-equated-to-modern-design",
    ]);

    fireEvent.click(within(shelves).getByRole("button", { name: /^Engineering/ }));
    const engineering = [...document.querySelectorAll("article[data-post]")].map((el) => el.dataset.post);
    expect(engineering).toEqual(expect.arrayContaining(["this-tutorial-was-supposed-to-take-me-one-week", "two-measurements-same-automation-different-results"]));
  });

  test("the summary is marked as such in the catalogue", () => {
    renderAt("#/blog");
    expect(within(document.querySelector('[data-post="when-your-ai-agent-browses-the-web"]')).getByText("Summary")).toBeInTheDocument();
    expect(screen.getAllByText("Summary")).toHaveLength(1);
  });
});

describe("imported folios", () => {
  test("a full import credits LinkedIn with its date and shows its tags", () => {
    renderAt("#/blog/why-do-ai-coding-agents-always-want-to-fix-the-code");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Why do AI coding agents always want to fix the code?");
    const note = document.querySelector(".pv-article__source");
    expect(note).toHaveTextContent("Originally published on LinkedIn (opens in a new tab) on 6 October 2026.");
    expect(within(note).getByRole("link")).toHaveAttribute("href", SUPPLIED["why-do-ai-coding-agents-always-want-to-fix-the-code"]);
    const tags = screen.getByRole("list", { name: "Tags" });
    expect(within(tags).getAllByRole("listitem").map((li) => li.textContent)).toEqual(["ai agents", "debugging", "github copilot"]);
    expect(screen.queryByRole("complementary", { name: "Full original" })).toBeNull();
  });

  test("the summary links prominently to the full LinkedIn post", () => {
    renderAt("#/blog/when-your-ai-agent-browses-the-web");
    const original = screen.getByRole("complementary", { name: "Full original" });
    expect(within(original).getByRole("link", { name: "Read the original on LinkedIn (opens in a new tab)" })).toHaveAttribute(
      "href",
      SUPPLIED["when-your-ai-agent-browses-the-web"]
    );
  });

  test("missing demo screenshots do not break the summary", () => {
    renderAt("#/blog/when-your-ai-agent-browses-the-web");
    bySlug("when-your-ai-agent-browses-the-web")
      .content.filter((b) => b.type === "image")
      .forEach((b) => fireEvent.error(screen.getByAltText(b.alt)));
    expect(document.querySelectorAll(".pv-article__body img")).toHaveLength(0);
    expect(screen.getByText("The results are unsettling.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Read the original on LinkedIn/ })).toBeInTheDocument();
  });

  test("an earlier post credits LinkedIn without a date", () => {
    renderAt("#/blog/the-loop-is-tightening");
    expect(document.querySelector(".pv-article__source")).toHaveTextContent(/^Originally published on LinkedIn \(opens in a new tab\)\.$/);
    expect(screen.queryByRole("list", { name: "Tags" })).toBeNull();
  });
});
