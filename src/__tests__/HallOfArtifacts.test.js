import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import config from "../config";
import { KNOWN_TECH } from "../pages/home/homeContent";
import { SKILL_GROUPS } from "../pages/resume/resumeContent";
import { ARTIFACTS, COLLECTION, FEATURED, LINK_KINDS, STATUSES, findArtifact, slugFromPath } from "../pages/projects/artifacts";
import { TRANSITION_TIMINGS } from "../transition/transitionConfig";

// No Hall artwork in the manifest: every slot must fall back to the designed placeholder.
jest.mock("../generated/assetManifest", () => ({ __esModule: true, default: ["avatar/regular.webp"] }));

function renderAt(hash) {
  window.history.replaceState(null, "", `/${hash}`);
  return render(<App />);
}

const nav = () => screen.getByRole("navigation", { name: "Main" });
const navLink = (label) => within(nav()).getByRole("link", { name: new RegExp(label) });
const h1 = () => screen.getByRole("heading", { level: 1 });
const card = (slug) => document.querySelector(`article[data-artifact="${slug}"]`);
const overlay = () => document.querySelector(".pv-transition");

function finishTransition(mode) {
  const t = TRANSITION_TIMINGS[mode];
  act(() => jest.advanceTimersByTime(t.cover + t.hold + t.reveal));
}

function goBackTo(hash) {
  act(() => {
    window.history.replaceState(null, "", `/${hash}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
}

describe("the Hall", () => {
  test("renders as a chamber with the Projects tab active", () => {
    renderAt("#/projects");
    expect(h1()).toHaveTextContent("Hall of Artifacts");
    expect(screen.getByText("Projects", { selector: ".pv-hall__plain" })).toBeInTheDocument();
    expect(navLink("Hall of Artifacts")).toHaveAttribute("aria-current", "page");
    expect(document.querySelector(".pv-parchment")).toBeNull();
    expect(document.querySelector(".pv-chamber")).toBeInTheDocument();
    expect(document.title).toBe("Hall of Artifacts (Projects) | Prashast Vats");
  });

  test("lists every artifact once, featured pieces in their own wing", () => {
    renderAt("#/projects");
    expect(document.querySelectorAll("article[data-artifact]")).toHaveLength(ARTIFACTS.length);
    expect(screen.getByText(`${ARTIFACTS.length} artifacts on display`)).toBeInTheDocument();

    const featured = screen.getByRole("heading", { name: "The Featured Wing" }).closest("section");
    const collection = screen.getByRole("heading", { name: "The Collection" }).closest("section");
    ["remora", "ai-agent-auth-gateway", "priya"].forEach((slug) => expect(featured).toContainElement(card(slug)));
    ["event-intelligence", "movie-discovery", "dnd-guide"].forEach((slug) => expect(collection).toContainElement(card(slug)));
    expect(FEATURED.map((a) => a.slug)).toEqual(["remora", "ai-agent-auth-gateway", "priya"]);
    expect(COLLECTION).toHaveLength(3);
  });

  test("each card shows its name, description, status, year and category", () => {
    renderAt("#/projects");
    ARTIFACTS.forEach((artifact) => {
      const el = within(card(artifact.slug));
      expect(el.getByRole("heading", { level: 3 })).toHaveTextContent(artifact.name);
      expect(el.getByText(artifact.shortDescription)).toBeInTheDocument();
      expect(card(artifact.slug).querySelector(".pv-status")).toHaveTextContent(STATUSES[artifact.status].label);
      if (artifact.year) expect(el.getByText(artifact.year)).toBeInTheDocument();
      expect(el.getByText(artifact.category)).toBeInTheDocument();
    });
  });

  test("statuses match what the sources support", () => {
    const status = (slug) => findArtifact(slug).status;
    expect(status("remora")).toBe("published");
    expect(status("ai-agent-auth-gateway")).toBe("open-source");
    expect(status("priya")).toBe("winner");
    expect(findArtifact("priya").statusDetail).toBe("Voice Agent Jam 3.0");
    ["event-intelligence", "movie-discovery", "dnd-guide"].forEach((slug) => expect(status(slug)).toBe("live"));

    renderAt("#/projects");
    expect(card("priya").querySelector(".pv-status")).toHaveTextContent("WinnerVoice Agent Jam 3.0");
    // Status is carried by text, with the glyph hidden from assistive tech.
    document.querySelectorAll(".pv-status__glyph").forEach((g) => expect(g).toHaveAttribute("aria-hidden", "true"));
  });

  test("cards show up to four technologies and say how many more the record holds", () => {
    renderAt("#/projects");
    const gateway = within(card("ai-agent-auth-gateway"));
    const tags = within(gateway.getByRole("list", { name: "Technologies used in AI Agent Auth Gateway" }));
    expect(tags.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "+5 more in the artifact record",
    ]);
    // With five, "+1 more" would hide just one tag, so all five show.
    const remora = within(within(card("remora")).getByRole("list", { name: /Technologies/ }));
    expect(remora.getAllByRole("listitem")).toHaveLength(5);
    expect(remora.queryByText(/more/)).not.toBeInTheDocument();
    const dnd = within(within(card("dnd-guide")).getByRole("list", { name: /Technologies/ }));
    expect(dnd.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["React", "TypeScript", "GitHub Pages"]);
  });

  test("card actions are real, labelled links", () => {
    renderAt("#/projects");
    ARTIFACTS.forEach((artifact) => {
      const el = within(card(artifact.slug));
      const examine = el.getByRole("link", { name: `Examine artifact: ${artifact.name}` });
      expect(examine).toHaveAttribute("href", `#/projects/${artifact.slug}`);
      expect(examine.tagName).toBe("A");

      const first = artifact.links[0];
      const external = el.getByRole("link", { name: `${first.label || LINK_KINDS[first.kind]} for ${artifact.name} (opens in a new tab)` });
      expect(external).toHaveAttribute("href", first.href);
      expect(external).toHaveAttribute("target", "_blank");
      expect(external).toHaveAttribute("rel", "noreferrer");
    });
    // The link over the artwork is a mouse shortcut only: hidden and out of the tab order.
    document.querySelectorAll(".pv-artifact__display-link").forEach((a) => {
      expect(a).toHaveAttribute("aria-hidden", "true");
      expect(a).toHaveAttribute("tabindex", "-1");
    });
  });

  test("missing artwork renders the designed placeholder, never an image request", () => {
    renderAt("#/projects");
    expect(document.querySelectorAll(".pv-artifact img")).toHaveLength(0);
    // Without the scene, the chamber keeps its CSS stone and no scene layer renders.
    expect(document.querySelector(".pv-hall-scene")).toBeNull();
    expect(document.querySelector(".pv-chamber--scene")).toBeNull();
    expect(document.querySelectorAll(".pv-artifact__display-link")).toHaveLength(ARTIFACTS.length);
    ARTIFACTS.forEach((artifact) => {
      const placeholder = card(artifact.slug).querySelector('svg[data-placeholder="true"]');
      expect(placeholder).toHaveAttribute("aria-hidden", "true");
      expect(placeholder).toHaveTextContent(artifact.monogram);
    });
  });

  test("headings descend without skipping levels", () => {
    renderAt("#/projects");
    const levels = screen.getAllByRole("heading").map((h) => Number(h.tagName.slice(1)));
    levels.reduce((prev, level) => {
      expect(level - prev).toBeLessThanOrEqual(1);
      return level;
    });
  });
});

describe("artifact records", () => {
  test.each(ARTIFACTS.map((a) => [a.slug, a]))("#/projects/%s loads directly", (slug, artifact) => {
    renderAt(`#/projects/${slug}`);
    expect(h1()).toHaveTextContent(artifact.name);
    expect(navLink("Hall of Artifacts")).toHaveAttribute("aria-current", "page");
    expect(document.title).toBe(`${artifact.name} | Hall of Artifacts | Prashast Vats`);

    const crumbs = within(screen.getByRole("navigation", { name: "Breadcrumb" }));
    expect(crumbs.getByRole("link", { name: /Hall of Artifacts/ })).toHaveAttribute("href", "#/projects");
    expect(crumbs.getByText(artifact.name)).toHaveAttribute("aria-current", "page");

    const facts = document.querySelector(".pv-artifact-record__facts");
    expect(facts).toHaveTextContent(STATUSES[artifact.status].label);
    expect(facts).toHaveTextContent(artifact.category);

    const tech = within(screen.getByRole("list", { name: `Technologies used in ${artifact.name}` }));
    expect(tech.getAllByRole("listitem").map((li) => li.textContent)).toEqual(artifact.technologies);

    const links = within(screen.getByRole("heading", { name: "Where to find it" }).closest("section")).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(artifact.links.map((l) => l.href));
    links.forEach((a) => expect(a).toHaveAttribute("target", "_blank"));
  });

  test("only sections with verified content are shown", () => {
    renderAt("#/projects/event-intelligence");
    expect(screen.queryByRole("heading", { name: /The Quest/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /The Result/ })).not.toBeInTheDocument();
    ["The Work", "The Approach", "The Arsenal"].forEach((name) =>
      expect(screen.getByRole("heading", { name: new RegExp(name) })).toBeInTheDocument()
    );
  });

  test("fantasy headings carry a plain label", () => {
    renderAt("#/projects/remora");
    [
      ["The Quest", "The problem"],
      ["The Work", "What I built"],
      ["The Approach", "How it works"],
      ["The Arsenal", "Technologies"],
      ["The Result", "Outcomes"],
    ].forEach(([title, plain]) => expect(screen.getByRole("heading", { name: `${title} ${plain}` })).toBeInTheDocument());
  });

  test("record headings descend without skipping levels", () => {
    renderAt("#/projects/remora");
    const levels = screen.getAllByRole("heading").map((h) => Number(h.tagName.slice(1)));
    expect(levels[0]).toBe(1);
    levels.reduce((prev, level) => {
      expect(level - prev).toBeLessThanOrEqual(1);
      return level;
    });
  });

  test("neighbouring artifacts are linked, ends of the collection have one side", () => {
    renderAt("#/projects/remora");
    const pager = within(screen.getByRole("navigation", { name: "More artifacts" }));
    expect(pager.queryByText("Previous artifact")).not.toBeInTheDocument();
    expect(pager.getByRole("link", { name: /Next artifact AI Agent Auth Gateway/ })).toHaveAttribute("href", "#/projects/ai-agent-auth-gateway");
    expect(pager.getByRole("link", { name: "Return to the Hall of Artifacts" })).toHaveAttribute("href", "#/projects");
  });

  test("an unknown artifact shows an empty pedestal with a way back", () => {
    renderAt("#/projects/not-a-real-thing");
    expect(h1()).toHaveTextContent("An Empty Pedestal");
    expect(screen.getByText("Project not found")).toBeInTheDocument();
    expect(document.title).toBe("Artifact not found | Hall of Artifacts | Prashast Vats");
    expect(navLink("Hall of Artifacts")).toHaveAttribute("aria-current", "page");
    ARTIFACTS.forEach((a) => expect(screen.getByRole("link", { name: a.name })).toHaveAttribute("href", `#/projects/${a.slug}`));
    expect(screen.getAllByRole("link", { name: /Return to the Hall of Artifacts/ })[0]).toHaveAttribute("href", "#/projects");
  });

  test("slugs are read from the path", () => {
    expect(slugFromPath("/projects")).toBeNull();
    expect(slugFromPath("/projects/remora")).toBe("remora");
    expect(slugFromPath("/projects/remora/extra")).toBe("remora");
  });
});

describe("navigation", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("examining an artifact opens its record without the global spell", () => {
    renderAt("#/projects");
    fireEvent.click(within(card("priya")).getByRole("link", { name: "Examine artifact: Priya" }));
    expect(overlay()).toBeNull();
    expect(window.location.hash).toBe("#/projects/priya");
    expect(h1()).toHaveTextContent("Priya");
    expect(document.getElementById("main-content")).toHaveFocus();

    fireEvent.click(within(screen.getByRole("navigation", { name: "Breadcrumb" })).getByRole("link", { name: /Hall of Artifacts/ }));
    expect(overlay()).toBeNull();
    expect(h1()).toHaveTextContent("Hall of Artifacts");
  });

  test("browser back returns from a record to the Hall", () => {
    renderAt("#/projects");
    fireEvent.click(within(card("remora")).getByRole("link", { name: "Examine artifact: Remora" }));
    expect(h1()).toHaveTextContent("Remora");
    goBackTo("#/projects");
    expect(h1()).toHaveTextContent("Hall of Artifacts");
  });

  test("leaving the Hall for another major page still uses the global transition", () => {
    renderAt("#/projects/remora");
    fireEvent.click(navLink("Character Record"));
    expect(overlay()).toHaveAttribute("data-mode", "full");
    finishTransition("full");
    expect(h1()).toHaveTextContent("Character Record");
  });

  test("arriving from another page uses the global transition", () => {
    renderAt("#/home");
    fireEvent.click(navLink("Hall of Artifacts"));
    expect(overlay()).toBeInTheDocument();
    finishTransition("full");
    expect(h1()).toHaveTextContent("Hall of Artifacts");
  });

  test("the mobile menu works from an artifact record", () => {
    window.__viewportWidth = 375;
    renderAt("#/projects/dnd-guide");
    const toggle = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(navLink("Guild Recruitment"));
    finishTransition("full");
    expect(h1()).toHaveTextContent("Guild Recruitment");
  });
});

describe("content accuracy", () => {
  // Technologies named in the owner's Phase 4 project summaries or the projects'
  // public listings rather than in config or the resume skills.
  const SUPPLIED_TECH = new Set(["Vitest", "npm", "NewsAPI", "TMDB API", "Vobiz", "Expo", "GitHub Pages", "Tailwind"]);
  const resumeSkills = new Set(SKILL_GROUPS.flatMap((g) => g.items));

  test("every artifact has the required fields and no placeholder copy", () => {
    const filler = /lorem|ipsum|\bTBD\b|\bTODO\b|coming soon|N\/A|example\.com|undefined|null/i;
    ARTIFACTS.forEach((a) => {
      ["slug", "name", "status", "category", "shortDescription"].forEach((key) => {
        expect(typeof a[key]).toBe("string");
        expect(a[key].trim()).not.toBe("");
      });
      expect(STATUSES[a.status]).toBeDefined();
      expect(a.technologies.length).toBeGreaterThan(0);
      expect(a.links.length).toBeGreaterThan(0);
      a.links.forEach((l) => {
        expect(l.href).toMatch(/^https:\/\//);
        expect(LINK_KINDS[l.kind]).toBeDefined();
      });
      // Optional fields are omitted, never present but empty.
      ["year", "problem", "subtitle", "statusDetail"].forEach((key) => {
        if (key in a) expect(String(a[key]).trim()).not.toBe("");
      });
      ["work", "approach", "results"].forEach((key) => {
        if (key in a) expect(a[key].length).toBeGreaterThan(0);
      });
      expect(JSON.stringify(a)).not.toMatch(filler);
    });
    expect(new Set(ARTIFACTS.map((a) => a.slug)).size).toBe(ARTIFACTS.length);
  });

  test("leaves out install counts, confidential relationships, and unverified projects", () => {
    const all = JSON.stringify(ARTIFACTS);
    expect(all).not.toMatch(/\binstalls?\b|retention|\d[\d,+]*\s*(users|downloads|customers)/i);
    expect(all).not.toMatch(/\b(MonoCloud|Squark|NDA|confidential|HP|Mphasis)\b/i);
    expect(ARTIFACTS.map((a) => a.slug)).not.toContain("docuchat");
    expect(ARTIFACTS.map((a) => a.slug)).not.toContain("byoc-platform");
  });

  test("every technology is backed by config, the resume, or the supplied project summaries", () => {
    ARTIFACTS.forEach((a) => {
      a.technologies.forEach((tech) => {
        const backed = KNOWN_TECH.has(tech) || resumeSkills.has(tech) || SUPPLIED_TECH.has(tech) || config.marqueeItems.includes(tech);
        expect({ artifact: a.slug, tech, backed }).toEqual({ artifact: a.slug, tech, backed: true });
      });
    });
  });

  test("links match the verified URLs", () => {
    const hrefs = (slug) => findArtifact(slug).links.map((l) => l.href);
    expect(hrefs("remora")).toEqual([
      "https://remora.watch",
      "https://github.com/PrashastVats1/remora",
      "https://www.npmjs.com/package/remora-engine",
    ]);
    expect(hrefs("ai-agent-auth-gateway")).toEqual([
      "https://ai-agent-auth-frontend-ch6m-one.vercel.app",
      "https://github.com/PrashastVats1/ai-agent-auth-backend",
      "https://github.com/PrashastVats1/ai-agent-auth-frontend",
    ]);
    expect(hrefs("priya")).toEqual(["https://voice-agent-nubn.onrender.com"]);
    expect(hrefs("event-intelligence")).toEqual(["https://ai-event-intelligence.vercel.app"]);
    expect(hrefs("movie-discovery")).toEqual(["https://movie-app-react-native-project.vercel.app/"]);
    expect(hrefs("dnd-guide")).toEqual(["https://prashastvats1.github.io/dnd-guide", "https://github.com/PrashastVats1/dnd-guide"]);
  });
});
