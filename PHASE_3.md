# PHASE 3 — THE CHARACTER RECORD

## 1. READ THIS FIRST

Before making any changes:

1. Read `DESIGN.md` completely.
2. Read `PHASE_1.md` completely.
3. Read `PHASE_2.md` completely.
4. Inspect the current Phase 1 + Phase 2 implementation.
5. Inspect the current git status and recent commits.
6. Inspect the existing resume files in `public/`:
   - `Prashast_Vats_Resume.pdf`
   - `Prashast_Vats_Resume.docx`
7. Inspect the existing `config.js` and any other source currently containing professional information.
8. Understand the existing routing, shell, avatar system, transition system, asset system, and responsive breakpoints before modifying them.

Phase 3 must build on the actual implementation that exists now.

Do not rewrite the application architecture simply because another approach appears cleaner.

Do not begin Phase 4.

Do not create or implement project-detail pages.

Do not redesign the Spellbook Home.

Do not implement the Wizard's Laboratory, Blog, or Hire Me pages beyond what is required for shared regression compatibility.

---

# 2. PHASE GOAL

Replace the current Resume placeholder with a complete:

# CHARACTER RECORD

The page should feel like an RPG/fantasy character record while remaining immediately understandable as a professional software engineer resume.

The fantasy presentation is a visual and interaction layer.

The underlying information must remain professional, accurate, searchable, and recruiter-friendly.

The visitor should be able to understand within seconds:

- who Prashast Vats is
- what role he currently has
- how much professional experience he has
- where he has worked
- what technologies he uses
- what areas he works in
- what he has built
- what education/certifications he has
- how to download the full resume

The page should communicate:

> "This is a fantasy character sheet, but the person behind it is a serious software engineer."

---

# 3. MOST IMPORTANT CONTENT RULE

Professional accuracy takes priority over fantasy flavor.

The repository's current resume files are the authoritative source for professional facts:

- `public/Prashast_Vats_Resume.pdf`
- `public/Prashast_Vats_Resume.docx`

Use those files to establish:

- job titles
- companies
- dates
- employment history
- responsibilities
- achievements
- education
- certifications
- technologies
- professional terminology

Do not invent:

- companies
- clients
- employers
- dates
- titles
- responsibilities
- achievements
- metrics
- certifications
- degrees
- technologies
- project claims

Do not infer a technology was used professionally simply because it appears elsewhere in the repository.

If a claim is not supported by the authoritative resume or an explicitly approved source already present in the project, do not introduce it as a factual professional claim.

Do not copy fictional or placeholder content from screenshots/mockups.

---

# 4. IMPORTANT CONTENT SOURCES

There is additional verified portfolio/project context available from the project owner.

Use it as supporting context where appropriate, but do not allow it to override the current resume when describing employment history.

The following projects and work are known:

## Remora

Prompt-injection detection Chrome extension.

Known details:

- Live Chrome Web Store product.
- Prompt-injection detection.
- Dual-signal detection architecture.
- Shadow DOM isolation.
- Vitest test suite with 49 cases.
- `remora-engine` package published to npm.
- Product site exists.
- Submitted to YC F2026.
- GitHub repository exists.
- Product site: `https://remora.watch`
- Repository: `https://github.com/PrashastVats1/remora`

Do not invent current install counts.

If usage numbers are needed, leave them out unless they can be verified from an authoritative source.

## AI Agent Auth Gateway

Known details:

- RFC 8693 token exchange.
- MonoCloud OIDC.
- FastAPI backend.
- React/Vite/Tailwind frontend.
- Backend deployed on Render.
- Frontend deployed on Vercel.
- Built independently by Prashast before continuing work with the identity infrastructure company.
- Public repositories exist.

Links:

- Frontend: `https://ai-agent-auth-frontend-ch6m-one.vercel.app`
- Backend repository: `https://github.com/PrashastVats1/ai-agent-auth-backend`
- Frontend repository: `https://github.com/PrashastVats1/ai-agent-auth-frontend`

Important:

Do not mention MonoCloud's name in public portfolio copy unless explicitly approved.

Do not mention NDA work.

## Priya

Outbound voice agent.

Known details:

- Built with Retell AI.
- Uses SIP/PSTN.
- Won Voice Agent Jam 3.0 solo at an HSR hackathon.
- Full prompt authored by Prashast.
- Post-call outcome rubric authored by Prashast.
- Live deployment exists.

Link:

`https://voice-agent-nubn.onrender.com`

## Event Intelligence Dashboard

Known details:

- FastAPI.
- APScheduler.
- Gemini API.
- NewsAPI.
- Deployed application exists.

Link:

`https://ai-event-intelligence.vercel.app`

## DocuChat / Resume Analyzer

Known detail:

- Redeployed to Render.

Link:

`https://resume-analyzer-laqi.onrender.com`

## D&D Beginner Guide

Known details:

- Free, non-commercial React site.
- Designed for beginners who know D&D primarily through shows such as Stranger Things.
- Classes and Species sections.
- Detail page per entry.
- React-based.
- Deployed to GitHub Pages.

Links:

- `https://prashastvats1.github.io/dnd-guide`
- `https://github.com/PrashastVats1/dnd-guide`

## Other work

Additional known work includes:

- React Native Movie App using TMDB and Appwrite.
- ResNet + FAISS vision model.
- Internal Copilot onboarding chatbot, which placed 2nd in an internal hackathon.
- VectorShift technical assessment involving a ReactFlow pipeline UI and FastAPI backend with DAG detection using Kahn's algorithm.

Some of these have no public links currently.

Do not fabricate links.

---

# 5. CURRENT / RECENT WORK CONTEXT

The public portfolio should reflect Prashast as a:

Software Engineer

with a strong intersection of:

- full-stack engineering
- AI applications
- AI agents
- AI security
- identity/security
- developer tooling
- automation

The fantasy labels may describe these areas as "schools", "disciplines", or "abilities", but the real technologies must remain visible.

Do not turn the page into a generic "AI engineer" profile if the resume does not support that exact professional title.

---

# 6. PAGE CONCEPT

The page should resemble an RPG character record / adventurer's character sheet.

However:

DO NOT make it look like a literal D&D character sheet.

Do not use:

- hit points
- mana
- strength
- dexterity
- constitution
- fictional alignment
- invented level
- invented stats
- fantasy currencies
- fictional guild membership

unless a future design decision explicitly approves them.

The user's professional experience is real.

The fantasy metaphor should organize and decorate that information rather than fictionalize it.

---

# 7. NO "LEVEL 3" PROBLEM

Do NOT represent professional experience as:

"Level 3"

or:

"Level 4"

or another RPG level.

This could make an experienced engineer look junior.

Use explicit professional language:

"3+ Years Experience"

or the exact verified experience wording from the current resume.

Fantasy framing can appear around it, but professional experience must be immediately legible.

---

# 8. HEADER / IDENTITY AREA

Create a strong character-record header.

Possible structure:

- regular avatar
- Prashast Vats
- Software Engineer
- 3+ Years Experience
- Bangalore, India
- current professional role/company
- concise professional summary

The exact factual values must come from the authoritative resume/configuration.

Use:

`avatar/regular.png`

through the existing Avatar component.

Do not duplicate the avatar asset architecture.

Do not create another avatar system.

---

# 9. CHARACTER CLASS

The fantasy layer may introduce a concise "class" label such as:

Software Archmage

but this must be visually secondary to:

Software Engineer

The visitor should never have to interpret the fantasy label to understand the actual profession.

Example hierarchy:

SOFTWARE ENGINEER

Software Archmage

3+ Years Experience

The exact implementation may differ if the current design system produces a better hierarchy.

---

# 10. PROFESSIONAL SUMMARY

Create a concise professional summary using the actual resume.

It should answer:

- What does Prashast do?
- What kind of systems does he build?
- What technologies/domains does he work across?
- What differentiates his experience?

Avoid generic AI-generated phrases such as:

"passionate developer"
"results-driven professional"
"innovative problem solver"
"highly motivated individual"

unless they are genuinely supported and useful.

Prefer concrete language.

The summary should be understandable to:

- recruiters
- engineering managers
- founders
- technical interviewers

---

# 11. EXPERIENCE / QUEST CHRONICLE

Present employment history as a fantasy-styled chronology.

Possible label:

QUEST CHRONICLE

or:

ADVENTURE LOG

or:

PROFESSIONAL CHRONICLE

The real employment information remains prominent.

Each experience entry should include:

- company
- job title
- location if relevant
- dates
- concise responsibilities
- measurable achievements where supported
- technologies where appropriate

Example conceptual structure:

COMPANY

Actual Job Title
Dates

Professional responsibility / achievement.

Technology:
C# · .NET · React · SQL

Do not use fantasy terminology instead of the actual company or job title.

Do not fabricate "quests" that did not happen.

---

# 12. CURRENT ROLE

The current role should receive appropriate visual prominence.

Use the exact current employer/title information from the authoritative resume.

The portfolio currently identifies the user as:

Software Engineer at Mphasis Ltd. with an HP engagement.

However, verify this against the current resume before displaying it as factual.

Do not change this into:

"Senior Software Engineer at HP"

unless the resume explicitly says that.

HP is an engagement/client context, not automatically the employer.

---

# 13. SKILLS / ABILITIES

This is one of the most important parts of Phase 3.

Recreate the useful technology-filtering concept that inspired the project.

The visitor should be able to select a technology/ability and immediately see the relevant experience.

Keep the interaction simple.

Do NOT create a complicated filtering engine with:

- technology
- project
- domain
- seniority
- company
- category
- years
- location

all acting as simultaneous filters.

One clear technology/ability filter is enough.

Conceptually:

SELECT AN ABILITY

[ ALL ]

[ C# ]
[ .NET ]
[ REACT ]
[ ANGULAR ]
[ TYPESCRIPT ]
[ PYTHON ]
[ SQL ]
[ AUTOMATION ]
[ AI / ML ]
[ SECURITY ]
[ TOOLS ]

The exact list must be generated from verified technologies in the current resume/configuration.

Do not include technologies merely because they exist somewhere in the repository.

---

# 14. FILTER BEHAVIOR

When a technology is selected:

- relevant experience entries should become visually emphasized
- irrelevant entries should become visually subdued or hidden if that is clearer
- the user should immediately understand why an entry matches
- the filter should work with keyboard navigation
- the filter should work on mobile
- clearing the filter must be obvious

Do not create unnecessary animations.

Do not make the user wait for filtering.

Filtering should feel like examining a character's abilities.

Possible fantasy framing:

"Reveal experience tied to this ability."

But the actual technology name must remain explicit.

---

# 15. SKILL GROUPING

The site may use fantasy categories such as:

FULL-STACK PRODUCTS
AI & AGENT SYSTEMS
SECURITY & IDENTITY
AUTOMATION & TOOLING

These categories already appear in the Spellbook Home.

Maintain consistency with those groupings where useful.

However, the Resume page should not merely duplicate the Home page.

The Character Record should provide deeper professional detail.

---

# 16. TECHNOLOGY TAGS

Technology tags may be presented as parchment/brass/ink pills or similar fantasy UI.

They must remain:

- readable
- selectable where appropriate
- searchable by the filter
- accessible
- visually consistent with Phase 2

Avoid excessive pills.

Do not turn every sentence into a tag cloud.

---

# 17. EDUCATION

Include education from the authoritative resume.

Use a fantasy framing such as:

ACADEMIC RECORD

or:

TRAINING & EDUCATION

but retain:

- actual institution
- degree
- dates
- relevant details

Do not invent academic achievements.

---

# 18. CERTIFICATIONS

Include verified certifications from the authoritative resume.

Possible fantasy label:

CERTIFICATIONS & SEALS

But the actual certification names must remain clear.

Do not invent certification IDs, dates, issuers, or credentials.

---

# 19. RESUME DOWNLOAD

The existing:

"Summon My Record"

button must remain functional.

It must continue downloading/linking to the current resume PDF.

Do not break the existing path.

If the current implementation uses `config.js`, continue using the existing source of truth.

Do not duplicate the resume file unnecessarily.

---

# 20. EXTERNAL LINKS

Existing links must continue working:

- GitHub
- LinkedIn
- Email
- Resume

Do not change working URLs without a reason.

Do not invent URLs for projects that currently have no verified public URL.

---

# 21. PROJECT REFERENCES

Phase 3 may include a small "Selected Works" or "Artifacts" reference area if it improves the Character Record.

However:

Do NOT build the complete project showcase here.

Do NOT duplicate the Hall of Artifacts.

A small section such as:

"Selected artifacts → Explore the Hall"

is acceptable.

Phase 4 will own the detailed project presentation.

---

# 22. AVATAR

Use the new:

`avatar/regular.png`

for the Character Record.

The avatar should be rendered through the existing reusable Avatar component.

Do not hard-code the image path directly into the page if the existing architecture already provides the abstraction.

The scholar avatar belongs primarily to the Blog / Archmage's Notes experience and should not be unnecessarily used here.

---

# 23. VISUAL DESIGN

Continue the established world:

- dark wood / stone environment
- warm parchment
- leather
- brass
- antique gold
- burgundy
- deep blue
- forest green
- subtle magical accents

The Character Record should feel like a different artifact from the Spellbook while clearly belonging to the same world.

Do NOT create a completely different visual language.

---

# 24. LARGE-SCREEN DENSITY

The Phase 1 concern about large-screen emptiness has already been partially addressed by Phase 2.

For the Character Record:

- establish a sensible maximum content width
- do not stretch the parchment indefinitely
- use multiple content regions where useful
- make large screens feel intentionally composed
- allow the dark fantasy environment to remain visible around the record

Do not solve empty space by simply increasing font sizes.

Do not fill space with decorative objects that do not communicate information.

Content density should come from useful professional information.

---

# 25. RESPONSIVE DESIGN

Maintain the existing responsive architecture.

Desktop:

- richer multi-column character-record composition where appropriate

Tablet:

- reduce columns while maintaining hierarchy

Mobile:

- single-column layout
- readable sections
- accessible filter
- no horizontal overflow
- resume download remains prominent
- experience remains easy to scan

Do not force desktop character-sheet geometry onto mobile.

---

# 26. ACCESSIBILITY

Maintain the accessibility standards established in Phase 1 and 2.

Required:

- semantic headings
- semantic navigation
- real buttons and links
- visible focus states
- keyboard-operable filters
- accessible labels
- appropriate screen-reader announcements where filtering changes meaningful content
- sufficient contrast
- reduced-motion behavior
- no interaction that depends solely on hover
- no keyboard traps

The fantasy styling must never make the interface less accessible.

---

# 27. ANIMATION

Do not introduce a new global transition system.

Navigation to Resume should continue using the existing global transition architecture.

The Character Record itself may have subtle local interactions, but keep them restrained.

Examples:

- ability selection
- subtle highlight
- parchment reveal
- small ink/gold accent

Do not implement the final spell-casting transition here.

The global transition architecture already exists.

The final spell transition will be completed in the later transition/polish phase.

---

# 28. AUDIO

Do not implement final ambient music in Phase 3.

The existing audio control and provider must continue working.

Do not introduce new audio files.

Do not autoplay anything.

Phase 8 owns final ambient audio and sound design.

---

# 29. ASSET RULES

Use the existing asset architecture.

Do not create arbitrary new asset folders unless genuinely necessary.

If a new Character Record illustration is useful, add an appropriate slot under:

`public/assets/`

and update the manifest if necessary.

Do not generate decorative artwork merely to fill empty space.

The priority remains:

1. usability
2. professional clarity
3. fantasy consistency
4. memorability
5. visual polish
6. decoration

---

# 30. CONTENT FROM OTHER PROJECTS

The following projects may eventually be useful as evidence of capability:

- Remora
- AI Agent Auth Gateway
- Priya
- Event Intelligence Dashboard
- DocuChat / Resume Analyzer
- D&D Beginner Guide
- React Native Movie App
- ResNet + FAISS vision model
- Internal Copilot onboarding chatbot
- VectorShift technical assessment
- tutor-evals
- India match calculator

But do NOT automatically put all of these into the Character Record.

Phase 3 is primarily about professional identity, experience, skills, education, and certifications.

Phase 4 is where the project portfolio becomes the centerpiece.

---

# 31. PROJECT STATUS ACCURACY

Distinguish between:

- live/shipped
- open source
- in progress
- private
- shelved
- prototype
- consulting/NDA

Do not present an idea as a shipped product.

Do not present a prototype as production software.

Do not mention confidential consulting work.

Do not include shelved projects unless there is a compelling professional reason.

---

# 32. TUTOR-EVALS

`tutor-evals` is an in-progress local-first LLM evaluation harness.

Known details:

- multi-turn math tutoring evaluation
- simulated student
- LLM judge
- deterministic checks
- judge agreement against hand labels
- intended as a portfolio piece for AI tutoring / founding-engineer opportunities

It should NOT become a major part of the Character Record unless the current resume already contains it.

Phase 4 may consider it for the project portfolio once it is in a suitable state.

---

# 33. INDIA MATCH CALCULATOR

Known as a personal research/project experiment using NFHS-5 survey microdata.

Do not include this in the Character Record unless explicitly supported by the current resume or later project-page decision.

Do not expose personal research-registration details unnecessarily.

---

# 34. NDA / CONFIDENTIAL WORK

Absolutely do not expose confidential work.

Do not mention:

- MonoCloud
- Squark.cloud
- confidential clients
- NDA details
- private consulting details

unless the project owner explicitly provides approved public wording in a later phase.

---

# 35. WHAT NOT TO CHANGE

Do not break:

- Phase 1 routing
- Phase 1 transition architecture
- Phase 1 audio architecture
- Phase 1 avatar architecture
- Phase 1 asset preparation
- Phase 1 responsive navigation
- Phase 2 Spellbook
- Phase 2 page-turn behavior
- Phase 2 responsive behavior
- Phase 2 tests
- existing resume download
- existing GitHub / LinkedIn / email links

Do not modify the Home Spellbook unless a shared component change is genuinely required.

If a shared change is required, preserve existing behavior and add regression coverage.

---

# 36. TESTING REQUIREMENTS

Before declaring Phase 3 complete:

## Unit / integration tests

Run all existing tests.

Add tests for:

- Character Record renders
- real professional sections appear
- current role appears correctly
- experience entries render
- technology filter works
- selecting a technology changes the relevant experience
- clearing the filter restores the full record
- filter works by keyboard
- resume download link works
- external links remain correct
- avatar renders
- mobile layout behavior
- accessibility-relevant behavior where practical

Run:

`CI=true npm test -- --watchAll=false`

All tests must pass.

Do not report success unless they actually pass.

---

# 37. PRODUCTION BUILD

Run:

`CI=true npm run build`

The build must complete successfully.

Report:

- build result
- any warnings
- bundle size if available

Do not introduce unnecessary dependencies.

---

# 38. BROWSER QA

Serve the production build and inspect:

- 1920px
- 1440px
- 1280px
- 1024px
- 768px
- 600px
- 375px

Check:

- no horizontal overflow
- no overlapping controls
- no broken images
- no broken links
- filter works
- resume download works
- navigation works
- global transition still works
- audio control still exists
- Spellbook still works
- mobile menu still works
- focus styles are visible
- reduced motion still works
- no obvious console errors

Pay particular attention to large-screen density.

The Character Record should feel intentionally composed rather than like a narrow document floating inside a huge empty viewport.

---

# 39. REGRESSION TESTING

Phase 3 is not complete if Phase 1 or Phase 2 breaks.

Regression-test:

### Phase 1
- routing
- navigation
- global transition
- audio state
- avatar system
- responsive shell
- asset preparation

### Phase 2
- Spellbook
- desktop spread
- mobile single-page mode
- page navigation
- page-turn animation
- keyboard controls
- swipe controls
- main CTA transitions

---

# 40. GIT / FILE DISCIPLINE

Do not create:

- `PHASE_4.md`
- project detail pages
- final project artwork
- final sound effects
- final spell transition

Phase 3 only.

Do not modify the `main` branch.

Do not commit automatically unless explicitly instructed.

---

# 41. IF INFORMATION IS MISSING

If the resume contains ambiguous or conflicting information:

STOP and ask.

Do not guess.

If a project fact is unclear:

STOP and ask.

Do not silently choose the most impressive interpretation.

If a design decision materially affects later phases:

STOP and ask before implementing it.

Small implementation details may be decided using the existing design system.

---

# 42. PHASE 3 SUCCESS CRITERIA

The final page should produce this reaction:

> "This is a character sheet."

Then:

> "Oh, he's actually a Software Engineer."

Then:

> "I can quickly see what he has worked on."

Then:

> "I can see exactly which technologies he has experience with."

Then:

> "This is much more interesting than a normal resume page."

The fantasy should make the resume memorable.

It must not make the resume harder to understand.

---

# 43. FINAL REPORT

When implementation is complete, report:

1. What was implemented.
2. Which files were created.
3. Which files were modified.
4. Which existing files were intentionally left untouched.
5. The final Character Record structure.
6. How the technology filter works.
7. Any design decisions made.
8. Any deviations from this document.
9. Test results.
10. Production build result.
11. Browser QA results by viewport.
12. Any known issues.
13. Any questions or decisions that need human approval.

Do not claim a check was performed if it was not actually performed.

---

# 44. HARD PHASE BOUNDARY

Phase 3 ends with the Character Record.

Do NOT proceed into:

- Hall of Artifacts implementation
- project detail pages
- Wizard's Laboratory
- Archmage's Notes
- Guild Recruitment
- final audio implementation
- final spell transition
- final visual polish

Those belong to later phases.

When all Phase 3 work and testing are complete, STOP.

Do not create Phase 4 automatically.

Do not continue coding after the Phase 3 completion report.

End with exactly:

PHASE 3 COMPLETE. Please inspect the Character Record and give me GO AHEAD when you want me to begin Phase 4.