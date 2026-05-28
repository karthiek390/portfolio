# BUILD PROGRESS LOG

## STATUS: IN PROGRESS
## CURRENT: Phase 1 — Task 1.1

---

## PHASE 0 — Setup ✅ COMPLETE

### TASK 0.1 — COMPLETE
- method: manual init → package.json + tsconfig + next.config.ts + postcss.config.yml → npm install → next@16.2.6
- error: create-next-app blocked by existing files → resolved: manual file creation

### TASK 0.2 — COMPLETE
- method: New-Item dirs → Set-Content 26 placeholder files

### TASK 0.3 — COMPLETE
- method: wrote PillContext.tsx with PillProvider, usePill, usePillTransition

### TASK 0.4 — COMPLETE
- method: wrote globals.css with .mode-red/.mode-blue tokens + glitch keyframes

### TASK 0.5 — COMPLETE
- method: wrote layout.tsx with Inter + JetBrains_Mono fonts + PillProvider wrap
- verified: npm run dev → Ready in 654ms ✅

---

## PHASE 0 — Setup

### TASK 0.1 — Init Next.js project
- status: COMPLETE
- method: manual init (create-next-app blocked by existing files) → wrote package.json, tsconfig.json, next.config.ts, postcss.config.yml, .gitignore → npm install → npm run dev verified at localhost:3000
- next version: 16.2.6 (latest)
- errors: create-next-app failed (existing files in dir) → resolved: manual file creation

### TASK 0.2 — Folder structure
- status: COMPLETE
- method: New-Item for all dirs → Set-Content loop for 26 placeholder files

### TASK 0.3 — PillContext
- status: IN PROGRESS

### TASK 0.4 — globals.css tokens
- status: NOT STARTED

### TASK 0.5 — layout.tsx fonts
- status: NOT STARTED

---

## PHASE 1 — Landing Page ✅ COMPLETE

### TASK 1.1 + 1.3 — COMPLETE
- method: wrote app/page.tsx with MatrixRain bg + Framer Motion panel entrance + staggered pill buttons
- note: tasks 1.1 and 1.3 merged (framer motion added inline)

### TASK 1.2 — COMPLETE
- method: custom canvas fallback (21st.dev skipped for speed) → components/shared/MatrixRain.tsx
- chars: ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ10

### TASK 1.4 — COMPLETE
- method: handleChoice → setMode + router.push("/portfolio")
- portfolio page: placeholder renders mode state, toggle works
- verified: browser test ✅ — rain visible, both pills navigate correctly
- hardening request: make pill choice one-way so browser back or manual / cannot return to landing page after first selection
- routing fix: app/page.tsx now saves choice first and uses router.replace("/portfolio") instead of push
- persistence: app/layout.tsx now reads pill_mode cookie and PillProvider boots with server-derived initialMode

## PHASE 2 — Blue Pill UI ✅ COMPLETE
- 2.1: portfolio/page.tsx shell with BlueNavbar/Hero/Projects/Certs/Footer wired
- 2.2: blue/Navbar.tsx — sticky white, KD. logo, nav links, RED PILL toggle
- 2.3: blue/Hero.tsx — name, title, bio, LinkedIn/GitHub CTAs
- 2.4: blue/ProjectCard.tsx + ProjectsGrid.tsx — 3-card responsive grid, hover lift
- 2.5: blue/CertCard.tsx + CertsSection.tsx + Footer.tsx
- verified: browser test ✅ — all sections visible, certs grid, footer, nav

## PHASE 3 — Red Pill UI ✅ COMPLETE
- 3.1: red/Navbar.tsx — KD://, glitch nav links, ☎ DISCONNECT toggle
- 3.2: red/Hero.tsx — staggered Framer Motion terminal lines, blinking cursor
- 3.3: red/ProjectCard.tsx (useScramble hook) + red/ProjectsGrid.tsx
- 3.4: red/CertCard.tsx (3-state: idle→loading→loaded with progress bar) + red/CertsSection.tsx
- 3.5: portfolio/page.tsx — full Red/Blue conditional routing wired
- bug fix: DISCONNECT used directSwitch (setMode) since TheConstruct not yet built (Phase 4 will replace with switchMode)
- verified: browser test ✅ — black bg, green text, scramble effect, cert progress bar, toggle works

## PHASE 4 — Effects ✅ COMPLETE
- 4.1: transitions/TheConstruct.tsx — white overlay, typewriter via char-by-char useEffect, AnimatePresence fade
- 4.2: components/shared/GlitchText.tsx — reusable wrapper using .glitch CSS + data-text attr
- 4.3: lib/useTilt.ts — mouse-position perspective(600px) 3D tilt hook, intensity 12 red / 6 blue
- wired: portfolio/page.tsx — TheConstruct mounted, switchMode replaces directSwitch
- wired: Red ProjectCard + Blue ProjectCard both use useTilt
- verified: browser test ✅ — Construct types out text + fades, tilt tracks mouse, toggle works both directions

## PHASE 5 — Terminal Contact Form + 404 ✅ COMPLETE
- 5.1: components/red/TerminalContactForm.tsx — 3-step CLI state machine, Enter to advance, email validation, stubs /api/contact
- 5.2: app/not-found.tsx — Agent Smith ASCII glasses, word-by-word SMITH mutation, turns red on complete, DISCONNECT→/
- wired: TerminalContactForm added to Red Pill layout in portfolio/page.tsx
- TS fix: GlitchText.tsx JSX namespace → React.ElementType
- verified: tsc --noEmit → 0 errors ✅

## PHASE 6 — Nebuchadnezzar Status ✅ COMPLETE
- 6.1: components/red/NebuchadnezzarStatus.tsx — scanline overlay, pulsing ONLINE dot, 3 states (loading/error/ready), USE_MOCK=true flag
- 6.2: wired between RedCerts and TerminalContactForm in portfolio/page.tsx
- verified: tsc --noEmit → 0 errors ✅
- NOTE: set USE_MOCK=false after Phase 7 builds /api/github-status

## PHASE 7 — API Routes ✅ COMPLETE
- 7.1: lib/prisma.ts — singleton client, hot-reload safe
- 7.2: app/api/contact/route.ts — POST validates company/email/message, writes via Prisma, returns ok/error JSON
- 7.3: app/api/github-status/route.ts — GET fetches latest PushEvent, server-side 5-min cache, no DB needed
- 7.4: .env.local — template with DATABASE_URL + GITHUB_USERNAME + GITHUB_TOKEN placeholders
- confirmed: .env.local already in .gitignore ✅
- enhancement: app/api/contact/route.ts now posts Slack webhook alerts after successful DB writes
- env: add SLACK_WEBHOOK_URL to .env.local for server-side contact notifications
- behavior: Slack send is non-blocking - contact submissions still succeed even if Slack delivery fails
- verified: tsc --noEmit → 0 errors ✅
- navigation backend: added app/api/pill-choice/route.ts to validate mode and persist pill_mode cookie server-side
- route guard: added middleware.ts so / redirects to /portfolio after choice, and /portfolio redirects to / when no choice cookie exists
- transition sync: context/PillContext.tsx now persists mode changes through backend API, including red/blue toggle changes inside /portfolio
- BLOCKER: needs real DATABASE_URL + GITHUB_TOKEN in .env.local before routes work end-to-end

## PHASE 8 — Database Schema ⚠️ PARTIAL (awaiting credentials)
- 8.2: prisma/schema.prisma — Contact model (contacts table) + Pageview model (pageviews table)
- 8.4: lib/prisma.ts — done (Phase 7)
- verified: tsc --noEmit → 0 errors ✅
- PENDING 8.1: user must create Supabase project → copy DATABASE_URL → paste into .env.local
- PENDING 8.3: after credentials in place → run: npx prisma db push && npx prisma generate
- PENDING: set USE_MOCK=false in components/red/NebuchadnezzarStatus.tsx after GITHUB_TOKEN set

## CONTENT UPDATE âœ… COMPLETE
- updated: components/blue/Hero.tsx â€” replaced placeholder bio and wired real LinkedIn/GitHub URLs
- updated: components/blue/ProjectsGrid.tsx â€” replaced placeholder cards with real GitHub projects plus networking/homelab project summaries
- updated: components/blue/ProjectCard.tsx â€” made GitHub links optional so non-published projects render without broken links

## REAL CONTENT UPDATE � Blue + Red Pill`n- Blue Pill: Hero bio, LinkedIn/GitHub, 5 real projects (fixed -> JSX bug from prev AI)`n- Red Pill: Hero.tsx real bio + links, ProjectsGrid.tsx all 5 projects, ProjectCard.tsx githubUrl optional`n- verified: tsc --noEmit -> 0 errors

## PHASE 8 � Database COMPLETE
- 8.1: Supabase project created by user, DATABASE_URL set in .env.local
- 8.2: prisma/schema.prisma � Contact + Pageview models
- 8.3: prisma db push � error: P1012 env not found (Prisma reads .env not .env.local)
  error resolution 1: --env-file flag not supported in v6.19.3
  error resolution 2: Copy-Item .env.local .env ? prisma db push ? ? Remove-Item .env
- 8.4: prisma generate ? � client in node_modules/@prisma/client
- NebuchadnezzarStatus.tsx: USE_MOCK set to false (live GitHub feed active)
- contacts + pageviews tables live in Supabase
- .env deleted after push (credentials safe in .env.local only)
## BLUE CONTACT UPDATE âœ… COMPLETE
- issue: blue navbar Contact anchor led to /portfolio#contact, but no blue contact section was rendered
- implementation: added components/blue/ContactForm21st.tsx and mounted it in the blue /portfolio flow
- UX: blue section now uses a clean recruiter-friendly contact form with company, email, and message fields
- backend reuse: blue form submits to existing /api/contact route
- persistence: successful blue submissions still store in Supabase through Prisma
- notifications: successful blue submissions still trigger the existing Slack webhook path from .env.local
- copy cleanup: removed backend/internal wording and replaced it with standard contact copy and a simple success message

## 404 ROUTING UPDATE âœ… COMPLETE
- issue: 404 button routed to / first, then middleware redirected to /portfolio when pill_mode cookie existed
- fix: app/not-found.tsx now routes directly to /portfolio
- UX copy: button label updated from [ DISCONNECT ] to [ RETURN TO MAINFRAME ] so the action matches the destination
## V2 BLUE DEJA VU UPDATE COMPLETE
- feature: added a subtle Blue Pill illusion-break effect in the hero area using a safe A/B component path
- A/B safety: original components/blue/Hero.tsx kept intact, new behavior implemented in components/blue/HeroDejaVu.tsx, and app/portfolio/page.tsx switches blue mode to the new version
- glitch behavior: hero bio now performs a brief recurring deja-vu anomaly with duplicated text layers and tiny positional drift
- timing loop: anomaly cadence now follows 2s -> 4s -> 8s -> 16s -> 16s...
- visual cue: anomaly now flashes a random Matrix/cat asset near the hero bio instead of ASCII text
- curated asset pool: public/deja-vu/cat-gif.gif, coding-the-matrix.gif, matrix-cat-still.jpg, matrix4-cat.webp, matrix-cat.webp
- cleanup: giphy.gif removed from active rotation and no longer used by the feature
## V2 WHITE RABBIT UPDATE COMPLETE
- feature: added a White Rabbit hover reveal to the Blue Pill RED PILL button in the navbar
- implementation: components/blue/Navbar.tsx now shows a small floating panel on hover with rabbit imagery and the line "Wake up, Recruiter..."
- asset: rabbit_matrix.jpg copied to public/easter-eggs/rabbit-matrix.jpg for reliable app serving
- behavior: hover reveals the rabbit cue, while click behavior for RED PILL remains unchanged and still switches to red mode
## SYNC UPDATE 2026-05-26
- note: older sections in this file still contain historical logs, duplicate phase notes, and encoding damage; this sync block is the current authoritative snapshot
- overall state: core Phase 0-8 portfolio build is functionally complete and live in local development
- backend state: Supabase + Prisma contact persistence is active, GitHub status API is live, Slack contact notifications are active, and pill-choice cookie routing is active
- blue contact state: Blue Pill now has a working recruiter-friendly contact section wired to the same `/api/contact` backend path as Red Pill
- 404 state: 404 recovery now routes directly to `/portfolio` with `[ RETURN TO MAINFRAME ]`
- docs state: immutable UI source-of-truth created at `APP_UI_VIBE_MANIFEST.md`
- review state: gap review created at `tasks/phase_0_8_gaps.md`
- v2 planning state: follow-up Matrix enhancement backlog created at `tasks_v2/matrix_v2_priority_backlog.md`
- v2 feature state: Blue Pill now uses `components/blue/HeroDejaVu.tsx` as an A/B-safe hero variant with recurring deja-vu anomalies on a `2s -> 4s -> 8s -> 16s -> 16s...` cadence
- v2 assets: curated deja-vu visual pool served from `public/deja-vu/` with `cat-gif.gif`, `coding-the-matrix.gif`, `matrix-cat-still.jpg`, `matrix4-cat.webp`, and `matrix-cat.webp`
- v2 navbar state: Blue Pill RED PILL button now includes a White Rabbit hover reveal using `public/easter-eggs/rabbit-matrix.jpg` and the line `Wake up, Recruiter...`
- rollback safety: original `components/blue/Hero.tsx` is still preserved and the current Blue Hero V2 path remains reversible

## CONTENT + SKILLS + EXPERIENCE UPDATE COMPLETE
- Added real skills data (9 categories) � components/blue/SkillsSection.tsx + components/red/SkillsSection.tsx
- Added work experience (6 jobs) � components/blue/ExperienceSection.tsx + components/red/ExperienceSection.tsx
- Updated real certifications in both CertsSection.tsx (AWS SA, NVIDIA GenAI, Azure Fundamentals, NDG Linux)
- Wired Experience + Skills into app/portfolio/page.tsx for both modes
- Fixed Blue navbar: Skills now anchors to #skills, added Experience link
- Fixed Red terminal form: invalid email shows error msg instead of silent clear
- Added components/red/Footer.tsx (was missing)
- Deleted public/deja-vu/giphy-cat.gif (12.7MB unused file)
- Verified: tsc --noEmit ? 0 errors

## V2 TASKS LOG (2026-05-26 / 2026-05-27)

### V2 TASK: There Is No Spoon text warp COMPLETE
- method: created components/shared/NoSpoonText.tsx � mouse-proximity repel using translate+skewX+scaleY
- wired: components/blue/HeroDejaVu.tsx wraps subtitle 'Full-Stack Engineer & Cloud Practitioner'
- tsc: 0 errors

### V2 TASK: Knock Knock Neo terminal intro COMPLETE
- method: created components/red/KnockKnockTerminal.tsx � 3 self-typing lines with useTypewriter hooks
- timing: Wake up Recruiter (600ms) -> The Matrix has you (2200ms) -> Follow the white rabbit (3900ms)
- rabbit anchor fades in after last line completes, links to #experience
- wired: app/portfolio/page.tsx between RedHero and RedExperience
- tsc: 0 errors

### V2 TASK: Red project card Mainframe Dossier styling COMPLETE
- method: rebuilt components/red/ProjectCard.tsx � amber top border, corner cut, dossier ID, gradient divider, amber tech tags, glow hover
- kept: scramble + tilt logic intact
- tsc: 0 errors

### V2 TASK: globals.css broken shadcn import FIXED
- issue: another AI added @import 'shadcn/tailwind.css' + @import 'tailwindcss' + @layer base blocks
- fix: stripped all shadcn/tailwind imports and @layer base; kept only Matrix Portfolio custom CSS
- tsc: 0 errors

### V2 TASK: Phone booth exit COMPLETE
- method: rebuilt components/red/Navbar.tsx � DISCONNECT triggers 1.8s overlay: expanding ring, scanlines, boot text lines, white flash
- also fixed: Red nav now includes OPS (experience) link
- tsc: 0 errors

### V2 TASK: Neo-dodge ghost trail COMPLETE
- method: upgraded lib/useTilt.ts � main card 60ms, ghost1 140ms, ghost2 220ms via CSS transition lag
- wired: 2 absolute ghost layers in components/red/ProjectCard.tsx with opacity 0.15 and 0.07
- tsc: 0 errors

### V2 TASK: Residual Self-Image skill node map COMPLETE
- method: rebuilt components/red/SkillsSection.tsx � SVG connector lines + node buttons at fixed % positions
- interaction: hover node -> lines light up -> skills load in readout panel below via AnimatePresence
- nodes: LANGUAGES, FRONTEND, BACKEND, AI/ML, CLOUD+DEVOPS, DATABASES, INFRA+SECURITY, TOOLS
- tsc: 0 errors

### V2 TASK: Keymaker hidden project unlock COMPLETE
- method: rebuilt components/red/ProjectsGrid.tsx � keydown listener for secret word 'zion'
- effect: green flash overlay -> 6th project 'GraphRAG Fault Intelligence' fades in with amber badge
- hint text: '// not all files are visible to every operator' (visible, subtle)
- tsc: 0 errors

### V2 TASK: Mainframe Traffic Monitor dashboard COMPLETE
- method: app/api/pageview/route.ts � POST records visit (page=red/blue, device), GET returns stats
- tracking: app/portfolio/page.tsx fires POST on mount per mode (deduped via useRef)
- dashboard: app/mainframe/page.tsx � stat boxes, animated pill bars, live operator log (last 20 visits)
- access: hidden '// operator_access' link in components/red/Footer.tsx
- fix: prisma named import (not default) in pageview route
- tsc: 0 errors

### V2 TASK: Oracle's Kitchen interactive skills mutation COMPLETE
- method: rebuilt components/red/SkillsSection.tsx with 3-state system: hover / clicked / mutatedSkill
- mutation on click: section background tint + accent color changes per node (8 unique mutation profiles)
- skill click: micro-highlight flashes individual skill with section accent color
- Oracle quote: animates in below readout panel on any node click
- node-specific flavour lines appear in readout when clicked
- SVG edges thicken + recolor to node accent on click
- tsc: 0 errors

### V2 TASK: Audio-reactive environmental layer COMPLETE
- method: lib/useMatrixAudio.ts � Web Audio API only, no external files
- sounds: sub-bass drone (36Hz + 72Hz overtone), key-strike noise burst, EMP reset blast
- OFF by default; lazy AudioContext init on first enable
- AudioToggle: components/red/AudioToggle.tsx � animated 5-bar EQ in navbar
- nav links: trigger strike() on hover (only when audio on)
- DISCONNECT: triggers emp() before phone booth exit animation
- tsc: 0 errors

### V2 TASK: Liquid mirror transition COMPLETE
- method: added 4 ripple rings (120?540px) + diagonal shimmer sweep inside TheConstruct.tsx overlay
- all new elements: aria-hidden, pointerEvents:none, purely additive
- core transition logic (TEXT, typewriter, onComplete, AnimatePresence) UNTOUCHED
- effect: white overlay now opens with concentric mirror-touch rings + light sweep
- tsc: 0 errors

### V2 TASK: Architect's Room analytics wall COMPLETE
- method: app/architect/page.tsx � 4-column screen grid, mock data only
- screens: total visits, avg session, return rate, mobile share, pill choice bars, traffic sources, 24h bar chart, project rankings, event log
- live ticker: cycles mock events every 2.2s via useEffect/useState
- all data in MOCK object at top � API-ready for future swap
- linked from: /mainframe footer + /architect footer nav
- tsc: 0 errors

### V2 TASK: Task 14 - Interactive live operator console COMPLETE
- method: created components/shared/OperatorConsole.tsx � shared animated event stream
- 12 event categories: PILL_SWITCH, PAGE_NAV, REPO_CLICK, CONTACT_INIT, CONTACT_SENT, KEYMAKER, SKILLS_CLICK, AUDIO_TOGGLE, DISCONNECT, RECONNECT, NODE_HOVER
- seeds 12 realistic history events on mount, generates new events every 2-5s (random jitter)
- category filter toolbar + pause/resume control
- color-coded by event type, fade+slide-in via AnimatePresence
- auto-scrolls to bottom on new event (when not paused)
- wired into: app/mainframe/page.tsx (280px, 50 events) + app/architect/page.tsx (200px compact, 60 events)
- replaced: static recent log in mainframe, LiveTicker + static event grid in architect
- future: swap EVENT_POOL for GET /api/operator-events response
- tsc: 0 errors

### V2 TASK: Task 17 - Bullet-time 3D freeze section COMPLETE
- method: components/red/BulletTimeSection.tsx � self-contained, triggers once on scroll into view
- rain: canvas rain loop with speed ref (1.0 ? 0.015 deceleration, then resumes)
- 3D element: CSS perspective + rotateY sweep (-55� ? 0� ? +55�) + 2 concentric spinning rings
- text sequence: 4 lines with staggered delays, blur-to-clear reveal
- phase system: idle ? slowing ? frozen ? resuming ? done (timed setState sequence)
- mounted: between RedSkills and RedCerts in app/portfolio/page.tsx
- tsc: 0 errors

### V2 TASK: Task 16 - Matrix webcam filter COMPLETE
- method: components/red/MatrixCamSection.tsx � browser-local canvas only
- permission states: idle / requesting / granted / denied / unsupported
- cam filter: 10x10 block pixel sampling -> luminance -> character density mapping in Matrix green
- video mirrored (selfie mode), scanline overlay applied
- fallback: NoiseFallback (animated noise canvas char-grid) + ACCESS DENIED panel with RETRY
- icons: lucide-react Video/VideoOff/RefreshCw/Eye (no emoji)
- controls: DISCONNECT button stops all tracks and resets to idle
- mounted: between NebuchadnezzarStatus and TerminalContactForm in app/portfolio/page.tsx
- docs: tasks_v2/v2_to_do_pending_UI.md updated with Task 16 section + future integration notes
- tsc: 0 errors

### V2 TASK: Task 15 Rework - Architect's Room cinematic cylinder COMPLETE
- method: app/architect/page.tsx � full rewrite
- spatial model: pseudo-3D CSS cylinder (transformStyle:preserve-3d)
  - 12 wall panels, each rotateY(N*30deg) translateZ(560px)
  - Perspective 850px, perspectiveOrigin 50% 44%
  - Pointer drag changes cylinder rotateY � 360 degrees is native wraparound
  - White door (panel 0): white rect overlay, multi-layer glow, bottom-anchored
- Monitors: 5x5 grid (25 per panel) = 300 total across the room
  - Types: bar/text/signal/anomaly/dark � all static CSS-animated, no JS intervals
  - backfaceVisibility: hidden on panels � only ~6 visible at a time (perf)
- Webcam integration:
  - getUserMedia ? single hidden video element
  - BFS wave: 4 monitors added every 320ms outward from panel 0
  - Each cam tile: canvas RAF drawing from shared video + green tint + scanlines
  - ON badge: live monitor count display (X / 300 MONITORS ACQUIRED)
  - Disconnect: clears all cam tiles + stops stream tracks
- Navigation: back links to /mainframe and /portfolio
- backend: NO changes - app/api/*, prisma, middleware all untouched
- tsc: 0 errors

### V2 BLUE PILL: Task 1 + Task 2 COMPLETE

**Task 1 � Blue Pill Live GitHub Status**
- new: components/blue/GitHubStatusSection.tsx
- fetches GET /api/github-status (existing route, no backend change)
- displays: repo name, commit message, time_ago, avatar, CTA link
- states: shimmer skeleton loading, graceful error/empty fallback, live data
- trackOperatorEvent wired: REPO_CLICK on CTA and fallback profile link
- mounted: between BlueCerts and BlueContactForm21st in app/portfolio/page.tsx
- design: clean white/slate/blue palette, no Matrix/terminal styling

**Task 2 � Blue Pill Operator Event Tracking**
- HeroDejaVu.tsx: PAGE_NAV on LinkedIn click, REPO_CLICK on GitHub click
- ProjectCard.tsx: REPO_CLICK on GitHub repo link, REPO_CLICK on live/demo link (with project name + destination in metadata)
- Navbar.tsx: PILL_SWITCH (blue-to-red) fires before onSwitchMode, metadata: { mode: red, source: blue_toggle }
- ContactForm21st.tsx: CONTACT_INIT on first field focus (deduped via useRef), CONTACT_SENT on successful submit with company metadata
- GitHubStatusSection.tsx: REPO_CLICK on both CTA and fallback links
- no new API routes, no backend changes, all lightweight fire-and-forget
- tsc: 0 errors

### V2 BLUE PILL: Full Visual Rework COMPLETE � 2026-05-28

**Structural changes:**

app/portfolio/page.tsx
- Blue branch restructured: BlueNavbar as fixed-positioning sibling, all Blue sections wrapped in <div id="blue-stage">
- Red branch and TheConstruct: untouched

app/globals.css
- Appended Blue Pill layout shell (scoped to .mode-blue � zero Red bleed):
  #blue-rail (fixed 220px left column, z-50), #blue-stage (margin-left: 220px), bp-panel-a/b/c surfaces,
  bp-label token, bp-pulse-dot LIVE ring animation, bp-sweep underline-hover link, mobile collapse rules

components/blue/Navbar.tsx � FULL REWRITE
- Fixed vertical left rail (220px, full-height, z-50)
- Identity: KD. wordmark, subtitle, separator line
- Nav list: ABOUT EXPERIENCE PROJECTS SKILLS SHIPPING CONTACT � vertical, uppercase
- Active indicator: border-left 2px solid blue-600 per item driven by IntersectionObserver (threshold 0.25, no scroll-snap)
- RED PILL toggle at bottom (trackOperatorEvent PILL_SWITCH preserved)
- Mobile: top bar (#blue-mobile-bar, CSS-shown at <768px) + full-screen overlay (z-200)

components/blue/HeroDejaVu.tsx � REWORK
- Two-column layout (55/45 split): left col = name/title/bio/CTAs, right col = tilted frosted glass frame
- Deja-vu images contained inside tilted frame � designed container vs arbitrary float
- All deja-vu state/timer logic preserved
- GitHub + LinkedIn onClick tracking preserved

components/blue/ExperienceSection.tsx � REWORK
- Surface B, min-height 100vh, bp-label eyebrow, editorial H2
- Vertical timeline: 1px #E2E8F0 spine, 8x8px square blue-600 dot markers (precision over circles)
- Period dates in JetBrains Mono, no card wrappers

components/blue/ProjectCard.tsx � REWORK
- Two variants via featured prop:
  FeaturedCard: glass surface (rgba 0.88 + blur), useTilt retained, large title, bp-sweep links
  StandardCard: white surface, border-left 3px blue-600 activates on hover at 140ms, no tilt
- All trackOperatorEvent calls preserved

components/blue/ProjectsGrid.tsx � REWORK
- Surface C, min-height 100vh, bp-label eyebrow
- Featured first project (DICOM) in FeaturedCard full-width
- Remaining 4 in auto-fill 2-col grid

components/blue/SkillsSection.tsx � REWORK
- Surface A, min-height 100vh, bp-label eyebrow
- 9 skill categories in auto-fill 3-col grid
- Plain-text lists per category (no pill badges), primary skills larger/bolder
- Category label: uppercase blue-600 + thin bottom border separator

components/blue/CertsSection.tsx � DEMOTED
- Compact horizontal strip with minimal typography
- Flat-dot square markers, cert name + issuer � year inline
- No card grid, no min-height panel

components/blue/GitHubStatusSection.tsx � VISUAL UPGRADE
- id="shipping" (matches left nav SHIPPING label)
- Left 3px blue-600 accent bar on card (borderLeft + 0 border-radius on left side)
- bp-pulse-dot LIVE ring shows next to label when data is loaded
- Commit message: 'commit' label in JetBrains Mono + message text
- CTA: plain bp-sweep text link instead of pill button
- All fetch() and trackOperatorEvent() calls untouched

components/blue/ContactForm21st.tsx � REWORK
- Surface A, id="contact"
- Left column: white background, large '&' ampersand watermark in #EFF6FF (z-indexed behind text)
- Right column: white form card, fields with border-radius 12px + blue focus ring box-shadow
- All trackOperatorEvent wiring preserved (CONTACT_INIT via useRef, CONTACT_SENT, LinkedIn)
- /api/contact fetch intact

components/blue/Footer.tsx � REWORK
- Ultra-minimal single row: KD. c YYYY left, 'Made with intention...' right
- Surface B, 1px top border, 24px vertical padding

design-system/BLUE_MASTER.md � CREATED
- Full 12-section design system doc: concept, layout shell, z-index contract, surface system, color tokens, typography, spacing, shadows/radii, motion rules, component behavior rules, anti-slop rules, file ownership, backend integration notes

tsc: 0 errors
Backend: GET /api/github-status, POST /api/contact, POST /api/operator-events � all untouched
Red Pill: structurally untouched, zero bleed from Blue CSS rules
