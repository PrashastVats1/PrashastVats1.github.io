# Phase 8 — Performance, Accessibility and Launch Polish

Read `DESIGN.md`, `PHASE_1.md` through `PHASE_7.md`, and the portfolio-wide audit findings. Inspect the current repository and Git status before making changes.

Implement Phase 8 in the existing Software Archmage style. This file is the Phase 8 brief: keep it intact and append an implementation and verification record as work is completed (see "Resolved decisions" below). Do not overwrite the brief or record checks that have not actually run.

## Priority 1: Asset performance

- Generate appropriately sized responsive variants for project artwork and serve them with `srcset`/`sizes` or an equivalent solution supported by the existing architecture.
- Provide a small, optimized header avatar rather than downloading the full portrait for a 44px display.
- Stop publishing unused original avatar PNGs if the audit confirms nothing requires them.
- Preserve image quality and original source backups.
- Measure total downloaded image bytes before and after.

## Priority 2: Sound control

Inspect the existing sound button, audio system, and Phase 1 design decisions.

Decide whether ambient audio genuinely improves the experience. If implementing it, use a suitable, properly licensed asset and provide reliable play/pause behavior, accessible labels, reduced-motion/experience preferences where applicable, and graceful failure handling. Do not autoplay audio.

If audio does not justify its maintenance and download cost, remove or hide the nonfunctional control consistently. Document the decision in `PHASE_8.md`.

## Priority 3: Data consistency

- Identify the duplicated project and experience data sources.
- Establish a single authoritative source where practical.
- Update Home, Projects and Resume to consume the shared data without changing intended content.
- Reconcile inconsistent project statuses using repository evidence. Do not guess.
- Add tests preventing future drift.

## Priority 4: Accessibility and mobile usability

- Fix the verified Tools-page contrast failure.
- Increase undersized badge text and the Copy address touch target where needed.
- Add or strengthen skip-link and keyboard-navigation tests.
- Preserve semantic structure, visible focus, and reduced-motion support.
- Check touch targets and responsive layout across existing breakpoints.

## Priority 5: Sharing and documentation

- Add an appropriate favicon.
- Add an optimized social preview image and metadata for the portfolio.
- Add a useful README with local setup, build, deployment, architecture, and AI tool configuration guidance. Never include secrets.
- Add a concise, honest cold-start note beside the Priya demo if it remains on cold-start hosting.

## Priority 6: Cleanup

- Remove demonstrably dead legacy code and unused dependencies only after verifying references.
- If removing Tailwind, measure the production CSS impact and ensure all existing styling continues to work. Do not remove it simply because it is old.
- Avoid unrelated refactors.

## Constraints

- Preserve all existing portfolio content, blog articles, dates, contact links, Fiverr gig URL, and Cloudflare Worker behavior unless a change is explicitly required above.
- Do not expose secrets or make a paid live AI request.
- Do not add dependencies without a clear reason.
- Do not commit, push, merge, or deploy.
- Do not start another phase.

## Verification

Run the full test suite and production build. Measure image and bundle sizes. Test all routes at mobile, tablet and desktop widths. Check links, console errors, keyboard accessibility, reduced motion, and asset loading where tools permit.

Distinguish actual visual inspection from measurements or automated assertions. Do not claim a check succeeded if it was not performed.

Report the changed files, performance measurements, test/build results, accessibility fixes, unresolved limitations, and a clear verdict: READY FOR REVIEW or NEEDS FIXES.

---

## Resolved decisions

These decisions resolve ambiguities in the brief above and take precedence where they are more specific. **Implementation must not begin until the owner explicitly approves it.**

### 1. Phase document handling

- Keep the brief above intact. Append the implementation and verification record below this section, only as work is completed.
- Never record a check as passed unless it actually ran.

### 2. Image optimization: committed variants (Option A)

- Pre-generate responsive WebP variants locally and commit them. Do not add a build-time image-processing dependency. GitHub Pages deployment must need no image tools.
- Inspect the existing source images and the asset manifest (`scripts/prepare-assets.js`, `src/assets/manifest.js`) first.
- Optimize both sets of card artwork:
  - Hall of Artifacts project artwork (`public/assets/artifacts/`): cards measured at about 351px wide from 1402px sources.
  - Wizard's Laboratory instrument artwork (`public/assets/lab/`): cards measured at about 261px wide from 1448px sources.
- Size variants to the real display widths, including 2x density, and add appropriate `sizes`. Avoid unnecessary variants and any visible quality loss.
- Provide a small avatar variant for the 44px header crest, which currently downloads the 933px portrait.
- Stop publishing the unused avatar PNGs (`build/avatar/*.png`, about 3.2 MB) once references are confirmed absent.
- Preserve the original sources in `avatar/` and all existing backups.
- Record before/after file sizes and estimated transfer savings per route.

### 3. Audio

- Inspect the sound control (`src/components/fantasy/AudioControl.js`), `src/audio/AudioProvider.js` and `public/assets/audio/`, which was empty at audit time.
- **Default decision:** if no suitable, owner-supplied, properly cleared audio asset exists, hide or remove the nonfunctional sound control consistently across all pages.
- Do not introduce new audio just to satisfy the original plan. Never autoplay audio.
- Record the decision and its reasoning.

### 4. Shared project and experience data

There are currently three overlapping sources:
- `src/config.js`: `featuredProjects`, `experience`, `highlights`, `stats`, used by Home through `src/pages/home/homeContent.js`.
- `src/pages/projects/artifacts.js`: used by Projects and Hire.
- `src/pages/resume/resumeContent.js`: used by Resume.

Requirements:
- **Home keeps four featured projects, including Event Intelligence.** Projects keeps its existing three featured projects. Both consume one authoritative project source and select their own subsets.
- Resume and Home share experience data where practical.
- Standardize the underlying factual status metadata while preserving meaningful distinctions: professional versus independent work, publication state, and project lifecycle.
- Keep useful descriptions and display labels where they communicate extra information.
- Inspect `src/config.js` for undisplayed claims (for example "49 installs at ~90% retention" and "Sub-100ms"):
  - Keep valid, supported claims that may serve a legitimate purpose.
  - Remove only obsolete, unsupported or genuinely unused data, after checking references.
  - Record what was kept or removed, and why.
- Add tests that prevent drift between pages.

### 5. Word resume

- Inspect `public/Prashast_Vats_Resume.docx` and every reference to it. At audit time it was deployed but not linked anywhere.
- Retain it only if it serves a clear use case and is clearly linked. If it is redundant or unused, record the reasoning first, then remove it from deployment.
- Do not break the existing PDF resume download or link.

### 6. CSS and dependency cleanup

- Inspect `react-router-dom` explicitly and remove it only if genuinely unused. The app uses its own hash router in `src/router/`.
- Before touching Tailwind:
  - Verify its role and its production CSS contribution. At audit time it emitted about 275 utility rules plus its base layer, mostly for unreachable legacy components.
  - Measure the production CSS size before and after any change.
- If Tailwind is removed, add and test a small replacement reset, because its base layer currently provides global box-sizing and default spacing resets.
- If the savings are small or the visual risk is high, keep Tailwind and document the decision.
- Remove legacy code only after checking imports, dynamic references, routes, tests and build configuration. Audit candidates were the 20 files unreachable from `src/index.js`.
- `src/blog/schema.js` and `src/testFixtures/aiResults.js` are used by tests and must stay.

### 7. Home page conversion

- Add a clear, visually integrated hiring/contact call to action on Home that leads to Guild Recruitment.
- Link Home's project previews to their existing project detail pages where appropriate.
- Keep Home's four-project selection.
- Do not duplicate the Hire page or introduce generic SaaS cards.

### 8. Favicon and social preview

- Create the favicon as an SVG based on the existing PV crest or logo. No raster favicon.
- Add at most one new raster social-preview image, only if needed. Optimize it to **200 KB or less**.
- Add the matching metadata (`og:image`, `twitter:image` and related tags). Verify that the paths resolve on the GitHub Pages base path.
- Do not add other decorative images or alter the established design language.

### 9. Priya demo

- If the Priya demo remains on cold-start hosting, add a short, honest note near its demo link: the first response may take longer while the service wakes up.
- Do not state an exact wait time or promise availability.

### 10. Additional verification requirements

These are in addition to the Verification section above:
- Run the full test suite and production build.
- Measure image bytes and the JavaScript and CSS bundle sizes, before and after.
- Run `npm audit` with a reasonable timeout. If it hangs or fails, report that accurately and do not imply the dependencies are vulnerability-free.
- Test all routes and key interactions at mobile, tablet and desktop widths.
- Verify asset paths and metadata on the GitHub Pages base path.
- Check the following where tools permit: keyboard accessibility, focus visibility, contrast, reduced motion, dead links, console errors and broken assets.
- Clearly distinguish browser visual inspection from DOM measurements and automated assertions.
- Make no paid live AI request.

### 11. OpenAI spending cap (owner task)

- Configuring an OpenAI spending cap is a **manual, account-level task for the owner**, outside this repository.
- Do not attempt it in code or claim it is done. List it separately in the final report.

### Constraints (restated)

- Preserve existing portfolio content, blog posts, publication dates, verified contact details, the public Fiverr gig URL, and Cloudflare Worker behavior, unless a change is explicitly required above.
- Do not expose secrets. Do not deploy, commit, push, merge, or begin another phase.

---

## Implementation and verification record

Implemented on 11 Oct 2026 after owner approval. Nothing was committed, pushed, merged, or deployed. The Cloudflare Worker, blog posts and their dates, verified contact details, and the Fiverr gig URL are unchanged (`git diff HEAD -- worker src/blog` is empty).

### What changed

**1. Images (Option A).**
- `scripts/make-image-variants.py` (Pillow, run manually) wrote committed WebP variants: artifact art at 480/720/960w (31–111 KB each, originals 194–237 KB), lab art at 320/560w (20–63 KB, originals 225–308 KB), avatars at 96/192/384w in `public/assets/avatar/` (3–36 KB, originals 198/246 KB). Originals are kept.
- `variantSrcSet()` in `src/assets/manifest.js` lists only variants present in the asset manifest. `Avatar` (`sizes` = its display size), `ArtifactArt` and `InstrumentArt` pass `srcSet`/`sizes`.
- `SafeImage` now sets `loading`, `srcSet`, and `sizes` before `src`. Browser QA found that the original order made the browser also fetch the full-size `src`; after the fix only the selected variant is requested.
- `scripts/prepare-assets.js` mirrors only WebP/AVIF/SVG from `avatar/`, so the 3.2 MB of avatar PNGs are no longer published (`/avatar/regular.png` now returns 404). The PNGs remain in `avatar/`.
- Not changed: the two full-bleed scene images (`projects.webp`, `laboratory.webp`). On mobile they are cropped to cover the screen and already display above their native resolution, so smaller variants would visibly blur them.

**2. Ambient audio.**
- `public/assets/audio/ambient.mp3`: "Lanternlight Lane", replacing the first woodland soundscape at the owner's request. Revision 2: 552 KB (565,082 B), 80.6 s, mono 56 kbps at 32 kHz, made by `scripts/generate-ambient.py`.
  - **Composition:** original, written out note by note in the script. 6/8 in D major at about 48 dotted-quarter beats per minute, 32 bars in an A A′ B A″ form. The progression is D G Bm A D G A D for the A sections, with G D Em Bm for the B section, and the last bar ends on A so the loop resolves into bar 1. Melodic phrases are short, with an empty bar after most of them. "Cobblestone Village" was taken as a mood reference only (gentle, blended, soothing); no melody, harmony, or arrangement from it was transcribed or imitated.
  - **Arrangement:** the harp is the main texture. Each bar has one low harp root and a slow roll through three chord tones, and the harp carries the melody everywhere except bars 9–16, where a soft wooden flute takes two short phrases. A warm three-note pad sustains under everything. Seven quiet bells fall in the gaps between phrases. There is no percussion, no running rhythm, and no build-up.
  - **Revision 2 (owner feedback that the plucked pattern sounded like a guitar riff):**
    - The cause was the lute layer: six plucked eighth notes in every bar (192 in the loop), accented on both beats, plus a second bass pluck on beat two, all in a bright Karplus-Strong tone. Both were removed.
    - The harp voice is now a dark Karplus-Strong string blended 45% with a decaying sine and given a soft 6 ms attack, so it sounds rounder and less like a guitar.
    - The tempo was slowed from 0.35 s to 0.42 s per eighth note. The melody was rewritten sparser, with rests.
    - The flute was cut from 16 bars to two phrases in bars 9–16. The pad gain was raised from 0.05 to 0.08, with a 1.2 s attack. Bell gain was lowered from 0.05 to 0.035.
    - The reverb wet level was lowered from 0.22 to 0.16. The bitrate was lowered from 64 to 56 kbps to keep the longer loop under the 600 KB budget.
  - **Synthesis:** a Karplus-Strong string blended with a sine for the harp. Additive synthesis with vibrato and breath noise for the flute, inharmonic partials for the bells, and detuned sines for the pad. The room is a generated noise impulse response applied with FFmpeg `afir` (white-noise gain normalized). Timing has a small, seeded humanization.
  - **Seamless loop:** note tails wrap from the end of the buffer into bar 1, and the reverb runs over two copies of the loop with only the second copy kept, so the tail at the end carries into the start.
  - **Provenance and licence:** written in pure Python (standard library only) plus FFmpeg. No recordings, samples, or third-party material are used, so no external licence applies. No new dependency was added. The script is deterministic (fixed seed).
  - The previous track is not kept in the repository.
- `AudioProvider` states: `unavailable`, `off`, `loading`, `playing`, `blocked` (browser refused playback), `error` (load or decode failure). The audio element and download are created only on the first Play. A pause from outside the page (for example, media keys) is reflected. Retry after an error creates a fresh element. Effects remain silent (no effect files exist).
- `AudioControl`: accurate `aria-pressed`, `aria-busy` while loading, a label and status for every state, a polite live region for playing/blocked/error, and disabled with "Soundscape unavailable" if the file is missing. The loading pulse is disabled under reduced motion.
- **Persistence:** in memory for the visit (the provider sits above the router). It is deliberately not restored after a reload, because that would require autoplay. No storage or tracking is used.
- **Measured (revision 2, decoded from the final MP3):**
  - Duration 80.64 s decoded (80.68 s container).
  - Integrated loudness −21.4 LUFS, loudness range 3.8 LU (6.6 LU before, so it is steadier).
  - True peak −5.9 dBFS, sample peak −5.9 dBFS, no clipping, no NaNs.
  - Last 0.5 s at −21.1 dB RMS against −21.4 dB for the first 0.5 s, so there is no level jump or silence at the seam.
  - The spectrogram shows one soft harp attack per bar (six before) and the flute passage at about 21–42 s.
  - Served from the local build with 200, `audio/mpeg`, and 565,082 B, identical to the source. The `AmbientAudio` tests (7) pass, the full suite passes (331), and the build compiles.
- **Owner action:** the track has been verified by measurement and a spectrogram only; it was not heard during development. The owner should listen before deploying.

**3. Data consolidation.**
- `artifacts.js` is the single project source: `HOME_ARTIFACTS` (Remora, AI Agent Auth Gateway, Priya, Event Intelligence) and `statusText()` are shared by Home and the Hire proof. The Hall keeps its three featured artifacts.
- Home identity facts come from `RECORD` in `resumeContent.js` (experience, current role, location); the rendered text is unchanged.
- Home status labels are now the standard statuses ("Published", "Open source", "Winner, Voice Agent Jam 3.0", "Live") instead of free-text emoji badges.
- `config.js` keeps `name`, `title`, `tagline` (displayed on Home), `location`, `email`, `phone` (verified; still intentionally not displayed), `github`, `linkedin`, `fiverr`, and `resumeFile`. **Removed**, after confirming no live code read them: `stats`, `marqueeItems`, `mentalModels`, `featuredProjects` (including the unrendered "49 installs at ~90% retention" and "Sub-100ms" claims, which the owner excluded or no source supports), `skills`, `highlights`, `experience`, `education`, `certifications`, `achievements`, `blogUrl`, and `blogPosts`. The resume data in `resumeContent.js` remains the authoritative transcription.
- The technology names from those fields were frozen into `src/testFixtures/knownTech.js`, a test-only evidence list for the existing accuracy tests.
- Drift tests: Home previews must match the Hall entries (name, summary, status, route); identity facts must match the Character Record; the Hall keeps its three featured.

**4. Word resume.** `resume/Prashast_Vats_Resume.docx` (moved from `public/`). It was linked nowhere, and its text matches the published PDF word for word, apart from artifacts of PDF text extraction. As the editable source it is kept in the repository but no longer deployed. The PDF link and download are unchanged.

**5. Cleanup.**
- Deleted 21 unreferenced legacy files (17 old components, `PlaceholderNote`, `ThemeContext`, `useActiveSection`, `useInView`) and the orphaned `.pv-placeholder-note` CSS. Each was confirmed to have no importers outside the dead set. `useMediaQuery` and `theme/breakpoints` are live and kept.
- Removed `react-router-dom` (no imports; the app uses `src/router/`).
- **Tailwind kept, reduced.** Measured contribution after the legacy removal: base reset (Preflight) 3,638 B raw / 1,431 B gzip; components + utilities 1,268 B / 556 B, all accidental matches on ordinary words (`.hidden`, `.transition`, `.container`…) with no live `className` using any utility. Dropped the components and utilities layers. Kept Preflight, which the hand-written CSS relies on: replacing it would save only about 1.4 KB gzip, at the risk of regressions on every route.

**6. Home.** Each previewed project name links to `/projects/<slug>`. The welcome page adds "Seeking an engineer for your quest? Visit Guild Recruitment to hire me", linking to `/hire`. Four projects remain; no new cards or pages.

**7. Favicon and preview.** `public/favicon.svg` (the crest's colours, hat, and PV monogram, simplified for small sizes; no raster favicon). `public/social-preview.jpg`: 1200×630, 114 KB, from `scripts/make-social-preview.py` (Noto Serif fonts, SIL OFL). `index.html` adds the icon link, `og:image` (with type, size, and alt), `og:site_name`, `summary_large_image` Twitter tags, and trailing-slash canonical/og URLs. Image URLs are absolute (`https://prashastvats1.github.io/…`), and the icon uses `%PUBLIC_URL%`.

**8. Priya.** The demo link carries `note`: "The demo runs on a free hosting tier, so it may be slow to wake on the first visit." The note appears beside the demo link on the Hall card, the Priya record page, and the Hire proof, connected with `aria-describedby`. It gives no time and makes no availability promise; a test enforces both.

**9. Accessibility.**
- Tools bench eyebrow changed from `--pv-gold-ink` (3.0–3.6:1) to `--pv-ink-faint` (5.62:1).
- Every hard-coded 0.7rem/0.72rem text size now uses `--pv-text-xs` (12.8 px).
- `.pv-copy` raised to 44 px minimum height.
- New tests: skip link is first, focuses `main`, and keeps the route; focus lands on `main` after navigation; every page has a named sound button.

**10. README.md** added: setup, test, build, deployment, architecture map, asset scripts, AI configuration (only the public `REACT_APP_AI_API_URL`; no secrets).

### Measurements (before = HEAD `fac78c3` build; after = this work)

| | Before | After |
|---|---|---|
| Main JS | 347,702 B raw / 107,773 B gzip | 341,464 B / 105,445 B (−2.2%) |
| Main CSS | 167,603 B raw / 25,464 B gzip | 156,788 B / 23,083 B (−9.4%) |
| `build/` total | 9,324,064 B | 8,619,984 B (now includes the 481 KB audio and 2.2 MB of variants; 3.2 MB of PNGs removed) |

Image bytes per route at 1440×900, DPR 1, measured in the browser from each image's `currentSrc`, after scrolling the page:

| Route | Before | After |
|---|---|---|
| `/home` | 198 KB | 32 KB |
| `/resume` | 198 KB | 43 KB |
| `/projects` | 1,095 KB | 441 KB |
| `/projects/remora` | 703 KB | 375 KB |
| `/tools` | 2,277 KB | 442 KB |
| `/blog` | 445 KB | 43 KB |
| `/hire` | 198 KB | 43 KB |

The After column came from a first run in which one stale load made the header avatar use the 384w file. On a clean load at DPR 1, the header uses the 96w file (3.7 KB), so these After figures slightly overstate. At 375×667, DPR 2, the browser chose the 720w artifact, 320w lab, and 192w/384w avatar files. The two scene images (310 KB and 248 KB) are unchanged and now dominate `/projects` and `/tools`.

### Verification

- **Tests:** `CI=true npm test -- --watchAll=false`: 17 suites, **331 passed**, 0 failed (310 before this phase). New: `AmbientAudio.test.js` (7), `ResponsiveImages.test.js` (5), plus additions to App, Spellbook, HallOfArtifacts, and GuildRecruitment tests.
- **Build:** `npm run build` compiled successfully, with no warnings from the app (Node prints an `fs.F_OK` deprecation notice from the toolchain).
- **Responsive QA (measured, not visual):** served `build/` locally and used DevTools emulation at 375×667 (DPR 2), 768×1024, 1024×768, 1440×900, and 1920×1080 across `/home`, `/resume`, `/projects`, `/projects/priya`, `/tools`, `/tools/regex-alchemist`, `/blog`, a blog article, `/hire`, and an unknown route. At every width:
  - no horizontal overflow and no broken images;
  - no visible text under 12 px;
  - no interactive control smaller than 24×24 px (inline links in prose excluded);
  - no console errors (hooked after load; warnings were also hooked at 375 and 1440 px, with none seen).
- **Hire email CTA bottom edge:** 648 px at 375×667, 752 px at 1024×768, and 707 px at 1920×1080. All are inside the first screen and match Phase 7.
- **Home project links** measure 24 px tall. On mobile the new hiring line sits just below the first screen of the scrolling welcome page.
- **Audio (real browser, real click):** before Play there was no MP3 request and no audio element. After the click the button showed "Stop ambience / Loading ambience…" with pressed and busy states, then "Ambience playing". `ambient.mp3` (480,831 B, the earlier track) was fetched once. Navigating to Guild Recruitment kept it playing with no second request. Stop returned it to "Sound is off". Playback was verified by state and network only, not by ear.
- **Reduced motion:** with `prefers-reduced-motion: reduce` emulated before load, the spellbook reported `data-motion="reduced"` and navigation used the `reduced` transition. Switching the setting mid-session was not reflected in this embedded browser. The hook does listen for `change` events, so this is believed to be an emulation limitation, but it is unconfirmed.
- **GitHub Pages paths:** from the served build, `/favicon.svg`, `/social-preview.jpg`, and `/Prashast_Vats_Resume.pdf` return 200; `/Prashast_Vats_Resume.docx` and `/avatar/regular.png` return 404 as intended. The site builds for `/` (`homepage` is the domain root).
- **Favicon:** rendered locally at 64 px and 16 px; the ring and "PV" remain legible at 16 px.
- **Social preview:** inspected visually (the generated file was viewed directly).
- **Links:** all new internal links are covered by tests (`#/projects/<slug>`, `#/hire`). No external URLs were added or changed, so external links were not re-fetched in this phase.
- **Keyboard:** covered by tests (skip link, focus after navigation, named controls) and the accessibility tree. No physical Tab-key walkthrough.
- **`npm audit --omit=dev`** (90 s timeout) completed: 96 advisories (5 low, 13 moderate, 75 high, 3 critical). All come through build tooling: the direct packages are `react-scripts`, `postcss`, and `tailwindcss`; the critical ones (`proxy-addr`, `shell-quote`, `websocket-driver`) are development-server dependencies. `react` and `react-dom` are not affected, and none of this code ships in the static bundle. Fixing them needs a move off Create React App, which is out of scope. The pre-phase audit had not completed, so there is no before figure.
- **No paid AI request** was made.
- **Screenshots:** the screenshot tool returned a frame from the previous page rather than the page requested at the emulated size, so it was not retried. One genuine capture of `/hire` at the pane's default width was reviewed; everything else above is measurement.

### Unresolved and owner tasks

- **Listen to the ambient track** before deploying. If it is unsuitable, delete `public/assets/audio/ambient.mp3` and the control falls back to a disabled "Soundscape unavailable" state.
- Synthesized instruments are less realistic than recorded ones. If the track is not convincing, the alternatives are a CC0 or explicitly licensed recording (with its licence recorded here) or a commissioned piece. Either can drop in at the same path with no code change.
- **OpenAI spending cap (manual, account-level, owner only):** set a monthly budget or limit for the key the Worker uses in the OpenAI dashboard. This was not attempted and is not done.
- The scene images (310 KB and 248 KB) remain the largest downloads on `/projects` and `/tools`.
- Build-tool advisories remain, as above.
- MP3 looping in `<audio>` may leave a very short gap at the loop point in some browsers, from encoder padding. Not verified by ear.

---

## Final release-readiness audit (11 Oct 2026)

A review only: no application code, assets, tests, dependencies, or configuration were changed. This section is the only edit. The earlier record above is kept as written; where a figure has changed since, the new value is given here.

**State.** Branch `fantasy-portfolio`, HEAD `fac78c3`. All Phase 8 work is uncommitted: 49 tracked files changed (393 insertions, 1,227 deletions) plus the untracked new files. The owner has listened to and approved the revised ambient track ("Lanternlight Lane", revision 2).

**Commands run (this audit):**
- `CI=true npm test -- --watchAll=false`: 17 suites, 331 passed, 0 failed (exit 0).
- `npm run build` (clean; `react-scripts` empties `build/` first): "Compiled successfully" (exit 0). Main JS 341,464 B raw / 105,445 B gzip; main CSS 156,788 B / 23,083 B (identical to the record). `build/` total 8,704,535 B, up from 8,619,984 B because the approved audio is 565,082 B instead of 480,831 B.
- `timeout 90 npm audit --omit=dev`: completed, 96 advisories (5 low, 13 moderate, 75 high, 3 critical), unchanged.

**Production output (`build/`):**
- No avatar PNGs and no `.docx`. `/avatar/regular.png` and `/Prashast_Vats_Resume.docx` return 404; `/favicon.svg`, `/social-preview.jpg` (117,745 B), `/Prashast_Vats_Resume.pdf`, and `/assets/audio/ambient.mp3` (565,082 B, `audio/mpeg`) return 200.
- `build/avatar/regular.webp` (203 KB) and `scholar.webp` (252 KB), plus the full-size artifact and lab WebPs, are still published. They are the `src` fallbacks behind each `srcset`, so browsers that support `srcset` do not download them.
- A secret scan of `build/` (OpenAI-style keys, `OPENAI_API_KEY`, private keys, Cloudflare tokens) found nothing. The bundle contains only the public Fiverr profile and gig URLs; no seller-dashboard URL.
- Source maps (`main.*.js.map` 812 KB, `main.*.css.map` 206 KB) are published, which is the Create React App default. They expose only source that is already in the public repository and are fetched only when developer tools are open. Not changed.
- `index.html`: absolute `og:image` / `twitter:image` URLs on `https://prashastvats1.github.io/`, `summary_large_image`, canonical with a trailing slash, and the SVG icon at `/favicon.svg`. `homepage` is the domain root, and the build reports "hosted at /".

**Ambient audio (real browser clicks on the served build):**
- On a fresh load: no `<audio>` element and no MP3 request. The button reads "Play ambience, Sound is off", `aria-pressed=false`.
- After clicking: "Stop ambience, Loading ambience…" (pressed, busy), then "Ambience playing". One MP3 request (565,382 B transferred).
- Navigated to Guild Recruitment through the header link: still "Ambience playing", still one MP3 request, focus on `main#main-content`. Stop returned it to "Sound is off".
- Looping and the error/unavailable states are covered by the `AmbientAudio` and `AudioControl` tests (passing). The file was not made to fail in the browser.
- `DESIGN.md` §29 described a natural soundscape (birds, water, wind). The owner deliberately chose a medieval village track instead, so this is an approved change, not a defect.

**Responsive and accessibility sweep (measured, not visual).** DevTools emulation at 320×640 and 375×667 (both DPR 2, mobile), and 768×1024, 1024×768, 1440×900, and 1920×1080 (DPR 1). Twelve routes at each width: `/home`, `/resume`, `/projects`, `/projects/priya`, `/projects/remora`, `/tools`, `/tools/regex-alchemist`, `/tools/prompt-debugger`, `/blog`, `/blog/when-your-ai-agent-browses-the-web`, `/hire`, and an unknown route. At all 72 route and width combinations:
- no horizontal overflow and no broken images;
- the smallest visible text was 12 px;
- no visible control under 24×24 px (inline links in prose excluded);
- no `console.error`, uncaught error, or unhandled rejection.

Further checks:
- **Reduced motion:** with `prefers-reduced-motion: reduce` emulated before a fresh load, the spellbook reported `data-motion="reduced"`.
- **Focus:** one global `:focus-visible` rule styles every element. `outline: none` appears only on elements focused by the code (`.pv-main`, `.pv-transition`, `.pv-bench__title`), not on links or buttons.
- **Inert pages:** Home's project links and hiring line sit on spellbook pages 2 and 4. When those pages are not open they are `inert` and `aria-hidden`, which is the intended page-turn behaviour.
- **Contrast:** inconclusive in this audit. The automated check could compute a background for only 3 of 112 text elements on `/hire`, because most text sits on gradient or image backgrounds. The earlier token measurements (for example `--pv-ink-faint` at 5.62:1) still stand; contrast was not re-verified here.
- **Keyboard and screen readers:** not tested manually; there was no physical Tab-key walkthrough and no screen-reader test. Keyboard behaviour is covered by tests only.

**Image bytes per route (1440×900, DPR 1, `currentSrc` sizes via HEAD).** `/home` 32 KB, `/resume` 43 KB, `/projects` 441 KB, `/projects/remora` 375 KB, `/tools` 280 KB, `/blog` 68 KB, `/hire` 43 KB. These tally with the earlier record, except `/tools` (442 KB earlier) and `/blog` (43 KB earlier); this tally covers only `<img>` elements that had loaded at the time, so the differences may come from lazy loading or scroll position. The sweep ran in a tab previously emulated at DPR 2, which made the header use the 384w avatar. On a clean DPR 1 load the header used `regular-96.webp` at 44 px with `sizes="44px"`, so the 384w result was a cache effect of the emulation.

**External links (curl with a browser user agent):** 200 for GitHub (profile and four repositories), `remora.watch`, the Fiverr gig, the AI Agent Auth Gateway, Event Intelligence, Movie Discovery, and D&D guide demos. The Priya demo (`voice-agent-nubn.onrender.com`) timed out at 15 s, then returned 200 after 47 s, which matches the cold-start note. LinkedIn returned 999 and npm returned 403; both block automated requests, so these are not confirmed broken.

**Documentation findings (not fixed: outside this audit's permitted edits):**
- `README.md` lines 53–54 say the ambient track is synthesized "from FFmpeg signal generators". That described the first woodland track. The approved track is synthesized in Python and only processed and encoded with FFmpeg.
- `README.md` says the GitHub Actions workflow is the only deployment step, but `package.json` still has `"deploy": "gh-pages -d build"` (and the `gh-pages` dev dependency), which would publish to a `gh-pages` branch instead. Harmless unless run, but inconsistent.
- `scripts/__pycache__/` is untracked and not ignored, so it could be committed by accident. It is not deployed.
- **Resolved after the audit (owner-approved cleanup):**
  - The README's ambient-track description was corrected.
  - The root `deploy` and `predeploy` scripts were removed from `package.json`, and the README now states that the `main` workflow is the only deployment path. The `gh-pages` dev dependency was kept, and `package-lock.json` is unchanged.
  - `.gitignore` now ignores `__pycache__/` and `*.py[cod]`.

**Autoplay on entry (owner request, after the audit).** This reverses the earlier "never autoplay" decision and the `DESIGN.md` §29 rule, at the owner's explicit request. `DESIGN.md` itself was not edited.
- **Behaviour:** `AudioProvider` makes one `play()` attempt when it mounts, which happens once per page load. Route changes never re-attempt. If the browser refuses with `NotAllowedError`, the state becomes `autoplay-blocked`: the track stays stopped, the button reads "Play ambience, Press to play the music" with a gold edge and three slow icon pulses (no pulse under reduced motion), and one polite live-region message is set. One press plays the same audio element. A visitor's Stop holds across routes.
- **Download:** the MP3 is now requested on entry even when autoplay is refused.
- **Tests:** `AmbientAudio.test.js` covers autoplay allowed, autoplay refused (no `console.error`, no retry after 60 s or a route change), a press after refusal (same element), Stop and Play again, and route changes (one `play()` call). All 333 tests pass, and the `CI=true` build compiles.
- **Real browser, embedded Chromium (autoplay allowed):** a fresh load reached "Ambience playing" with no user activation and one MP3 request. Two route changes made no further `play()` calls, Stop held across a route change, and Play resumed on the same element.
- **Refused case:** not verified in a real browser. Headless Brave hung in this environment, so the refusal path is covered by simulated tests only.
- **Investigation (owner report: no autoplay in Brave or Chrome).** Headless Chrome 154 and Brave 154 were driven over the DevTools protocol with fresh profiles; `HTMLMediaElement.prototype.play` was wrapped before page load, and no project code was changed for the probe.
  - The app's single `play()` call ran 316–532 ms after load (`readyState` 0, `src` set, no user activation). Both browsers rejected it with `NotAllowedError`: "play() failed because the user didn't interact with the document first." A fully loaded element (`readyState` 4) was refused in the same way, so readiness is not the cause.
  - This is the browsers' autoplay policy, not an implementation defect. The app showed `autoplay-blocked` correctly.
  - The earlier embedded-browser success came from Electron's permissive default autoplay policy, and the Jest tests mock `play()`. Neither proved what Chrome or Brave would do.
- **First-interaction start (owner-approved).** While in `autoplay-blocked`, one `click` or `keydown` listener pair (capture phase) makes a single further `play()` attempt on the visitor's first interaction outside the sound control. Escape is ignored because it does not grant user activation. Gestures on the control are left to its own toggle, so a press plays instead of toggling straight off. The listeners are removed after that attempt, or as soon as the state changes, and if the attempt is refused the button remains the way to start.
  - **Real Chrome and Brave:** after the refused autoplay, clicking the page heading started the track (`play()` resolved with user activation, one audio element), and clicking the sound button also started it.
  - **Tests:** 337 passed; 4 new tests cover a click elsewhere, Tab versus Escape, a single attempt even when refused, and no attempts after a successful autoplay. The `CI=true` build compiles.
  - **Accessibility note:** a keyboard or screen-reader user's first Tab press now starts the music, which may talk over screen-reader speech. Stop is one press away.

**OpenAI spending cap: still not done (owner only).** The Worker reads the key from the Wrangler secret `OPENAI_API_KEY` (not in any file). It uses `OPENAI_MODEL = "gpt-6-luna"`, a 6-request-per-minute rate limit per visitor and instrument, and `MAX_OUTPUT_TOKENS = 2500`. The rate limit and token cap bound each request; only an account budget bounds total spend.