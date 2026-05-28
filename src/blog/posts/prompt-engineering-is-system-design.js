const post = {
  slug: "prompt-engineering-is-system-design",
  title: "Prompt Engineering Is Just System Design",
  date: "February 2026", readTime: "4 min read", tag: "AI",
  excerpt: "Most prompt advice focuses on clever wording. What actually works: treating prompts like specifications and applying the same principles we use when designing software.",
  content: [
    {type:"paragraph",text:"Prompt engineering is often treated like a magic trick. Write the right sentence and you'll get the perfect answer. What I've learned is that this mindset breaks the moment you try to use AI in real workflows."},
    {type:"heading",text:"What is a prompt, really?"},
    {type:"paragraph",text:"A prompt is not a conversation — it's closer to a specification. If your prompts are vague, overloaded, or inconsistent, the output will be too. Just like unclear requirements in software often lead to incomplete or poor systems."},
    {type:"paragraph",text:"Phrases like \"I feel like\" or \"I think\" aren't the real problem — ambiguity is. They introduce intent drift and loosen constraints, which makes the system harder to reason about."},
    {type:"heading",text:"A common mistake"},
    {type:"paragraph",text:"Treating AI like a person instead of a tool. That's understandable — humans naturally personify systems. But AI isn't human. It's a system. When we ask it to do too much in one prompt, dump an entire requirement into a single paragraph, or optimize for one \"good answer\" instead of repeatable results, we make failures harder to diagnose."},
    {type:"code",label:"Vague",text:"\"Can you please refactor this code and make it better?\""},
    {type:"code",label:"Constrained",text:"\"Refactor this function for readability. Don't change behavior. Explain trade-offs.\""},
    {type:"paragraph",text:"The second is constrained, testable, and repeatable."},
    {type:"heading",text:"What works: treat it like system design"},
    {type:"paragraph",text:"Instead of asking the model to solve everything at once, break the task down:"},
    {type:"list",items:["First, generate structure or an approach.","Then, refine a specific part.","Finally, review edge cases or trade-offs."]},
    {type:"paragraph",text:"Each prompt has a single responsibility. You're no longer chatting — you're iterating."},
    {type:"heading",text:"The takeaway"},
    {type:"paragraph",text:"The model doesn't replace thinking. It compresses the time between idea and iteration. Prompt engineering isn't about clever wording. It's about clarity, constraints, and iteration — the same skills we already use when designing software systems."},
  ],
};
export default post;