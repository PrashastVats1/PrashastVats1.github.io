# PHASE 4A — HALL OF ARTIFACTS

## 1. READ THIS FIRST

Before changing anything:

1. Read `DESIGN.md` completely.
2. Read `PHASE_1.md`.
3. Read `PHASE_2.md`.
4. Read `PHASE_3.md`.
5. Inspect the current repository and existing implementation.
6. Inspect the current `config.js`, project data, resume data, router, navigation components, transition system, and tests.
7. Do not assume that the descriptions in this document are more authoritative than verified project information already present in the repository.
8. Do not invent professional facts, project metrics, dates, technologies, links, clients, users, awards, architecture details, or outcomes.

This is **Phase 4A only**.

Do not begin Phase 5.

Do not begin the Tools/Laboratory page.

Do not redesign the global navigation.

Do not redesign the Spellbook.

Do not redesign the Character Record unless a very small shared component change is required for Phase 4 compatibility.

Do not replace the global transition system.

Do not add final artwork yet.

At the end of this phase, STOP and wait for explicit approval.

---

# 2. PHASE GOAL

Build the **Hall of Artifacts**.

The Hall of Artifacts is the portfolio's project showcase.

It should feel like entering a room in the same whimsical medieval-fantasy world established by the Spellbook and Character Record.

The visitor should feel:

> "I am looking at someone's collection of things they actually built."

The fantasy framing should make the project experience memorable, but the engineering information must remain immediately understandable.

The Hall is NOT:

- a generic SaaS portfolio grid
- a wall of ordinary cards
- a fantasy-themed blog
- a collection of random AI-generated fantasy images
- a game that hides the actual project information

The Hall IS:

- a curated gallery of engineering artifacts
- a visual showcase
- a clear professional portfolio
- a consistent continuation of the existing fantasy world

---

# 3. IMPORTANT ARTWORK BOUNDARY

This phase has two stages.

## Phase 4A — THIS TASK

Implement:

- Hall layout
- project/artifact data model
- artifact components
- project cards
- project detail pages
- project metadata
- links
- statuses
- interactions
- responsive behavior
- accessibility
- tests
- asset slots/placeholders
- browser QA

Do NOT create final artwork.

## Phase 4B — LATER

After Phase 4A is complete:

1. Stop.
2. Tell me which visual assets are required.
3. I will create/refine the artwork separately.
4. I will place the approved artwork into the appropriate `public/assets/` directories.
5. Only after I explicitly tell you to continue should you integrate the artwork.
6. Then rerun the complete regression suite and Phase 4 tests.

### Absolutely do not:

- generate final artwork yourself
- download random stock images
- use unrelated fantasy images
- use external image-generation APIs
- use emoji as visual substitutes
- create arbitrary fantasy illustrations just to fill empty space
- replace missing artwork with random gradients or unrelated photographs

If an artwork slot is missing, create a tasteful, intentional placeholder that belongs to the existing visual system.

The placeholder must be easy to replace later without changing the component architecture.

---

# 4. DESIGN PRINCIPLE

The Hall should feel more visually interesting than the Character Record.

The Character Record is intentionally document-like.

The Hall should feel like a physical chamber containing artifacts.

However:

> visual richness must not come at the expense of clarity.

The visitor must still be able to understand:

- what the project is
- what I built
- why it matters
- technologies used
- current status
- where to see it
- where to inspect the code

---

# 5. EXISTING WORLD

Maintain the visual language established in Phases 1–3.

## Environment

Use:

- dark wood
- dark stone
- leather
- brass
- antique gold
- candlelight
- parchment
- subtle magical energy
- warm shadows
- deep burgundy
- forest green
- muted blue
- restrained purple

Avoid:

- cyberpunk neon
- glassmorphism
- futuristic holograms
- modern SaaS gradients
- excessive glow
- generic "AI generated fantasy" aesthetics
- unrelated visual styles

The world is:

**whimsical medieval fantasy / magical engineering workshop / RPG-inspired portfolio**

It is not:

- Harry Potter
- Lord of the Rings
- literal D&D
- grimdark fantasy
- cyberpunk fantasy

---

# 6. HALL CONCEPT

The Hall should conceptually resemble a magical gallery or artifact chamber.

Think:

- dark wooden/stone surroundings
- warm illuminated display areas
- pedestals
- frames
- shelves
- artifact plaques
- subtle magical accents
- parchment labels
- controlled candlelight

The visitor should immediately understand that these are projects.

A possible conceptual structure:

```text
                 HALL OF ARTIFACTS

        "Things I have designed, built, and shipped."

              ┌───────────────┐
              │    ARTIFACT   │
              │               │
              │    VISUAL     │
              │               │
              └───────────────┘
                 Project Name
                 short label
                 status

        ┌───────────────┐      ┌───────────────┐
        │    ARTIFACT   │      │    ARTIFACT   │
        │               │      │               │
        └───────────────┘      └───────────────┘

This is conceptual only.

Do NOT blindly reproduce this ASCII layout.

Choose the strongest layout based on the existing site's visual system and actual content.

7. LARGE-SCREEN DENSITY

The site previously felt somewhat empty on very large screens.

Phase 4 should address this naturally.

Do NOT solve the problem by stretching the parchment indefinitely.

Instead:

establish a sensible maximum content width
let the dark fantasy environment remain visible around the Hall
use the environment and artifact composition to occupy additional viewport space
allow the Hall itself to feel like a substantial chamber
use visual grouping and artifact presentation rather than excessive text

The portfolio should feel intentionally composed at:

1920px
1440px
1280px
1024px

Do not make the content look like a tiny website floating in an enormous empty browser.

At the same time, do not create a huge wall of content merely to fill space.

8. PROJECT SELECTION

Use verified project information from the repository and the supplied project summaries.

The strongest known projects include:

Remora

Prompt-injection detection Chrome extension for AI agents.

Known information:

live Chrome Web Store project
prompt-injection detection
dual-signal detection architecture
Shadow DOM isolation
Vitest test suite
remora-engine package published to npm
product site exists
GitHub repository exists
submitted to YC F2026
current install count is intentionally NOT to be presented unless explicitly verified

Links currently known:

https://remora.watch
https://github.com/PrashastVats1/remora

Do not invent usage numbers.

Do not invent performance metrics.

Do not invent additional architecture.

AI Agent Auth Gateway

Known information:

RFC 8693 token exchange
MonoCloud OIDC
FastAPI backend
Render deployment
React/Vite/Tailwind frontend
started independently
public repositories
project can be described without naming the company relationship

Known repository links:

https://github.com/PrashastVats1/ai-agent-auth-backend
https://github.com/PrashastVats1/ai-agent-auth-frontend

Known frontend deployment:

https://ai-agent-auth-frontend-ch6m-one.vercel.app

Do not expose confidential company relationships or NDA details.

Do not name private clients/companies.

Use neutral wording such as:

"AI Agent Auth Gateway"

rather than attributing the project to a confidential client.

Priya

Autonomous outbound voice agent.

Known information:

Retell AI
SIP
PSTN
outbound calling
pricing/competitor/interest handling
code-switched Hindi/English
won Voice Agent Jam 3.0
built/shipped solo

Known deployment:

https://voice-agent-nubn.onrender.com

Do not invent additional metrics.

Event Intelligence Dashboard

Known information:

FastAPI
APScheduler
Gemini API
NewsAPI
aggregates events/news into continuously updated summaries
deployed application exists

Known deployment:

https://ai-event-intelligence.vercel.app

Do not invent user counts or performance metrics.

DocuChat / Resume Analyzer

Known information:

resume/document analysis application
deployed to Render

Known deployment:

https://resume-analyzer-laqi.onrender.com

Use only details actually present in the repository/resume if more technical detail is required.

Do not invent architecture.

D&D Beginner Guide

Known information:

React site
free
non-commercial
beginner-oriented
explains D&D classes and species in plain language
designed for people who may know D&D primarily through shows such as Stranger Things
intro page
Classes section
Species section
detail pages
deployed on GitHub Pages

Known links:

https://prashastvats1.github.io/dnd-guide
https://github.com/PrashastVats1/dnd-guide

This project is useful because it demonstrates product/design thinking outside purely technical tooling.

Do not overstate its complexity.

9. OTHER PROJECTS

Other verified project information exists, including:

React Native Movie App using TMDB + Appwrite
ResNet + FAISS vision model
internal Copilot onboarding chatbot
VectorShift technical assessment
tutor-evals
India match calculator
Vedantu voice-agent dashboard
other projects present in the existing repository/content

Do NOT automatically put every project into the Hall.

The Hall should be curated.

Prioritize projects that best demonstrate:

engineering ability
AI/agent work
security/identity
independent ownership
product thinking
interesting technical implementation

If project information is incomplete, either:

use only the verified information available, or
leave the project out of Phase 4A.

Do not ask the user to confirm every obvious implementation detail.

Do not fabricate missing information.

10. CONFIDENTIAL / NDA WORK

Do NOT add confidential consulting projects to the Hall.

The Character Record already contains anonymized consulting experience.

The Hall is for projects that can be publicly presented.

Do not expose:

confidential company names
NDA details
private client relationships
internal architecture
private client metrics

The public portfolio must remain safe to share.

11. ARTIFACT DATA MODEL

Create a clean project/artifact data structure.

Do not hard-code project information throughout JSX.

Use a centralized data structure such as:

{
  slug,
  name,
  subtitle,
  status,
  year,
  category,
  shortDescription,
  overview,
  problem,
  solution,
  technicalApproach,
  technologies,
  highlights,
  links,
  artwork,
  featured
}

The exact schema may differ if the existing architecture suggests a better structure.

Important:

Do not create fields that contain invented information merely because the schema supports them.

Missing information should be omitted rather than fabricated.

12. STATUS SYSTEM

Projects should clearly communicate status.

Possible statuses include:

LIVE
PUBLISHED
WINNER
OPEN SOURCE
IN PROGRESS
PROTOTYPE

Only use a status that is supported by the project information.

Do not label something "LIVE" simply because there is a repository.

Do not label something "PRODUCTION" unless supported.

13. ARTIFACT CARD

Create a reusable artifact/card component.

It should support:

artwork slot
project name
short description
status
year
technology tags
primary action
secondary action where appropriate

Potential actions:

"Examine Artifact"
"View Project"
"View Source"
"Visit Site"

The fantasy language should remain restrained.

Avoid:

"UNLEASH THE ANCIENT POWER OF..."

The portfolio should sound like a professional engineer with a fantasy interface, not a fantasy novel.

14. ARTIFACT DETAIL PAGE

Each project should have a dedicated detail view/page.

The detail view should feel like examining a discovered artifact.

Possible structure:

ARTIFACT RECORD

Project Name
Short professional description

STATUS
YEAR
CATEGORY

[ ARTIFACT VISUAL ]

THE QUEST
What problem or goal existed?

THE WORK
What was built?

THE APPROACH
How was it implemented?

THE ARSENAL
Technologies

THE RESULT
Verified outcomes/evidence

LINKS
Live / Source / Demo

These labels are examples.

Use terminology that fits the existing design system.

The actual content must remain professional.

15. PROJECT DETAIL CONTENT

Do not turn every project into a giant essay.

A recruiter should be able to scan the page quickly.

Use:

short paragraphs
bullets
technology tags
highlighted facts
clear links

The fantasy framing should surround the content, not bury it.

16. VISUAL ARTWORK SLOTS

Create support for artwork without requiring the final assets.

Use the existing structure:

public/assets/
  scenes/
  artifacts/

Potential future assets:

public/assets/scenes/hall-of-artifacts.webp

public/assets/artifacts/remora.webp
public/assets/artifacts/ai-agent-auth-gateway.webp
public/assets/artifacts/priya.webp
public/assets/artifacts/event-intelligence.webp
public/assets/artifacts/docuchat.webp
public/assets/artifacts/dnd-guide.webp

These are proposed asset slots.

Do not create all of these files now.

Do not create fake artwork.

Do not generate empty binary files.

Build the components so that the assets can be dropped in later.

17. ARTWORK PLACEHOLDER

Until final artwork is supplied, use an intentional placeholder.

It could be:

a stylized artifact silhouette
an engraved placeholder
a brass-framed empty display
subtle magical sigil
controlled parchment illustration

It must feel like part of the Hall.

It must NOT look like:

broken image
generic gray placeholder
emoji
random icon
missing-image browser graphic

The placeholder should be visually replaceable without restructuring the card.

18. DO NOT OVERUSE PIXEL ART

The avatar artwork is illustrated/pixel-inspired.

That does NOT mean every artifact must be pixel art.

The Hall may use:

illustrated relics
engraved illustrations
painted fantasy objects
stylized technical artifacts

as long as they belong to the same world.

Do not mix unrelated visual styles.

19. INTERACTION

Artifact cards should have tasteful interaction.

Examples:

subtle elevation
glow around artifact
slight illumination
brass highlight
gentle magical particles
focus state
small movement

Do not make every card fly around the screen.

Do not create distracting animations.

Interaction should communicate:

"This is something I can examine."

not:

"Look at this animation."

Respect reduced-motion preferences.

20. NAVIGATION

Use the existing router/navigation architecture.

The existing global route transition must remain the mechanism for moving between major pages.

The Hall itself should NOT introduce a second competing page-transition system.

If project detail pages use internal navigation, keep it lightweight.

Potential conceptual routes:

#/projects
#/projects/remora
#/projects/ai-agent-auth-gateway
#/projects/priya
...

But inspect the current router first and use the routing approach already established.

Do not switch routing architecture unnecessarily.

Direct route loading must work in the existing GitHub Pages deployment model.

21. GLOBAL NAVIGATION

The existing navigation must remain intact.

The Hall of Artifacts tab should:

become active on /projects
remain semantically correct
remain keyboard accessible
preserve mobile hamburger behavior

Project detail pages should still make it obvious that the visitor is inside the Hall of Artifacts.

22. RESPONSIVE DESIGN

Required QA widths:

1920
1440
1280
1024
768
600
375

Desktop:

use the large fantasy environment
allow multiple artifact displays
maintain visual hierarchy

Tablet:

reduce artifact density
preserve readable cards
avoid cramped columns

Mobile:

one primary artifact/card per row
no horizontal scrolling
artwork remains visible
project metadata remains readable
actions remain comfortably tappable
navigation continues using the existing mobile menu

Do not simply shrink the desktop design.

Design a sensible mobile composition.

23. ACCESSIBILITY

All artifact interactions must be accessible.

Requirements:

semantic buttons/links
keyboard navigation
visible focus
meaningful accessible names
no information communicated only through color
artwork gets useful alt text when informative
decorative artwork gets empty alt text
reduced-motion support
sufficient contrast
no keyboard traps

Project links must be real links.

Do not use clickable divs where a button/link is appropriate.

24. PERFORMANCE

Artwork will eventually be one of the largest parts of the site.

Prepare the architecture accordingly.

Use:

lazy loading where appropriate
explicit dimensions/aspect ratios
responsive image handling where practical
optimized asset loading
no giant background video
no unnecessary dependencies

Do not optimize by destroying visual quality.

Final artwork optimization will happen when the assets are added.

25. TESTING

Add appropriate tests for Phase 4.

At minimum test:

Hall renders
project list renders
expected featured projects exist
project statuses are displayed correctly
artifact links work
project detail routes render
unknown project route behaves correctly
technologies render
no project contains invented fallback data
accessibility labels exist for interactive elements
existing navigation still works
global transition still works
mobile navigation still works

Run the entire test suite.

Do NOT only run Phase 4 tests.

26. REQUIRED REGRESSION TESTS

Before declaring Phase 4A complete:

CI=true npm test -- --watchAll=false

Then:

CI=true npm run build

The production build must succeed.

No new ESLint warnings.

No new React warnings.

No broken assets.

No failed network requests caused by the implementation.

27. BROWSER QA

Serve the production build locally and inspect:

1920×1080
1440×1000
1280×800
1024×768
768×1024
600×900
375×812

Check:

no horizontal overflow
no overlapping controls
no clipped artifact cards
no broken artwork slots
no broken links
project details load
browser back works
navigation works
global transition works
mobile menu works
reduced motion works
keyboard navigation works as far as browser tooling allows
console has no errors

Do not claim a check was performed if it could not actually be performed.

28. LARGE-SCREEN VISUAL CHECK

Because Phase 1 identified large-screen density as an issue, specifically inspect 1920px.

The Hall should not look like:

tiny content
       surrounded by huge empty wood

But it also should not look like:

massive stretched parchment
covering the entire monitor

The environment should provide visual breathing room while the Hall itself feels substantial.

29. DO NOT CHANGE PREVIOUS PHASES UNNECESSARILY

Preserve:

Phase 1
global shell
visual system
navigation
transition architecture
audio architecture
responsive foundation
Phase 2
Spellbook
page turning
responsive behavior
avatar system
Phase 3
Character Record
ability filter
professional content
resume download
project link into Hall

If a shared CSS/component change is genuinely required, make the smallest safe change and explicitly report it.

Do not use Phase 4 as an excuse to refactor unrelated code.

30. CONTENT ACCURACY RULE

This portfolio is public.

Never invent:

clients
employers
job titles
dates
users
revenue
installs
performance
awards
architecture
technologies
production usage
customer relationships
testimonials
metrics

If a fact is unknown:

omit it, or
use wording supported by the available source.

Do not fill the gap with plausible-sounding portfolio copy.

31. NO CONFIDENTIAL INFORMATION

Do not expose NDA/confidential consulting relationships in the Hall.

Do not reveal private company names.

Do not infer or reconstruct confidential details.

Only include public project information.

32. PHASE 4A DELIVERABLE

At the end of this phase, I expect:

Hall
complete Hall of Artifacts page
coherent fantasy chamber presentation
responsive layout
curated projects
Artifacts
reusable artifact card
reusable artifact detail component
centralized project data
artwork slots/placeholders
Navigation
Hall route works
project detail routes work
existing global transition remains intact
Quality
responsive
accessible
tested
production build succeeds
no console errors
no broken assets
33. FINAL REPORT

When finished, report:

What was implemented.
Which projects were included and why.
Which project information came from existing verified content.
Which routes were added.
Which components/files were created.
Which existing files were modified.
Any shared changes affecting earlier phases.
Test results.
Production build result.
Browser QA results at every required width.
Any known issues.
The exact artwork assets that still need to be supplied.
A recommended artwork list with:
filename
purpose
suggested aspect ratio
where it appears
brief visual direction

Do NOT integrate final artwork yet.

Do NOT start Phase 4B.

Do NOT start Phase 5.

34. REQUIRED STOP CONDITION

The agent MUST stop after Phase 4A.

The final message must end with exactly:

PHASE 4A COMPLETE. Please inspect the Hall of Artifacts and project detail pages. I have not integrated final artwork. Give me GO AHEAD when you want to proceed with the artwork integration stage.

Do not continue automatically.