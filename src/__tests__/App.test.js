import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import { NAV_ITEMS } from "../navigation";
import { TRANSITION_TIMINGS } from "../transition/transitionConfig";

// Tests run as if no optional art or audio has been supplied yet.
jest.mock("../generated/assetManifest", () => ({ __esModule: true, default: [] }));

function renderAt(hash) {
  window.history.replaceState(null, "", hash ? `/${hash}` : "/");
  return render(<App />);
}

const nav = () => screen.getByRole("navigation", { name: "Main" });
const navLink = (label) => within(nav()).getByRole("link", { name: new RegExp(label) });
const heading = () => screen.getByRole("heading", { level: 1 });

function finishTransition(mode) {
  const t = TRANSITION_TIMINGS[mode];
  act(() => jest.advanceTimersByTime(t.cover + t.hold + t.reveal));
}

describe("routing", () => {
  test("redirects the bare URL to #/home", () => {
    renderAt("");
    expect(window.location.hash).toBe("#/home");
    expect(heading()).toHaveTextContent("Prashast Vats");
  });

  const expectedHeadings = {
    home: "Prashast Vats",
    resume: "Character Record",
    projects: "Hall of Artifacts",
    tools: "Wizard's Laboratory",
    blog: "Archmage's Notes",
    hire: "Guild Recruitment",
  };

  test.each(NAV_ITEMS.map((item) => [item.path, item.id]))("direct navigation to #%s loads its page", (path, id) => {
    renderAt(`#${path}`);
    expect(heading()).toHaveTextContent(expectedHeadings[id]);
    expect(navLink(NAV_ITEMS.find((i) => i.id === id).label)).toHaveAttribute("aria-current", "page");
  });

  test("blog article URLs stay on the blog section", () => {
    renderAt("#/blog/the-loop-is-tightening");
    expect(heading()).toHaveTextContent("Archmage's Notes");
  });

  test("unknown routes show the not-found page", () => {
    renderAt("#/nowhere");
    expect(heading()).toHaveTextContent("A Blank Page");
  });

  test("every nav link pairs a fantasy label with a plain label", () => {
    renderAt("#/home");
    NAV_ITEMS.forEach((item) => {
      expect(navLink(item.label)).toHaveTextContent(item.plain);
    });
  });
});

describe("page transitions", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("navigation plays a transition, swaps the page underneath, then clears", () => {
    renderAt("#/home");
    fireEvent.click(navLink("Character Record"));

    const overlay = screen.getByTestId("page-transition");
    expect(overlay).toHaveAttribute("data-mode", "full");
    expect(heading()).toHaveTextContent("Prashast Vats");

    act(() => jest.advanceTimersByTime(TRANSITION_TIMINGS.full.cover));
    expect(heading()).toHaveTextContent("Character Record");
    expect(window.location.hash).toBe("#/resume");

    finishTransition("full");
    expect(screen.queryByTestId("page-transition")).not.toBeInTheDocument();
    expect(navLink("Character Record")).toHaveAttribute("aria-current", "page");
    expect(navLink("The Spellbook")).not.toHaveAttribute("aria-current");
  });

  test("first two navigations are full, later ones short", () => {
    renderAt("#/home");
    const modes = [];
    ["Character Record", "Hall of Artifacts", "Wizard's Laboratory"].forEach((label) => {
      fireEvent.click(navLink(label));
      const mode = screen.getByTestId("page-transition").getAttribute("data-mode");
      modes.push(mode);
      finishTransition(mode);
    });
    expect(modes).toEqual(["full", "full", "short"]);
  });

  test("clicking the overlay skips straight to the destination", () => {
    renderAt("#/home");
    fireEvent.click(navLink("Guild Recruitment"));
    fireEvent.click(screen.getByRole("button", { name: "Skip page transition" }));
    expect(screen.queryByTestId("page-transition")).not.toBeInTheDocument();
    expect(heading()).toHaveTextContent("Guild Recruitment");
  });

  test("Escape skips the transition", () => {
    renderAt("#/home");
    fireEvent.click(navLink("Archmage's Notes"));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("page-transition")).not.toBeInTheDocument();
    expect(heading()).toHaveTextContent("Archmage's Notes");
  });

  test("reduced-motion users get the reduced transition", () => {
    window.__reducedMotion = true;
    renderAt("#/home");
    fireEvent.click(navLink("Hall of Artifacts"));
    expect(screen.getByTestId("page-transition")).toHaveAttribute("data-mode", "reduced");
    finishTransition("reduced");
    expect(heading()).toHaveTextContent("Hall of Artifacts");
  });

  test("clicking the current page does not transition", () => {
    renderAt("#/home");
    fireEvent.click(navLink("The Spellbook"));
    expect(screen.queryByTestId("page-transition")).not.toBeInTheDocument();
  });
});

describe("audio", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("does not autoplay", () => {
    renderAt("#/home");
    const button = screen.getByRole("button", { name: /Play ambience/ });
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  test("play state persists across navigation", () => {
    renderAt("#/home");
    fireEvent.click(screen.getByRole("button", { name: /Play ambience/ }));
    expect(screen.getByRole("button", { name: /Stop ambience/ })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(navLink("Hall of Artifacts"));
    finishTransition("full");
    expect(heading()).toHaveTextContent("Hall of Artifacts");
    expect(screen.getByRole("button", { name: /Stop ambience/ })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("avatar", () => {
  test("renders the designed crest fallback when no artwork is supplied", () => {
    renderAt("#/home");
    expect(screen.getByRole("img", { name: "Prashast Vats as a software archmage" }).tagName.toLowerCase()).toBe("svg");
    expect(document.querySelector("img")).toBeNull();
  });
});
