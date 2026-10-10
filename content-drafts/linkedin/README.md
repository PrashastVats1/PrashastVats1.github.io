# LinkedIn import drafts

## Reconciliation of the 11 owner-supplied posts (2026-10-11)

All 11 `lnkd.in` links resolved and were readable without login. **11 of 11 verified; 5 were
already in the archive, 6 were imported; 0 await source content.**

- Canonical URL = the redirect target with its `utm_*`/`rcm` query string removed; all 11 returned HTTP 200.
- Publication date = the post's `datePublished` on the public page, cross-checked against the
  timestamp encoded in its activity ID (UTC; all matched).
- Text = the post's commentary element in the page HTML, which keeps the original line breaks
  (the plain-text extraction used for the 2026-10-10 drafts below did not). Paragraphs were split
  exactly at those breaks; no wording was changed. Each post's opening line, in the owner's own
  words, is used as its title (LinkedIn posts have no title field; LinkedIn's generated page titles
  were not used). Excerpts are verbatim sentences from the post.
- Reading time for imports = words ÷ 200, rounded up.
- Duplicates were matched by comparing content, not URLs.

| # | Short link | Canonical URL (`https://www.linkedin.com/posts/` + …) | Title (owner's opening line) | Published | Status | Format | Category | Tags | Outstanding |
|---|---|---|---|---|---|---|---|---|---|
| 1 | https://lnkd.in/p/g-eH8Ka9 | `prashast-vats_when-did-minimalism-start-being-equated-share-7514277898850041856-a62Y` | When did "minimalism" start being equated to "modern design" everywhere? | 2026-10-09 | Imported → `when-did-minimalism-start-being-equated-to-modern-design` | Full | Design (new) | design, architecture, minimalism | Author's follow-up comment (CHI 2021 study) not imported |
| 2 | https://lnkd.in/p/g38NXNMu | `prashast-vats_why-do-ai-coding-agents-always-want-to-fix-share-7513141740896403457-sXh7` | Why do AI coding agents always want to fix the code? | 2026-10-06 | Imported → `why-do-ai-coding-agents-always-want-to-fix-the-code` | Full | AI | ai-agents, debugging, github-copilot | Author's follow-up comment (5-step checklist) not imported |
| 3 | https://lnkd.in/p/gGHHqf8s | `prashast-vats_i-can-sometimes-tell-a-website-was-built-share-7511027779283427328-XeRU` | I can sometimes tell a website was built with AI before I even see the code. | 2026-09-30 | Imported → `i-can-sometimes-tell-a-website-was-built-with-ai` | Full | AI | design, llms, creativity | Author's follow-up comment not imported |
| 4 | https://lnkd.in/p/gBRVn578 | `prashast-vats_this-tutorial-was-supposed-to-take-me-one-share-7510674073505538048-Zp7R` | This tutorial was supposed to take me one week. It took me three. | 2026-09-29 | Imported → `this-tutorial-was-supposed-to-take-me-one-week` | Full | Engineering | react-native, debugging, ai-assisted-development | — |
| 5 | https://lnkd.in/p/gdNQpgG9 | `prashast-vats_two-measurements-same-automation-different-share-7509559361170681856-nk9r` | Two measurements. Same automation. Different results. | 2026-09-26 | Imported → `two-measurements-same-automation-different-results` | Full | Engineering | performance-testing, test-automation | — |
| 6 | https://lnkd.in/p/gEwy9y3H | `prashast-vats_when-your-ai-agent-browses-the-web-it-sees-ugcPost-7471590224456876032-PVpc` | When your AI agent browses the web, it sees things you don't. | 2026-06-13 | Imported → `when-your-ai-agent-browses-the-web` | Summary + link | AI | security, prompt-injection, ai-agents | Summary = the post's own paragraphs minus the closing request for user interviews ("this week"), which only the LinkedIn original carries. Both attached demo screenshots imported to `public/images/prompt-injection-*.jpeg`. |
| 7 | https://lnkd.in/p/g93aQgn9 | `prashast-vats_the-loop-is-tightening-and-youre-inside-share-7456688050274979840-bARv` | The Loop Is Tightening. And You're Inside It | 2026-05-03 | Already included → `the-loop-is-tightening` | Full (existing) | AI | — | Portfolio says April 2026 |
| 8 | https://lnkd.in/p/g5SQH9zZ | `prashast-vats_youre-not-paying-for-ai-youre-subsidizing-share-7454168393361936385-zPft` | You're Not Paying for AI. You're Subsidizing It. | 2026-04-26 | Already included → `youre-not-paying-for-ai-youre-subsidizing-it` | Full (existing) | AI | — | Portfolio says March 2026 |
| 9 | https://lnkd.in/p/gzZ2gzv5 | `prashast-vats_vibe-coding-isnt-magic-its-faster-iteration-share-7435660555694256128-yicR` | Vibe Coding Isn't Magic - It's Faster Iteration | 2026-03-06 | Already included → `vibe-coding-isnt-magic-its-faster-iteration` | Full (existing) | Engineering | — | Portfolio says February 2025 |
| 10 | https://lnkd.in/p/gGUUpc7S | `prashast-vats_prompt-engineering-is-often-treated-like-share-7414973578703716371-w3UB` | Prompt engineering is often treated like a magic trick. | 2026-01-08 | Already included → `prompt-engineering-is-system-design` | Full (existing) | AI | — | Portfolio says February 2026 |
| 11 | https://lnkd.in/p/g96qF95i | `prashast-vats_stories-like-these-are-everywhere-these-days-share-7352789891430207489-VcVj` | Stories like these are everywhere these days: | 2025-07-21 IST (2025-07-20 UTC) | Already included → `stories-like-these-are-everywhere-these-days` | Full (existing) | AI | — | Portfolio says August 2024 |

For the five posts already in the archive, only `source: { platform, url }` was added; their
title, date, excerpt, reading time, category and content are unchanged (fingerprinted in
`src/__tests__/LinkedInImport.test.js`). `publishedOn` was deliberately left out because every
LinkedIn date differs from the portfolio date; the owner should decide which is correct.

Not among the 11 and therefore not imported: the Project Shipyard S2 announcement
("I signed up to ship something I care about.") and *What Baking Cookies Taught Me About
Software Engineering* (portfolio-only; no LinkedIn source supplied).

---

## Earlier drafts (2026-10-10, superseded by the import above)

Raw text retrieved from Prashast Vats' public LinkedIn posts, kept for owner review.
Nothing in this folder is imported by the site; a post is only published once it is
converted to a module in `src/blog/posts/` **and** registered in `src/blog/posts/index.js`.

Retrieved 2026-10-10 from the public post pages (no login). LinkedIn's public pages
collapse paragraph breaks, so the text below is one paragraph per post. The **wording**
is verbatim; the **paragraph breaks are not**, and must be restored from the owner's
copy (or confirmed by the owner) before import. Other people's comments are excluded.

See `PHASE_6.md` → "LinkedIn import" for the inventory and proposed classifications.

---

## 1. AI-generated content lacks personality, it's our job to add it

- URL: https://www.linkedin.com/posts/prashast-vats_i-can-sometimes-tell-a-website-was-built-activity-7511027782009671681-g7_f
- Published: 2026-09-30 (from search index; shown as "1w" on the page at retrieval)
- Type: original post
- LinkedIn page title: "AI-generated content lacks personality, it's our job to add it" (LinkedIn-generated; the post itself has no title line)

> I can sometimes tell a website was built with AI before I even see the code. Not because there's something obviously wrong with it. The opposite, actually. The layout is clean. The typography works. The spacing is polished. There's a nice hero section, rounded cards, subtle gradients and everything looks... familiar. I've started noticing the same thing in more than just websites. Emails, articles, blogs and even social posts can have that same polished structure where everything is technically fine, but somehow none of it feels particularly memorable. And I think there's a reason for that. Large language models are extremely good at learning patterns from existing human-created material and producing something that fits those patterns. If the most common way of writing something is a certain way, that's exactly the kind of pattern the model is going to be very good at reproducing. Being different isn't the primary job of an LLM. Being useful and plausible is. So when we ask AI to write our post, design our website, write our landing page or come up with our ideas, we shouldn't be surprised when the result starts looking like everything else. And I don't think that's a reason to stop using AI. I use it constantly. I think the responsibility shifts to us. Use AI to explore ideas. Use it to get unstuck. Use it to build faster. But don't let the first output become the final one just because it looks good. Because AI is very good at giving us something that works. It's still our job to make sure it feels like something only we would have made.

Author's own follow-up comment (optional addendum, owner to decide):

> One thing I've started doing when I use AI for creative work is deliberately asking myself: "What would make this less obvious?" Not "make it better." Less obvious. Change the layout. Remove the section that feels unnecessary. Try a visual direction that isn't the first recommendation. Rewrite the sentence that sounds too polished. Add something specific to the actual project instead of another generic example. The first output is often a good starting point. I'm just becoming less convinced that it should be the finishing point.

---

## 2. Two measurements. Same automation. Different results.

- URL: https://www.linkedin.com/posts/prashast-vats_two-measurements-same-automation-different-activity-7509559363892662272-I0jK
- Published: 2026-09-26 (from search index)
- Type: original post
- LinkedIn page title: "Automation Measurement: What Exactly Does the Number Represent?" (LinkedIn-generated)

> Two measurements. Same automation. Different results. My first instinct was: one of them must be wrong. Then I looked more closely at what we were actually measuring. The automation measurement started when the script triggered an action. The other measurement was based on what was visible in the application. Those aren't necessarily the same event. There can be time between: script triggers action → application receives it → UI starts changing → UI becomes usable → underlying operation finishes So a difference between 2.2 seconds and 3.1 seconds doesn't automatically mean that one measurement is bad. It can mean we're measuring different boundaries. That sounds obvious when written out. It's surprisingly easy to miss when you're staring at a spreadsheet of timings. It also changed how I approach automation performance measurements. Before asking: "Which number is correct?" I now ask: "What exactly does this number represent?" That question matters even more when you're comparing results across different machines, tools, or measurement methods. Performance testing isn't just about collecting numbers. The hard part is defining what the number means. A perfectly precise measurement of the wrong event is still the wrong measurement.

---

## 3. When your AI agent browses the web, it sees things you don't.

- URL: https://www.linkedin.com/posts/prashast-vats_when-your-ai-agent-browses-the-web-it-sees-activity-7471590227405615104-vw5N
- Published: 2026-06-13 (from search index)
- Type: original post (names a collaborator, Shreyansh Vats; contains a time-bound call for user interviews)

> When your AI agent browses the web, it sees things you don't. Hidden texts. Invisible instructions. Buried commands that a human eye would never catch - but an AI reads and acts on without question, forgetting all the previous instructions, context and guardrails. This is called prompt injection. And as agentic AI tools go mainstream, it's quietly becoming one of the most underestimated attack vectors out there. I and Shreyansh Vats built a small demo to show exactly what I mean. Toggle between Human View and Machine View on the same webpage - and watch what your AI agent actually sees underneath the surface of an innocent-looking site. The results are unsettling. Building something to fix this as part of Project Shipyard S2. If you use agentic AI tools - Operator, Manus, Browser Use, or anything that browses on your behalf - I'd love 15 minutes of your time this week. Not a sales call. Just trying to understand if this problem resonates with real people before we build further. Drop a comment or DM me if you're open to a quick chat.

The demo link referenced by the post was not retrievable from the public page.

---

## 4. I signed up to ship something I care about.

- URL: https://www.linkedin.com/posts/prashast-vats_i-signed-up-to-ship-something-i-care-about-activity-7467590778563964928-SZ3S
- Published: 2026-06-02 (from search index)
- Type: original post (announcement; thanks named people and organisations)

> I signed up to ship something I care about. Just got into Project Shipyard S2, a 3-weekend build program for people obsessed with actually shipping, not just talking about it. 15 builders. One rule: you leave with something real. Not a deck. Not a doc. Three weekends to go from idea to something in people's hands. Let's go. 🛳️ Thanks to AI Learn Circle and Harkirat Singh for putting this together, and to the supporters making it possible - Venture Catalysts++ | India's 1st Multi-Stage VC, Karan Bhargav, Antler, Paytm, and Ravindra M.K (Bhive Workspace). Also excited to build alongside the rest of the cohort. Let's make it count!!
