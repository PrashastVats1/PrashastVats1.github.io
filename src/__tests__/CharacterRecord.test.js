import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import config from "../config";
import { KNOWN_TECH } from "../pages/home/homeContent";
import { entryMatch } from "../pages/resume/abilityMatch";
import { ABILITIES, ALL_ENTRIES, SKILL_GROUPS } from "../pages/resume/resumeContent";
import { TRANSITION_TIMINGS } from "../transition/transitionConfig";

// The owner has supplied avatar/regular.png.
jest.mock("../generated/assetManifest", () => ({ __esModule: true, default: ["avatar/regular.png"] }));

function renderRecord() {
  window.history.replaceState(null, "", "/#/resume");
  return render(<App />);
}

const entry = (id) => document.querySelector(`[data-entry="${id}"]`);
const abilityButton = (name) => within(screen.getByRole("group", { name: /Select an ability/ })).getByRole("button", { name });
const liveText = () => document.querySelector(".pv-abilities [aria-live]").textContent;
const recordText = () => document.querySelector(".pv-record").textContent;

describe("Character Record", () => {
  test("renders the identity with the real profession ahead of the fantasy class", () => {
    renderRecord();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Character Record");
    expect(h1).toHaveTextContent("Prashast Vats");

    const profession = document.querySelector(".pv-record__profession");
    const fantasy = document.querySelector(".pv-record__class");
    expect(profession).toHaveTextContent(/^Software Engineer$/);
    expect(fantasy).toHaveTextContent("Software Archmage");
    expect(profession.compareDocumentPosition(fantasy) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("3+ years")).toBeInTheDocument();
    expect(screen.getByText("Bangalore, India")).toBeInTheDocument();
  });

  test("shows every professional section", () => {
    renderRecord();
    [
      "The Tale So Far",
      "Quest Chronicle",
      "Employment",
      "Consulting Experience",
      "Independent Quests",
      "Abilities",
      "Certifications & Seals",
      "Honours",
      "Education",
    ].forEach((name) => expect(screen.getByRole("heading", { name })).toBeInTheDocument());
    expect(screen.getByText("Manipal Institute of Technology · 2018 – 2022")).toBeInTheDocument();
    expect(screen.getByText("Mphasis TalentNext")).toBeInTheDocument();
  });
});

describe("information hierarchy", () => {
  const follows = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
  const heading = (name) => screen.getByRole("heading", { name });

  test("sections appear in order: summary, filter, chronicle, quests, then credentials with education last", () => {
    renderRecord();
    const order = [
      heading("The Tale So Far"),
      screen.getByRole("group", { name: /Select an ability/ }),
      heading("Quest Chronicle"),
      heading("Employment"),
      heading("Consulting Experience"),
      heading("Independent Quests"),
      heading("Abilities"),
      heading("Certifications & Seals"),
      heading("Honours"),
      heading("Education"),
    ];
    order.reduce((prev, el) => {
      expect(follows(prev, el)).toBe(true);
      return el;
    });
    expect(follows(entry("byoc-platform"), heading("Independent Quests"))).toBe(true);
    expect(follows(screen.getByRole("link", { name: /Hall of Artifacts \(Projects\)/ }), heading("Abilities"))).toBe(true);
  });

  test("Independent Quests is a main section, not a sidebar", () => {
    renderRecord();
    expect(document.querySelector(".pv-record aside")).toBeNull();
    const quests = heading("Independent Quests");
    expect(quests.tagName).toBe("H2");
    const section = quests.closest("section");
    ["remora", "priya", "event-intelligence", "movie-discovery"].forEach((id) => expect(section).toContainElement(entry(id)));
    expect(within(section).getByRole("link", { name: /Hall of Artifacts \(Projects\)/ })).toHaveAttribute("href", "#/projects");
  });

  test("Education is a compact line with only degree, institution and years", () => {
    renderRecord();
    const section = heading("Education").closest("section");
    expect(section.querySelector("ul, ol, dl, article")).toBeNull();
    expect(section.textContent).toBe(
      "EducationB.Tech, Electronics & Instrumentation EngineeringManipal Institute of Technology · 2018 – 2022"
    );
    expect(recordText()).not.toMatch(/Class 1[02]|CGPA|percentage|marks|school/i);
  });

  test("current role matches the resume: Mphasis employer, HP as the engagement", () => {
    renderRecord();
    expect(screen.getByText("Software Engineer, Mphasis Ltd. (HP Inc. engagement), since May 2023")).toBeInTheDocument();
    const mphasis = entry("mphasis");
    expect(within(mphasis).getByRole("heading", { level: 4 })).toHaveTextContent("Mphasis Ltd. (HP Inc. engagement)");
    expect(within(mphasis).getByText("Current role")).toBeInTheDocument();
    expect(within(mphasis).getByText("May 2023 – Present")).toBeInTheDocument();
    expect(recordText()).not.toMatch(/Senior/);
    expect(recordText()).not.toMatch(/Software Engineer at HP/);
  });

  test("renders employment, consulting with the resume's anonymized names, and projects", () => {
    renderRecord();
    ["mphasis", "identity-platform", "byoc-platform", "remora", "priya", "event-intelligence", "movie-discovery"].forEach((id) =>
      expect(entry(id)).toBeInTheDocument()
    );
    expect(within(entry("identity-platform")).getByRole("heading")).toHaveTextContent("Identity Infrastructure Platform");
    expect(within(entry("byoc-platform")).getByRole("heading")).toHaveTextContent("BYOC Cloud Infrastructure Platform");
    expect(recordText()).not.toMatch(/MonoCloud|Squark|NDA|confidential/i);
  });

  test("leaves out details the owner chose not to publish", () => {
    renderRecord();
    expect(recordText()).not.toMatch(/installs/i);
    expect(recordText()).not.toMatch(/CGPA|7\.06/);
    expect(recordText()).not.toContain("63631");
  });

  test("uses professional language, not RPG stats", () => {
    renderRecord();
    expect(recordText()).not.toMatch(/\bLevel\b|hit points|\bmana\b|strength|dexterity|constitution|alignment/i);
    expect(recordText()).not.toMatch(/\p{Extended_Pictographic}/u);
  });
});

describe("ability filter", () => {
  test("starts on All with the full record", () => {
    renderRecord();
    expect(abilityButton("All abilities")).toHaveAttribute("aria-pressed", "true");
    expect(document.querySelector(".pv-abilities__count")).toHaveTextContent(`Showing the full record: all ${ALL_ENTRIES.length} entries.`);
    expect(liveText()).toBe("");
    document.querySelectorAll("[data-entry]").forEach((el) => expect(el).toHaveAttribute("data-match", "all"));
    expect(screen.queryByRole("button", { name: "Clear filter" })).not.toBeInTheDocument();
  });

  test("selecting a technology shows only the matching evidence", () => {
    renderRecord();
    fireEvent.click(abilityButton("Python"));

    expect(abilityButton("Python")).toHaveAttribute("aria-pressed", "true");
    expect(abilityButton("All abilities")).toHaveAttribute("aria-pressed", "false");
    expect(document.querySelector(".pv-abilities__count")).toHaveTextContent("Python: 3 of 7 entries reveal this ability.");
    expect(liveText()).toBe("Python: 3 of 7 entries reveal this ability.");

    // Only the matching achievements remain, each labelled with why it matches.
    const mphasis = entry("mphasis");
    expect(mphasis).toHaveAttribute("data-match", "match");
    expect(within(mphasis).getByText("Reveals Python:")).toBeInTheDocument();
    const items = mphasis.querySelectorAll(".pv-entry__item");
    expect(items).toHaveLength(2);
    items.forEach((item) => {
      expect(item).toHaveAttribute("data-match", "match");
      expect(item.querySelector(".pv-entry__item-match")).toHaveTextContent("Python");
    });
    expect(within(mphasis).queryByText(/Resolved 15\+ engineering tickets/)).not.toBeInTheDocument();
    // Both groups contain a match, so both group headings stay.
    expect(within(mphasis).getByRole("heading", { name: "Product Engineering & AI Tooling" })).toBeInTheDocument();
    expect(within(mphasis).getByRole("heading", { name: "Automation, Delivery & Cross-Team Engineering" })).toBeInTheDocument();

    // Matches through its stack line only: its achievements stay, the tag is marked.
    const identity = entry("identity-platform");
    expect(identity).toHaveAttribute("data-match", "match");
    expect(identity.querySelectorAll(".pv-entry__item")).toHaveLength(3);
    expect(identity.querySelectorAll('.pv-entry__item[data-match]')).toHaveLength(0);
    expect(within(identity).getByText("(matches Python)", { exact: false })).toBeInTheDocument();

    // Non-matching entries are not shown at all, and no "No Python" messages appear.
    expect(entry("byoc-platform")).toBeNull();
    expect(entry("remora")).toBeNull();
    expect(screen.queryByText(/^No .* in this entry/)).not.toBeInTheDocument();
  });

  test("changing the ability changes which experience is revealed", () => {
    renderRecord();
    fireEvent.click(abilityButton("C# / .NET"));
    expect(entry("mphasis")).toHaveAttribute("data-match", "match");
    expect(entry("identity-platform")).toBeNull();
    expect(entry("mphasis").querySelectorAll(".pv-entry__item")).toHaveLength(1);
    expect(entry("mphasis").querySelector(".pv-entry__item")).toHaveTextContent(/^C#, \.NET MVC/);
    expect(within(entry("mphasis")).queryByRole("heading", { name: "Automation, Delivery & Cross-Team Engineering" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Consulting Experience" })).not.toBeInTheDocument();

    fireEvent.click(abilityButton("TypeScript"));
    expect(entry("mphasis")).toBeNull();
    expect(entry("remora")).toHaveAttribute("data-match", "match");
    expect(abilityButton("C# / .NET")).toHaveAttribute("aria-pressed", "false");
    // No employment or consulting matches TypeScript, so the chronicle steps aside.
    expect(screen.queryByRole("heading", { name: "Quest Chronicle" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Independent Quests" })).toBeInTheDocument();
  });

  test("the shown entries always agree with the X of Y status", () => {
    renderRecord();
    ABILITIES.forEach((ability) => {
      fireEvent.click(abilityButton(ability.label));
      const shown = document.querySelectorAll("[data-entry]");
      const expected = ALL_ENTRIES.filter((e) => entryMatch(e, ability).matches).length;
      expect(shown).toHaveLength(expected);
      shown.forEach((el) => expect(el).toHaveAttribute("data-match", "match"));
      expect(document.querySelector(".pv-abilities__count")).toHaveTextContent(
        `${ability.label}: ${expected} of ${ALL_ENTRIES.length} entries reveal this ability.`
      );
      expect(screen.queryByText(/in this entry\.$/)).not.toBeInTheDocument();
    });
  });

  test("the unfiltered view shows every entry and every achievement unmarked", () => {
    renderRecord();
    expect(document.querySelectorAll("[data-entry]")).toHaveLength(ALL_ENTRIES.length);
    const totalItems = ALL_ENTRIES.flatMap((e) => e.groups.flatMap((g) => g.items)).length;
    expect(document.querySelectorAll(".pv-entry__item")).toHaveLength(totalItems);
    expect(document.querySelectorAll(".pv-entry__item[data-match], .pv-entry__item-match, .pv-entry__why")).toHaveLength(0);
    ["Quest Chronicle", "Employment", "Consulting Experience", "Independent Quests"].forEach((name) =>
      expect(screen.getByRole("heading", { name })).toBeInTheDocument()
    );
  });

  test("Clear filter restores the full record and returns focus to All", () => {
    renderRecord();
    fireEvent.click(abilityButton("React"));
    fireEvent.click(screen.getByRole("button", { name: "Clear filter" }));

    expect(document.querySelectorAll("[data-entry]")).toHaveLength(ALL_ENTRIES.length);
    document.querySelectorAll("[data-entry]").forEach((el) => expect(el).toHaveAttribute("data-match", "all"));
    expect(abilityButton("All abilities")).toHaveAttribute("aria-pressed", "true");
    expect(abilityButton("All abilities")).toHaveFocus();
    expect(liveText()).toBe("Showing the full record: all 7 entries.");
    expect(screen.queryByRole("button", { name: "Clear filter" })).not.toBeInTheDocument();
  });

  test("pressing the selected ability again clears it", () => {
    renderRecord();
    fireEvent.click(abilityButton("FastAPI"));
    fireEvent.click(abilityButton("FastAPI"));
    expect(abilityButton("All abilities")).toHaveAttribute("aria-pressed", "true");
  });

  test("is keyboard operable: native buttons, and Escape clears from inside the group", () => {
    renderRecord();
    const buttons = within(screen.getByRole("group", { name: /Select an ability/ })).getAllByRole("button");
    buttons.forEach((b) => {
      expect(b.tagName).toBe("BUTTON");
      expect(b).toHaveAttribute("type", "button");
      expect(b).not.toHaveAttribute("tabindex", "-1");
    });

    const security = abilityButton("Security & Identity");
    security.focus();
    fireEvent.click(security);
    expect(entry("identity-platform")).toHaveAttribute("data-match", "match");

    fireEvent.keyDown(security, { key: "Escape" });
    expect(abilityButton("All abilities")).toHaveAttribute("aria-pressed", "true");
    expect(abilityButton("All abilities")).toHaveFocus();
  });

  test("every ability reveals at least one entry and none reveals everything", () => {
    ABILITIES.forEach((ability) => {
      const count = ALL_ENTRIES.filter((e) => entryMatch(e, ability).matches).length;
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThan(ALL_ENTRIES.length);
    });
  });

  test("leaving and returning to the record resets the filter", () => {
    jest.useFakeTimers();
    renderRecord();
    fireEvent.click(abilityButton("Python"));
    const nav = screen.getByRole("navigation", { name: "Main" });
    const finish = (mode) => {
      const t = TRANSITION_TIMINGS[mode];
      act(() => jest.advanceTimersByTime(t.cover + t.hold + t.reveal));
    };
    fireEvent.click(within(nav).getByRole("link", { name: /The Spellbook/ }));
    finish("full");
    fireEvent.click(within(nav).getByRole("link", { name: /Character Record/ }));
    finish("full");
    expect(abilityButton("All abilities")).toHaveAttribute("aria-pressed", "true");
    jest.useRealTimers();
  });
});

describe("links", () => {
  test("Summon my record downloads the current resume PDF", () => {
    renderRecord();
    const download = screen.getByRole("link", { name: /Summon my record/ });
    expect(download).toHaveAttribute("href", config.resumeFile);
    expect(download.getAttribute("href")).toMatch(/\/Prashast_Vats_Resume\.pdf$/);
    expect(download).toHaveAttribute("download", "Prashast_Vats_Resume.pdf");
  });

  test("contact links keep their existing URLs", () => {
    renderRecord();
    const contact = within(screen.getByRole("list", { name: "Contact and profiles" }));
    expect(contact.getByRole("link", { name: "Email" })).toHaveAttribute("href", "mailto:prashastvats@gmail.com");
    expect(contact.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/prashast-vats/");
    expect(contact.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/PrashastVats1");
    ["LinkedIn", "GitHub"].forEach((name) => {
      expect(contact.getByRole("link", { name })).toHaveAttribute("target", "_blank");
      expect(contact.getByRole("link", { name })).toHaveAttribute("rel", "noreferrer");
    });
  });

  test("project links only use verified URLs", () => {
    renderRecord();
    const links = within(screen.getByRole("list", { name: "Links for Identity Infrastructure Platform" })).getAllByRole("link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      "https://ai-agent-auth-frontend-ch6m-one.vercel.app/",
      "https://github.com/PrashastVats1/ai-agent-auth-backend",
      "https://github.com/PrashastVats1/ai-agent-auth-frontend",
    ]);
    expect(screen.getByRole("link", { name: /Hall of Artifacts \(Projects\)/ })).toHaveAttribute("href", "#/projects");
  });
});

describe("avatar", () => {
  test("renders the supplied regular avatar through the Avatar component", () => {
    renderRecord();
    const img = document.querySelector(".pv-record__avatar img");
    expect(img).toHaveAttribute("src", "/avatar/regular.png");
    expect(img).toHaveAttribute("alt", "Prashast Vats as a software archmage");
    fireEvent.load(img);
    expect(img).not.toHaveAttribute("hidden");
    expect(document.querySelector('img[src*="scholar"]')).toBeNull();
  });
});

describe("mobile layout", () => {
  test("at 375px the download comes before the chronicle and the filter still works", () => {
    window.__viewportWidth = 375;
    renderRecord();
    const download = screen.getByRole("link", { name: /Summon my record/ });
    const chronicle = screen.getByRole("heading", { name: "Quest Chronicle" });
    expect(download.compareDocumentPosition(chronicle) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    fireEvent.click(abilityButton("AI & Computer Vision"));
    expect(entry("mphasis")).toHaveAttribute("data-match", "match");
    expect(entry("byoc-platform")).toBeNull();
    expect(screen.getByRole("button", { name: "Clear filter" })).toBeInTheDocument();
  });
});

describe("accessibility and accuracy", () => {
  test("headings descend without skipping levels, filtered or not", () => {
    renderRecord();
    const check = () => {
      const levels = screen.getAllByRole("heading").map((h) => Number(h.tagName.slice(1)));
      levels.reduce((prev, level) => {
        expect(level - prev).toBeLessThanOrEqual(1);
        return level;
      });
    };
    check();
    ["Python", "TypeScript", "C# / .NET"].forEach((name) => {
      fireEvent.click(abilityButton(name));
      check();
    });
  });

  test("the filter is a labelled group of toggle buttons with a live status", () => {
    renderRecord();
    const group = screen.getByRole("group", { name: /Select an ability/ });
    within(group).getAllByRole("button", { pressed: false }).forEach((b) => expect(b).toHaveAttribute("aria-pressed"));
    expect(group.querySelector("[aria-live='polite']")).toBeInTheDocument();
  });

  test("every listed technology is backed by the resume, its entry, or config", () => {
    const resumeSkills = SKILL_GROUPS.flatMap((g) => g.items.map((i) => i.toLowerCase()));
    ALL_ENTRIES.forEach((e) => {
      const items = e.groups.flatMap((g) => g.items);
      const stack = e.stack || [];
      items.forEach((item) => {
        item.tech.forEach((t) => {
          const backed =
            resumeSkills.includes(t.toLowerCase()) ||
            stack.includes(t) ||
            item.text.toLowerCase().includes(t.toLowerCase()) ||
            KNOWN_TECH.has(t);
          expect({ entry: e.id, tech: t, backed }).toEqual({ entry: e.id, tech: t, backed: true });
        });
      });
    });
  });
});
