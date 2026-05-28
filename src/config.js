const config = {
  name: "Prashast Vats", title: "Software Engineer",
  tagline: "I build AI tools, automation systems, and full-stack apps that make teams more productive.",
  location: "Bangalore, India", email: "prashastvats@gmail.com",
  phone: "+91 6363140535", github: "https://github.com/PrashastVats1", linkedin: "https://www.linkedin.com/in/prashast-vats/",
  resumeFile: process.env.PUBLIC_URL + "/resume.pdf",

  stats: [
    { value: "3+",  label: "Years Experience" },
    { value: "🏆",  label: "Competition Winner" },
    { value: "80%", label: "Support Resolution" },
    { value: "30+", label: "Engineers Supported" },
  ],

  // Scrolling marquee items
  marqueeItems: [
    "C#", ".NET Core", "React", "Angular", "Python", "TypeScript",
    "Computer Vision", "AI Chatbot", "Plugin Architecture",
    "SQL Server", "Selenium", "Docker", "Automation Testing",
    "Full-Stack Dev", "Firmware Testing", "REST APIs", "JIRA",
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
      badge: "🚧 In Progress — CI/CD + AI",
      name: "DocuChat — Resume Intelligence Pipeline",
      challenge: "Generic resume advice is everywhere. Engineers need context-aware feedback that understands their specific stack and experience, delivered through a proper CI/CD workflow.",
      solution: "Building a Jenkins CI/CD pipeline with a RAG-based AI layer that ingests resumes, understands the engineer's background, and has an intelligent conversation about skill gaps and upskilling paths.",
      impact: [
        "Full Jenkins pipeline: build → test → deploy stages",
        "RAG architecture for context-aware resume analysis",
        "Demonstrates CI/CD and AI integration in one project",
      ],
      tags: ["Jenkins", "Python", "RAG", "CI/CD", "AI"], github: "", demo: "https://resume-analyzer-laqi.onrender.com/",
    },
    {
      badge: "🤖 AI + Real-Time Data",
      name: "AI Event Intelligence App",
      challenge: "Staying on top of relevant tech events, meetups, and conferences requires constant manual searching across multiple platforms.",
      solution: "Built an AI-powered app that aggregates, filters, and surfaces tech events based on interest areas, with intelligent recommendations.",
      impact: [
        "Aggregates events across multiple sources into one view",
        "AI-driven filtering surfaces the most relevant events",
        "Deployed and live on Vercel",
      ],
      tags: ["AI", "React", "Vercel", "Event Discovery"], github: "", demo: "https://ai-event-intelligence.vercel.app",
    },
    {
      badge: "📱 React Native",
      name: "Movie Discovery App",
      challenge: "Building a real-world mobile app to apply React Native skills beyond tutorials — including navigation, API integration, and custom UI.",
      solution: "Extended a React Native movie app with additional features: custom components, improved UX, and real TMDB API data.",
      impact: [
        "Applied React Native fundamentals in a real deployed project",
        "Integrated live movie data via API",
        "Deployed and accessible via Vercel",
      ],
      tags: ["React Native", "JavaScript", "REST API", "Mobile"], github: "", demo: "https://movie-app-react-native-project.vercel.app/",
    },
  ],

  skills: [
    { icon: "</>", category: "Languages",              items: ["C#", "JavaScript", "TypeScript", "HTML5", "CSS3", "Python"] },
    { icon: "⚙",  category: "Frameworks & Libraries", items: [".NET Framework", "ASP.NET MVC", ".NET Core", "React", "Angular", "ADO.NET"] },
    { icon: "🗄",  category: "Databases",              items: ["Microsoft SQL Server", "MariaDB", "MongoDB"] },
    { icon: "🔧",  category: "Tools & Platforms",      items: ["Visual Studio", "JIRA", "Git", "Selenium", "Docker", "Figma"] },
    { icon: "🤖",  category: "AI / ML",                items: ["Prompt Engineering", "Custom Chatbot Dev", "Computer Vision", "ResNet", "FAISS"] },
    { icon: "★",   category: "Specializations",        items: ["Plugin Architecture", "Technical Support", "Automation Testing", "Full-Stack Web"] },
  ],

  highlights: [
    { icon: "🏆", title: "Competition Winner",      text: "Built an AI onboarding chatbot that placed 2nd in an 8-developer internal competition, now used for team onboarding." },
    { icon: "💰", title: "Cost Optimisation",       text: "Replaced cloud AI with a custom on-premise computer vision model, eliminating per-request costs entirely." },
    { icon: "🌍", title: "European Expansion",      text: "Contributed to the company's first European client engagement, resulting in a continued partnership and lab setup." },
    { icon: "⚡", title: "20% Faster Workflows",    text: "Delivered automation scripts and analytics that improved client performance measurement by 20%." },
    { icon: "👥", title: "30+ Engineers Supported", text: "Primary technical contact for a global QA team, maintaining 80% first-contact resolution across 3 time zones." },
    { icon: "🔧", title: "Full-Stack Tooling",      text: "Built end-to-end diagnostic and automation tools used in production environments by engineering teams daily." },
  ],

  experience: [
    {
      role: "Software Engineer", company: "Mphasis Ltd.", period: "May 2023 – Present", location: "Bangalore, India",
      projects: [
        { name: "Firmware Test Automation — Plugin Dev & Support", period: "Mar 2025 – Present", summary: "Technical point of contact for 30+ QA engineers on an enterprise firmware testing platform, maintaining 80% first-contact resolution. Built Copy and Scan test automation plugins, a custom ResNet + FAISS computer vision model replacing cloud AI for UI detection (containerised via Docker with custom images and Docker Compose for Windows and Linux), and an AI onboarding chatbot that placed 2nd in an internal competition.", tags: ["C#", ".NET", "Python", "Computer Vision", "Docker", "AI Chatbot"] },
        { name: "Print Automation — European Client Engagement", period: "Nov 2024 – Feb 2025", summary: "Collaborated with a European client team to deliver printer performance automation via scripts and MariaDB-backed analytics, achieving 20% faster measurement. Contributed to the company's first European engagement, leading to a continued partnership.", tags: ["Python", "MariaDB", "Automation", "Client Delivery"] },
        { name: "Network Printer Diagnostic Tool", period: "Feb 2024 – Jun 2024", summary: "Built a full-stack .NET MVC web application to scan and diagnose network printers, visualise device states in real time, and automate firmware upgrades using Selenium.", tags: [".NET MVC", "Selenium", "SQL Server", "C#"] },
      ],
    },
  ],

  education: [{ degree: "B.Tech — Electronics & Instrumentation Engineering", institution: "Manipal Institute of Technology", period: "2018 – 2022", gpa: "CGPA 7.06" }],
  certifications: [
    { label: "React.js, Angular 10, TypeScript, SQL, HTML5/CSS3, Git, GitHub Copilot", issuer: "TalentNext · Mphasis" },
    { label: "Artificial Intelligence", issuer: "SmartKnower" },
    { label: "Interactive Python",      issuer: "Coursera" },
    { label: "UX Design",               issuer: "Coursera" },
  ],
  achievements: [
    { icon: "🥈", text: "2nd Place — 132nd International MUN (2022)" },
    { icon: "🏆", text: "Top 5 — TCS Techbytes Regional Quiz (2021)" },
    { icon: "🤖", text: "Core Member — Team Combat Robotics, Manipal (2019–2021)" },
    { icon: "🌿", text: "Swachh Bharat NGO Outreach & College Fest Operations" },
  ],

  blogUrl: "",
  blogPosts: [],
};
export default config;
