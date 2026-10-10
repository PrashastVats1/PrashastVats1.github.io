const post = {
  slug: "why-do-ai-coding-agents-always-want-to-fix-the-code",
  title: "Why do AI coding agents always want to fix the code?",
  date: "October 2026", readTime: "2 min read", tag: "AI",
  tags: ["ai-agents", "debugging", "github-copilot"],
  excerpt: "Give them a problem statement and a codebase, and they are very good at finding something to change. But they can be much less likely to stop and question the premise of the problem itself.",
  source: { platform: "LinkedIn", url: "https://www.linkedin.com/posts/prashast-vats_why-do-ai-coding-agents-always-want-to-fix-share-7513141740896403457-sXh7", publishedOn: "2026-10-06" },
  content: [
    {type:"paragraph",text:"I had one spend a lot of time trying to fix a problem that might not have been a code problem at all."},
    {type:"paragraph",text:"I recently got a JIRA bug report describing a particular behaviour in a specific environment. I thought of checking with GitHub Copilot, gave the issue to the agent, and it immediately started investigating the code and looking for a fix. The reasoning was technically plausible, but there was one question it wasn't asking: was this scenario actually supposed to work?"},
    {type:"paragraph",text:"After banging my head against the wall for some time, I asked around in my team, and they suggested checking the actual documentation of the application. I checked the documentation, and imagine my surprise: the bug report itself was faulty. What had been reported as an issue was actually a prerequisite of the application. That meant the behaviour wasn't a bug in the code at all. I then asked the agent to investigate that possibility as well. Only after I explicitly pointed it towards the documentation did it change its approach."},
    {type:"paragraph",text:"That made me think about how often I've seen this with AI coding agents. Give them a problem statement and a codebase, and they are very good at finding something to change. But they can be much less likely to stop and question the premise of the problem itself."},
    {type:"paragraph",text:"If the ticket says something isn't working, the agent can easily start from \"how do we fix this?\" instead of \"why is this happening, and should this work in the first place?\""},
    {type:"paragraph",text:"That's something I'm trying to be more conscious of when using AI agents. Before changing code, I want to establish whether the issue is actually in the code, or whether it's a configuration issue, environment issue, unsupported scenario, expected behaviour, or something else entirely."},
    {type:"paragraph",text:"AI can be very good at finding a solution."},
    {type:"paragraph",text:"But before finding the solution, someone still has to make sure we're solving the right problem."},
  ],
};
export default post;
