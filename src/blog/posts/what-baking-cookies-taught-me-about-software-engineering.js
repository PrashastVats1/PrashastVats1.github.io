const post = {
  slug: "what-baking-cookies-taught-me-about-software-engineering",
  title: "What Baking Cookies Taught Me About Software Engineering",
  date: "February 2026", readTime: "5 min read", tag: "Engineering",
  excerpt: "I tried to bake cookies without an oven. What started as a kitchen experiment turned into a surprisingly useful framework for thinking about software engineering.",
  content: [
    {type:"paragraph",text:"I tried to bake cookies without an oven. Every recipe assumed you had one. I had an air fryer, trial and error, and a kitchen that smelled increasingly like burnt sugar."},
    {type:"paragraph",text:"Somewhere between the third failed batch and the first one that actually worked, I realized I was doing the same thing I do at work — adapting constraints, testing assumptions, iterating fast."},
    {type:"heading",text:"The Recipe as Code"},
    {type:"paragraph",text:"A recipe has a structure that maps surprisingly well to software. Once you see it, you can't unsee it."},
    {type:"list",items:["Ingredients = Dependencies. Just like package.json lists what you need, a recipe lists its inputs. Missing one changes everything.","\"Mix melted butter and sugar first\" = Order of Operations. You can't add eggs to cold butter. Same in code: initialize before you use.","\"Dough will be sticky\" = Known Issues. Good documentation warns you about the hard parts. Good code comments do the same.","\"Bake a single piece first\" = Test-Driven Development. I baked one cookie, found it too salty, fixed the ratio, then scaled.","\"Adjust accordingly\" = Configuration over hardcoding. Small cookies need a different temperature — you adjust a parameter, not the whole recipe."]},
    {type:"heading",text:"The Debug Loop"},
    {type:"paragraph",text:"Batch one: burnt on the outside, raw inside. Too high a temperature for too long — classic premature optimization."},
    {type:"paragraph",text:"Batch two: flat and greasy. Butter was too warm when I added it. A state management issue — the system was in the wrong state when I triggered the next step."},
    {type:"paragraph",text:"Batch three: got it right. Not because I followed the recipe perfectly, but because I understood why each step existed."},
    {type:"heading",text:"The Takeaway"},
    {type:"paragraph",text:"Good systems — whether they're cookie recipes or software architectures — share the same properties: clear inputs, defined order of operations, documented edge cases, testable units, and configurable parameters."},
    {type:"paragraph",text:"Ten cookies made it to the office. Same process, different medium. Next time you're stuck on a problem, it might help to ask: what would the recipe look like?"},
  ],
};
export default post;