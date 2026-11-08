# Phase 9 — Portfolio Project Expansion and Content Refresh

A content and project-expansion phase. The fantasy RPG world, spellbook, Hall, parchment, typography, navigation, transitions, ambient music, and responsive behaviour are unchanged.

## What changed

**New artifacts**
- **Kalpi Portfolio Trade Execution Engine** (`kalpi-trade-execution`): public source at `https://github.com/PrashastVats1/broker_trade_execution_engine`. Status "Open source, Engineering demonstration". Copy is taken from the README: assignment demonstration, live execution disabled by default, five contract-tested (not live-certified) adapters, no live trades, no frontend claim.
- **Re-Jardinians!** (`re-jardinians`): public source at `https://github.com/PrashastVats1/Re-Jardininans`. Status "Open source, Personal game". Original offline Godot 4.7.2 game; no public playable build.

Artwork slots point at `kalpi-trade-execution.webp` and `re-jardinians.webp`. Those files are not in `public/assets/` yet, so the existing brass-niche placeholder is shown.

**Updated artifacts**
- **AI Agent Auth Gateway:** "Implements RFC 8693 token exchange" replaced with a custom delegated-token exchange inspired by RFC 8693, not that RFC's wire format. Dashboard, consent, deny-by-default policy, IST windows, and audit logging added from the backend and frontend READMEs. MonoCloud is not named in Hall copy (Phase 3 / accuracy tests). Live demo URL unchanged.
- **Remora:** eight structural detectors, five attack categories, human acknowledgement overlay, npm engine kept distinct from the Chrome extension. Planned `remora-backend` is stated as not in this release. Product, GitHub, and npm links unchanged.

**Unchanged:** Priya, Event Intelligence, Movie Discovery, D&D Beginner Guide (reviewed; no inaccurate claims found). `score-tracker`, `docuchat`, and `voice-agent` were not added (too little verified public detail, or already represented as Priya).

**Home featured four:** Remora, AI Agent Auth Gateway, Priya, Kalpi. The Hall Featured Wing is still Remora, Auth Gateway, Priya.

**Character Record:** RFC 8693 wording corrected on the Identity Infrastructure Platform entry. Kalpi and Re-Jardinians added as Independent Quests. Mphasis/HP metrics were already accurate and were not duplicated.

## Verification

- `CI=true npm test -- --watchAll=false`: 17 suites, **341 passed**, 0 failed.
- `CI=true npm run build`: compiled successfully. Main JS 107.39 kB gzip (+1.58 kB); CSS unchanged at 23.23 kB.
- `git diff --check`: clean.
- **Routes (measured, not visual):** served `build/` at `http://127.0.0.1:5057`. At the pane width (~599 px): `/home`, `/projects` (8 artifacts: remora, auth gateway, priya, kalpi, event-intelligence, movie-discovery, dnd-guide, re-jardinians), `/projects/kalpi-trade-execution`, `/projects/re-jardinians`, `/projects/ai-agent-auth-gateway`, `/projects/remora`, `/resume`, `/hire`. No horizontal overflow, no broken images. "Implements RFC 8693 token exchange" is absent; "inspired by RFC 8693" appears on the Auth Gateway record, Character Record, and Hire page. Kalpi and Re-Jardinians use the designed placeholder (no artwork files yet).
- No physical keyboard, screen-reader, or screenshot pass.
- No paid AI request. Nothing committed, pushed, or deployed.
