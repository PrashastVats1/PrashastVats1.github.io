// Adding a new post: create src/blog/posts/your-slug.js, import here, add to array (newest first), push.
// Field reference and validation: src/blog/schema.js. LinkedIn import workflow: PHASE_6.md.
import cookiesAndSoftware   from "./what-baking-cookies-taught-me-about-software-engineering";
import promptEngineering    from "./prompt-engineering-is-system-design";
import loopTightening       from "./the-loop-is-tightening";
import aiSubsidy            from "./youre-not-paying-for-ai";
import vibeCoding           from "./vibe-coding-isnt-magic";
import storiesLikeThese     from "./stories-like-these";
import minimalism           from "./when-did-minimalism-start-being-equated-to-modern-design";
import agentsFixTheCode     from "./why-do-ai-coding-agents-always-want-to-fix-the-code";
import builtWithAi          from "./i-can-sometimes-tell-a-website-was-built-with-ai";
import outdatedTutorial     from "./this-tutorial-was-supposed-to-take-me-one-week";
import twoMeasurements      from "./two-measurements-same-automation-different-results";
import agentBrowsesTheWeb   from "./when-your-ai-agent-browses-the-web";

const posts = [
  minimalism, agentsFixTheCode, builtWithAi, outdatedTutorial, twoMeasurements, agentBrowsesTheWeb,
  loopTightening, aiSubsidy, cookiesAndSoftware, promptEngineering, vibeCoding, storiesLikeThese,
];
export default posts;
