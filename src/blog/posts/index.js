// Adding a new post: create src/blog/posts/your-slug.js, import here, add to array (newest first), push.
import cookiesAndSoftware   from "./what-baking-cookies-taught-me-about-software-engineering";
import promptEngineering    from "./prompt-engineering-is-system-design";
import loopTightening       from "./the-loop-is-tightening";
import aiSubsidy            from "./youre-not-paying-for-ai";
import vibeCoding           from "./vibe-coding-isnt-magic";
import storiesLikeThese     from "./stories-like-these";

const posts = [loopTightening, aiSubsidy, cookiesAndSoftware, promptEngineering, vibeCoding, storiesLikeThese];
export default posts;
