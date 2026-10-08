# PHASE 5 — THE WIZARD'S LABORATORY / INTERACTIVE TOOLS

## 0. READ THIS FIRST

Before doing anything:

1. Read `DESIGN.md` completely.
2. Read `PHASE_1.md`, `PHASE_2.md`, `PHASE_3.md`, and `PHASE_4.md`.
3. Inspect the current repository and existing implementation.
4. Inspect the existing project/tool/content data before deciding what to build.
5. Do not assume that anything written in this phase specification already exists in the codebase.
6. Reuse existing architecture, components, design tokens, routing, accessibility patterns, transition system, audio architecture, and responsive behavior wherever appropriate.
7. Do not rewrite the application or introduce a new framework.
8. Do not start Phase 6 or modify the Blog page.
9. Do not modify completed pages unless a shared component genuinely requires a compatibility change.
10. Do not generate or invent professional experience, projects, technologies, achievements, APIs, integrations, or claims.

This is Phase 5 only.

---

# 1. GOAL

Build the **Wizard's Laboratory** at:

`#/tools`

The page should feel like the visitor has entered another room in the same fantasy world:

- Home = Spellbook
- Resume = Character Record
- Projects = Hall of Artifacts
- Tools = Wizard's Laboratory
- Blog = Archmage's Notes
- Hire Me = Guild Recruitment

The Laboratory should not simply be another parchment page containing cards.

It should feel like a workshop containing usable instruments.

The core reaction should be:

> "This looks like a wizard's laboratory."
>
> followed immediately by:
>
> "Wait, these are actual developer tools I can use."

Fantasy is the presentation layer.

The underlying tools must remain clear, practical, and functional.

---

# 2. IMPORTANT SCOPE RULE

Do NOT build a collection of fake AI tools merely because they sound impressive.

Prefer:

- tools that can work entirely in the browser,
- deterministic utilities,
- tools that are genuinely useful,
- tools based on technologies/workflows already represented in the portfolio,
- tools that can be implemented without pretending that a nonexistent backend exists.

If a proposed tool would require:

- an API key,
- a paid model,
- a backend that does not exist,
- an external service that is not configured,
- or functionality that would be misleading to claim,

do NOT fabricate it.

Instead, either:

1. implement a useful local/browser-only version, or
2. leave it as a clearly marked future instrument/placeholder.

Do not create fake "AI-powered" functionality that is actually just hard-coded text.

---

# 3. PAGE CONCEPT

The page title:

**Wizard's Laboratory**

Supporting label:

**Interactive Tools**

Possible introductory copy:

> Instruments forged for the modern spellcaster.

The copy can be refined to fit the existing voice, but remain concise.

The page should communicate that these are practical developer/security tools rather than fantasy games.

---

# 4. VISUAL DIRECTION

The Laboratory should feel like a distinct room while remaining part of the same world.

Visual language:

- dark wood / dark stone surrounding environment
- warm parchment and aged paper where content needs to be readable
- brass
- antique gold
- leather
- glass bottles / apparatus
- candlelight
- subtle magical energy
- restrained burgundy / forest green / deep blue / muted purple accents

Avoid:

- cyberpunk
- neon dashboards
- glassmorphism
- SaaS-style gradient cards
- generic AI landing-page styling
- excessive particle effects
- emoji as visual UI
- random fantasy decoration with no relationship to the tools

Do not turn the entire page into a dark fantasy game interface.

It should remain a professional portfolio.

---

# 5. ARTWORK STRATEGY

Do NOT require final artwork before implementing the page.

First build the Laboratory architecture using graceful visual placeholders/fallbacks that fit the existing design.

Create/use asset slots under:

`public/assets/lab/`

Potential structure:

```text
public/
└── assets/
    └── lab/
        ├── prompt-debugger.webp
        ├── regex-alchemist.webp
        ├── json-scribe.webp
        ├── commit-scribe.webp
        └── ...

Only create files for tools that are actually implemented.

The Phase 5 implementation should work correctly even before final artwork is supplied.

After the page structure is complete and visually inspected, stop and tell the user which artwork is needed.

Do NOT generate placeholder emoji artwork.

Do NOT invent random fantasy objects before the actual tool UI is understood.

6. TOOL SELECTION

First inspect the repository and existing project history/content.

The following are candidates, not mandatory requirements:

A. Prompt Injection Inspector

This is the strongest candidate because it connects directly to the user's security work and Remora.

The tool should allow a visitor to paste text and inspect it for common prompt-injection patterns.

Important:

Do not claim this is the same detection engine as Remora unless the actual Remora engine is integrated.
Do not claim production-grade security guarantees.
Clearly label it as a lightweight browser-side inspector if that is what is implemented.
Prefer transparent deterministic checks over fake AI analysis.

Possible output:

INSPECTION RESULT

Risk indicators detected:
• Instruction override language
• Attempt to ignore previous instructions
• Hidden/system prompt targeting
• Suspicious role reassignment

Risk: Elevated

Why:
...

The implementation should explain why a signal was triggered.

Avoid pretending that a simple regex detector can perfectly detect prompt injection.

B. Regex Alchemist

A browser-only regex explainer/tester.

Inputs:

regular expression
test string

Outputs:

whether it matches
matches/groups
capture groups
useful explanation of common syntax where feasible

The UI should remain simple.

Example framing:

Regex Alchemist

Give the alchemist a pattern and a string.

Controls:

PATTERN
[ ______________________________ ]

TEST STRING
[ ______________________________ ]

[ TRANSFORM ]

RESULT
Match / No Match

Do not attempt to build a full regex engine.

Use the browser's native JavaScript RegExp implementation and handle invalid patterns gracefully.

C. JSON Scribe

A useful JSON formatter/validator.

Capabilities:

paste JSON
format / prettify
minify
validate
show useful parse errors
copy result

This is a strong candidate because it is entirely local and genuinely useful.

Fantasy framing:

The JSON Scribe

Present the scribe with your tangled scroll.

Buttons:

FORMAT
MINIFY
VALIDATE
COPY

Do not send JSON anywhere.

Make the privacy-preserving local nature clear if appropriate.

D. Git Commit Scribe

A small commit-message helper.

It should not pretend to use AI.

A deterministic version can help construct conventional commit messages from:

type
scope
short description

Example:

TYPE
[feat]

SCOPE
[portfolio]

DESCRIPTION
[add laboratory tools]

GENERATE

feat(portfolio): add laboratory tools

Optional types:

feat
fix
docs
refactor
test
chore
perf

This should be a genuinely functional local utility.

E. Additional tools

Only add another tool if repository inspection shows a strong reason.

Possible candidates include:

URL/HTTP inspector
JWT decoder/inspector
Base64 encoder/decoder
SQL formatter
timestamp converter
color/token inspector

However, do NOT add tools merely to make the Laboratory look fuller.

A Laboratory with 3–4 excellent instruments is better than 8 shallow ones.

7. TOOL ARCHITECTURE

Each tool should be an independent component.

Prefer a structure similar to:

src/
├── pages/
│   └── tools/
│       ├── ToolsPage.js
│       ├── toolsContent.js
│       ├── ToolWorkbench.js
│       ├── PromptInjectionInspector.js
│       ├── RegexAlchemist.js
│       ├── JsonScribe.js
│       └── GitCommitScribe.js

Adapt this to the repository's actual conventions.

Do not create unnecessary abstraction.

A tool should be easy to add/remove later.

8. LABORATORY PAGE STRUCTURE

Recommended structure:

LABORATORY

    Wizard's Laboratory
    Interactive Tools

    "Instruments forged for the modern spellcaster."

    ─────────────────────────────

    [ Laboratory scene / environment ]

    AVAILABLE INSTRUMENTS

    ┌────────────────┐
    │ Prompt         │
    │ Injection     │
    │ Inspector     │
    │                │
    │ Examine Tool  │
    └────────────────┘

    ┌────────────────┐
    │ Regex          │
    │ Alchemist      │
    │                │
    │ Examine Tool  │
    └────────────────┘

    ┌────────────────┐
    │ JSON           │
    │ Scribe         │
    │                │
    │ Examine Tool  │
    └────────────────┘

    ┌────────────────┐
    │ Commit         │
    │ Scribe         │
    │                │
    │ Examine Tool  │
    └────────────────┘

However, do not copy this literally if the existing implementation suggests a stronger interaction model.

The most important thing is that the page should distinguish:

choosing an instrument
using the instrument
9. INTERACTION MODEL

The preferred interaction is:

Step 1 — Select an instrument

The visitor sees several laboratory instruments.

Step 2 — Open the instrument

The selected tool becomes the main workbench.

Step 3 — Actually use it

Inputs and outputs appear in the workbench.

Step 4 — Return to the laboratory

The visitor can switch instruments without navigating away from the Tools page.

Do not create a separate route for every tool unless the existing architecture strongly benefits from it.

The laboratory itself should feel like a room.

10. FANTASY LANGUAGE

Use fantasy terminology sparingly.

Good:

Wizard's Laboratory
Instrument
Workbench
Inspect
Forge
Scribe
Alchemist
Result
Cast
Clear

Bad:

turning every button into obscure fantasy language
replacing "Copy" with something users cannot understand
replacing "Input" with an unintelligible fictional term
requiring visitors to understand RPG terminology

Professional usability always wins.

For example:

CAST SPELL

can work if it is visually obvious that it means "run."

But:

Invoke the Seventh Transmutation of the Crimson Archive

does not.

11. TOOL UX REQUIREMENTS

Every tool must have:

clear title
one-sentence explanation
input labels
actual controls
clear output/result
reset/clear action where appropriate
copy action where appropriate
useful empty state
useful invalid-input state
keyboard accessibility
visible focus
no destructive behavior
no external data transmission unless explicitly required and approved

Errors should be understandable.

Example:

THE SCROLL COULD NOT BE PARSED

Unexpected token at line 4, column 12.

[ TRY AGAIN ]

rather than:

SyntaxError: Unexpected token } in JSON at position 142

The technical error may still be shown beneath the friendly explanation if useful.

12. PRIVACY

Where tools process user input locally in the browser, make that clear.

For example:

Your input stays in this browser.

Only say this when it is actually true.

Do not collect or transmit user-entered content.

Do not add analytics or tracking specifically for tool inputs.

13. RESPONSIVE DESIGN

The Laboratory must work at:

1920px
1440px
1280px
1024px
768px
600px
375px

Desktop:

environment + central laboratory
multiple instruments visible where appropriate

Tablet:

fewer columns
workbench remains comfortable

Mobile:

one instrument at a time
controls must remain usable
no horizontal overflow
inputs must not become tiny
buttons should remain comfortably tappable

Do not force desktop laboratory furniture onto mobile.

14. ACCESSIBILITY

Required:

semantic headings
real buttons
real links
labels associated with inputs
keyboard-accessible tool selection
keyboard-accessible tool operation
visible focus
accessible status/result announcements where dynamic output changes
sufficient contrast
no color-only meaning
reduced-motion support

Do not rely on hover to reveal important functionality.

15. ANIMATION

Keep animation restrained.

Possible effects:

glowing apparatus when selected
subtle bubbling/pulsing magical energy
small brass highlight
gentle result reveal
restrained instrument activation

Avoid:

constant particle storms
excessive floating objects
large layout movement
animation that interferes with typing
long waits before a result appears

Reduced-motion users should receive a static/minimal version.

16. GLOBAL SYSTEM COMPATIBILITY

Do not break:

Spellbook
Character Record
Hall of Artifacts
global navigation
avatar
transition system
audio architecture
mobile menu
reduced-motion handling
GitHub Pages deployment

The main navigation should mark:

Wizard's Laboratory

as the active section.

Entering Tools from the main navigation should use the existing global transition.

Switching between instruments INSIDE the Laboratory should NOT trigger the full page transition.

17. AUDIO

Do not add final sound effects in this phase.

Use the existing global audio architecture.

Do not autoplay audio.

Do not add tool-specific sound effects unless the architecture already supports them and they are necessary.

Final ambience/sound polish remains Phase 8.

18. ARTWORK

Once the functional Laboratory is complete, determine exactly which artwork is actually needed.

Likely asset slots might include:

public/assets/lab/
    laboratory.webp
    prompt-injection-inspector.webp
    regex-alchemist.webp
    json-scribe.webp
    commit-scribe.webp

But do not create all of these automatically.

First inspect the rendered page.

Then report:

ARTWORK REQUIRED

1. ...
2. ...
3. ...

For every required artwork provide:

filename
exact path
recommended aspect ratio
what the image should depict
composition requirements
palette
relationship to the fantasy world
what must remain readable/visible
what should remain empty for UI overlays

Stop and wait for the user to provide/generate the artwork.

Do NOT proceed to final artwork integration without the user's supplied assets.

19. CONTENT ACCURACY

The Laboratory is part of a professional portfolio.

Do not claim:

production security guarantees
AI capabilities that do not exist
backend processing that does not exist
integrations that do not exist
certifications that do not exist
performance statistics that have not been measured

If the tool is a lightweight browser utility, say so.

If something is experimental, label it experimental.

The portfolio should be impressive because it is real, not because it exaggerates.

20. TESTING

Add appropriate Phase 5 tests.

At minimum test:

Laboratory
route renders
page heading exists
active navigation state exists
tools are discoverable
tool selection works
Prompt Injection Inspector
input accepted
known test patterns produce expected signals
benign input does not produce obviously incorrect results
result state updates
clear/reset works
Regex Alchemist
valid regex works
matching input works
nonmatching input works
capture groups are shown where applicable
invalid regex is handled gracefully
clear/reset works
JSON Scribe
valid JSON formats
valid JSON minifies
invalid JSON produces an understandable error
copy action is available
clear/reset works
Git Commit Scribe
selected type is reflected
scope is reflected
description is reflected
generated commit message is correct
clear/reset works

Only test tools that are actually implemented.

21. REGRESSION TESTING

After implementation run the complete test suite.

Do not only run Phase 5 tests.

Run:

CI=true npm test -- --watchAll=false

Then:

CI=true npm run build

Resolve all errors and warnings caused by the implementation.

Do not claim the build passes unless it actually passes.

22. BROWSER QA

Run the production build and inspect the Laboratory at:

1920
1440
1280
1024
768
600
375

Check:

no horizontal overflow
no broken assets
no failed requests
no console errors
no accidental layout shifts
no text overlap
no audio button overlap
tool inputs remain usable
buttons remain tappable
mobile menu works
navigation works
global transition works when entering/leaving Tools
switching tools does not trigger the global transition
reduced motion works
keyboard focus is visible
tool results are understandable

Also verify:

direct navigation to #/tools
browser refresh
navigation from Home → Tools
navigation from Resume → Tools
navigation from Projects → Tools
navigation from Tools → other pages
browser back/forward
23. GITHUB PAGES / DEPLOYMENT

The project is deployed through GitHub Pages.

Do not change routing/deployment architecture unnecessarily.

Verify that:

npm run build succeeds
assets resolve correctly under the GitHub Pages deployment path
existing hash-based routes continue working
new Laboratory assets use correct public paths
direct #/tools navigation works

Do not introduce history routing unless the existing deployment is explicitly changed to support it.

24. PERFORMANCE

Do not add large dependencies for tiny utilities.

Prefer browser-native APIs.

Do not add:

unnecessary UI libraries
heavy animation libraries
large editor packages
unnecessary AI SDKs

The Laboratory should remain lightweight.

If artwork is later added, optimize it appropriately, but do not modify user-supplied artwork without approval.

25. IMPORTANT: DO NOT TOUCH COMPLETED CONTENT

Do not "improve" the existing:

Resume content
Project descriptions
Project artwork
Home content
Navigation wording
Avatar artwork

unless a shared component change is required.

If you discover an issue outside Phase 5:

record it,
do not silently fix unrelated content,
mention it in the final report.
26. FINAL REPORT

When Phase 5 is complete, report:

What was implemented
Which tools were actually built
Which tools were deliberately excluded and why
Files created
Files modified
Tests added
Full test-suite result
Production build result
Browser QA results for all seven widths
Accessibility checks
Performance observations
Any remaining issues
Exact artwork still required, including filenames and paths

Do NOT claim anything was tested if it wasn't.

Do NOT start Phase 6.

Do NOT commit changes automatically.

27. STOP CONDITION

After the functional Laboratory is complete and tested:

STOP.

If artwork is required, tell the user exactly what artwork needs to be supplied/generated.

Wait for the user to provide the artwork and explicitly tell you to integrate it.

After artwork integration, test again.

Then stop again.

Do not proceed to Phase 6 automatically.

The user must explicitly say:

GO AHEAD

before Phase 6 begins.

28. DEFINITION OF DONE

Phase 5 is complete only when:

Wizard's Laboratory exists at #/tools
it feels like part of the same fantasy world
the page is visually distinct from Resume and Projects
the tools are genuinely functional
no fake AI functionality has been introduced
tool selection works
tool interfaces are accessible
mobile works
reduced motion works
navigation works
existing pages remain intact
all tests pass
production build passes
browser QA passes
no known Phase 5 errors remain
final artwork requirements have been identified
the agent stops and waits for user approval

FINAL MESSAGE MUST END WITH:

PHASE 5 FUNCTIONAL IMPLEMENTATION COMPLETE. Please inspect the Wizard's Laboratory and give me GO AHEAD when you want me to continue with artwork integration or the next step.