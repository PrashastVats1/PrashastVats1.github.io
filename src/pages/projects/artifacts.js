import { artifactPath } from "../../assets/manifest";

/*
 * The Hall of Artifacts collection. Facts come from src/config.js, the resume
 * in public/, and the owner's Phase 4 project summaries. Optional fields
 * (year, problem, approach, results, links) are omitted when no source
 * supports them; nothing is filled in to complete the schema.
 *
 * Not included: confidential consulting work (see the Character Record),
 * install counts (owner's choice), and projects with too little verified
 * detail to describe.
 *
 * `accent`, `monogram`, and `artwork` are presentation only. Artwork alt text
 * describes the picture, never the project, and the monogram labels the
 * placeholder shown while the artwork loads or if it is missing.
 */

export const STATUSES = {
  published: { label: "Published", description: "Released to a public store or registry" },
  "open-source": { label: "Open source", description: "Source code is public" },
  winner: { label: "Winner", description: "Won a competition" },
  live: { label: "Live", description: "Deployed and publicly reachable" },
};

export const LINK_KINDS = {
  site: "Visit site",
  demo: "View live demo",
  source: "View source",
  package: "View npm package",
};

export const ARTIFACTS = [
  {
    slug: "remora",
    name: "Remora",
    subtitle: "Prompt-injection detection for AI agents",
    status: "published",
    year: "2026",
    category: "AI security",
    featured: true,
    accent: "blue",
    monogram: "R",
    shortDescription:
      "A Chrome extension that flags hidden prompt-injection payloads in web pages, the kind that can hijack AI agents browsing on your behalf.",
    problem:
      "AI agents browsing the web can be hijacked by prompt-injection payloads hidden in page content, such as CSS-concealed text, off-screen positioning, color-matched text, and aria-hidden nodes, invisible to a human but readable by an agent.",
    work: [
      "Designed and published a Chrome extension that detects hidden prompt-injection payloads targeting AI agents directly in web pages.",
      "Built the complete browser architecture in TypeScript: MV3 content scripts, a service worker, a Shadow DOM popup UI, the detection engine, and the build pipeline.",
      "Published the detection engine as a standalone npm package, remora-engine, alongside a dedicated product site.",
    ],
    approach: [
      "Dual-signal detection: eight structural detectors inspect the DOM, but a structural hit alone never fires.",
      "The extracted text must also match one of 25 injection patterns across 5 categories, which keeps false positives down.",
      "The popup UI is isolated in Shadow DOM, and the project is tested with a Vitest suite.",
    ],
    technologies: ["TypeScript", "Chrome Extensions (MV3)", "Shadow DOM", "Vitest", "npm"],
    results: [
      "Zero false positives across seven major production sites in a 49-case test suite.",
      "Live on the Chrome Web Store, with the engine also published to npm.",
      "Shipped independently in three weekends, covering engineering, testing, deployment, and store release.",
      "Submitted to Y Combinator (F2026 batch).",
    ],
    links: [
      { kind: "site", href: "https://remora.watch" },
      { kind: "source", href: "https://github.com/PrashastVats1/remora" },
      { kind: "package", href: "https://www.npmjs.com/package/remora-engine" },
    ],
    artwork: {
      src: artifactPath("remora"),
      alt: "Remora's artifact: a glowing blue whale above a brass pedestal, circled by drifting scraps of script.",
    },
  },
  {
    slug: "ai-agent-auth-gateway",
    name: "AI Agent Auth Gateway",
    subtitle: "Delegated authority for AI agents",
    status: "open-source",
    year: "2026",
    category: "Security & identity",
    featured: true,
    accent: "gold",
    monogram: "AG",
    shortDescription:
      "Lets AI agents act for a user through short-lived delegated tokens, policy rules, an audit trail, and human consent before destructive actions.",
    problem:
      "Agents acting on a user's behalf need to prove both their own identity and the user's, while staying constrained, audited, and stoppable before destructive actions.",
    work: [
      "Built an open-source delegated-authority system that lets AI agents act on behalf of users while keeping agent and user identities separate.",
      "Built the React + Tailwind dashboard for agent configuration, policies, consent approvals, and audit logs.",
    ],
    approach: [
      "Implements RFC 8693 token exchange, minting short-lived delegation JWTs that carry both identities.",
      "Policy middleware enforces per-agent endpoint, method, and time-window rules, with a full audit trail.",
      "Destructive operations wait for human approval before they run.",
      "Login uses OIDC Authorization Code with PKCE, end to end.",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "React", "Vite", "Tailwind", "Render", "Vercel"],
    links: [
      { kind: "demo", href: "https://ai-agent-auth-frontend-ch6m-one.vercel.app" },
      { kind: "source", label: "View backend source", href: "https://github.com/PrashastVats1/ai-agent-auth-backend" },
      { kind: "source", label: "View frontend source", href: "https://github.com/PrashastVats1/ai-agent-auth-frontend" },
    ],
    artwork: {
      src: artifactPath("ai-agent-auth-gateway"),
      alt: "AI Agent Auth Gateway's artifact: a golden key before a shield, ringed by floating identity and permission cards.",
    },
  },
  {
    slug: "priya",
    name: "Priya",
    subtitle: "Autonomous outbound voice agent",
    status: "winner",
    statusDetail: "Voice Agent Jam 3.0",
    year: "2026",
    category: "Voice AI",
    featured: true,
    accent: "burgundy",
    monogram: "P",
    shortDescription:
      "A voice agent that places real outbound calls and handles pricing, competitor, and interest objections in Hindi and English.",
    problem:
      "Post-demo follow-up calls require real-time objection handling in code-switched Hindi/English. Manual counselor calls are slow, inconsistent, and hard to scale.",
    work: [
      "Built and shipped Priya solo, end to end: an autonomous voice agent that makes real outbound SIP/PSTN calls.",
      "Priya handles pricing, competitor, and interest objections live, in code-switched Hindi/English.",
      "Built a React dashboard for enrollment metrics, objection analysis, and per-call sentiment.",
    ],
    approach: [
      "A FastAPI backend orchestrates Retell AI and Vobiz telephony services for real outbound calls.",
      "A webhook pipeline logs call outcomes automatically after each conversation.",
    ],
    technologies: ["Python", "FastAPI", "Retell AI", "Vobiz", "SIP/PSTN", "React", "Render"],
    results: ["Winner, Voice Agent Jam 3.0 (Bangalore, May 2026), built and shipped solo against team entries."],
    links: [{ kind: "demo", href: "https://voice-agent-nubn.onrender.com" }],
    artwork: {
      src: artifactPath("priya-voice-agent"),
      alt: "Priya's artifact: a brass gramophone horn glowing pink, encircled by sound waves and speech bubbles.",
    },
  },
  {
    slug: "event-intelligence",
    name: "Event Intelligence Dashboard",
    subtitle: "Running summaries of the events you follow",
    status: "live",
    year: "2026",
    category: "AI & data",
    featured: false,
    accent: "forest",
    monogram: "EI",
    shortDescription:
      "Aggregates news from multiple sources into running, LLM-written summaries of the events you follow.",
    work: [
      "Built an LLM-backed application that aggregates multi-source news into continuously updated summaries for user-defined events.",
      "Built the React/Vite frontend, deployed on Vercel.",
    ],
    approach: [
      "A FastAPI backend sources news through NewsAPI and runs scheduled background processing with APScheduler.",
      "Summaries are written and refreshed with the Gemini API.",
    ],
    technologies: ["FastAPI", "APScheduler", "Gemini API", "NewsAPI", "React", "Vite", "Vercel"],
    links: [{ kind: "demo", href: "https://ai-event-intelligence.vercel.app" }],
    artwork: {
      src: artifactPath("event-intelligence-dashboard"),
      alt: "Event Intelligence Dashboard's artifact: a green glowing armillary globe orbited by news sheets and charts.",
    },
  },
  {
    slug: "movie-discovery",
    name: "Movie Discovery App",
    subtitle: "Cross-platform mobile app",
    status: "live",
    year: "2026",
    category: "Mobile",
    featured: false,
    accent: "purple",
    monogram: "MD",
    shortDescription:
      "A React Native app for searching and browsing movies, with a trending list driven by what people actually search for and open.",
    work: [
      "Built a cross-platform mobile movie discovery app in React Native with Expo, covering search, browsing, and title detail views.",
    ],
    approach: [
      "Movie data comes from the TMDB API.",
      "A popularity ranking backed by Appwrite tracks search and click activity and surfaces the most-engaged titles as trending.",
    ],
    technologies: ["React Native", "Expo", "TMDB API", "Appwrite"],
    links: [{ kind: "demo", href: "https://movie-app-react-native-project.vercel.app/" }],
    artwork: {
      src: artifactPath("movie-discovery-app"),
      alt: "Movie Discovery App's artifact: a brass film projector casting ribbons of purple film frames.",
    },
  },
  {
    slug: "dnd-guide",
    name: "D&D Beginner Guide",
    subtitle: "Classes and species, in plain language",
    status: "live",
    year: "2026",
    category: "Product & design",
    featured: false,
    accent: "ember",
    monogram: "D&D",
    shortDescription:
      "A free, non-commercial guide that explains Dungeons & Dragons classes and species in plain language for complete beginners.",
    problem:
      "Newcomers, including people who may know D&D mainly through shows such as Stranger Things, need its classes and species explained in plain language before they can find a character they want to play.",
    work: [
      "Designed and built a beginner-oriented site with an intro page, a Classes section, a Species section, and detail pages.",
      "Kept it free and non-commercial, written for people meeting D&D for the first time.",
    ],
    technologies: ["React", "TypeScript", "GitHub Pages"],
    links: [
      { kind: "site", href: "https://prashastvats1.github.io/dnd-guide" },
      { kind: "source", href: "https://github.com/PrashastVats1/dnd-guide" },
    ],
    artwork: {
      src: artifactPath("dnd-beginner-guide"),
      alt: "D&D Beginner Guide's artifact: an open illustrated tome surrounded by floating dice and maps.",
    },
  },
];

export const FEATURED = ARTIFACTS.filter((a) => a.featured);
export const COLLECTION = ARTIFACTS.filter((a) => !a.featured);

export const artifactRoute = (slug) => `/projects/${slug}`;

export function findArtifact(slug) {
  return ARTIFACTS.find((a) => a.slug === slug) || null;
}

/** "/projects/remora" -> "remora"; "/projects" -> null. */
export function slugFromPath(path) {
  const match = /^\/projects\/([^/]+)/.exec(path || "");
  return match ? decodeURIComponent(match[1]) : null;
}

export const linkLabel = (link) => link.label || LINK_KINDS[link.kind];
