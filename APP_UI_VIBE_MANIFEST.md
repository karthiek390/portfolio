# APP UI Vibe Manifest

Status: active, additive, immutable reference.

Rule:
- Future UI/UX work must read this file first.
- Do not delete, replace, or ignore this file without explicit human approval.
- Add new findings as append-only notes or dated amendments.
- When proposing redesigns or API-affecting UI changes, preserve baseline code and run an A/B path until human approval.

## Audit Scope

Audit date: 2026-05-24

Sources used:
- Codebase audit across `app/`, `components/`, `context/`, `lib/`, `prisma/`, `transitions/`, `middleware.ts`
- Local app reachability check on `http://localhost:3000`
- Browser automation intent confirmed, but integrated browser runtime was not callable in this session, so live browser driving could not be executed from tools. UI behavior below is mapped from source code and current local app structure.

## Product Shape

App is a dual-mode Matrix portfolio with one forced entry decision:
- Landing route `/` presents Blue Pill vs Red Pill choice.
- After choice, middleware + cookie system treat that choice as durable and redirect user into `/portfolio`.
- Main content route `/portfolio` renders either recruiter-friendly blue mode or hacker-terminal red mode from same route shell.
- Backend surface is intentionally small:
  - `POST /api/pill-choice`
  - `POST /api/contact`
  - `GET /api/github-status`

## End-to-End Data Flow

### 1. Pill selection flow

UI:
- `app/page.tsx`
- `context/PillContext.tsx`

Flow:
1. User clicks `Blue Pill` or `Red Pill` on `/`.
2. `handleChoice(choice)` calls `setMode(choice)`.
3. `setMode` in `PillProvider`:
   - updates client React state immediately
   - sends `POST /api/pill-choice` with `{ mode }`
4. `app/api/pill-choice/route.ts` validates mode and sets `pill_mode` cookie.
5. Client then `router.replace("/portfolio")`.
6. `middleware.ts` guards future route access:
   - `/` + cookie -> redirect `/portfolio`
   - `/portfolio` + no cookie -> redirect `/`
7. `app/layout.tsx` reads cookie server-side and boots `PillProvider` with `initialMode`.

Result:
- Pill choice survives refresh.
- Back navigation does not meaningfully return user to decision gate.
- Manual edit to `/` after choice redirects back to `/portfolio`.

### 2. Portfolio mode switch flow

UI:
- `components/blue/Navbar.tsx`
- `components/red/Navbar.tsx`
- `transitions/TheConstruct.tsx`
- `context/PillContext.tsx`
- `app/portfolio/page.tsx`

Flow:
1. User clicks mode toggle in navbar:
   - blue mode button text: `RED PILL`
   - red mode button text: `☎ DISCONNECT`
2. Navbar calls `onSwitchMode("red" | "blue")`.
3. `usePillTransition()` stores pending mode and reveals `TheConstruct`.
4. `TheConstruct` types cinematic white-room text.
5. On completion, `setMode(pendingMode)` runs.
6. `setMode` persists cookie through `POST /api/pill-choice`.
7. `/portfolio` rerenders in opposite mode.

Result:
- Mode switching is cinematic, not instant.
- Cookie remains synced with latest chosen mode.

### 3. Contact form flow

UI:
- `components/red/TerminalContactForm.tsx`

API:
- `app/api/contact/route.ts`

DB:
- `lib/prisma.ts`
- `prisma/schema.prisma`

External notification:
- Slack webhook via `SLACK_WEBHOOK_URL`

Flow:
1. User advances terminal prompts one field at a time:
   - `company`
   - `email`
   - `message`
2. Pressing `Enter` stores current prompt value and advances state.
3. Invalid email clears current field and does not advance.
4. At review state, user clicks `[ BROADCAST TO ZION ]`.
5. Client sends `POST /api/contact` with JSON body.
6. API validates all fields.
7. API writes submission to Prisma `Contact` model -> `contacts` table.
8. API then attempts Slack webhook alert.
9. Slack failure is logged but does not fail submission.
10. Client shows success state on `res.ok`, else error state.

Result:
- Source of truth is DB first.
- Slack is side-effect notification, not primary persistence.

### 4. GitHub status flow

UI:
- `components/red/NebuchadnezzarStatus.tsx`

API:
- `app/api/github-status/route.ts`

External source:
- GitHub REST API `/users/{username}/events/public?per_page=30`

Flow:
1. Component mounts in red mode only.
2. With `USE_MOCK = false`, client fetches `/api/github-status`.
3. API reads `GITHUB_USERNAME` and optional `GITHUB_TOKEN`.
4. API fetches public events from GitHub.
5. API finds first `PushEvent`.
6. API returns:
   - `repo`
   - `message`
   - `time_ago`
   - `url`
   - `avatar_url`
7. UI shows loading, error, or ready state.

Result:
- Red mode has lightweight live activity panel.
- No DB dependency for GitHub panel.

## Route Map

### `/`
Purpose:
- landing choice gate

Primary elements:
- Matrix rain canvas background
- anomaly text
- blue pill button
- red pill button

State:
- no local form state
- uses pill context for selection

Navigation:
- redirects to `/portfolio` after successful choice persistence
- redirected away by middleware if `pill_mode` cookie already exists

### `/portfolio`
Purpose:
- main portfolio shell

Mode switch:
- driven by `PillContext.mode`

Blue render stack:
- `BlueNavbar`
- `BlueHero`
- `BlueProjects`
- `BlueCerts`
- `BlueFooter`

Red render stack:
- `RedNavbar`
- `RedHero`
- `RedProjects`
- `RedCerts`
- `NebuchadnezzarStatus`
- `TerminalContactForm`

Overlay:
- `TheConstruct` during mode switch

### `not-found`
Purpose:
- cinematic 404 route

Behavior:
- text mutates word-by-word into `SMITH`
- button routes to `/`
- because middleware redirects `/` when cookie exists, this can land user back in `/portfolio` after a pill has already been chosen

## Interactive Inventory

### Landing page interactions

#### `#blue-pill-btn`
Trigger:
- click

Effect:
- set mode to `blue`
- persist `pill_mode=blue` via `POST /api/pill-choice`
- `router.replace("/portfolio")`

#### `#red-pill-btn`
Trigger:
- click

Effect:
- set mode to `red`
- persist `pill_mode=red` via `POST /api/pill-choice`
- `router.replace("/portfolio")`

### Blue mode interactions

#### Nav anchors
- `About` -> `#hero`
- `Projects` -> `#projects`
- `Skills` -> `#certs`
- `Contact` -> `#contact`

Note:
- Blue mode currently has no dedicated contact section component in `app/portfolio/page.tsx`, so `#contact` may not resolve to a visible target in blue mode.

#### `#pill-toggle-btn`
Trigger:
- click

Effect:
- begin blue -> red transition via `TheConstruct`
- persist new cookie through `setMode("red")`

#### Hero CTA: `#hero-linkedin-btn`
Trigger:
- click

Effect:
- opens LinkedIn in new tab

#### Hero CTA: `#hero-github-btn`
Trigger:
- click

Effect:
- opens GitHub profile in new tab

#### Project card links
Trigger:
- click

Effect:
- open GitHub repo or live URL in new tab

Micro-interaction:
- 3D tilt via `useTilt(6)`
- stronger box shadow on hover

### Red mode interactions

#### Nav anchors
- `INIT` -> `#hero`
- `PROJECTS` -> `#projects`
- `PROGRAMS` -> `#certs`
- `TRANSMIT` -> `#contact`

#### `#red-pill-toggle-btn`
Trigger:
- click

Effect:
- begin red -> blue transition via `TheConstruct`
- persist new cookie through `setMode("blue")`

#### Hero CTAs
- `>> LINKEDIN` -> external LinkedIn
- `>> GITHUB` -> external GitHub

#### Red project cards
Trigger:
- hover

Effect:
- title scramble animation
- stronger green border/glow
- 3D tilt via `useTilt(12)`

Trigger:
- click external links inside card

Effect:
- `EXTRACT_CODEBASE` -> GitHub repo
- `LIVE_INSTANCE` -> live external target if present

#### Red certification cards
Trigger:
- click

State machine:
- `idle`
- `loading`
- `loaded`

Effect:
- 2-second fake progress load
- card becomes completed glowing state

#### `NebuchadnezzarStatus`
No input state.

Trigger:
- mount

Effect:
- fetch `/api/github-status`
- loading pulse -> ready rows or error text

Link:
- `VIEW_IN_MAINFRAME` opens commit URL in new tab

#### `TerminalContactForm`
Input state:
- `step`
- `current`
- `data`
- `status`

Prompt order:
- company
- email
- message

Transitions:
- `Enter` on non-empty input -> save field + next step
- invalid email -> clear input, stay on email step
- click submit -> `status="sending"` and call `/api/contact`
- success -> `step=4`, `status="sent"`
- failure -> `status="error"`

### 404 page

#### `#smith-disconnect-btn`
Trigger:
- click

Effect:
- `router.push("/")`
- middleware may redirect to `/portfolio` if pill cookie exists

## API Surface

### `POST /api/pill-choice`
Input:
```json
{ "mode": "blue" | "red" }
```

Behavior:
- validates mode against `Set(["blue", "red"])`
- sets `pill_mode` HttpOnly cookie

Output:
- success: `{ "ok": true }`
- bad input: `{ "ok": false, "error": "Invalid pill choice." }`
- server fail: `{ "ok": false, "error": "Failed to save pill choice." }`

### `POST /api/contact`
Input:
```json
{
  "company": "string",
  "email": "string",
  "message": "string"
}
```

Behavior:
- validate all fields
- normalize company/email/message
- insert into Prisma `Contact`
- optionally send Slack alert

Output:
- success: `{ "ok": true, "message": "Signal received." }`
- validation fail: 400 with field error
- server fail: 500 with transmission error

### `GET /api/contact`
Output:
- 405 method not allowed payload

### `GET /api/github-status`
Behavior:
- fetch GitHub events
- derive latest push metadata

Output shape:
```json
{
  "repo": "owner/repo",
  "message": "latest commit subject",
  "time_ago": "x hours ago",
  "url": "https://github.com/owner/repo/commit/sha",
  "avatar_url": "https://..."
}
```

Failure modes:
- no username configured -> 500
- no push events -> 404
- GitHub request failure -> 500

## DB + Pooling

DB:
- PostgreSQL through Supabase

ORM:
- Prisma

Connection pattern:
- `lib/prisma.ts` uses singleton cached on `global` in development
- prevents hot-reload from creating too many Prisma clients

Models:
- `Contact`
  - fields: `id`, `company`, `email`, `message`, `createdAt`
  - mapped table: `contacts`
- `Pageview`
  - fields: `id`, `page`, `device`, `country`, `createdAt`
  - mapped table: `pageviews`
  - present but unused in v1

## Design Tokens + Vibe

### Core concept
- Split-brain portfolio:
  - blue = recruiter-safe, crisp, corporate
  - red = cinematic hacker fantasy, terminal ritual, Matrix lore

### Token base

From `app/globals.css`:

Blue mode:
- bg: `#F8FAFC`
- surface: `#FFFFFF`
- primary: `#2563EB`
- text: `#0F172A`
- muted: `#64748B`
- border: `#CBD5E1`
- font main: `Inter`
- glow: none

Red mode:
- bg: `#000000`
- surface: `#0D0D0D`
- primary: `#00FF41`
- secondary: `#003B00`
- text: `#00FF41`
- muted: `#00802B`
- border: `#00FF4133`
- font main: `JetBrains Mono`
- glow: green neon

### Visual vibe

Landing page:
- dark ritual chamber
- dense matrix-rain field
- centered glassy black panel
- strong white headline, small green system copy
- pill objects glow like props, not standard buttons

Blue mode:
- soft SaaS resume aesthetic
- white cards, low-shadow elevation
- rounded corners, generous whitespace
- restrained motion, clean typography
- tactile feel: polished, credible, low-friction

Red mode:
- black canvas with terminal green hierarchy
- labels look like machine output
- interactions are theatrical:
  - scramble
  - glow
  - scanlines
  - loading bars
  - typewriter overlay
- tactile feel: clandestine, playful, immersive

### Motion language
- Framer Motion for entrances, staged reveals, blinking cursor, panel fades
- `TheConstruct` is key cross-mode transition signature
- `useTilt` gives cards physicality without full 3D scene complexity

### Reusable visual primitives
- `.glitch`
- `MatrixRain`
- `TheConstruct`
- green scanline overlays
- green glow borders/shadows

## Known UX/Architecture Notes

- `components/shared/Navbar.tsx`, `components/shared/PillToggle.tsx`, and `lib/github.ts` remain stubs.
- Blue nav includes `Contact` anchor but blue content stack does not currently render a contact section.
- GitHub panel is recent-activity based, not a contributions chart.
- 404 disconnect route may bounce to `/portfolio` after choice because middleware enforces chosen-state routing.

## Non-Destructive A/B Rule

For future UI makeovers, rewrites, or API-linked UI changes:
- Do not erase baseline working code first.
- Create parallel component/path/version where possible:
  - `Component.new.tsx`
  - `/api/v2/...`
  - alternate route branch
- Keep both baseline and candidate visible/testable until explicit human approval.
- Only remove or overwrite baseline after written human confirmation.

## Future Amendment Protocol

When new UI work happens:
1. Read this file first.
2. Append new findings or deltas.
3. Do not silently drift from established mode language, motion vocabulary, or route behavior.

## Local Verification Notes

Verification date: 2026-05-24

Runtime status:
- local server already running in background on `http://localhost:3000`
- reused existing live server rather than spawning duplicate dev process

HTTP checks performed:

### Root route `/`
- `GET /` returned `200`
- raw HTML shell contains:
  - `<!DOCTYPE html>`
  - Next.js/Turbopack dev script tags
  - app CSS chunk
- string probes against served HTML returned true for:
  - `This is your last chance`
  - `BLUE PILL`
  - `RED PILL`

Interpretation:
- landing decision page is being served live, not just present in source

### Guarded portfolio route `/portfolio`
- `GET /portfolio` without pill cookie returned `307`
- redirect target was `/`

Interpretation:
- middleware route guard is active in live server

### Pill cookie persistence
- `POST /api/pill-choice` with `{ "mode": "red" }` returned `200`
- response set cookie similar to:
  - `pill_mode=red`
  - `HttpOnly`
  - `SameSite=lax`
  - one-year `Max-Age`
- subsequent request to `/` under that session returned `307`

Interpretation:
- one-way pill selection is enforced live, not only in code

### Portfolio content probe
- session with persisted blue choice loaded `/portfolio`
- served HTML matched:
  - `Karthiek Duggirala`
  - `Full-Stack Engineer`

Interpretation:
- portfolio route is serving real blue-mode content from live app shell

### API runtime probes

`GET /api/github-status`
- returned JSON payload with:
  - `repo: "karthiek390/cicd-stats-watcher"`
  - `message: "No message"`
  - `time_ago: "4 days ago"`

Interpretation:
- GitHub status panel backend is live
- current event parsing can legitimately surface `"No message"` when commit payload is sparse or missing

`GET /api/contact`
- returned:
```json
{ "error": "Method not allowed." }
```

Interpretation:
- route method guard active in live server

Browser-tool note:
- integrated browser runtime still unavailable as callable tool in this session
- live verification above therefore comes from real localhost HTTP inspection rather than DOM-driving automation

## Amendment 2026-05-24: Blue Contact Section Added

Source:
- user-approved blue-pill contact implementation request
- 21st reference pattern: https://21st.dev/community/components/prebuiltui/form-1

What changed:
- blue mode now renders `components/blue/ContactForm21st.tsx` between `BlueCerts` and `BlueFooter`
- blue navbar `Contact` anchor now resolves to a real `#contact` section
- section is a recruiter-friendly two-column contact card:
  - left panel explains contact channel and response path
  - right panel contains standard inputs for `company`, `email`, and `message`

Runtime behavior:
- submit target is existing `POST /api/contact`
- successful submission:
  - stores row in Supabase via Prisma
  - triggers Slack webhook on server if `SLACK_WEBHOOK_URL` is configured
- local HTTP probe confirmed new blue contact copy is present on live `/portfolio`

Stylistic notes:
- implementation is 21st-inspired rather than direct CLI-generated import
- chosen fit:
  - blue gradient information panel
  - white elevated form card
  - rounded high-trust SaaS styling
  - same backend pipeline as red terminal, different surface language

## Amendment 2026-05-24: Blue Hero Deja Vu A/B Pass

Source:
- `tasks_v2/matrix_v2_priority_backlog.md`
- item: `Blue Pill subtle glitch / deja vu`

Implementation mode:
- additive / reversible
- original blue hero preserved in `components/blue/Hero.tsx`
- active experiment moved to `components/blue/HeroDejaVu.tsx`
- `app/portfolio/page.tsx` now comments out the old hero import/render and mounts the new hero version

Behavior:
- blue hero remains recruiter-safe by default
- after a short one-time delay, the hero bio performs a brief anomaly:
  - duplicate text layers flicker
  - copy shifts slightly
  - small ASCII cat cue `^..^` flashes near the bio
- effect runs once and settles back to normal

Design guardrails:
- no layout change
- no terminal-green contamination in blue mode
- no looping aggressive animation
- readability preserved as primary rule
