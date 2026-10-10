# Phase 7 — Guild Recruitment: Hire Me

We are continuing the fantasy portfolio project in the existing repository.

## Before you begin

Read and follow:

- `DESIGN.md` — the authoritative design bible
- `PHASE_1.md` through `PHASE_6.md`, wherever present
- The existing Hire page and its components
- Existing navigation, routing, asset manifest, design tokens, transitions, and tests

Understand the actual codebase before making changes. Reuse existing systems rather than introducing a parallel architecture.

The current branch already contains the completed and committed Phase 6 Scholar’s Archive work. Do not discard, reset, or overwrite it.

## Phase objective

Transform the existing Hire page into **Guild Recruitment**: an immersive, polished, professional way for recruiters, founders, engineering teams, and potential clients to understand what I do and contact me.

The fantasy setting should reinforce the experience without making the page confusing or unprofessional.

## Design direction

Follow the existing Software Archmage design language:

- Dark wood and stone surroundings
- Warm parchment surfaces
- Restrained antique gold and brass
- Candlelit atmosphere
- Medieval guild contracts, recruitment notices, seals, and carefully drawn ornamental details
- Consistent typography, spacing, and visual language with the existing Spellbook, Character Record, Hall of Artifacts, Wizard’s Laboratory, and Scholar’s Archive

Do not introduce neon, generic SaaS cards, glassmorphism, emojis, or visual elements copied from established fantasy franchises.

The page should feel like the final destination in the portfolio, not a separate website.

## Content and information architecture

Inspect the existing content and project data first. Reuse verified information wherever possible.

Build a page that communicates these things clearly:

1. **A strong opening**
   - A memorable heading fitting the Guild Recruitment theme.
   - A concise, professional statement about the kind of engineering work I do.
   - A clear primary contact action visible without scrolling.

2. **What I can help with**
   - Present a concise set of relevant capabilities grounded in my actual projects and experience.
   - Consider full-stack/product engineering, backend and frontend development, AI engineering, and AI security.
   - Do not imply that every area represents equal professional experience or expertise.
   - Avoid a long, generic list of technologies.

3. **Selected proof of work**
   - Reuse links to existing projects where appropriate.
   - Prefer demonstrable shipped work over unsupported claims.
   - Do not duplicate the entire Projects page.

4. **How I work**
   - Explain the practical value I bring: building and shipping products, integrating systems, debugging, evaluating AI behavior, and thinking about security where supported by existing work.
   - Keep this concise and specific.

5. **Ways to work together**
   - Make it easy to understand whether someone can contact me about a full-time role, a freelance engagement, or a relevant collaboration.
   - Use only contact methods and professional details already present in the repository or explicitly established in the project.
   - Do not invent availability, salary expectations, testimonials, client outcomes, or employment claims.

6. **Contact and social links**
   - Inspect the existing repository for verified email, GitHub, LinkedIn, portfolio, and freelance links.
   - Reuse valid links and avoid duplicating conflicting contact details.
   - Use real destinations. Do not create fake forms or buttons that appear functional but do nothing.
   - If a contact form already exists, inspect its implementation before changing it.
   - Do not add a backend, external service, secret, API key, or new infrastructure just to make the page look complete.

7. **Closing call to action**
   - End with a clear invitation to get in touch.
   - Keep the action obvious even for someone who doesn't understand the fantasy theme.

## Interaction and visual details

Use the guild metaphor selectively: recruitment notice, contract parchment, wax seal, ledger, or guild insignia.

Create visual hierarchy through typography, composition, borders, texture, and spacing rather than piling on decorations.

If the page includes interactive elements, ensure that they work with keyboard and pointer input and have clear hover and focus states.

Respect reduced-motion preferences and the existing page-transition system. Do not add unnecessary animation or audio.

Use existing assets where possible. Do not overwrite original avatar assets or add large decorative images without a clear reason.

## Technical constraints

- Preserve existing routes and navigation behavior.
- Preserve GitHub Pages compatibility.
- Keep the page responsive across narrow mobile screens, tablets, and desktop.
- Maintain semantic HTML, accessible names, visible focus, sufficient contrast, and reduced-motion support.
- Avoid new dependencies unless they are genuinely necessary.
- Do not modify Cloudflare Worker configuration, AI API behavior, secrets, or unrelated tools.
- Do not change existing blog content, dates, or metadata.
- Do not start Phase 8 or implement site-wide transition/audio polish as a separate phase.
- Do not commit, push, merge, or deploy.

## Implementation workflow

1. Inspect the existing code and identify the current Hire page, its reusable components, and any content gaps.
2. Create `PHASE_7.md` documenting the scope, design intent, acceptance criteria, and implementation plan.
3. Implement the page using the existing architecture.
4. Add or update tests for the page's important content, contact destinations, and navigation behavior.
5. Run the full test suite and production build.
6. Perform browser QA at representative desktop, tablet, and mobile widths.
7. Check for horizontal overflow, broken assets, dead links, console errors, inaccessible controls, and reduced-motion regressions.
8. Review the Git diff to ensure no unrelated changes were introduced.

## Acceptance criteria

Phase 7 is complete when:

- The Hire page feels like a natural part of the Software Archmage portfolio.
- Visitors can quickly understand what I build and how to contact me.
- All displayed claims and links are grounded in existing information.
- The page works on mobile and desktop.
- Accessibility and reduced-motion behavior are preserved.
- Tests and production build pass.
- `PHASE_7.md` accurately records what was implemented and what was tested.

At the end, report the design and implementation, files changed, test/build results, browser QA results, and any unresolved issues.

### Phase 7 visual assets

Before creating or sourcing new images, inspect the existing asset manifest and reuse suitable portfolio assets.

The page should have one distinctive Guild Recruitment visual, preferably a parchment recruitment notice or guild contract. First determine whether this can be created cleanly using the existing CSS/SVG design language. If a new raster illustration would materially improve the result, create only one.

Reuse the existing optimized avatar where appropriate. Do not generate multiple decorative images, use generic fantasy stock art, or add a large background image without a clear design benefit.

Keep the contact CTA prominent, maintain responsive layouts, and optimize any new raster asset for production. Record new assets and their sizes in `PHASE_7.md`.

Implement Phase 7 now. Do not stop after producing a plan, and do not begin Phase 8.

---

## Implementation record

### What was built

The Hire page (`#/hire`) is now an unframed **guild hall** in the same style as the Hall of Artifacts and the Archive. It has a dark timber notice board under an oak crossbeam and is drawn entirely in CSS. It honours the optional `scenes/hire.webp` slot if that artwork is ever supplied. The page reads top to bottom:

1. **Recruitment notice** (opening): parchment nailed to the board, with corner flourishes and an SVG wax seal.
   - Eyebrow "Does thy guild have a quest worthy of an Archmage?", h1 "Guild Recruitment", plain label "Contact & Hire Me".
   - A short summary restating the resume's professional summary, plus the existing regular avatar.
   - Primary CTA **Invite me to thy party** (`mailto:`), with **Consult the guild** (LinkedIn, new tab) and **Summon my record** (resume PDF download).
   - The email address shown as text. A **Copy address** button appears only where the Clipboard API exists, and announces success or failure through a `role="status"` region.
2. **The Archmage's Trades** (What I can help with): four areas, each labelled with where the experience comes from (*Professional work*, *Independent projects*, or *Professional & independent*), each with two evidence lines. AI security & identity is marked independent-only. Links to the full Character Record.
3. **Quests Completed** (Selected proof of work): Remora, Priya, and AI Agent Auth Gateway, rendered from `artifacts.js`. Each shows status, summary, its first recorded result, an internal project-record link, and its first external link. Links to the full Hall.
4. **The Guild Code** (How I work): four principles, each backed by a recorded fact.
5. **Terms of Engagement** (Ways to work together): full-time roles, freelance/contract work (with a **Commission a guild artisan / Find me on Fiverr** link to the public gig), collaborations. No availability, rates, or start dates.
6. **Seal the Contract** (Get in touch): **Send a raven** email CTA and a contact ledger (email, LinkedIn, GitHub, Fiverr, resume PDF, Bangalore).

### Content sources

Every claim comes from `src/pages/resume/resumeContent.js` (transcribed resume) or `src/pages/projects/artifacts.js`. Contact details come from `src/config.js`.

- The phone number in `config.js` is intentionally not shown.
- The freelance link is the public Fiverr gig supplied and verified by the owner (see "Fiverr gig addition" below). No other freelance platform is linked.
- No testimonials, salary, availability, client outcomes, forms, or backend were added.

### Visual assets

- **No new raster image was added.** The notice, wax seal, nails, crossbeam, and room are CSS and inline SVG.
- Reused `public/assets/avatar/regular.webp`; the original was not modified.
- The `scenes/hire.webp` slot remains optional and absent. Its absence was tested, and no broken image renders.

### Files

- `src/pages/HirePage.js`: rewritten as the Guild Recruitment page.
- `src/pages/hire/guildContent.js` (new): verified content and contact data.
- `src/pages/hire/GuildHall.js` (new): the room with an optional scene.
- `src/pages/hire/WaxSeal.js` (new): decorative SVG seal with a unique gradient id per instance.
- `src/pages/hire/CopyAddress.js` (new): progressive-enhancement copy button.
- `src/App.js`: `"hire"` added to the unframed pages.
- `src/index.css`: new "GUILD RECRUITMENT" section before Reduced Motion. Parchment surfaces switch the focus ring to `--pv-focus-on-parchment`. Responsive rules apply at 1199, 899, 767, and 479px. The page adds no animation; button hover lift is already disabled by the existing reduced-motion block.
- `src/__tests__/GuildRecruitment.test.js` (new): 23 tests.

`PlaceholderNote.js` is no longer used by any page but was left in place.

### Verification

- **Tests:** `CI=true npm test -- --watchAll=false` → 15 suites, **308 tests passed** (23 new). The new tests cover:
  - the h1 and document title, the unframed hall, and the missing-scene fallback;
  - avatar alt text, mailto/LinkedIn/resume destinations with `target`/`rel`/`download`;
  - copy-address supported, unsupported, and failure paths;
  - trade evidence bases, proof-of-work links matching `artifacts.js`, engagements, and the contract ledger;
  - no phone, form, freelance-platform link, or salary/testimonial wording; no empty or `#` links;
  - heading order and aria-hidden decoration;
  - nav transition with focus on main, the reduced-motion transition, and proof link → project record.
- **Build:** `npm run build` compiled successfully (main JS 107.76 kB gzip, +3.37 kB; CSS 25.57 kB gzip, +2.08 kB).
- **Browser QA:** served `build/` locally, measured with device emulation. At every width: horizontal overflow 0, broken images 0, and the primary email CTA fully inside the first viewport.

  | Viewport | CTA bottom edge |
  |---|---|
  | 1920×1080 | 707px |
  | 1440×900 | 707px |
  | 1280×720 | 704px |
  | 1024×768 | 752px |
  | 768×1024 | 819px |
  | 600×900 | 579px |
  | 375×667 | 648px |

  QA found two fold problems, both fixed and re-measured:
  - 375×667: the CTA started at 683px. Fixed by tightening notice spacing and the lead size below 480px.
  - 1024×768: the CTA ended at 850px. Fixed with a narrower portrait column between 768 and 1199px, so the title fits on one line.

  The accessibility tree showed the expected link and button names, including "(opens in a new tab)" on external links.

### Not performed / limitations

- **Visual screenshots at emulated widths could not be captured.** The browser screenshot tool kept returning the unemulated frame, and a direct DevTools capture hung. Layout was verified by measurement instead; only one desktop-pane screenshot was reviewed.
- Console errors were not separately hooked during this QA pass.
- Keyboard focus was verified through tests (main receives focus after navigation) and the CSS focus tokens, not by physical Tab presses.
- External destinations (LinkedIn, GitHub, remora.watch, the demos) are the existing verified URLs; they were not fetched live.
- Regression checks on other pages rely on the full test suite; they were not re-inspected in the browser.

### Fiverr gig addition

The owner supplied the verified public gig URL: `https://www.fiverr.com/prashast_vats/build-a-custom-full-stack-website-using-react-and-python`. The private seller dashboard is not used.

- `src/config.js`: added `fiverr` alongside the other contact links.
- `src/pages/hire/guildContent.js`: added `CONTACT.fiverr`, and the freelance engagement now carries a link: fantasy label "Commission a guild artisan", plain hint "Find me on Fiverr".
- `src/pages/HirePage.js`:
  - The freelance scroll renders that link as a secondary button.
  - The contract ledger gains a "Fiverr" row showing `fiverr.com/prashast_vats`.
  - Both links use `target="_blank"`, `rel="noopener noreferrer"`, and a visually hidden "(opens in a new tab)".
- `src/index.css`: one rule, `.pv-term__link`, for spacing above the button.
- Existing email, LinkedIn, GitHub, and resume actions are unchanged.

**Verification**

- **Tests:** 15 suites, **310 tests passed**.
  - Two new tests: the freelance link (destination, new tab, rel, visible "Find me on Fiverr") and that config holds the public gig, not a dashboard URL.
  - The contract-ledger test now also checks the Fiverr row.
  - The honesty guard now requires every Fiverr link to be the exact gig URL and still rejects other freelance platforms.
- **Build:** compiled successfully (main JS 107.93 kB gzip, +165 B; CSS 25.65 kB, +5 B).
- **Browser QA** on the built site:
  - 375×667: overflow 0, both Fiverr links fit within their containers, and the primary CTA still ends at 648px.
  - 1440×900: overflow 0, both links fit, CTA ends at 707px, and the three engagement scrolls remain equal height (312px).
- **Not checked:** the Fiverr page itself was not fetched live; the URL is as supplied by the owner.