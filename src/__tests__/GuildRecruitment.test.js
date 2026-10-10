import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import config from "../config";
import { ARTIFACTS } from "../pages/projects/artifacts";
import { BASIS, CODE, ENGAGEMENTS, PROOF, TRADES } from "../pages/hire/guildContent";
import { TRANSITION_TIMINGS } from "../transition/transitionConfig";

// Only the avatars exist: the hire scene slot must fall back to the designed hall.
jest.mock("../generated/assetManifest", () => ({
  __esModule: true,
  default: ["avatar/regular.webp", "avatar/scholar.webp"],
}));

function renderAt(hash) {
  window.history.replaceState(null, "", `/${hash}`);
  return render(<App />);
}

const FIVERR_GIG = "https://www.fiverr.com/prashast_vats/build-a-custom-full-stack-website-using-react-and-python";

const nav = () => screen.getByRole("navigation", { name: "Main" });
const navLink = (label) => within(nav()).getByRole("link", { name: new RegExp(label) });
const h1 = () => screen.getByRole("heading", { level: 1 });
const overlay = () => document.querySelector(".pv-transition");
const notice = () => document.querySelector(".pv-notice");
const section = (name) => screen.getByRole("heading", { level: 2, name: new RegExp(name) }).closest("section");
const main = () => document.getElementById("main-content");

function finishTransition(mode) {
  const t = TRANSITION_TIMINGS[mode];
  act(() => jest.advanceTimersByTime(t.cover + t.hold + t.reveal));
}

describe("the recruitment notice", () => {
  test("renders as an unframed guild hall with the hire tab active", () => {
    renderAt("#/hire");
    expect(h1()).toHaveTextContent("Guild Recruitment");
    expect(screen.getByText("Contact & Hire Me")).toBeInTheDocument();
    expect(screen.getByText("Does thy guild have a quest worthy of an Archmage?")).toBeInTheDocument();
    expect(navLink("Guild Recruitment")).toHaveAttribute("aria-current", "page");
    expect(document.querySelector(".pv-parchment")).toBeNull();
    expect(document.querySelector(".pv-guild")).toBeInTheDocument();
    expect(document.title).toBe("Guild Recruitment (Hire Me) | Prashast Vats");
  });

  test("falls back to the CSS hall when no scene artwork exists, and never renders a broken image", () => {
    renderAt("#/hire");
    expect(document.querySelector(".pv-guild-scene")).toBeNull();
    expect(document.querySelector(".pv-guild--scene")).toBeNull();
    const images = [...main().querySelectorAll("img")].map((img) => img.getAttribute("src"));
    expect(images).toEqual([expect.stringMatching(/avatar\/regular\.webp$/)]);
  });

  test("shows the regular avatar with descriptive alt text", () => {
    renderAt("#/hire");
    const portrait = notice().querySelector(".pv-notice__portrait img");
    expect(portrait.getAttribute("alt")).toBe("Portrait of Prashast Vats as a software archmage");
    expect(within(notice()).getByText(`Software Engineer, ${config.location}`)).toBeInTheDocument();
  });

  test("the primary call to action emails me, with plain supporting text", () => {
    renderAt("#/hire");
    const invite = within(notice()).getByRole("link", { name: /Invite me to thy party/ });
    expect(invite).toHaveAttribute("href", `mailto:${config.email}`);
    expect(invite).toHaveTextContent("Email me directly");
    expect(invite).toHaveClass("pv-button--primary");
    // The first actionable control in the notice is the invitation.
    expect(within(notice()).getAllByRole("link")[0]).toBe(invite);
  });

  test("LinkedIn opens safely in a new tab and the resume downloads", () => {
    renderAt("#/hire");
    const guild = within(notice()).getByRole("link", { name: /Consult the guild/ });
    expect(guild).toHaveAttribute("href", config.linkedin);
    expect(guild).toHaveAttribute("target", "_blank");
    expect(guild).toHaveAttribute("rel", "noreferrer");
    expect(guild).toHaveTextContent("(opens in a new tab)");

    const record = within(notice()).getByRole("link", { name: /Summon my record/ });
    expect(record).toHaveAttribute("href", config.resumeFile);
    expect(record).toHaveAttribute("download", "Prashast_Vats_Resume.pdf");
  });

  test("shows the email address as text", () => {
    renderAt("#/hire");
    expect(within(notice()).getByRole("link", { name: config.email })).toHaveAttribute("href", `mailto:${config.email}`);
  });
});

describe("copying the address", () => {
  const original = navigator.clipboard;
  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", { value: original, configurable: true });
  });

  test("is hidden where the Clipboard API is unavailable", () => {
    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
    renderAt("#/hire");
    expect(screen.queryByRole("button", { name: "Copy address" })).toBeNull();
  });

  test("copies the address and announces it", async () => {
    const writeText = jest.fn(() => Promise.resolve());
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    renderAt("#/hire");
    fireEvent.click(screen.getByRole("button", { name: "Copy address" }));
    expect(writeText).toHaveBeenCalledWith(config.email);
    expect(await screen.findByRole("status")).toHaveTextContent("Email address copied.");
  });

  test("reports a failed copy instead of claiming success", async () => {
    const writeText = jest.fn(() => Promise.reject(new Error("denied")));
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    renderAt("#/hire");
    fireEvent.click(screen.getByRole("button", { name: "Copy address" }));
    expect(await screen.findByText("Could not copy. Select the address instead.")).toBeInTheDocument();
  });
});

describe("what I can help with", () => {
  test("lists every trade with its evidence basis", () => {
    renderAt("#/hire");
    const trades = section("The Archmage's Trades");
    expect(within(trades).getByText("What I can help with")).toBeInTheDocument();
    for (const trade of TRADES) {
      const item = within(trades).getByRole("heading", { level: 3, name: trade.title }).closest("li");
      expect(item).toHaveTextContent(`Experience from: ${BASIS[trade.basis]}`);
      for (const line of trade.evidence) expect(item).toHaveTextContent(line);
    }
  });

  test("does not present every area as professional experience", () => {
    const bases = new Set(TRADES.map((t) => t.basis));
    expect(bases.has("independent")).toBe(true);
    expect(TRADES.find((t) => t.id === "security").basis).toBe("independent");
  });

  test("links to the full resume page", () => {
    renderAt("#/hire");
    expect(within(section("The Archmage's Trades")).getByRole("link", { name: /Character Record/ })).toHaveAttribute("href", "#/resume");
  });
});

describe("proof of work", () => {
  test("shows a small selection drawn from the project records", () => {
    renderAt("#/hire");
    const proof = section("Quests Completed");
    const items = within(proof).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    for (const item of PROOF) {
      const artifact = ARTIFACTS.find((a) => a.slug === item.slug);
      const card = within(proof).getByRole("heading", { level: 3, name: artifact.name }).closest("li");
      expect(card).toHaveTextContent(artifact.shortDescription);
      expect(within(card).getByRole("link", { name: `Project record for ${artifact.name}` })).toHaveAttribute("href", `#/projects/${artifact.slug}`);
      const external = within(card).getByRole("link", { name: /opens in a new tab/ });
      expect(external).toHaveAttribute("href", artifact.links[0].href);
      expect(external).toHaveAttribute("rel", "noreferrer");
      if (artifact.results) expect(card).toHaveTextContent(artifact.results[0]);
    }
    expect(within(proof).getByRole("link", { name: /Hall of Artifacts/ })).toHaveAttribute("href", "#/projects");
  });
});

describe("how I work and ways to work together", () => {
  test("lists the working principles and every kind of engagement", () => {
    renderAt("#/hire");
    const code = section("The Guild Code");
    expect(within(code).getByText("How I work")).toBeInTheDocument();
    expect(within(code).getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(CODE.map((c) => c.title));

    const terms = section("Terms of Engagement");
    expect(within(terms).getByText("Ways to work together")).toBeInTheDocument();
    expect(within(terms).getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(ENGAGEMENTS.map((e) => e.title));
    expect(terms).toHaveTextContent(/Full-time/);
    expect(terms).toHaveTextContent(/Freelance/);
    expect(terms).toHaveTextContent(/Collaborations/);
  });

  test("the freelance entry links to the public Fiverr gig in a new tab", () => {
    renderAt("#/hire");
    const freelance = within(section("Terms of Engagement")).getByRole("heading", { level: 3, name: /Freelance/ }).closest("li");
    const gig = within(freelance).getByRole("link", { name: /Commission a guild artisan/ });
    expect(gig).toHaveAttribute("href", FIVERR_GIG);
    expect(gig).toHaveAttribute("target", "_blank");
    expect(gig).toHaveAttribute("rel", "noopener noreferrer");
    expect(gig).toHaveTextContent("Find me on Fiverr");
    expect(gig).toHaveTextContent("(opens in a new tab)");
  });
});

describe("Fiverr", () => {
  test("config holds the public gig page, not the seller dashboard", () => {
    expect(config.fiverr).toBe(FIVERR_GIG);
    expect(config.fiverr).not.toMatch(/seller_dashboard|\/users\/|\/manage/);
  });
});

describe("the closing contract", () => {
  test("ends with an email invitation and the verified contact ledger", () => {
    renderAt("#/hire");
    const contract = section("Seal the Contract");
    expect(within(contract).getByRole("link", { name: /Send a raven/ })).toHaveAttribute("href", `mailto:${config.email}`);
    const ledger = within(contract).getByRole("list", { name: "Contact details" });
    expect(within(ledger).getByRole("link", { name: config.email })).toHaveAttribute("href", `mailto:${config.email}`);
    expect(within(ledger).getByRole("link", { name: /linkedin\.com/ })).toHaveAttribute("href", config.linkedin);
    expect(within(ledger).getByRole("link", { name: /github\.com/ })).toHaveAttribute("href", config.github);
    const fiverr = within(ledger).getByRole("link", { name: /fiverr\.com/ });
    expect(fiverr).toHaveAttribute("href", FIVERR_GIG);
    expect(fiverr).toHaveAttribute("target", "_blank");
    expect(fiverr).toHaveAttribute("rel", "noopener noreferrer");
    expect(fiverr.closest("li")).toHaveTextContent(/^Fiverr/);
    expect(within(ledger).getByRole("link", { name: /Resume\.pdf/ })).toHaveAttribute("href", config.resumeFile);
    expect(ledger).toHaveTextContent(config.location);
  });

  test("the contract is the last section on the page", () => {
    renderAt("#/hire");
    const sections = main().querySelectorAll(".pv-guild__content > section");
    expect(sections[sections.length - 1]).toBe(section("Seal the Contract"));
  });
});

describe("honesty guards", () => {
  test("shows no phone number, form, unverified freelance platform, or fabricated claims", () => {
    renderAt("#/hire");
    const page = main();
    expect(page.querySelector('a[href^="tel:"]')).toBeNull();
    expect(page).not.toHaveTextContent(config.phone);
    expect(page.querySelector("form, input, textarea")).toBeNull();
    expect(page.querySelector('a[href*="upwork"], a[href*="toptal"], a[href*="freelancer"]')).toBeNull();
    for (const link of page.querySelectorAll('a[href*="fiverr"]')) {
      expect(link).toHaveAttribute("href", FIVERR_GIG);
    }
    expect(page).not.toHaveTextContent(/testimonial|salary|per hour|\/hr|available from|immediately available/i);
  });

  test("every link has a real destination", () => {
    renderAt("#/hire");
    for (const link of main().querySelectorAll("a")) {
      const href = link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).not.toBe("#");
      expect(href).not.toMatch(/^javascript:/);
    }
  });

  test("headings follow one h1 then h2 sections then h3 entries", () => {
    renderAt("#/hire");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.querySelector(".pv-guild-heading__title").textContent)).toEqual([
      "The Archmage's Trades",
      "Quests Completed",
      "The Guild Code",
      "Terms of Engagement",
      "Seal the Contract",
    ]);
  });

  test("decorative seals and nails are hidden from assistive technology", () => {
    renderAt("#/hire");
    for (const el of main().querySelectorAll(".pv-seal, .pv-notice__nail, .pv-guild__beam")) {
      expect(el).toHaveAttribute("aria-hidden", "true");
    }
  });
});

describe("navigation", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("arriving from the nav uses the global transition and focuses the page", () => {
    renderAt("#/home");
    fireEvent.click(navLink("Guild Recruitment"));
    expect(overlay()).toHaveAttribute("data-mode", "full");
    finishTransition("full");
    expect(h1()).toHaveTextContent("Guild Recruitment");
    expect(main()).toHaveFocus();
  });

  test("reduced-motion users get the reduced transition", () => {
    window.__reducedMotion = true;
    renderAt("#/home");
    fireEvent.click(navLink("Guild Recruitment"));
    expect(overlay()).toHaveAttribute("data-mode", "reduced");
    finishTransition("reduced");
    expect(h1()).toHaveTextContent("Guild Recruitment");
    window.__reducedMotion = false;
  });

  test("a proof-of-work link opens that project's record", () => {
    renderAt("#/hire");
    fireEvent.click(screen.getByRole("link", { name: "Project record for Remora" }));
    finishTransition("full");
    expect(window.location.hash).toBe("#/projects/remora");
    expect(h1()).toHaveTextContent("Remora");
  });
});
