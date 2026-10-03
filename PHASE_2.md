# PHASE 2 — THE SPELLBOOK HOME

## 1. READ THIS FIRST

Before doing anything:

1. Read `DESIGN.md` completely.
2. Read this `PHASE_2.md` completely.
3. Inspect the current Phase 1 implementation before modifying anything.
4. Do not assume the implementation matches the original Phase 1 plan exactly.
5. Treat the current working code as the foundation for Phase 2.
6. Preserve the existing Phase 1 architecture unless a concrete reason requires changing it.

This is Phase 2 only.

Do NOT implement Phase 3 or later phases.

Do NOT implement:
- the full Resume / Character Record
- the full Projects / Hall of Artifacts
- the full Tools / Wizard's Laboratory
- the full Blog / Archmage's Notes
- the full Hire Me / Guild Recruitment page
- final spell-casting transitions
- final ambient audio
- final sound effects
- advanced global microinteractions

Those belong to later phases.

---

# 2. PHASE 2 GOAL

Replace the current Home placeholder with the actual interactive fantasy portfolio introduction:

## THE SPELLBOOK

The Home page should feel like the visitor has opened an actual magical spellbook belonging to a software engineer.

The fantasy should be part of the interaction and information architecture, not merely decoration.

The visitor should understand very quickly:

1. Who this person is.
2. What this person does.
3. What kind of software engineer this person is.
4. What they have built.
5. Where they can explore next.

The experience should communicate:

> "Whoa, this is different."

followed quickly by:

> "Oh, this is a portfolio."

and then:

> "I understand who this person is and what they build."

Do not sacrifice professional clarity for fantasy.

---

# 3. DESIGN SOURCE OF TRUTH

Follow the visual and interaction rules in `DESIGN.md`.

Important existing decisions:

- Whimsical medieval fantasy / RPG-inspired world.
- Do not mix cyberpunk, sci-fi, space, or unrelated visual languages.
- Dark fantasy environment surrounding warm parchment content.
- Parchment should feel like a physical artifact.
- Fantasy should be whimsical rather than grimdark.
- No emoji-based UI.
- Pixel art is primarily for avatar/game-like elements.
- Do not turn the entire site into pixel art.
- Do not imitate mahybe.com literally.
- The site should remain understandable to recruiters and nontechnical visitors.

The large-screen density rule added after Phase 1 is especially important:

The fantasy shell should not rely on empty space to create atmosphere.

On large displays:
- the surrounding dark environment can expand
- the spellbook should maintain deliberate visual presence
- the parchment should not become an unnecessarily giant empty surface
- content and composition should determine meaningful height
- decoration must not be added merely to fill empty space

Do not solve empty space by adding meaningless decorative elements.

---

# 4. CURRENT PHASE 1 FOUNDATION

Phase 1 has already established:

- custom hash routing
- `#/home`
- `#/resume`
- `#/projects`
- `#/tools`
- `#/blog`
- `#/hire`
- fantasy shell
- dark wood/stone environment
- parchment surface
- fantasy navigation
- active navigation state
- mobile navigation
- audio architecture
- transition architecture
- avatar component
- asset manifest
- responsive foundations
- accessibility foundations
- test setup

Preserve these systems.

All navigation must continue using the existing navigation/router architecture.

Do not replace the custom hash router with React Router.

Do not migrate CRA to Vite.

Do not rewrite the project architecture unnecessarily.

---

# 5. HOME PAGE CONCEPT

The Home page represents:

## THE SPELLBOOK

This is the visitor's first encounter with the portfolio.

The page should visually resemble an opened magical spellbook / grimoire rather than a normal website hero section.

The spellbook should be the primary visual artifact on the page.

Do not simply place a normal hero section inside a parchment rectangle.

The composition should communicate that the visitor has opened something.

---

# 6. DESKTOP SPELLBOOK

On desktop-sized screens, use an open-book / two-page composition.

Conceptually:

```text
                 THE SPELLBOOK

        ┌─────────────────────────────────────┐
        │                                     │
        │       LEFT PAGE      │    RIGHT PAGE │
        │                     │               │
        │     identity        │   welcome /   │
        │     introduction    │   exploration │
        │                     │               │
        │                     │               │
        │                     │               │
        └─────────────────────────────────────┘

This does NOT have to literally look like two physical paper rectangles with a giant visible seam if that hurts readability.

The important concept is:

left page
right page
coherent book surface
central book composition
page-turn interaction

The open book should have a sensible maximum width.

Do not stretch the book indefinitely on large monitors.

Allow the dark fantasy environment to occupy the additional viewport space.

7. LEFT PAGE — IDENTITY

The left page should establish identity.

Use verified professional information from the existing repository.

Do not invent professional facts.

The page should contain approximately:

avatar
name
professional title
concise professional identity statement
short description
optional fantasy title

The fantasy title may be:

"Software Archmage"

but the professional title must remain clear:

"Software Engineer"

Do not use an RPG "Level" that implies years of experience.

For example:

Good:

"Software Engineer"

"Software Archmage"

"3+ Years Experience"

if that exact experience figure is verified from the existing content.

Avoid:

"Level 3 Wizard"

because it can accidentally communicate juniority to recruiters.

8. AVATAR

Use the existing reusable Avatar component.

The intended assets are:

avatar/regular.png

for the normal portfolio avatar.

If the file is present, use it.

If it is absent, keep the existing designed fallback.

Do NOT generate an avatar.

Do NOT invent a replacement portrait.

Do NOT replace the user's supplied avatar.

The avatar should feel like an illustrated/pixel-art representation of the owner of the spellbook.

The avatar should not dominate the page.

It is an identity anchor.

9. PROFESSIONAL INTRODUCTION

The introduction must be concise.

The visitor should understand the professional identity without having to decode fantasy language.

Use verified information from the existing portfolio content in src/config.js and related sources.

Do not copy decorative or placeholder text from mockups.

Do not invent:

companies
job titles
years
technologies
achievements
clients
responsibilities
metrics

If the current repository contains information that needs cleanup, use only information that can be confidently verified from the existing source.

Fantasy wording can surround the professional facts, but must not obscure them.

10. RIGHT PAGE — EXPLORATION

The right page should encourage the visitor to explore the portfolio.

It should contain clear paths toward:

Resume / Character Record
Projects / Hall of Artifacts
optionally Tools / Wizard's Laboratory if the composition supports it

The most important exploration actions should be:

Character Record

Plain meaning:
Resume

Hall of Artifacts

Plain meaning:
Projects

The fantasy labels must always have enough plain-language context that a recruiter knows what they mean.

Do not make the visitor guess what "Hall of Artifacts" means.

11. PRIMARY CALL TO ACTION

The Home page should have a clear primary action.

Recommended:

"Open the Character Record"

with supporting text such as:

"View my resume"

The button should use the existing fantasy button system.

It must be a real accessible button/link.

It must navigate through the existing navigation system so the global transition architecture remains active.

12. SECONDARY CALL TO ACTION

Provide a secondary path to projects:

"Enter the Hall of Artifacts"

with supporting text such as:

"See what I've built"

Again:

real link/button
keyboard accessible
existing navigation system
existing transition system

Do not add a large number of CTAs.

The Home page should feel intentional rather than like a conventional landing page with six competing buttons.

13. SPELLBOOK INTERACTION

The spellbook should have a meaningful page-turn interaction.

The user should be able to move through the spellbook without relying exclusively on the top navigation.

Possible interactions:

next-page control
previous-page control
clicking/tapping an obvious page edge
swipe on mobile if practical

Choose the simplest interaction that feels natural and remains accessible.

Do not build a complicated physics-based page-flip library.

Do not add a large dependency solely for a page-turn animation.

CSS transitions and existing React state are preferred where practical.

14. PAGE-TURN BEHAVIOR

The page-turn interaction must:

feel deliberate
remain fast
not block navigation unnecessarily
preserve accessibility
work on desktop
degrade gracefully on mobile
respect reduced-motion preferences

The page-turn should not be confused with the global navigation spell transition.

There are two separate interaction concepts:

Page turn

Used inside the Spellbook.

Global spell transition

Used when navigating between major portfolio sections.

Do not merge these systems.

15. MOBILE SPELLBOOK

Below the existing mobile breakpoint, do NOT force a desktop two-page spread into a narrow screen.

Use a single-page spellbook experience.

Conceptually:

┌───────────────────┐
│                   │
│     SPELLBOOK     │
│                   │
│      avatar       │
│                   │
│     identity      │
│                   │
│     content       │
│                   │
│    next page →    │
│                   │
└───────────────────┘

The visitor can move between the book's pages.

The existing mobile navigation/menu remains available.

Do not create horizontal overflow.

16. LARGE-SCREEN COMPOSITION

Explicitly test the Home page at large desktop sizes.

At minimum inspect:

approximately 1280px wide
approximately 1440px wide
a larger desktop width if practical

The spellbook should remain visually substantial.

Do NOT:

stretch parchment indefinitely
leave a tiny block of content floating inside a huge parchment
fill space with random candles, books, furniture, cats, cauldrons, etc.
add decorative objects simply because the screen is large

Instead use:

better book composition
meaningful content grouping
page structure
appropriate typography
avatar placement
subtle illustrations or asset slots where useful

Final environmental artwork may be added in later phases.

17. ART ASSET STRATEGY

Phase 2 may introduce actual visual assets if they materially improve the Spellbook.

Use the existing asset architecture:

public/assets/scenes/

public/assets/artifacts/

public/assets/lab/

public/assets/icons/

public/assets/effects/

Do not create a large number of temporary decorative assets that will later be discarded.

If an illustration is required but not yet available:

use an existing designed fallback
use CSS treatment
use the existing asset slot
do not use emoji
do not use unrelated stock imagery

The page should still work if final artwork is absent.

18. TYPOGRAPHY

Keep the Phase 1 typography unless there is a demonstrated problem.

Current Phase 1 choice:

IM Fell English SC for headings
IM Fell English italic for flourishes
Alegreya for body text

Do not introduce a new font family merely for variety.

Typography should prioritize:

readability
hierarchy
fantasy consistency
personality

The visitor must be able to scan the page quickly.

19. CONTENT DENSITY

The Home page should contain enough meaningful information that the visitor does not see an empty artifact.

But do not turn the Home page into the entire resume.

The Home page is an introduction and gateway.

It should answer:

Who are you?
What do you do?
What have you built?
Where should I explore next?

The detailed information belongs to later pages.

20. EXISTING CONTENT

Use the existing repository as the source for professional content.

Primary source:

src/config.js

Also inspect relevant existing content files if necessary.

Do not treat the Phase 1 placeholder text as the source of professional facts.

Do not use the mockup/reference image as a content source.

The reference image is only for visual inspiration.

21. NAVIGATION

Do not remove the existing top navigation.

The top navigation remains the global navigation between major portfolio sections.

The Spellbook introduces additional contextual navigation inside Home.

Both should coexist.

The visitor should always have an obvious way to leave the Spellbook and explore another major section.

22. GLOBAL TRANSITION

Preserve the Phase 1 transition architecture.

Do not implement the final wizard spell animation yet.

When a Home CTA navigates to another major page:

use the existing global transition
do not create a second global transition system

The eventual spell-casting animation will replace the temporary visual in a later phase.

23. AUDIO

Do not add final audio in Phase 2.

Keep the Phase 1 audio architecture.

Do not add placeholder music merely to make the page feel more complete.

The final ambient soundscape belongs to Phase 8.

If the audio control currently communicates that no soundscape is loaded, preserve that behavior unless a small UX correction is necessary.

24. ACCESSIBILITY

The Spellbook must remain accessible.

Requirements:

semantic headings
semantic navigation
real buttons/links
visible keyboard focus
accessible labels for icon-only controls
keyboard access to page navigation
no interaction that requires hover
reduced-motion support
sufficient contrast
no text embedded only in images
mobile controls accessible
page-turn controls understandable to screen readers

If a visual page-turn cannot be made sufficiently accessible, provide a normal button-based alternative.

25. PERFORMANCE

Do not introduce a large animation or page-flip library unless there is a compelling reason.

Prefer:

CSS transitions
CSS transforms
existing React state
existing components
lightweight assets

Avoid:

giant background videos
large unoptimized images
unnecessary dependencies
expensive continuous animations
26. CODE QUALITY

Follow the existing project's JavaScript/React conventions.

Keep components reasonably separated.

Do not rewrite unrelated Phase 1 code.

Do not delete old portfolio components.

Do not modify:

public/images/

unless there is a concrete technical requirement.

Do not modify the existing resume files.

Do not modify the GitHub Pages deployment workflow unless Phase 2 genuinely requires it.

27. TESTING

After implementation, run the Phase 1 regression tests plus new Phase 2 tests.

At minimum:

CI=true npm test

and:

CI=true npm run build

The build must complete without warnings.

Add tests for the Spellbook behavior where practical.

Test at minimum:

Home loads
avatar fallback works
real avatar works if supplied
primary CTA navigates correctly
secondary CTA navigates correctly
page-turn state changes
page navigation works
keyboard interaction works
reduced motion works
existing global transition still works
existing routes still load
mobile menu still works
no broken assets
no horizontal overflow

Do not remove or weaken Phase 1 tests.

28. BROWSER QA

After automated tests, manually inspect the actual application.

Check:

Desktop
1280px
1440px
larger desktop if available
Mobile
approximately 375px
approximately 768px boundary

Check:

visual hierarchy
page proportions
book composition
typography
button placement
navigation
page turns
global transitions
focus states
reduced motion
horizontal overflow
29. DO NOT OVERBUILD

Phase 2 should establish the real Home experience.

Do not turn Phase 2 into a general visual-polish phase.

Do not implement:

complete resume
complete projects
complete tools
complete blog
complete contact page
final sound design
final spell effects
elaborate environmental scenes

Those belong to later phases.

30. PHASE 1 REGRESSION RULE

Every Phase 2 change must preserve Phase 1 behavior.

At the end, verify that:

all six existing routes still work
active navigation still works
mobile navigation still works
audio provider still persists across navigation
transition provider still works
reduced-motion behavior still works
avatar fallback still works
asset preparation still works
build still works

Do not declare Phase 2 complete if Phase 1 functionality regresses.

31. FINAL REPORT

When implementation is complete, provide a concise report containing:

Implemented

List what was added or changed.

Files

List important files created and modified.

Tests

Report exact commands and results.

Do not claim a test passed unless it was actually run.

Browser QA

Report the viewport sizes tested and what was verified.

Design decisions

Mention any significant implementation decisions.

Deviations

Explicitly list anything that differs from this phase plan.

Known issues

List anything that remains unresolved.

Phase boundary

Do not begin Phase 3.

Do not create PHASE_3.md.

Do not continue improving unrelated pages.

Stop after Phase 2 is complete and wait for explicit user approval.

The final response must end with:

PHASE 2 COMPLETE. Please inspect the Spellbook Home and give me GO AHEAD when you want me to begin Phase 3.