import config from "../../config";

// Professional facts transcribed from public/Prashast_Vats_Resume.pdf (the
// authoritative source). Consulting entries keep the resume's anonymized
// wording verbatim. Per-item `tech` names only technology stated in that item,
// its entry's stack line, or that project's tags in config.js; `areas` are
// the kinds of work an item describes, used only by the ability filter.

export const RECORD = {
  name: config.name,
  title: config.title,
  fantasyTitle: "Software Archmage",
  experience: "3+ years",
  location: config.location,
  current: {
    title: "Software Engineer",
    company: "Mphasis Ltd.",
    context: "HP Inc. engagement",
    since: "May 2023",
  },
  summary:
    "Software engineer with 3+ years of full-stack product engineering. At Mphasis, on the HP Inc. engagement, I build " +
    ".NET MVC applications, automation, computer-vision services, and AI tooling for HP's global printing division, " +
    "working with engineering teams across three time zones. Independently, I design and ship AI-powered applications " +
    "in Python, TypeScript, and React, from a published Chrome extension that detects prompt injection to a voice agent " +
    "that won Voice Agent Jam 3.0.",
};

export const EMPLOYMENT = [
  {
    id: "mphasis",
    company: "Mphasis Ltd.",
    context: "HP Inc. engagement",
    title: "Software Engineer",
    dates: "May 2023 – Present",
    current: true,
    summary:
      "Full-stack engineering, automation, computer vision, and AI tooling for HP's global printing division, working with engineering teams across three time zones.",
    groups: [
      {
        heading: "Product Engineering & AI Tooling",
        items: [
          {
            text: "Designed and built a .NET MVC web application end to end, frontend through backend, to scan networked printers over SNMP, visualise fleet state, and automate firmware upgrades using Selenium. Now integrated into a larger internal platform used by a 10-person team, letting remote engineers run health checks and firmware upgrades independently instead of routing them through on-site staff.",
            tech: ["C#", ".NET MVC", "Microsoft SQL Server", "SNMP", "Selenium"],
          },
          {
            text: "Built a computer-vision service using ResNet and FAISS to identify printer UI elements from screenshots, eliminating the project's paid Azure AI Vision dependency and its recurring cost entirely. The service now backs automation flows for 15+ third-party solutions and runs in Docker containers on Ubuntu Linux, on a $15K to $20K production server the client commissioned specifically for it.",
            tech: ["Python", "ResNet", "FAISS", "Docker", "Linux"],
            areas: ["Computer vision"],
          },
          {
            text: "Developed an AI onboarding assistant using Copilot for the client's automation framework, supporting script explanation, syntax guidance, and code generation. Placed 2nd among 13 developers in an internal hackathon.",
            tech: ["Copilot"],
            areas: ["AI assistant"],
          },
        ],
      },
      {
        heading: "Automation, Delivery & Cross-Team Engineering",
        items: [
          {
            text: "Embedded with HP's Spain engineering team on the client's European programme, building automation and MariaDB-backed analytics. The automation cut project execution time by 15% and moved testing from office-hours-only manual runs to continuous 24/7 coverage. First successful European engagement for Mphasis on this account, and the partnership continues.",
            tech: ["Python", "MariaDB"],
            areas: ["Test automation"],
          },
          {
            text: "Delivered 5 new features, 5 enhancements to existing features, and 15 bug fixes across the automation codebase in the last six months.",
            tech: [],
            areas: ["Test automation"],
          },
          {
            text: "Resolved 15+ engineering tickets per month with approximately 80% first-contact resolution while supporting 30+ QA engineers across three time zones.",
            tech: [],
          },
          {
            text: "Worked across application logic, APIs, database access, network protocols, browser automation, and deployment while debugging production-facing tooling used by HP engineering teams.",
            tech: [],
            areas: ["Browser automation"],
          },
        ],
      },
    ],
  },
];

export const CONSULTING = [
  {
    id: "identity-platform",
    company: "Identity Infrastructure Platform",
    title: "Contributing Engineer",
    dates: "2026",
    links: [
      { label: "Live Demo", href: "https://ai-agent-auth-frontend-ch6m-one.vercel.app/" },
      { label: "Backend", href: "https://github.com/PrashastVats1/ai-agent-auth-backend" },
      { label: "Frontend", href: "https://github.com/PrashastVats1/ai-agent-auth-frontend" },
    ],
    groups: [
      {
        items: [
          {
            text: "Built an open-source delegated-authority system allowing AI agents to act on behalf of users while maintaining separate agent and user identities.",
            tech: [],
            areas: ["Delegated authority"],
          },
          {
            text: "Implemented RFC 8693 token exchange with short-lived delegation JWTs, policy middleware, audit logging, and human approval for destructive operations.",
            tech: ["JWT"],
            areas: ["RFC 8693 token exchange"],
          },
          {
            text: "Built the React + Tailwind dashboard for agent configuration, policies, consent approvals, and audit logs.",
            tech: ["React", "Tailwind"],
          },
        ],
      },
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "React", "Vite", "Tailwind", "Render", "Vercel"],
  },
  {
    id: "byoc-platform",
    company: "BYOC Cloud Infrastructure Platform",
    title: "Contributing Engineer",
    dates: "March 2026",
    summary: "Seed-stage BYOC platform spanning AWS, GCP, and Azure, built by a three-person founding team.",
    groups: [
      {
        items: [
          {
            text: "Paired with the platform's frontend engineer to build the company website's public-facing frontend in React, Vite, Tailwind CSS, and shadcn/ui.",
            tech: ["React", "Vite", "Tailwind CSS", "shadcn/ui"],
          },
          {
            text: "Worked with the backend engineer on the waitlist and interest-capture flow, persisting prospect contact details to Supabase for follow-up on inbound interest.",
            tech: ["Supabase"],
          },
        ],
      },
    ],
  },
];

export const PROJECTS = [
  {
    id: "remora",
    company: "Remora",
    title: "Prompt-Injection Detection for AI Agents",
    dates: "2026",
    status: "Published",
    groups: [
      {
        items: [
          {
            text: "Designed and published a Chrome extension that detects hidden prompt-injection payloads targeting AI agents directly in web pages.",
            tech: ["TypeScript", "Chrome Extensions (MV3)"],
            areas: ["Prompt-injection detection"],
          },
          {
            text: "Designed a dual-signal detection system combining DOM structure with text-pattern analysis to reduce false positives, achieving zero false positives across seven major production sites in a 49-case test suite.",
            tech: [],
            areas: ["Prompt-injection detection"],
          },
        ],
      },
    ],
    stack: ["TypeScript", "Chrome Extensions (MV3)", "Shadow DOM"],
  },
  {
    id: "priya",
    company: "Priya",
    title: "Autonomous Outbound Voice Agent",
    dates: "May 2026",
    status: "Winner, Voice Agent Jam 3.0",
    groups: [
      {
        items: [
          {
            text: "Built and shipped Priya, an autonomous voice agent that makes real outbound SIP/PSTN calls and handles pricing, competitor, and interest objections in code-switched Hindi/English.",
            tech: ["Retell AI", "SIP/PSTN"],
            areas: ["Voice agents"],
          },
        ],
      },
    ],
    stack: ["Python", "FastAPI", "Retell AI", "SIP/PSTN", "React", "Render"],
  },
  {
    id: "event-intelligence",
    company: "Event Intelligence Dashboard",
    dates: "2026",
    status: "Live demo",
    groups: [
      {
        items: [
          {
            text: "Built an LLM-backed application that aggregates multi-source news into continuously updated summaries for user-defined events.",
            tech: ["Gemini API"],
            areas: ["LLM integration"],
          },
        ],
      },
    ],
    stack: ["FastAPI", "APScheduler", "Gemini API", "React", "Vite", "Vercel"],
  },
  {
    id: "movie-discovery",
    company: "Movie Discovery App",
    dates: "2026",
    status: "Live demo",
    groups: [
      {
        items: [
          {
            text: "Built a cross-platform mobile movie discovery app in React Native with Expo, covering search, browsing, and title detail views.",
            tech: ["React Native", "Expo"],
          },
        ],
      },
    ],
    stack: ["React Native", "Expo", "Appwrite"],
  },
];

/** Technical skills, grouped exactly as on the resume. */
export const SKILL_GROUPS = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "C#", "SQL"] },
  {
    label: "Frontend & Browser",
    items: ["React", "React Native", "Expo", "Vite", "Tailwind CSS", "shadcn/ui", "Angular", "HTML5/CSS3", "Chrome Extensions", "Manifest V3", "Shadow DOM"],
  },
  {
    label: "Backend",
    items: ["FastAPI", ".NET MVC", "ADO.NET", "REST API design", "middleware", "background jobs", "webhooks", "SNMP"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "Microsoft SQL Server", "MariaDB", "MongoDB", "SQLAlchemy", "Supabase", "Appwrite"],
  },
  {
    label: "AI & Computer Vision",
    items: ["OpenAI API", "Claude API", "Gemini API", "prompt engineering", "LLM evaluation", "RAG", "FAISS", "ResNet", "computer vision", "voice agents"],
  },
  {
    label: "Auth & Infrastructure",
    items: ["OAuth 2.0", "OIDC", "JWT", "PKCE", "Docker", "Docker Compose", "Jenkins CI/CD", "Linux", "Render", "Vercel", "Git", "GitHub"],
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech, Electronics & Instrumentation Engineering",
    institution: "Manipal Institute of Technology",
    dates: "2018 – 2022",
  },
];

export const CERTIFICATIONS = [
  { name: "Mphasis TalentNext", detail: "React.js, Angular, TypeScript, SQL, Git, GitHub Copilot, Agile" },
  { name: "Interactive Python", detail: "Coursera" },
  { name: "UX Design", detail: "Coursera" },
];

export const HONOURS = [
  "Winner, Voice Agent Jam 3.0 (Bangalore, 2026), shipping solo against team entries.",
  "Project Shipyard S2, an AI Learn Circle cohort supported by Venture Catalysts, Antler, Bhive, and Paytm.",
];

/**
 * The single filter. Each ability lists the technologies and areas (as
 * written in the entries above) that count as using it. Every ability matches
 * at least one entry, so no option ever empties the record.
 */
export const ABILITIES = [
  { id: "python", label: "Python", matches: ["Python"] },
  { id: "dotnet", label: "C# / .NET", matches: ["C#", ".NET MVC"] },
  { id: "typescript", label: "TypeScript", matches: ["TypeScript"] },
  { id: "react", label: "React", matches: ["React", "React Native"] },
  { id: "fastapi", label: "FastAPI", matches: ["FastAPI"] },
  {
    id: "data",
    label: "SQL & Databases",
    matches: ["Microsoft SQL Server", "MariaDB", "PostgreSQL", "SQLAlchemy", "Supabase", "Appwrite"],
  },
  {
    id: "ai",
    label: "AI & Computer Vision",
    matches: ["Computer vision", "ResNet", "FAISS", "Copilot", "AI assistant", "LLM integration", "Gemini API", "Voice agents", "Retell AI"],
  },
  {
    id: "security",
    label: "Security & Identity",
    matches: ["Delegated authority", "RFC 8693 token exchange", "JWT", "Prompt-injection detection"],
  },
  { id: "automation", label: "Automation & Testing", matches: ["Selenium", "Test automation", "Browser automation"] },
  { id: "deployment", label: "Docker & Deployment", matches: ["Docker", "Linux", "Render", "Vercel"] },
];

export const ALL_ENTRIES = [...EMPLOYMENT, ...CONSULTING, ...PROJECTS];
