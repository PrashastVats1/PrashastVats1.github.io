import config from "../../config";
import { RECORD } from "../resume/resumeContent";
import { HOME_ARTIFACTS, artifactRoute, statusText } from "../projects/artifacts";

// Home holds no facts of its own: identity comes from config and the
// Character Record, projects from the Hall of Artifacts collection.

const { current } = RECORD;

export const IDENTITY = {
  name: config.name,
  title: config.title,
  fantasyTitle: RECORD.fantasyTitle,
  statement: config.tagline,
  facts: [
    { label: "Experience", value: `${RECORD.experience}` },
    { label: "Currently", value: `${current.title}, ${current.company} (${current.context})` },
    { label: "Based in", value: RECORD.location },
  ],
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

export const ARTIFACTS = HOME_ARTIFACTS.map((artifact) => ({
  slug: artifact.slug,
  name: artifact.name,
  subtitle: artifact.subtitle || null,
  status: statusText(artifact),
  summary: artifact.shortDescription,
  route: artifactRoute(artifact.slug),
}));
