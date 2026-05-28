# Phase 0-8 Gaps Review

Review date: 2026-05-24

Basis:
- `tasks/MASTER.md`
- `tasks/phase_0_setup.md` through `tasks/phase_8_database.md`
- current implementation
- `APP_UI_VIBE_MANIFEST.md`

## Overall Status

No. Not all tasks are fully complete against the original Phase 0-8 task files.

Most core product work is done and live:
- landing page
- blue/red portfolio modes
- construct transition
- terminal contact form
- 404 page
- GitHub status panel
- contact API
- GitHub API route
- Supabase + Prisma schema/client
- Slack contact notifications
- one-way pill routing via cookie + middleware

But several gaps or spec mismatches remain.

## Gaps

### 1. Shared architecture files from `MASTER.md` still not implemented

Files:
- `components/shared/Navbar.tsx`
- `components/shared/PillToggle.tsx`

Why this is a gap:
- `tasks/MASTER.md` defines these as part of expected shared architecture.
- Current app works through separate:
  - `components/blue/Navbar.tsx`
  - `components/red/Navbar.tsx`
- Shared files remain stubs instead of real shared primitives.

Impact:
- product works
- architecture does not fully match documented source-of-truth in `MASTER.md`

### 2. Blue Pill contact placeholder was missing and is now resolved

Files involved:
- `app/portfolio/page.tsx`
- `components/blue/ContactForm21st.tsx`

Resolution:
- blue mode now renders a recruiter-friendly `#contact` section
- section uses a modern 21st-inspired form surface and submits to the existing `POST /api/contact` backend
- submissions follow the same persistence/notification path as red mode:
  - Prisma -> Supabase `contacts`
  - Slack webhook alert from server

Impact:
- blue navbar `Contact` anchor now lands on a real section
- this original gap is no longer open

### 3. `GlitchText` exists but is not applied where Phase 4 explicitly asks

Files:
- `components/shared/GlitchText.tsx`
- `components/red/Hero.tsx`
- `components/red/Navbar.tsx`

Why this is a gap:
- `tasks/phase_4_effects.md` says `GlitchText` should be created and then applied to:
  - Red Pill hero heading
  - Red Pill navbar logo
- Current implementation:
  - `GlitchText.tsx` exists
  - red nav links use raw `className="glitch"`
  - red hero heading is plain `h1`
  - red navbar logo is plain `span`

Impact:
- core glitch behavior exists
- exact reusable-component adoption requested by Phase 4 is incomplete

### 4. Phase docs and task completion flags were never updated

Files:
- `tasks/phase_0_setup.md`
- `tasks/phase_1_landing.md`
- `tasks/phase_2_blue_pill_ui.md`
- `tasks/phase_3_red_pill_ui.md`
- `tasks/phase_4_effects.md`
- `tasks/phase_5_terminal_and_404.md`
- `tasks/phase_6_nebuchadnezzar.md`
- `tasks/phase_7_api.md`
- `tasks/phase_8_database.md`

Why this is a gap:
- `MASTER.md` says completed tasks should be marked complete.
- Current phase files still show `task_completed: false`.
- Several phase metadata blocks still say `Phase Status: Not Started`.

Impact:
- implementation progressed
- task governance files do not reflect current reality

### 5. `PROGRESS.md` remains historically inconsistent

File:
- `tasks/PROGRESS.md`

Why this is a gap:
- file contains old partial status, newer complete status, and mojibake/encoding damage
- there are conflicting statements such as earlier blockers that were later resolved

Impact:
- useful as history log
- not a clean authoritative progress record

## Intentional Divergences From Original Tasks

These are not necessarily mistakes, but they now differ from the original task specs because later approved changes changed behavior.

### A. Landing page back-button behavior no longer matches original Phase 1 wording

Why:
- original `phase_1_landing.md` expected browser back to `/` to work
- later approved one-way-pill requirement changed this
- now:
  - pill choice is persisted
  - `/` redirects to `/portfolio` once chosen
  - `router.replace("/portfolio")` is used

Result:
- current behavior matches later user-approved product rule
- does not match the original Phase 1 expectation literally

### B. 404 DISCONNECT behavior is affected by one-way pill middleware

File:
- `app/not-found.tsx`

Why:
- Phase 5 expects DISCONNECT on 404 to route back to `/`
- button still does `router.push("/")`
- but middleware may redirect `/` back to `/portfolio` if pill cookie exists

Result:
- technically different from original Phase 5 user experience
- caused by later approved routing hardening

## Not Gaps

These were checked and are effectively complete:
- Phase 0 setup foundation
- Phase 1 landing implementation
- Matrix rain fallback
- Phase 2 core blue UI
- Phase 3 core red UI
- Phase 4 construct transition and tilt
- Phase 5 terminal contact form + 404 page
- Phase 6 Nebuchadnezzar placement and live fetch path
- Phase 7 contact and GitHub routes
- Phase 8 Prisma schema, Prisma client, Supabase sync

Also added beyond original tasks:
- Slack webhook notification after contact submission
- server-backed pill choice persistence with `pill_mode` cookie
- middleware route guard for one-way pill flow
- immutable UI manifest `APP_UI_VIBE_MANIFEST.md`

## Recommended Next Fix Order

1. Add blue contact placeholder/section and wire `#contact` correctly.
2. Apply `GlitchText` to red hero heading and red navbar logo.
3. Decide whether to implement shared `Navbar` / `PillToggle` or formally update `MASTER.md` to match actual architecture.
4. Normalize task docs:
   - mark completed tasks
   - clean phase status fields
   - clean `PROGRESS.md` inconsistencies if desired.
