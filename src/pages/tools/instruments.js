import CommitScribe from "./CommitScribe";
import JsonScribe from "./JsonScribe";
import PromptInjectionInspector from "./PromptInjectionInspector";
import RegexAlchemist from "./RegexAlchemist";
import CodeReviewRater from "./ai/CodeReviewRater";
import JiraTicketScorer from "./ai/JiraTicketScorer";
import PromptDebugger from "./ai/PromptDebugger";

/*
 * The Laboratory's instruments; to add or retire one, add or remove its entry
 * here. `kind` is "local" (runs entirely in the browser) or "ai" (sends the
 * entered text to the Laboratory's AI service when the user asks). `accent` is
 * presentation only.
 */
export const INSTRUMENT_KINDS = {
  local: {
    title: "Runs in your browser",
    badge: "Browser-only",
    description: "These work entirely on this page. Nothing you enter is sent anywhere.",
  },
  ai: {
    title: "AI-powered",
    badge: "AI-powered",
    description: "These send the text you enter to an AI service (OpenAI) when you press their button, and return AI-generated analysis that can be wrong.",
  },
};

export const INSTRUMENTS = [
  {
    slug: "prompt-injection-inspector",
    kind: "local",
    name: "Prompt Injection Inspector",
    plain: "Prompt-injection checker",
    summary: "Paste text an AI might read and see which common injection patterns it contains, and why each one was flagged.",
    accent: "blue",
    Component: PromptInjectionInspector,
  },
  {
    slug: "regex-alchemist",
    kind: "local",
    name: "Regex Alchemist",
    plain: "Regex tester and explainer",
    summary: "Test a regular expression against your text, see every match and capture group, and read what each part of the pattern means.",
    accent: "purple",
    Component: RegexAlchemist,
  },
  {
    slug: "json-scribe",
    kind: "local",
    name: "JSON Scribe",
    plain: "JSON formatter and validator",
    summary: "Format, minify, and validate JSON, with any error pointed out by line and column.",
    accent: "forest",
    Component: JsonScribe,
  },
  {
    slug: "commit-scribe",
    kind: "local",
    name: "Commit Scribe",
    plain: "Conventional commit builder",
    summary: "Build a Conventional Commits message from a type, an optional scope, and a short description.",
    accent: "ember",
    Component: CommitScribe,
  },
  {
    slug: "prompt-debugger",
    kind: "ai",
    name: "Prompt Debugger",
    plain: "AI prompt reviewer",
    summary: "Get an AI-assisted read on how clear a prompt is, what may trip a model up, and a revised version to try.",
    accent: "gold",
    Component: PromptDebugger,
  },
  {
    slug: "code-review-rater",
    kind: "ai",
    name: "Code Review Rater",
    plain: "AI code reviewer",
    summary: "Get an AI review of a snippet: readability, maintainability, potential bugs, security concerns, and what to change. The code is never run.",
    accent: "burgundy",
    Component: CodeReviewRater,
  },
  {
    slug: "jira-ticket-scorer",
    kind: "ai",
    name: "JIRA Ticket Scorer",
    plain: "AI ticket quality checker",
    summary: "Paste a ticket to see what is missing, how testable and reproducible it is, and an improved draft. It does not connect to Jira.",
    accent: "blue",
    Component: JiraTicketScorer,
  },
];
