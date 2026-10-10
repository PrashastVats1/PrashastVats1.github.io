const post = {
  slug: "this-tutorial-was-supposed-to-take-me-one-week",
  title: "This tutorial was supposed to take me one week. It took me three.",
  date: "September 2026", readTime: "2 min read", tag: "Engineering",
  tags: ["react-native", "debugging", "ai-assisted-development"],
  excerpt: "Sometimes, the tutorial is the thing that needs debugging.",
  source: { platform: "LinkedIn", url: "https://www.linkedin.com/posts/prashast-vats_this-tutorial-was-supposed-to-take-me-one-share-7510674073505538048-Zp7R", publishedOn: "2026-09-29" },
  content: [
    {type:"paragraph",text:"I was following a React Native tutorial that was around two years old, and I expected it to be fairly straightforward since I was following an existing project. Instead, around 20% of the things in the tutorial didn't work anymore. Some packages had changed, some APIs were deprecated, and some of the errors were simply because the tutorial was built around a different version of the ecosystem. Since I was following someone else's steps, my first assumption was usually that I had made a mistake. A lot of the debugging ended up being figuring out whether I had actually done something wrong or whether the tutorial itself was outdated."},
    {type:"paragraph",text:"This is where AI was really useful throughout the project. I could give it the error, the code I was working with, the package and version information, and what the tutorial was trying to achieve, and use it to work through what had changed and what the current approach should be. Of course, I still had to test the suggestions and understand why they worked. Some fixes worked immediately, some didn't, and sometimes fixing one thing exposed another issue. But it made investigating those problems much faster than trying to piece everything together from outdated examples and scattered answers."},
    {type:"paragraph",text:"What was supposed to be a one-week project eventually became a three-week project, but it left me thinking about how quickly software changes. You can see the same thing happening even faster in AI. APIs and models that were current not long ago are already being deprecated or replaced. OpenAI's Assistants API, for example, was shut down in August 2026 in favor of newer APIs, while Anthropic has retired several Claude models and Google has made breaking changes to its Gemini API. Six months can be a surprisingly long time in some parts of software now."},
    {type:"paragraph",text:"So I think there's a useful habit here: when something from a tutorial, blog post, GitHub repo, or even an AI-generated answer doesn't work, don't immediately assume your implementation is wrong. Check whether the thing you're following is still current."},
    {type:"paragraph",text:"Sometimes, the tutorial is the thing that needs debugging."},
  ],
};
export default post;
