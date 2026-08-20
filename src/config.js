const config = {
  name: "Prashast Vats", title: "Software Engineer",
  tagline: "I ship end-to-end products — from enterprise .NET and React work for HP to independently built AI services running in production.",
  location: "Bangalore, India", email: "prashastvats@gmail.com",
  phone: "+91 6363140535", github: "https://github.com/PrashastVats1", linkedin: "https://www.linkedin.com/in/prashast-vats/",
  resumeFile: process.env.PUBLIC_URL + "/Prashast_Vats_Resume.pdf",

  stats: [
    { value: "3+",  label: "Years Experience" },
    { value: "4",   label: "Live Products Shipped" },
    { value: "🏆",  label: "Voice Agent Jam Winner" },
    { value: "0",   label: "False Positives — Remora" },
  ],

  // Scrolling marquee items
  marqueeItems: [
    "Python", "TypeScript", "FastAPI", "React", "C#", ".NET MVC",
    "Chrome Extensions", "PostgreSQL", "OAuth / OIDC", "Docker",
    "RAG", "Computer Vision", "Voice Agents", "SQL Server",
    "Selenium", "REST APIs", "CI/CD",
  ],

  // Mental models / How I think
  mentalModels: [
    { icon: "🔬", title: "Research before building", text: "I look up multiple approaches before committing to one. The best solution is rarely the first one that comes to mind." },
    { icon: "🧩", title: "Break it into testable units", text: "Whether it's a prompt or a plugin, I isolate the smallest runnable piece first. Failures are easier to diagnose when the surface area is small." },
    { icon: "♻️", title: "Iterate, don't perfect", text: "Ship the MVP, measure, fix. A working tool used by 30 engineers beats a perfect spec that ships in 6 months." },
    { icon: "📐", title: "Constraints clarify thinking", text: "The best outputs — code, prompts, designs — come from explicit constraints. Vague inputs produce vague outputs. This applies to AI and to requirements." },
    { icon: "🌉", title: "Bridge tech and people", text: "I write tickets, explain errors to non-technical stakeholders, and translate user pain into system requirements. The gap between them is where most projects fail." },
    { icon: "📊", title: "Measure what matters", text: "Resolution rate, ticket velocity, model accuracy — I track the numbers that indicate whether the system is actually working, not just running." },
  ],

  featuredProjects: [
    {
      badge: "🛡️ Published Chrome Extension · Security",
      name: "Remora — Prompt-Injection Detection for AI Agents",
      challenge: "AI agents browsing the web can be hijacked by prompt-injection payloads hidden in page content — CSS-concealed text, off-screen positioning, color-matched text, aria-hidden nodes — invisible to a human but readable by an agent.",
      solution: "Built a Chrome extension with eight structural detectors and a dual-signal design: a structural hit alone never fires — the extracted text must also match one of 25 injection patterns across 5 categories — keeping false positives near zero.",
      impact: [
        "Zero false positives across seven major production sites, backed by a 49-case suite with explicit false-positive fixtures",
        "Sub-100ms synchronous detection path — TypeScript engine, MV3 content script, service worker, Shadow DOM popup UI",
        "Solo build in 3 weekends, shipped to the Chrome Web Store — 49 installs at ~90% retention, zero promotion",
        "Submitted to Y Combinator (F2026 batch)",
      ],
      tags: ["TypeScript", "Chrome Extension", "MV3", "Shadow DOM", "Security"], github: "https://github.com/PrashastVats1/remora", demo: "https://remora.watch/",
    },
    {
      badge: "🔐 Open Source · Delegated Auth",
      name: "AI Agent Auth Gateway",
      challenge: "Agents acting on a user's behalf need to prove both their own identity and the user's, while staying constrained, audited, and stoppable before destructive actions.",
      solution: "Built a delegated-authority system implementing RFC 8693 token exchange, minting short-lived delegation JWTs that carry both identities, with policy middleware and a human-in-the-loop consent gate on destructive operations.",
      impact: [
        "Per-agent endpoint, method, and time-window policy rules with a full audit trail",
        "React + Tailwind dashboard over agents, policies, consent approvals, and logs",
        "OIDC Authorization Code + PKCE login end to end",
        "Stack: Python, FastAPI, PostgreSQL (Neon), SQLAlchemy, React, Vite, Tailwind — deployed on Render/Vercel",
      ],
      tags: ["Python", "FastAPI", "PostgreSQL", "OAuth/OIDC", "React"], github: "https://github.com/PrashastVats1/ai-agent-auth-frontend", demo: "https://ai-agent-auth-frontend-ch6m-one.vercel.app/",
    },
    {
      badge: "🏆 Winner, Voice Agent Jam 3.0",
      name: "Priya — Autonomous Outbound Voice Agent",
      challenge: "Post-demo follow-up calls require real-time objection handling in code-switched Hindi/English — manual counselor calls are slow, inconsistent, and hard to scale.",
      solution: "Built solo, end to end: a voice agent that places real outbound calls over SIP/PSTN and handles pricing, competitor, and interest objections live — winning against team entries at Voice Agent Jam 3.0.",
      impact: [
        "FastAPI backend orchestrating Retell AI and Vobiz telephony for real outbound SIP calls",
        "Handles pricing, competitor, and interest objections in code-switched Hindi/English",
        "React dashboard scoring enrollment rate, objection breakdown, and per-call sentiment",
        "Full webhook pipeline logging call outcomes automatically post-conversation",
      ],
      tags: ["Python", "FastAPI", "Retell AI", "SIP/PSTN", "React"], github: "", demo: "https://voice-agent-nubn.onrender.com/",
    },
    {
      badge: "🤖 AI + Real-Time Data",
      name: "Event Intelligence Dashboard",
      challenge: "Staying on top of relevant tech events, meetups, and conferences requires constant manual searching across multiple platforms.",
      solution: "Built an LLM-backed service that aggregates multi-source news into running summaries for user-defined events.",
      impact: [
        "Aggregates events across multiple sources into one running summary",
        "Gemini-backed summarization refreshed on a schedule via APScheduler",
        "Appwrite backend, React/Vite frontend, deployed and live on Vercel",
      ],
      tags: ["FastAPI", "APScheduler", "Gemini", "Appwrite", "React/Vite"], github: "", demo: "https://ai-event-intelligence.vercel.app/",
    },
  ],

  skills: [
    { icon: "</>", category: "Languages",       items: ["Python", "TypeScript", "JavaScript", "C#", "SQL"] },
    { icon: "🎨",  category: "Frontend",        items: ["React", "React Native", "Vite", "Tailwind CSS", "Angular", "HTML5/CSS3", "Chrome Extensions (MV3)"] },
    { icon: "⚙",  category: "Backend",         items: ["FastAPI", ".NET MVC", "ADO.NET", "REST APIs", "Middleware", "Background Jobs", "Webhooks"] },
    { icon: "🗄",  category: "Data",            items: ["PostgreSQL", "Microsoft SQL Server", "MariaDB", "MongoDB", "SQLAlchemy", "Appwrite"] },
    { icon: "🤖",  category: "AI / LLM",        items: ["OpenAI/Claude/Gemini APIs", "Prompt Engineering", "RAG", "FAISS", "Computer Vision (ResNet)", "Voice Agents (Retell AI)"] },
    { icon: "🔐",  category: "Auth & Infra",    items: ["OAuth 2.0 / OIDC", "JWT", "PKCE", "Docker & Docker Compose", "Jenkins CI/CD", "Linux", "Render", "Vercel", "Git/GitHub"] },
  ],

  highlights: [
    { icon: "🏆", title: "Voice Agent Jam Winner",  text: "Built and shipped Priya solo — an autonomous outbound voice agent — winning against team entries at Voice Agent Jam 3.0, May 2026." },
    { icon: "🛡️", title: "Zero False Positives",   text: "Remora's dual-signal detection engine held zero false positives across seven major production sites, published to the Chrome Web Store." },
    { icon: "💰", title: "Cost Optimisation",       text: "Replaced a paid Azure AI Vision dependency with a custom ResNet + FAISS computer-vision service, cutting recurring cost." },
    { icon: "🌍", title: "European Expansion",      text: "Embedded with HP's Spain engineering team, contributing to Mphasis' first European engagement, which converted into a continued partnership." },
    { icon: "👥", title: "30+ Engineers Supported", text: "Resolves 15+ tickets monthly at ~80% first-contact resolution, supporting 30+ QA engineers across 3 time zones." },
    { icon: "🔓", title: "Open-Source Agent Auth",  text: "Built a delegated-authority gateway implementing RFC 8693 token exchange, with policy middleware and human-in-the-loop consent gates." },
  ],

  experience: [
    {
      role: "Software Engineer", company: "Mphasis Ltd. (HP Inc. engagement)", period: "May 2023 – Present", location: "Bangalore, India",
      projects: [
        { name: "Computer Vision & AI Tooling — Firmware Automation Support", period: "Mar 2025 – Present", summary: "Built a ResNet + FAISS computer-vision service identifying printer UI elements from screenshots, replacing a paid Azure AI Vision dependency and cutting recurring cost — containerised with Docker and Docker Compose for Windows and Linux. Developed an AI onboarding assistant on Copilot for HP's automation framework, covering script explanation, syntax guidance, and code generation — placed 2nd of 13 developers in the internal hackathon. Technical point of contact resolving 15+ tickets monthly at ~80% first-contact resolution for 30+ QA engineers across 3 time zones.", tags: ["Python", "Computer Vision", "FAISS", "Docker", "AI Chatbot"] },
        { name: "Print Automation — European Client Engagement", period: "Nov 2024 – Feb 2025", summary: "Embedded with HP's Spain engineering team, building automation and MariaDB-backed analytics — contributing to Mphasis' first European engagement, which converted into a continued partnership.", tags: ["Python", "MariaDB", "Automation", "Client Delivery"] },
        { name: "Network Printer Diagnostic Tool", period: "Feb 2024 – Jun 2024", summary: "Built a .NET MVC web application end to end, frontend and backend, that scans networked printers over SNMP OIDs, visualises fleet state in real time, and automates firmware upgrades with Selenium.", tags: [".NET MVC", "Selenium", "SQL Server", "C#"] },
      ],
    },
  ],

  education: [{ degree: "B.Tech — Electronics & Instrumentation Engineering", institution: "Manipal Institute of Technology", period: "2018 – 2022", gpa: "CGPA 7.06" }],
  certifications: [
    { label: "React.js, Angular, TypeScript, SQL, Git, GitHub Copilot, Agile", issuer: "TalentNext · Mphasis" },
    { label: "Interactive Python", issuer: "Coursera" },
    { label: "UX Design",          issuer: "Coursera" },
  ],
  achievements: [
    { icon: "🏆", text: "Winner, Voice Agent Jam 3.0 (Bangalore, 2026) — competed and shipped solo against team entries" },
    { icon: "🚀", text: "Project Shipyard S2 — AI Learn Circle cohort backed by Venture Catalysts, Antler, Bhive, and Paytm" },
  ],

  blogUrl: "",
  blogPosts: [],
};
export default config;
