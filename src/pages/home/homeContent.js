import config from "../../config";

// Every professional fact here comes from src/config.js. The only
// hand-written text is phrasing; summaries paraphrase each project's
// challenge/solution text in config.

const experienceStat = config.stats.find((s) => /years experience/i.test(s.label));
const currentRole = config.experience.find((e) => /present/i.test(e.period));

export const IDENTITY = {
  name: config.name,
  title: config.title,
  fantasyTitle: "Software Archmage",
  statement: config.tagline,
  facts: [
    experienceStat && { label: "Experience", value: `${experienceStat.value} years` },
    currentRole && { label: "Currently", value: `${currentRole.role}, ${currentRole.company}` },
    { label: "Based in", value: config.location },
  ].filter(Boolean),
};

export const SCHOOLS = [
  {
    id: "full-stack",
    title: "Full-stack products",
    description: "End-to-end web applications, from the database to the interface.",
    tech: ["React", "TypeScript", "FastAPI", ".NET MVC", "PostgreSQL"],
  },
  {
    id: "ai",
    title: "AI and agent systems",
    description: "LLM-backed services, retrieval, voice agents, and computer vision.",
    tech: ["OpenAI/Claude/Gemini APIs", "RAG", "Voice Agents (Retell AI)", "FAISS"],
  },
  {
    id: "security",
    title: "Security and identity",
    description: "Keeping AI agents, and the people they act for, safe and accountable.",
    tech: ["OAuth 2.0 / OIDC", "JWT", "PKCE", "Chrome Extensions (MV3)"],
  },
  {
    id: "automation",
    title: "Automation and tooling",
    description: "Test automation, diagnostics, and tools that support engineering teams.",
    tech: ["Python", "Selenium", "Docker & Docker Compose", "Jenkins CI/CD"],
  },
];

/** Every technology string that appears anywhere in config, for accuracy checks. */
export const KNOWN_TECH = new Set([
  ...config.skills.flatMap((s) => s.items),
  ...config.experience.flatMap((e) => e.projects.flatMap((p) => p.tags)),
  ...config.featuredProjects.flatMap((p) => p.tags),
]);

const SUMMARIES = {
  Remora: "A Chrome extension that flags hidden prompt-injection payloads in web pages, the kind that can hijack AI agents browsing on your behalf.",
  "AI Agent Auth Gateway": "Lets AI agents act for a user through short-lived delegated tokens, policy rules, an audit trail, and human consent before destructive actions.",
  Priya: "A voice agent that places real outbound calls and handles pricing, competitor, and interest objections in Hindi and English.",
  "Event Intelligence Dashboard": "Aggregates news from multiple sources into running, LLM-written summaries of the events you follow.",
};

function splitName(full) {
  const [name, ...rest] = full.split(" - ");
  return { name: name.trim(), subtitle: rest.join(" - ").trim() || null };
}

export const ARTIFACTS = config.featuredProjects.map((project) => {
  const { name, subtitle } = splitName(project.name);
  return {
    name,
    subtitle,
    status: project.badge.replace(/^[^A-Za-z0-9]+/, "").trim(),
    summary: SUMMARIES[name] || project.solution,
  };
});
