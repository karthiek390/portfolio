# V2 Pending UI

Date: 2026-05-27
Scope: Red Pill only
Rule: UI only for now

## Do Not Touch

- `app/api/*`
- `prisma/*`
- `lib/prisma.ts`
- `.env*`
- `middleware.ts`
- Supabase or DB config

## Goal

Finish as many remaining Red Pill UI tasks as possible without doing API, backend, or DB work.

If a feature needs data later:
- build the UI now with local state or mock data
- leave API and DB integration for later

## Priority

### 1. Task 9 - Oracle's Kitchen interactive skills mutation - complete
- Extend `components/red/SkillsSection.tsx`
- Clicking a skill node should visibly mutate the local section UI
- Keep it local to the component
- Include:
  - `You've already made the choice. You're just here to understand why you made it.`

Later:
- API can serve mutation content
- DB can store click analytics or content variants

Future integration:
- API: `POST /api/skill-click` only if mutation content becomes dynamic
- Payload: `{ nodeId, skill, timestamp }` → returns `{ quote, flavour, accentColor }`
- DB: new `SkillClick` table only if click analytics are wanted

### 2. Task 12 - Audio-reactive environmental layer - complete
- Small scope only
- Audio must be off by default
- Add only light opt-in effects

Later:
- keep any saved preference work for API/DB later

Future integration:
- No DB needed by default (preference is ephemeral per session)
- Optional: `POST /api/preferences` with `{ audioEnabled: bool }` + `UserPreference` table if persistence is wanted

### 3. Task 10 - Liquid mirror transition - complete
- Keep `TheConstruct` intact
- Add a restrained overlay/ripple effect
- Do not rebuild the whole transition system

Later:
- no API/DB needed

Future integration:
- None. Effect is purely visual and self-contained.

### 4. Task 15 - Architect's Room analytics wall - complete
- Only if time/credits remain
- Build as mock UI only
- No live data wiring in this pass

Later:
- API can provide dashboard payloads
- DB can store richer event data

Future integration:
- API: `GET /api/architect-dashboard`
- Payload shape: `{ totals, pillSplit, trafficSources, topProjects, recentEvents[], hourlyActivity[24] }`
- DB: existing `Pageview` table + new `OperatorEvent(id, type, detail, device, createdAt)` table

### 6. Task 15 (Rework) — Architect's Room cinematic cylinder
- `app/architect/page.tsx` — full rewrite, pseudo-3D CSS cylinder room
- Spatial model: 12 wall panels, each `rotateY(N×30°) translateZ(560px)`, all in `transformStyle: preserve-3d`
- Navigation: pointer drag → `rotateY` on cylinder div, 360° wraparound is native (angle is unbounded)
- White door: absolute overlay on panel 0 (the origin face)
- Monitor grid: 5×5 = 25 monitors per panel × 12 panels = 300 monitors total
- Monitor content types: `bar` (CPU/MEM/NET mock bars), `text` (operator events), `signal` (hex/status), `anomaly` (pulsing red), `dark` (noise chars) — all static CSS-animated, zero JS timers
- Webcam OFF: all monitors show analytics/system content
- Webcam ON: `getUserMedia` → single hidden `<video>` → BFS wave adds 4 monitors every 320ms from panel 0 outward; each cam tile draws from shared video element via canvas RAF
- Webcam OFF: all cam monitors instantly revert to analytics displays + stream tracks stopped
- Perf: `backfaceVisibility: hidden` on each panel, one RAF loop per active cam tile, no JS intervals for static content

Client-isolated permanently:
- `getUserMedia` stream and all canvas pixel data
- Video element source and frame data

Future integration:
- Monitor content feeds: `GET /api/architect-dashboard` → replace seed-based static content with real payload per monitor group
- Payload shape: `{ bars: MetricSnapshot[], events: OperatorEvent[], signals: SignalState[] }`
- DB: existing `Pageview` + new `OperatorEvent` table (see Task 15 original notes)
- Optional: `POST /api/cam-session` `{ duration, monitorCount }` for analytics only (no pixel data)

## Status

- Task 14 operator console work is now implemented
- Task 17 bullet-time work is now implemented

### 5. Task 16 - Matrix webcam filter - complete
- `components/red/MatrixCamSection.tsx` — complete
- Permission flow: idle → requesting → granted / denied / unsupported
- Opt-in only: camera activated on button click, never auto-requested
- Canvas filter: 10×10px block sampling → luminance → character mapping in Matrix green
- Video mirrored; scanline overlay applied on top
- Fallback: animated noise canvas + ACCESS DENIED panel (uses same char-grid approach, no camera)
- All processing browser-local; no pixels transmitted or stored

Future integration:
- No DB needed by default (all processing is ephemeral per session)
- No API route needed for the filter itself
- Optional later: `POST /api/cam-session` with `{ sessionId, duration, denied: bool }` for analytics only
- Permanently client-isolated: raw pixel data, getUserMedia stream, canvas frames

## UI -> API -> DB Pattern

- UI now: local state, mock data, visual behavior
- API later: add route only if real data, analytics, or saved preferences are needed
- DB later: store only finalized event types or content models

Keep the same project structure:
- UI in `components/red/*`, `app/portfolio/page.tsx`, `app/mainframe/page.tsx`
- API later in `app/api/*`
- DB later through Prisma in `lib/prisma.ts` + `prisma/schema.prisma`
