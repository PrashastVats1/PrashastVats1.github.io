# Phase 9 — Project Expansion

A content and project-expansion phase. The fantasy RPG world, spellbook, Hall, parchment, typography, navigation, transitions, ambient music, and responsive behaviour are unchanged.

### New artifacts

- **Kalpi Portfolio Trade Execution Engine** (`kalpi-trade-execution`)
  - Source: `https://github.com/PrashastVats1/broker_trade_execution_engine`
  - Status: Open source, Engineering demonstration
  - Public assignment demonstration. Live broker execution is disabled by default. Five adapters are contract-tested, not live-certified. No live trades and no frontend are claimed.

- **Re-Jardinians!** (`re-jardinians`)
  - Source: `https://github.com/PrashastVats1/Re-Jardininans`
  - Status: Open source, Personal game
  - Original offline Godot 4.7.2 game. There is no public playable build.

Priya, Event Intelligence, Movie Discovery, and D&D Beginner Guide were reviewed and left unchanged. `score-tracker`, `docuchat`, and `voice-agent` were not added (too little verified public detail, or already represented as Priya).

Home featured four: Remora, AI Agent Auth Gateway, Priya, Kalpi. The Hall Featured Wing remained Remora, Auth Gateway, Priya.

On the Character Record, Kalpi and Re-Jardinians were added as Independent Quests. Mphasis/HP metrics were already accurate and were not duplicated.

### Artwork state at Phase 9

At the time of Phase 9, both new projects used the brass-niche placeholders. The original artwork files had not been added to `public/assets/` yet.

### Updated artifacts

- **AI Agent Auth Gateway:** "Implements RFC 8693 token exchange" was replaced with a custom delegated-token exchange inspired by RFC 8693, not that RFC's wire format. Dashboard, consent, deny-by-default policy, IST windows, and audit logging were added from the backend and frontend READMEs. MonoCloud is not named in Hall copy (Phase 3 / accuracy tests). Live demo URL unchanged. The Character Record Identity Infrastructure Platform entry received the same RFC wording correction.

- **Remora:** eight structural detectors, five attack categories, human acknowledgement overlay, npm engine kept distinct from the Chrome extension. Planned `remora-backend` is stated as not in this release. Product, GitHub, and npm links unchanged.

### Validation

- `CI=true npm test -- --watchAll=false`: 17 suites, **341 passed**, 0 failed.
- `CI=true npm run build`: compiled successfully. Main JS 107.39 kB gzip (+1.58 kB); CSS unchanged at 23.23 kB.
- `git diff --check`: clean.
- **Routes (measured, not visual):** served `build/` at `http://127.0.0.1:5057`. At the pane width (~599 px): `/home`, `/projects` (8 artifacts: remora, auth gateway, priya, kalpi, event-intelligence, movie-discovery, dnd-guide, re-jardinians), `/projects/kalpi-trade-execution`, `/projects/re-jardinians`, `/projects/ai-agent-auth-gateway`, `/projects/remora`, `/resume`, `/hire`. No horizontal overflow, no broken images. "Implements RFC 8693 token exchange" is absent; "inspired by RFC 8693" appears on the Auth Gateway record, Character Record, and Hire page.
- No physical keyboard, screen-reader, or screenshot pass.
- No paid AI request. Nothing committed, pushed, or deployed.

## Phase 10 — Artwork integration

Both original Hall artworks are present:

- `public/assets/artifacts/kalpi.webp`
- `public/assets/artifacts/re-jardinians.webp`

Original dimensions: 1448×1086.

Each has 480, 720, and 960 responsive WebP variants (`kalpi-480.webp`, `kalpi-720.webp`, `kalpi-960.webp`, `re-jardinians-480.webp`, `re-jardinians-720.webp`, `re-jardinians-960.webp`).

The brass-niche placeholder is retained as the fallback when artwork cannot load.
