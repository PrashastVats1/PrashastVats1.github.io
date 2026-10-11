import config from "../../config";
import { ARTIFACTS, artifactRoute, linkLabel, statusText } from "../projects/artifacts";

/*
 * Guild Recruitment content. Every claim restates a fact already recorded in
 * src/pages/resume/resumeContent.js (transcribed from the resume PDF) or
 * src/pages/projects/artifacts.js; contact details come from src/config.js.
 * Nothing here adds availability, rates, testimonials, or client outcomes.
 *
 * The phone number in config.js is deliberately not shown: the other fantasy
 * pages list email, LinkedIn, and GitHub only. The Fiverr link is the public
 * gig page, never the seller dashboard.
 */

export const CONTACT = {
  email: config.email,
  mailto: `mailto:${config.email}`,
  linkedin: config.linkedin,
  github: config.github,
  fiverr: config.fiverr,
  resumeFile: config.resumeFile,
  location: config.location,
};

export const OPENING =
  "Software engineer with 3+ years of full-stack product engineering. I build and ship web applications, " +
  "backend services, automation, and AI-powered tools: at Mphasis on the HP Inc. engagement, and in products " +
  "I have designed and released independently.";

/*
 * `basis` says where the experience comes from, so the areas never read as
 * equal professional depth: "professional" is Mphasis/HP work, "independent"
 * is self-directed projects, "both" is backed by each.
 */
export const BASIS = {
  professional: "Professional work",
  independent: "Independent projects",
  both: "Professional & independent",
};

export const TRADES = [
  {
    id: "product",
    title: "Full-stack product engineering",
    basis: "both",
    text: "Building applications end to end, from interface to database and deployment.",
    evidence: [
      "Designed and built a .NET MVC web application for HP, frontend through backend, now part of an internal platform used by a 10-person team.",
      "Shipped React and FastAPI products of my own, including a React Native mobile app.",
    ],
  },
  {
    id: "automation",
    title: "Backend, automation & integration",
    basis: "professional",
    text: "Python services, test automation, and systems that talk to other systems.",
    evidence: [
      "Built automation and MariaDB-backed analytics with HP's Spain team, cutting project execution time by 15% and moving testing to continuous 24/7 coverage.",
      "Worked across APIs, database access, network protocols (SNMP), and browser automation (Selenium).",
    ],
  },
  {
    id: "ai",
    title: "AI engineering",
    basis: "both",
    text: "Putting models to work in real systems, and checking that they behave.",
    evidence: [
      "Built a ResNet + FAISS computer-vision service that removed a paid Azure AI Vision dependency; it runs in Docker and backs automation for 15+ third-party solutions.",
      "Built Priya, a voice agent making real outbound calls, which won Voice Agent Jam 3.0.",
    ],
  },
  {
    id: "security",
    title: "AI security & identity",
    basis: "independent",
    text: "Protecting AI agents and the people they act for.",
    evidence: [
      "Published Remora, a Chrome extension that detects hidden prompt-injection payloads aimed at AI agents.",
      "Built an open-source delegated-authority gateway with RFC 8693 token exchange and human approval for destructive actions.",
    ],
  },
];

/** Three shipped pieces, one per kind of work, each with a public destination. */
const PROOF_SLUGS = ["remora", "priya", "ai-agent-auth-gateway"];

export const PROOF = PROOF_SLUGS.map((slug) => {
  const artifact = ARTIFACTS.find((a) => a.slug === slug);
  const link = artifact.links[0];
  return {
    slug,
    name: artifact.name,
    subtitle: artifact.subtitle,
    status: statusText(artifact),
    summary: artifact.shortDescription,
    result: artifact.results ? artifact.results[0] : null,
    record: artifactRoute(slug),
    external: { href: link.href, label: linkLabel(link), note: link.note || null },
  };
});

export const CODE = [
  {
    title: "Ship the whole thing",
    text: "I take work from idea to release. Remora shipped independently in three weekends, covering engineering, testing, deployment, and Chrome Web Store release.",
  },
  {
    title: "Find the real fault",
    text: "As a technical point of contact I resolve 15+ engineering tickets a month at about 80% first-contact resolution, for 30+ QA engineers across three time zones.",
  },
  {
    title: "Measure AI behaviour",
    text: "I test what the AI actually does. Remora's dual-signal detector held zero false positives across seven major production sites in a 49-case test suite.",
  },
  {
    title: "Design for misuse",
    text: "In the AI Agent Auth Gateway, agents act through short-lived delegated tokens and per-agent policy rules, with an audit trail and human approval before destructive operations.",
  },
];

export const ENGAGEMENTS = [
  {
    id: "full-time",
    title: "Full-time roles",
    text: "Software engineering roles across full-stack, backend, and AI products. The resume has the complete record.",
  },
  {
    id: "freelance",
    title: "Freelance & contract work",
    text: "Building or extending a web application, API, automation, or LLM feature. Tell me what you are building and when you need it.",
    link: { href: config.fiverr, label: "Commission a guild artisan", hint: "Find me on Fiverr" },
  },
  {
    id: "collaboration",
    title: "Collaborations",
    text: "AI security, agent tooling, open source, or a well-scoped build. A short note about the idea is enough to start.",
  },
];
