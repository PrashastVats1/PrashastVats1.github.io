# PRASHAST PORTFOLIO
## Design & Product Bible

This document is the persistent source of truth for the visual identity,
interaction philosophy, UX principles, and creative direction of the portfolio.

Every development phase must read this document before implementation.

If a later phase conflicts with this document, stop and ask for clarification
rather than silently changing the established design direction.

---

# 1. CORE CONCEPT

This is not a conventional developer portfolio with a fantasy skin.

The portfolio itself exists inside a whimsical fantasy RPG world.

The central concept is:

> THE PORTFOLIO OF A SOFTWARE ARCHMAGE

The visitor is exploring the professional record, creations, adventures,
abilities, writing, and recruitment information of Prashast Vats.

Prashast is represented as a fantasy adventurer / software archmage.

The fantasy is the interface itself.

The website should feel like:

> "I have entered a magical world that happens to contain a very good
> software engineer's portfolio."

It should NOT feel like:

> "A normal portfolio with parchment backgrounds."

---

# 2. PRIMARY CREATIVE DIRECTION

Theme:

WHIMSICAL FANTASY RPG

Influences:

- tabletop RPGs
- classic fantasy games
- high fantasy
- whimsical fantasy
- fantasy adventure books
- RPG interfaces
- hand-crafted medieval artifacts

The world should be:

- warm
- whimsical
- slightly mysterious
- playful
- polished
- memorable
- inviting

It should NOT become:

- cyberpunk
- steampunk
- Y2K
- sci-fi
- CRT/90s computer themed
- grimdark
- horror
- a Harry Potter clone
- a Lord of the Rings clone
- a literal D&D clone
- generic AI-generated fantasy

We are committing to ONE coherent fantasy world.

Do not introduce unrelated themes just because an individual effect looks cool.

---

# 3. INSPIRATION FROM MAHYBE.COM

Mahybe.com is an important inspiration for interaction quality.

We are NOT cloning its visual design.

What we admire:

- the portfolio behaves like an interactive application
- separate pages instead of one giant scrolling page
- memorable page transitions
- loading sequences
- sound effects
- persistent music controls
- themed interfaces
- useful skill filtering
- project exploration
- strong personality
- Easter eggs
- a feeling that the visitor is operating something

We are NOT copying:

- CRT monitor
- Commodore/90s aesthetic
- exact layouts
- exact colors
- exact animations
- exact typography
- exact text
- exact navigation
- exact assets
- exact interaction implementation

Our portfolio must have its own identity.

---

# 4. WORLD STRUCTURE

The entire site belongs to one medieval fantasy world.

Page concepts:

| Portfolio concept | Fantasy interface |
|---|---|
| Home | Magical spellbook |
| Resume | RPG-inspired character record |
| Experience | Quest history / adventurer's chronicle |
| Projects | Hall of Artifacts |
| Project detail | Artifact record / quest scroll |
| Tools | Wizard's Laboratory |
| Blog | Archmage's Notes / Scholar's Archive |
| Hire Me | Guild Recruitment |

These concepts are deliberately consistent.

Do not mix fantasy with cyberpunk, Y2K, sci-fi terminals, space ships,
modern HUDs, or unrelated themes.

---

# 5. PROFESSIONAL CLARITY

Fantasy terminology must never make the portfolio difficult to understand.

The visitor should immediately understand:

- who Prashast is
- what he does
- where he has worked
- what he has built
- what technologies he uses
- what experience he has
- how to contact him
- how to download his resume

Fantasy labels may be accompanied by clear professional descriptions.

Examples:

Character Record
→ Resume

Abilities
→ Technical Skills

Quest History
→ Professional Experience

Hall of Artifacts
→ Projects

Wizard's Laboratory
→ Interactive Tools

Archmage's Notes
→ Blog / Writing

Guild Recruitment
→ Contact / Hire Me

A recruiter who has never played an RPG should be able to use the website
without learning the fantasy vocabulary first.

The fantasy is an enhancement, not a usability barrier.

---

# 6. VISUAL SYSTEM

## Overall composition

Use a DARK FANTASY OUTER ENVIRONMENT with WARM PARCHMENT CONTENT SURFACES.

The site should NOT be entirely parchment-colored.

Think:

dark wood / dark stone / shadow
        ↓
warm illuminated parchment
        ↓
content

The outer shell provides atmosphere.

The parchment is the artifact/interface being interacted with.

This creates the same broad structural principle that makes interactive
interfaces memorable: a distinct environment surrounding a readable content
surface.

---

# 7. MATERIALS

Primary materials:

- dark wood
- dark stone
- leather
- parchment
- paper
- brass
- antique gold
- ink
- candlelight
- subtle magical energy

Parchment surfaces:

- warm cream
- subtle yellow tint
- slight age
- subtle paper texture
- irregular edges
- occasional small tears

Tears must never overlap important text.

Texture must remain subtle.

Readability always wins over decoration.

---

# 8. COLOR DIRECTION

Primary environment:

- very dark brown
- charcoal
- dark stone
- deep muted fantasy colors

Primary content surface:

- warm parchment
- cream
- off-white
- slightly yellowed paper

Supporting colors:

- dark brown
- burgundy
- forest green
- deep blue
- muted purple
- antique gold
- warm orange

Avoid excessive neon.

Avoid modern gradient-heavy SaaS aesthetics.

Avoid glassmorphism.

Avoid bright generic "AI purple" styling.

---

# 9. TYPOGRAPHY

Do not automatically use Cinzel or another stereotypical "AI fantasy"
font simply because it looks medieval.

Typography should be intentionally selected.

Use:

1. A distinctive but readable fantasy/display font for headings.
2. A highly readable serif or sans-serif for body text.
3. Optional small fantasy/pixel display lettering for decorative UI elements.

Body text must prioritize readability.

Do not use pixel fonts for paragraphs.

Do not make every heading look medieval.

Typography should feel like a modern website built inside a fantasy world.

---

# 10. PIXEL ART

Pixel art is an important visual ingredient, but it should NOT dominate every
element.

Primary uses:

- Prashast's avatar
- selected game-like UI elements
- spell-casting effects
- small decorative character elements
- selected artifacts where appropriate

Other elements may use:

- illustration
- hand-drawn details
- parchment
- engraved elements
- ornamental borders
- subtle texture
- clean typography

The final website should feel like a modern interactive fantasy portfolio,
not an entire 1990s pixel-art game.

---

# 11. AVATAR SYSTEM

The final personal avatar artwork will be supplied by the owner.

Assets will initially be placed in:

avatar/
- regular.png
- scholar.png

The exact filenames may be changed later if necessary.

Do NOT generate replacement avatars if the supplied assets exist.

Do NOT overwrite the supplied avatar artwork.

Create a reusable avatar component.

## Regular avatar

Represents Prashast as the primary fantasy character.

Visual direction:

- recognizable face
- pixel-art/stylized treatment
- wizard hat
- Prashast's normal stylish glasses
- approachable/confident expression

Used for:

- Home
- major identity moments
- spell-casting transitions
- major magical interactions

## Scholar avatar

Same person and visual identity.

Differences:

- thicker / more opaque / nerdier glasses
- scholarly presentation

Used primarily for:

- Blog
- Archmage's Notes
- scholarly/writing interfaces

The two avatars must clearly feel like the same person.

Do not use emoji characters as substitutes.

---

# 12. NO EMOJIS

Do NOT use emoji characters as final visual UI elements.

Do not represent the fantasy world using:

- wizard emoji
- sword emoji
- book emoji
- potion emoji
- magic emoji
- character emoji

Use:

- actual assets
- SVG
- CSS
- pixel art
- illustrations
- custom graphics

instead.

The result should feel authored, not assembled from emoji.

---

# 13. ART ASSET STRATEGY

The visual concept depends partly on illustration.

The project therefore has an explicit asset architecture.

Recommended structure:

public/assets/

scenes/
- home.webp
- resume.webp
- projects.webp
- tools.webp
- blog.webp
- hire.webp

artifacts/
- <project-slug>.png

lab/
- <tool-slug>.png

icons/
- nav-home.svg
- nav-resume.svg
- nav-projects.svg
- nav-tools.svg
- nav-blog.svg
- nav-hire.svg

effects/
- spell-cast.webp
- spell-explosion.webp

These are asset SLOTS, not requirements that every file must exist immediately.

A page must still look good when a final illustration is not yet available.

Never render a broken image.

If an asset is missing, use a tasteful designed fallback.

Do NOT use emoji as the fallback.

---

# 14. ART STYLE CONSISTENCY

If generated or commissioned artwork is added later, all major artwork should
look like it belongs to the same fantasy world.

Avoid mixing:

- pixel art
- anime
- photorealism
- watercolor
- 3D game renders
- unrelated illustration styles

unless there is a deliberate reason.

The avatar can be pixel-art while larger environmental artwork is illustrated,
but they should still share compatible color, mood, and visual language.

---

# 15. HOME

The Home page is a magical spellbook.

The visitor should feel like they have opened the first page of an adventurer's
grimoire.

Possible opening:

THE ADVENTURES OF

PRASHAST VATS

SOFTWARE ARCHMAGE

The Home page should immediately communicate:

- name
- profession
- what Prashast builds
- broad areas of expertise
- availability / interest where appropriate

The spellbook is preferred over a normal hero section.

Page turning can replace conventional scrolling where appropriate.

The desktop experience may show a two-page spread.

Mobile should show one page at a time.

---

# 16. RESUME

The Resume page is an RPG-inspired character record.

Possible structure:

CHARACTER RECORD

PRASHAST VATS

CLASS
Software Engineer / Software Archmage

EXPERIENCE
3+ Years

Do NOT use a fake Level 3 system if it risks making the candidate look junior.

Professional experience should be represented clearly.

RPG terminology is a presentation metaphor around real information.

Do not invent fake:

- STR
- DEX
- INT
- HP
- mana
- combat stats

unless they have an actual meaningful purpose.

---

# 17. RESUME FILTER

One of the strongest ideas from mahybe.com is technology filtering.

Preserve that concept.

Use one simple filter:

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
[ AI/ML ]
[ TESTING ]
[ TOOLS ]

Selecting an ability should reveal or highlight relevant experience.

Do NOT build a multi-dimensional query system.

Do NOT create simultaneous filters for:

- technology
- type
- project
- domain
- role

The filter exists to make the resume easier to explore.

---

# 18. EXPERIENCE

Experience can be presented as:

QUEST HISTORY

or:

THE CHRONICLE

Each entry must clearly show:

- company
- role
- dates
- responsibilities
- achievements
- technologies

Fantasy terminology must never hide the actual professional information.

---

# 19. PROJECTS

Projects belong in a:

HALL OF ARTIFACTS

Possible environment:

- dark fantasy hall
- shelves
- display cases
- pedestals
- subtle magical lighting

Each project becomes an artifact.

Each should have:

- recognizable visual identity
- project name
- short plain-English description
- technologies
- status where appropriate
- relevant links/actions

Projects should not all look identical.

---

# 20. PROJECT DETAIL

Opening an artifact should feel like inspecting a quest record or ancient
artifact scroll.

Possible sections:

THE PROBLEM

THE QUEST

THE SOLUTION

TOOLS / TECHNOLOGIES

RESULTS / ACHIEVEMENTS

LINKS

The fantasy language can be playful while the actual technical content remains
professional.

---

# 21. PROJECT INTERACTION

Opening an important project may trigger:

- short magical effect
- subtle triumphant sound
- artifact glow
- page/scroll opening

Do not make every click noisy.

Meaningful actions can have meaningful feedback.

---

# 22. TOOLS

Tools become:

THE WIZARD'S LABORATORY

Possible supporting text:

"Witness the wonders and creations of the Software Archmage."

Existing interactive tools may be incorporated.

Examples include:

- Prompt Debugger
- Git Commit Formatter
- Code Review Rater
- Tech Stack Advisor
- Regex Explainer
- JIRA Ticket Scorer

These are actual useful tools.

Do not turn them into purely decorative fantasy cards.

The fantasy should wrap the actual functionality.

---

# 23. BLOG

The Blog becomes:

THE ARCHMAGE'S NOTES

or:

THE SCHOLAR'S ARCHIVE

Visual direction:

- blackboard
- books
- desk
- parchment
- scholarly environment
- subtle fantasy laboratory/library atmosphere

The scholar avatar appears somewhere in the environment.

The scholar version uses the thicker/nerdier glasses.

Posts remain easy to scan.

Each article should clearly show:

- title
- date
- category if relevant
- reading time if relevant
- short description
- link

Long-form reading must remain comfortable.

---

# 24. HIRE ME

The Hire Me page becomes:

GUILD RECRUITMENT

Possible messaging:

"Does thy guild have a quest worthy of an Archmage?"

Primary CTA:

INVITE ME TO THY PARTY

Potential actions:

SEND A RAVEN
Email me directly

CONSULT THE GUILD
Open LinkedIn

SUMMON MY RECORD
Download resume

Fantasy labels should always have understandable supporting text.

---

# 25. MAGICAL CONTACT INTERACTIONS

Important contact actions can be represented as spells.

Example:

Email:

spell flickers
→ magical energy
→ spell vanishes/explodes
→ email action opens

LinkedIn:

magical effect
→ LinkedIn opens

Resume:

magical effect
→ resume opens/downloads

The animation should not create unnecessary delay.

---

# 26. GLOBAL PAGE TRANSITION

This is one of the defining interactions of the website.

Concept:

navigation
→ Prashast avatar appears
→ spell casting
→ spell becomes unstable
→ magical explosion
→ smoke/magic covers viewport
→ destination page revealed

The avatar can remain mostly static.

The spell and explosion can carry most of the animation.

This should feel whimsical and slightly comedic.

---

# 27. TRANSITION FATIGUE

The full spell animation should NOT play at full length forever.

The transition system should support:

FULL TRANSITION
- first two navigations during a session

SHORT TRANSITION
- approximately 300ms
- later navigations

The user should be able to click during a transition to skip it and immediately
reach the destination.

Reduced-motion users receive an even simpler transition.

The system should be architected this way from the beginning rather than
retrofitted later.

---

# 28. MOBILE

Below approximately 768px:

The spellbook should show ONE page at a time.

Do not force a two-page desktop spread onto a phone.

Navigation should collapse into a simple accessible menu.

Page turning can be:

- tap-based
- button-based
- swipe-based

depending on the final implementation.

The fantasy should remain intact without sacrificing usability.

---

# 29. AUDIO

Ambient audio is part of the world.

Desired atmosphere:

- birds
- flowing water
- distant waterfall
- soft wind
- subtle natural ambience
- optional gentle magical chimes

It should be soothing and non-intrusive.

Do NOT autoplay sound on initial load.

Use a persistent Play / Stop control.

The music state must persist across page navigation.

Changing pages must NOT restart the ambience.

The audio system should support separate channels for:

- ambient music
- navigation effects
- spell effects
- artifact/project effects

The final music can be added later.

Use only original, generated, or appropriately licensed audio.

---

# 30. NAVIGATION

Navigation must work with:

- mouse
- keyboard
- touch

Active state must be obvious.

Navigation should feel like part of the fantasy interface.

Do not create a normal corporate navbar with fantasy colors.

---

# 31. ACCESSIBILITY

Accessibility is not optional.

Support:

- keyboard navigation
- semantic HTML
- visible focus states
- accessible buttons
- accessible links
- accessible labels
- sufficient contrast
- reduced motion
- accessible audio controls

The fantasy must never override accessibility.

---

# 32. PERFORMANCE

Avoid unnecessary complexity.

Do not add large dependencies for minor effects.

Prefer:

- CSS animations
- optimized images
- lazy loading
- lightweight components
- reusable effects

Do not use giant background videos.

The final site should remain fast.

---

# 33. DEPLOYMENT

The portfolio is intended to remain deployable on GitHub Pages.

Do not break existing deployment.

Before changing routing:

- inspect existing routing
- inspect deployment configuration
- understand GitHub Pages behavior

Direct navigation and refresh must work with the chosen deployment strategy.

---

# 34. EXISTING PORTFOLIO

The current portfolio is a CONTENT SOURCE, not the visual reference.

Its visual design is intentionally being replaced.

Useful existing content may include:

- professional experience
- projects
- tools
- writing
- links
- resume information

Do not preserve generic visual patterns merely because they exist already.

---

# 35. CONTENT ACCURACY

Never invent:

- companies
- roles
- dates
- achievements
- clients
- technologies
- awards
- testimonials
- job titles
- professional history

AI-generated concept images are NEVER a source of truth for professional content.

If an image contains text, titles, dates, companies, skills, or other information,
treat that text as decorative/mockup content only.

Only use verified repository/user-provided information for actual portfolio content.

---

# 36. REFERENCE IMAGE RULE

Any supplied mockup image is a:

MOOD / ART DIRECTION / LAYOUT REFERENCE ONLY.

It is NOT a content source.

Do not copy:

- text
- job titles
- companies
- dates
- skills
- statistics
- blog titles
- professional claims

from a mockup image.

Decorative objects in mockups are optional.

Do not treat:

- cats
- candles
- cauldrons
- books
- furniture
- background objects

as mandatory elements.

---

# 37. DESIGN PRIORITY

When making design decisions, use this priority order:

1. Usability
2. Professional clarity
3. Consistency of the fantasy world
4. Memorability
5. Visual polish
6. Decorative detail

Do not sacrifice the first four for the last two.

---

# 38. THE CORE TEST

The final portfolio should produce this sequence of reactions:

First:

"Whoa, this is different."

Then:

"Oh, this is a portfolio."

Then:

"Oh, I can actually understand this."

Then:

"Wait, I can interact with this."

And finally:

"This person actually builds things."

That is the goal.

# 39. LARGE-SCREEN DENSITY

The fantasy shell should not rely on empty space to create atmosphere.

On large displays, the surrounding dark fantasy environment may expand, but the parchment/content surface should maintain a deliberate visual presence and should not stretch unnecessarily to fill the viewport.

As real content is added in later phases, use content density, composition, illustrations, artifacts, and interactive elements to give the parchment a purposeful presence.

Do not fill empty space with decorative elements merely for the sake of filling space.

The goal is:

- Large viewport → more surrounding fantasy environment
- Parchment → sensible maximum width
- Content → determines meaningful vertical height
- Decoration → supports the world, rather than filling gaps
- No artificial giant empty parchment

This should be evaluated again once the real Home, Resume, Projects, Tools, Blog, and Hire content is implemented. Phase 1's placeholder pages should not be expanded solely to solve this issue.