import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import config from "../config";
import { TRANSITION_TIMINGS } from "../transition/transitionConfig";
import { ARTIFACTS, IDENTITY, KNOWN_TECH, SCHOOLS } from "../pages/home/homeContent";

jest.mock("../generated/assetManifest", () => ({ __esModule: true, default: [] }));

const EMOJI = /\p{Extended_Pictographic}/u;

function renderHome(width = 1280) {
  window.__viewportWidth = width;
  window.history.replaceState(null, "", "/#/home");
  return render(<App />);
}

const book = () => screen.getByTestId("spellbook");
const controls = () => screen.getByRole("navigation", { name: "Spellbook pages" });
const nextButton = () => within(controls()).getByRole("button", { name: "Next page" });
const prevButton = () => within(controls()).getByRole("button", { name: "Previous page" });
const status = () => book().querySelector(".pv-book-controls__count").textContent;
const currentPages = () => [...book().querySelectorAll('[data-state="current"]')].map((p) => p.dataset.page);
const pagesArea = () => book().querySelector(".pv-book__pages");

function finishTransition(mode) {
  const t = TRANSITION_TIMINGS[mode];
  act(() => jest.advanceTimersByTime(t.cover + t.hold + t.reveal));
}

describe("spellbook home: desktop spread", () => {
  test("opens on the identity and welcome spread", () => {
    renderHome();
    expect(book()).toHaveAttribute("data-layout", "spread");
    expect(currentPages()).toEqual(["identity", "welcome"]);
    expect(status()).toBe("Pages 1–2 of 4");
    expect(screen.getByRole("heading", { level: 2, name: config.name })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Welcome, Traveller" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Schools of Magic" })).not.toBeInTheDocument();
    expect(prevButton()).toBeDisabled();
    expect(nextButton()).toBeEnabled();
  });

  test("shows the professional identity in plain terms", () => {
    renderHome();
    expect(screen.getByText(IDENTITY.title, { selector: ".pv-page-header__plain" })).toBeInTheDocument();
    expect(screen.getByText("Software Archmage")).toBeInTheDocument();
    expect(screen.getByText(config.tagline)).toBeInTheDocument();
    expect(screen.getByText("3+ years")).toBeInTheDocument();
    expect(screen.getByText(config.location)).toBeInTheDocument();
  });

  test("next and previous buttons turn spreads and announce them", () => {
    renderHome();
    fireEvent.click(nextButton());
    expect(currentPages()).toEqual(["schools", "artifacts"]);
    expect(status()).toBe("Pages 3–4 of 4");
    expect(book()).toHaveAttribute("data-direction", "next");
    expect(nextButton()).toBeDisabled();
    expect(prevButton()).toHaveFocus();
    expect(screen.getByText("Pages 3–4 of 4: What I build and What I have built")).toBeInTheDocument();

    fireEvent.click(prevButton());
    expect(currentPages()).toEqual(["identity", "welcome"]);
    expect(book()).toHaveAttribute("data-direction", "prev");
    expect(nextButton()).toHaveFocus();
  });

  test("arrow keys turn pages while focus is inside the book", () => {
    renderHome();
    nextButton().focus();
    fireEvent.keyDown(nextButton(), { key: "ArrowRight" });
    expect(currentPages()).toEqual(["schools", "artifacts"]);
    fireEvent.keyDown(prevButton(), { key: "ArrowLeft" });
    expect(currentPages()).toEqual(["identity", "welcome"]);
  });

  test("arrow keys outside the book are ignored", () => {
    renderHome();
    fireEvent.keyDown(document.body, { key: "ArrowRight" });
    expect(currentPages()).toEqual(["identity", "welcome"]);
  });

  test("the curled page corner turns the page", () => {
    renderHome();
    expect(book().querySelector(".pv-book__corner--prev")).toBeNull();
    fireEvent.click(book().querySelector(".pv-book__corner--next"));
    expect(currentPages()).toEqual(["schools", "artifacts"]);
    expect(book().querySelector(".pv-book__corner--next")).toBeNull();
    fireEvent.click(book().querySelector(".pv-book__corner--prev"));
    expect(currentPages()).toEqual(["identity", "welcome"]);
  });

  test("page corners are hidden from assistive tech and the tab order", () => {
    renderHome();
    const corner = book().querySelector(".pv-book__corner--next");
    expect(corner).toHaveAttribute("aria-hidden", "true");
    expect(corner).toHaveAttribute("tabindex", "-1");
  });

  test("turning a page does not trigger the global route transition", () => {
    renderHome();
    fireEvent.click(nextButton());
    expect(screen.queryByTestId("page-transition")).not.toBeInTheDocument();
    expect(window.location.hash).toBe("#/home");
  });

  test("second spread lists what Prashast builds and has built", () => {
    renderHome();
    fireEvent.click(nextButton());
    SCHOOLS.forEach((school) => {
      expect(screen.getByRole("heading", { level: 3, name: school.title })).toBeInTheDocument();
    });
    ARTIFACTS.forEach((artifact) => {
      expect(screen.getByRole("heading", { level: 3, name: new RegExp(artifact.name) })).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: /Hall of Artifacts \(Projects\)/ })).toHaveAttribute("href", "#/projects");
  });
});

describe("spellbook home: calls to action", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("primary CTA opens the Character Record through the global transition", () => {
    renderHome();
    fireEvent.click(screen.getByRole("link", { name: /Open the Character Record/ }));
    expect(screen.getByTestId("page-transition")).toBeInTheDocument();
    finishTransition("full");
    expect(window.location.hash).toBe("#/resume");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Character Record");
  });

  test("secondary CTA enters the Hall of Artifacts through the global transition", () => {
    renderHome();
    fireEvent.click(screen.getByRole("link", { name: /Enter the Hall of Artifacts/ }));
    expect(screen.getByTestId("page-transition")).toBeInTheDocument();
    finishTransition("full");
    expect(window.location.hash).toBe("#/projects");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hall of Artifacts");
  });

  test("CTAs carry plain-language hints", () => {
    renderHome();
    expect(screen.getByRole("link", { name: /Open the Character Record/ })).toHaveTextContent("View my resume");
    expect(screen.getByRole("link", { name: /Enter the Hall of Artifacts/ })).toHaveTextContent("See what I've built");
  });

  test("leaving and returning to Home reopens the book at the first spread", () => {
    renderHome();
    fireEvent.click(nextButton());
    fireEvent.click(screen.getByRole("link", { name: /Hall of Artifacts \(Projects\)/ }));
    finishTransition("full");
    fireEvent.click(within(screen.getByRole("navigation", { name: "Main" })).getByRole("link", { name: /The Spellbook/ }));
    finishTransition("full");
    expect(currentPages()).toEqual(["identity", "welcome"]);
  });
});

describe("spellbook home: single-page layout", () => {
  test.each([375, 768, 1023])("shows one page at a time at %ipx", (width) => {
    renderHome(width);
    expect(book()).toHaveAttribute("data-layout", "single");
    expect(currentPages()).toEqual(["identity"]);
    expect(status()).toBe("Page 1 of 4");
  });

  test("spread begins at 1024px", () => {
    renderHome(1024);
    expect(book()).toHaveAttribute("data-layout", "spread");
  });

  test("next and previous move one page at a time", () => {
    renderHome(375);
    ["welcome", "schools", "artifacts"].forEach((id, i) => {
      fireEvent.click(nextButton());
      expect(currentPages()).toEqual([id]);
      expect(status()).toBe(`Page ${i + 2} of 4`);
    });
    expect(nextButton()).toBeDisabled();
    fireEvent.click(prevButton());
    expect(currentPages()).toEqual(["schools"]);
  });

  test("a horizontal swipe turns the page; a vertical scroll does not", () => {
    renderHome(375);
    fireEvent.touchStart(pagesArea(), { touches: [{ clientX: 300, clientY: 300 }] });
    fireEvent.touchEnd(pagesArea(), { changedTouches: [{ clientX: 160, clientY: 310 }] });
    expect(currentPages()).toEqual(["welcome"]);

    fireEvent.touchStart(pagesArea(), { touches: [{ clientX: 200, clientY: 400 }] });
    fireEvent.touchEnd(pagesArea(), { changedTouches: [{ clientX: 140, clientY: 150 }] });
    expect(currentPages()).toEqual(["welcome"]);

    fireEvent.touchStart(pagesArea(), { touches: [{ clientX: 100, clientY: 300 }] });
    fireEvent.touchEnd(pagesArea(), { changedTouches: [{ clientX: 260, clientY: 300 }] });
    expect(currentPages()).toEqual(["identity"]);
  });
});

describe("spellbook home: reduced motion", () => {
  test("marks the book for reduced motion and still turns pages", () => {
    window.__reducedMotion = true;
    renderHome();
    expect(book()).toHaveAttribute("data-motion", "reduced");
    fireEvent.click(nextButton());
    expect(currentPages()).toEqual(["schools", "artifacts"]);
  });

  test("uses full motion by default", () => {
    renderHome();
    expect(book()).toHaveAttribute("data-motion", "full");
  });
});

describe("spellbook home: content accuracy", () => {
  test("every technology listed on Home exists in config", () => {
    SCHOOLS.flatMap((s) => s.tech).forEach((tech) => {
      expect(KNOWN_TECH.has(tech)).toBe(true);
    });
  });

  test("artifacts are the featured projects from config, in order", () => {
    expect(ARTIFACTS).toHaveLength(config.featuredProjects.length);
    ARTIFACTS.forEach((artifact, i) => {
      expect(config.featuredProjects[i].name.startsWith(artifact.name)).toBe(true);
    });
  });

  test("identity facts come from config", () => {
    const current = config.experience.find((e) => /present/i.test(e.period));
    expect(IDENTITY.facts).toEqual([
      { label: "Experience", value: "3+ years" },
      { label: "Currently", value: `${current.role}, ${current.company}` },
      { label: "Based in", value: config.location },
    ]);
  });

  test("no emoji in Home content or rendered Home text", () => {
    expect(JSON.stringify({ IDENTITY, SCHOOLS, ARTIFACTS })).not.toMatch(EMOJI);
    renderHome();
    expect(book().textContent).not.toMatch(EMOJI);
    fireEvent.click(nextButton());
    expect(book().textContent).not.toMatch(EMOJI);
  });

  test("Home renders no image elements while no artwork is supplied", () => {
    renderHome();
    expect(document.querySelector("img")).toBeNull();
  });
});
