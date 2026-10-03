# PHASE 1 — FOUNDATION

Before doing anything:

1. Read DESIGN.md completely.
2. Inspect the entire existing repository.
3. Understand the existing:
   - framework
   - package manager
   - routing
   - styling
   - TypeScript
   - testing
   - linting
   - build
   - deployment
   - GitHub Pages configuration
4. Inspect the `avatar/` directory.
5. Do not assume anything about the existing architecture.

IMPORTANT:

Implement ONLY Phase 1.

Do NOT begin Phase 2.

==================================================
PHASE 1 GOAL
==================================================

Establish the reusable foundation for the fantasy portfolio.

Do NOT fully implement:

- Home
- Resume
- Projects
- Tools
- Blog
- Hire Me

Those belong to later phases.

The pages created in Phase 1 should only be lightweight placeholders that
demonstrate the shell, routing and visual system.

==================================================
1. ROUTING
==================================================

Create or preserve routes for:

/home
/resume
/projects
/tools
/blog
/hire

Use the project's existing routing architecture where appropriate.

Do not break GitHub Pages deployment.

Direct navigation/refresh must be compatible with the deployment strategy.

==================================================
2. GLOBAL FANTASY SHELL
==================================================

Create the initial fantasy environment:

- dark wood/stone outer environment
- warm parchment content surface
- subtle texture
- restrained fantasy ornamentation
- readable typography
- global navigation
- active navigation state
- persistent bottom/edge audio control placeholder

The result should already feel like:

"whimsical fantasy software engineer portfolio"

Do NOT create generic SaaS cards.

Do NOT use emojis.

Do NOT introduce cyberpunk/Y2K/CRT styling.

==================================================
3. DESIGN TOKENS
==================================================

Establish reusable tokens/components for:

- colors
- typography
- spacing
- parchment
- borders
- shadows
- magical glow
- buttons
- navigation
- page frame
- focus states

Use CSS variables/theme tokens where appropriate.

==================================================
4. FONTS
==================================================

Select and implement:

- one distinctive fantasy/display font
- one highly readable body font

Do NOT default to Cinzel simply because it is a common fantasy font.

Do NOT use pixel fonts for body text.

If the selected fonts are external, ensure the implementation handles loading
gracefully and does not create unnecessary layout shift.

==================================================
5. AVATAR SYSTEM
==================================================

Inspect:

avatar/regular.png
avatar/scholar.png

Create a reusable avatar component supporting both variants.

Do not modify or overwrite the supplied images.

If an image is missing, render a tasteful fallback.

Do NOT use an emoji fallback.

The avatar component should be reusable by later phases.

==================================================
6. ASSET ARCHITECTURE
==================================================

Create the following directories if appropriate:

public/assets/
  scenes/
  artifacts/
  lab/
  icons/
  effects/

Do not generate all final artwork yet.

Create the architecture so later phases can add:

scenes/
  home
  resume
  projects
  tools
  blog
  hire

artifacts/
  project-specific art

lab/
  tool-specific art

icons/
  navigation icons

effects/
  spell effects

Missing assets must never create broken-image UI.

==================================================
7. TRANSITION ARCHITECTURE
==================================================

Create a reusable global page transition system.

Phase 1 does NOT require the final wizard spell animation.

For now, implement a simple temporary transition that proves:

- navigation can trigger it
- destination content is loaded correctly
- it can later be replaced by the full spell animation

The architecture must support later:

FULL transition
- first two navigations per session

SHORT transition
- approximately 300ms thereafter

SKIP
- user can click during transition to skip to destination

REDUCED MOTION
- simplified/fade transition

Do not build the final explosion yet.

==================================================
8. AUDIO ARCHITECTURE
==================================================

Create the global audio state/controller.

It must support:

- Play
- Stop
- persistent state
- future ambient music
- future navigation effects
- future spell effects

Do NOT autoplay.

Do not source final audio during Phase 1.

Changing routes must not recreate/reset the global audio state.

The audio control should exist visually as a placeholder.

==================================================
9. RESPONSIVE FOUNDATION
==================================================

Establish responsive layout behavior for:

- desktop
- laptop
- tablet
- mobile

Below approximately 768px:

- navigation must be able to collapse
- content must remain readable
- no horizontal overflow

The final spellbook will become single-page-per-view on mobile in Phase 2,
but Phase 1 should establish the architecture needed for that.

==================================================
10. ACCESSIBILITY
==================================================

Implement:

- semantic navigation
- keyboard navigation
- visible focus
- accessible buttons
- accessible links
- accessible audio control
- reduced-motion support
- sufficient contrast

==================================================
11. PHASE 1 SCOPE DISCIPLINE
==================================================

Do NOT:

- build the final Home page
- build the final Resume
- build the final Projects
- build the final Tools
- build the final Blog
- build the final Hire Me page
- generate large amounts of placeholder fantasy art
- add random decorative fantasy objects
- use emoji
- add unrelated themes
- add unnecessary dependencies

Phase 1 is infrastructure and shell.

==================================================
12. TESTING
==================================================

Run all relevant checks available in the repository.

At minimum where supported:

- type check
- lint
- unit tests
- production build

If browser/e2e testing exists, run relevant tests.

Test:

1. Application starts.
2. Home route loads.
3. Resume route loads.
4. Projects route loads.
5. Tools route loads.
6. Blog route loads.
7. Hire route loads.
8. Navigation works.
9. Active navigation state works.
10. Temporary transition works.
11. Transition does not break navigation.
12. Audio does not autoplay.
13. Audio state remains global across navigation.
14. Keyboard navigation works.
15. Reduced-motion behavior works.
16. No mobile horizontal overflow.
17. Production build succeeds.
18. GitHub Pages deployment configuration remains valid.
19. Direct route navigation/refresh is compatible with deployment.

Also manually inspect the browser if possible.

Check:

- console errors
- missing assets
- broken images
- layout overflow
- navigation
- focus states
- mobile viewport
- transitions
- audio control
- typography
- contrast

==================================================
13. FINAL RESPONSE
==================================================

When Phase 1 is complete:

STOP.

Do NOT begin Phase 2.

Report:

1. What was implemented.
2. Files created/modified.
3. Architecture established.
4. Design decisions.
5. Tests/checks run.
6. Exact results.
7. Known issues.
8. Anything I should manually inspect.

Then say exactly:

"PHASE 1 COMPLETE. Please inspect the site and give me GO AHEAD when you want me to begin Phase 2."

WAIT for my response.