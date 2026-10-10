# Phase 6 — Scholar's Archive (Blog)

We are starting Phase 6 of the fantasy portfolio. Phase 5 is complete, its artwork has been optimized, and the changes have been merged into `main`.

Do not spend time repeating Git housekeeping or re-auditing completed phases. Start implementation work.

## Step 1: Inspect the existing project

Before coding:
- Read `DESIGN.md` and all relevant phase documentation, especially `PHASE_5.md`.
- Check whether `PHASE_6.md` already exists. If it does, follow its requirements.
- Inspect the existing `BlogPage.js`, blog content/data, routing, transition system, shared fantasy components, and existing blog images.
- Review the existing Scholar's Archive design intent and identify what is already implemented versus what remains unfinished.
- Check Git status and preserve all existing work.

If no Phase 6 specification exists, derive the scope from `DESIGN.md`, the established phase roadmap, and the current implementation. Create `PHASE_6.md` documenting the implementation plan before proceeding. Do not invent unrelated features or redesign previously completed pages.

## Step 2: Implement Phase 6

Build the **Scholar's Archive**, the blog experience for the Software Archmage portfolio.

The page should feel like an atmospheric fantasy scholar's library or archive, consistent with the established design language:
- Parchment, dark wood, antique brass, warm lighting, and restrained magical details.
- Editorial presentation with excellent typography and clear reading hierarchy.
- A compelling archive landing page, article discovery, and readable individual posts, following the existing architecture and documented scope.
- Thoughtful use of existing blog images and the scholar avatar.
- Responsive layouts, accessible interactions, and graceful handling of missing artwork.
- Consistent navigation, transitions, and visual behavior with the rest of the portfolio.

Treat the existing blog content as the source of truth. Preserve article text, dates, metadata, and image references unless a documented requirement explicitly calls for a change.

Avoid generic SaaS cards, neon aesthetics, unnecessary animations, and features that don't serve the archive.

## Step 3: Quality requirements

- Implement only Phase 6. Do not begin Phase 7 or redesign completed pages.
- Reuse existing components and patterns where appropriate.
- Preserve GitHub Pages compatibility and existing deployment assumptions.
- Maintain accessibility, reduced-motion support, performance, and mobile responsiveness.
- Do not introduce unnecessary dependencies.
- Add or update tests for the new functionality.

## Step 4: Verify the implementation

Run the full test suite and production build.

Perform browser QA at 1920, 1440, 1280, 1024, 768, 600, and 375px. Check:
- Archive layout and article navigation.
- Article readability and content integrity.
- Avatar and image loading.
- No broken links, missing images, or horizontal overflow.
- Keyboard navigation and reduced-motion behavior.
- No regressions to the other five pages.

Report any checks that could not actually be performed. Do not claim success without evidence.

## Step 5: Stop for review

Provide a concise implementation report, list changed files, test/build results, and outstanding issues.

Do not commit, push, merge, or deploy. Do not start Phase 7. Stop after Phase 6 is implemented and verified so I can review it before approving the next phase.

Begin now.

---

# Implementation record

## What the Scholar's Archive is

| Route | View | Notes |
|---|---|---|
| `#/blog` | `ScholarsArchive` | Unframed walnut room with a bookshelf crest, scholar portrait, topic shelves (`aria-pressed` filter with a polite live region), "The Latest Folio" (featured parchment entry) and "The Catalogue" (earlier posts). |
| `#/blog/<slug>` | `ArticleFolio` | Breadcrumb, parchment reading folio (meta, title, lead, drop cap, headings, lists, code as chalk slates, images as plates), author signature, older/newer pager. |
| `#/blog/<unknown>` | `FolioMissing` | "A Missing Folio" with every post listed and a way back. |

Behaviour shared with the Hall of Artifacts: in-archive links (`ArchiveLink`) skip the global spell transition; entering or leaving the archive uses it. Document titles: `Archmage's Notes (Blog) | Prashast Vats`, `<Post title> | Archmage's Notes | Prashast Vats`, `Folio not found | Archmage's Notes | Prashast Vats`. Optional scene artwork slot `assets/scenes/blog.webp` is used only if present; otherwise the room is drawn in CSS/SVG. Reduced motion removes the folio entrance animation.

Files: `src/pages/BlogPage.js`, `src/pages/blog/*` (`archive.js`, `ArchiveLink.js`, `ArchiveRoom.js`, `BookShelf.js`, `FolioPlate.js`, `FolioEntry.js`, `ScholarsArchive.js`, `ArticleFolio.js`, `FolioMissing.js`), `src/blog/schema.js`, `src/App.js` (blog unframed), `src/navigation.js` (post titles), `src/index.css` (archive section + reduced motion), tests in `src/__tests__/ScholarsArchive.test.js`, `src/__tests__/ArchiveImports.test.js`, `src/__tests__/App.test.js`.

## Content system

Content and presentation are separate:

- **Content**: one module per post in `src/blog/posts/<slug>.js`. **Publishing** = importing it in `src/blog/posts/index.js` (array order is newest first). A module that is not registered is never shown.
- **Schema**: `src/blog/schema.js` documents and validates every field. `validateArchive(posts)` runs in the test suite, so an invalid post fails CI.
- **Presentation**: `src/pages/blog/*` only reads posts through `archive.js`; it never rewrites text, dates, or metadata.

Post fields:

| Field | Required | Meaning |
|---|---|---|
| `slug` | yes | kebab-case, unique; the URL is `#/blog/<slug>` |
| `title`, `excerpt`, `readTime` | yes | shown as written |
| `tag` | yes | the category; the topic shelves filter on it (`AI`, `Engineering`, `Design`) |
| `tags` | no | kebab-case keywords, listed on the folio |
| `date` | yes | `"Month YYYY"` |
| `content` | yes | blocks: `heading {text}`, `paragraph {text}`, `list {items}`, `code {label?, text}`, `image {src, alt}` |
| `format` | no | `"full"` (default) or `"summary"`. A summary shows a prominent "Read the original on LinkedIn" link and a "Summary" marker in the catalogue. Requires `source`. |
| `source` | no | `{ platform: "LinkedIn", url: "https://…", publishedOn: "YYYY-MM-DD" }`. Full posts with a source show "Originally published on LinkedIn on 3 May 2026." |
| `series` | no | `{ name, part }`. Shows "Part N of <name>" and an index of the published parts. |

## LinkedIn import workflow

1. **Inventory**: list every item on the activity page with exact text, canonical URL, and date. Classify each as original post / reshare / comment / reply. Only original posts by the owner are candidates. Record anything that cannot be retrieved with its URL and ask the owner for the text; never fill gaps.
2. **Draft**: put the retrieved text verbatim in `content-drafts/linkedin/README.md` (outside `src/`, never bundled). Take the text from the post's commentary element in the page HTML, which keeps the original line breaks; plain-text extraction drops them.
3. **Classify** (owner approves): *full article* (text kept verbatim, split into paragraph blocks at the owner's original breaks), *summary + original link* (owner writes or approves the summary), *series entry* (either format, plus `series`), or *exclude*.
4. **Duplicates**: if a post already exists in the portfolio, keep the portfolio version; optionally add `source` to credit the original. Date discrepancies are reported, not silently changed.
5. **Convert**: create `src/blog/posts/<slug>.js` with the approved text; the owner supplies or approves `title`, `excerpt`, `readTime`, `tag`, and any image.
6. **Publish**: register it in `index.js`, then run `CI=true npm test -- --watchAll=false` (the schema check fails on any malformed post) and `npm run build`.

## LinkedIn import status (2026-10-11)

**11 of 11 owner-supplied posts verified. 5 were already in the archive; 6 were imported. None await source content.** The archive now holds 12 posts. Full reconciliation (short link → canonical URL, title, date, status, format, category, tags, open issues) is in `content-drafts/linkedin/README.md`.

| Imported post (slug) | Published on LinkedIn | Format | Category | Tags |
|---|---|---|---|---|
| `when-did-minimalism-start-being-equated-to-modern-design` | 2026-10-09 | Full | Design | design, architecture, minimalism |
| `why-do-ai-coding-agents-always-want-to-fix-the-code` | 2026-10-06 | Full | AI | ai-agents, debugging, github-copilot |
| `i-can-sometimes-tell-a-website-was-built-with-ai` | 2026-09-30 | Full | AI | design, llms, creativity |
| `this-tutorial-was-supposed-to-take-me-one-week` | 2026-09-29 | Full | Engineering | react-native, debugging, ai-assisted-development |
| `two-measurements-same-automation-different-results` | 2026-09-26 | Full | Engineering | performance-testing, test-automation |
| `when-your-ai-agent-browses-the-web` | 2026-06-13 | Summary + LinkedIn link | AI | security, prompt-injection, ai-agents |

Already included (content-matched, not duplicated): *The Loop Is Tightening*, *You're Not Paying for AI*, *Vibe Coding Isn't Magic*, *Prompt Engineering Is Just System Design*, *Stories Like These Are Everywhere*. Each gained only a `source` link; text, titles and dates are unchanged and fingerprinted by the tests.

Open decisions for the owner (nothing blocked):

- Portfolio dates differ from LinkedIn for all five earlier posts (Loop: April vs 2026-05-03; Subsidy: March vs 2026-04-26; Vibe Coding: February 2025 vs 2026-03-06; Prompt Engineering: February 2026 vs 2026-01-08; Stories: August 2024 vs 2025-07-20/21). Left unchanged; `publishedOn` omitted for them until confirmed.
- *You're Not Paying for AI* and *The Loop Is Tightening* read as parts 1 and 2 ("Last week I wrote about…"); `series` not added because it would require naming the series. The promised third part was not among the 11 links.
- Author follow-up comments on posts 1–3 were not imported.
- "Design" is a new category, used only by the minimalism post.

Not imported because they were not among the 11: the Project Shipyard S2 announcement ("I signed up to ship something I care about."). Reshares and comments on other people's posts are never imported.
