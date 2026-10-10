const post = {
  slug: "when-your-ai-agent-browses-the-web",
  title: "When your AI agent browses the web, it sees things you don't.",
  date: "June 2026", readTime: "1 min read", tag: "AI",
  tags: ["security", "prompt-injection", "ai-agents"],
  excerpt: "This is called prompt injection. And as agentic AI tools go mainstream, it's quietly becoming one of the most underestimated attack vectors out there.",
  format: "summary",
  source: { platform: "LinkedIn", url: "https://www.linkedin.com/posts/prashast-vats_when-your-ai-agent-browses-the-web-it-sees-ugcPost-7471590224456876032-PVpc", publishedOn: "2026-06-13" },
  content: [
    {type:"image",src:"/images/prompt-injection-human-view.jpeg",alt:"PromptGuard demo in Human View: SkyRoute, an ordinary-looking flight booking page, as a person sees it"},
    {type:"paragraph",text:"Hidden texts."},
    {type:"paragraph",text:"Invisible instructions."},
    {type:"paragraph",text:"Buried commands that a human eye would never catch - but an AI reads and acts on without question, forgetting all the previous instructions, context and guardrails."},
    {type:"paragraph",text:"This is called prompt injection. And as agentic AI tools go mainstream, it's quietly becoming one of the most underestimated attack vectors out there."},
    {type:"paragraph",text:"I and Shreyansh Vats built a small demo to show exactly what I mean."},
    {type:"paragraph",text:"Toggle between Human View and Machine View on the same webpage - and watch what your AI agent actually sees underneath the surface of an innocent-looking site."},
    {type:"image",src:"/images/prompt-injection-machine-view.jpeg",alt:"PromptGuard demo in Machine View: the same page revealing hidden instructions aimed at AI agents, each flagged in red"},
    {type:"paragraph",text:"The results are unsettling."},
    {type:"paragraph",text:"Building something to fix this as part of Project Shipyard S2."},
  ],
};
export default post;
