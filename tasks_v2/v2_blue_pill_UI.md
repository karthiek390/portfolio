# V2 Blue Pill UI

Date: 2026-05-28
Scope: Blue Pill only
Rule: UI first, grounded real-world presentation only

## Context

Blue Pill represents the real-world / recruiter-friendly version of the portfolio.

Do not bring Matrix-fiction-heavy Red Pill features into Blue Pill.

Not wanted in Blue Pill:
- `Knock Knock Terminal`
- `Bullet Time`
- `Matrix Cam`
- `Keymaker hidden unlock`
- `Phone Booth disconnect experience`
- `Audio preference persistence`

Blue Pill should stay:
- clean
- professional
- readable
- high-trust
- slightly premium, but not cinematic in a sci-fi way

## Goal

Add the missing Blue Pill UI for features that already have backend support or tracking support available now.

Current Blue Pill priorities:

1. Live GitHub Status
2. Operator Event Tracking for Blue-only interactions

Important:
- if a backend route or DB table already exists, reuse it
- if the UI needs to be added now but hookup is easier later, structure the component clearly so wiring can be added with minimal changes
- do not invent new API routes unless absolutely necessary

## Do Not Touch

- `prisma/*`
- `lib/prisma.ts`
- `.env*`
- DB schema
- existing Red Pill UI unless a shared helper is genuinely needed

Safe areas:
- `components/blue/*`
- `app/portfolio/page.tsx`
- shared click handlers only if needed
- shared event helper usage via existing `lib/operator-events.ts`

## Existing Backend / Data You Can Reuse

### 1. GitHub status API already exists

Route:
- `GET /api/github-status`

Current purpose:
- returns latest GitHub push activity for the configured GitHub username

Response shape today:

```ts
{
  repo: string;
  message: string;
  time_ago: string;
  url: string;
  avatar_url: string;
}
```

Relevant files:
- `app/api/github-status/route.ts`
- `components/red/NebuchadnezzarStatus.tsx`

Blue Pill should not reuse Red Pill styling, but it can reuse the same data contract.

### 2. Operator event tracking API already exists

Route:
- `POST /api/operator-events`

Helper:
- `trackOperatorEvent(...)` from `lib/operator-events.ts`

Relevant files:
- `lib/operator-events.ts`
- `app/api/operator-events/route.ts`
- Red Pill examples in:
  - `components/red/SkillsSection.tsx`
  - `components/red/Navbar.tsx`
  - `components/red/TerminalContactForm.tsx`

Blue Pill should reuse the same event pipeline wherever appropriate.

## Task 1 - Blue Pill Live GitHub Status UI

Status: complete
Priority: high

### Objective

Create a Blue Pill version of the live GitHub status panel using the existing `/api/github-status` route.

This should feel like a polished professional “current work” section, not a terminal or diagnostics panel.

### Suggested section intent

Possible framing:
- `Current Work`
- `Latest GitHub Activity`
- `What I'm Shipping`
- `Recent Engineering Activity`

Choose one tone and keep it consistent with Blue Pill.

### UI requirements

Build a new Blue component, likely something like:
- `components/blue/GitHubStatusSection.tsx`

The section should show:
- section title
- short supporting text
- latest repo name
- latest commit message
- relative timestamp
- link to view the commit or repo
- optional avatar if it helps the layout

The section should also have:
- loading state
- graceful error state
- polished empty/fallback state if API data is unavailable

### Design direction

Use Blue Pill language and styling:
- white / slate / blue palette
- high readability
- card or split-panel layout is okay
- crisp typography
- subtle depth, not glowing sci-fi chrome
- avoid terminal framing, scanlines, green text, hacker labels

Possible tone:
- “Here’s what I’ve been working on recently.”
- “A quick signal that I’m actively building and shipping.”

### Data hookup

Use:
- `fetch("/api/github-status")`

Do not change the backend unless the current response shape forces it.

If you want to keep the component implementation UI-first, that is acceptable, but preserve a very obvious integration point around this shape:

```ts
type GitHubStatus = {
  repo: string;
  message: string;
  time_ago: string;
  url: string;
  avatar_url: string;
};
```

### Placement

Recommended placement on Blue Pill:
- after Certifications
- or before Contact

Goal:
- make the portfolio feel active and current without interrupting the normal recruiter reading flow

### AI implementation prompt

```text
Implement a new Blue Pill UI section for live GitHub activity.

Context:
- This is for the Blue Pill side of a Matrix-themed portfolio, but Blue Pill must stay real-world, polished, and recruiter-friendly.
- Do not use terminal UI, hacker styling, green-glow Matrix aesthetics, or any Red Pill visual language.
- There is already an existing backend route: GET /api/github-status
- Existing response shape:
  {
    repo: string;
    message: string;
    time_ago: string;
    url: string;
    avatar_url: string;
  }
- The Red Pill already has a GitHub status section, but do not copy its styling. Build a Blue-specific design.

Task:
- Create a new component for Blue Pill, such as components/blue/GitHubStatusSection.tsx
- Add it to the Blue Pill portfolio page in a sensible place
- Show:
  - section heading
  - supporting copy
  - latest repo
  - latest commit message
  - relative time
  - CTA link to the commit/repo
- Include:
  - loading state
  - error state
  - tasteful empty/fallback state

Design requirements:
- clean, premium, professional
- white/slate/blue palette
- strong readability
- subtle depth and good spacing
- no Matrix-fiction visuals

Code requirements:
- use the existing /api/github-status route
- keep the component easy to maintain
- do not modify backend or DB code unless strictly necessary
```

## Task 2 - Blue Pill Operator Event Tracking

Status: complete
Priority: high

### Objective

Instrument Blue Pill interactions using the existing operator event pipeline so Blue-side engagement can be tracked without introducing Red Pill styling.

This is behavior work, not a visible sci-fi feature.

### Existing tracking helper

Use:

```ts
trackOperatorEvent({
  type,
  detail,
  page,
  metadata,
});
```

From:
- `lib/operator-events.ts`

Existing backend route:
- `POST /api/operator-events`

### What should be tracked on Blue Pill

Track the interactions that matter most:

1. GitHub profile click
- Hero GitHub button

2. LinkedIn click
- Hero LinkedIn button
- any other Blue Pill LinkedIn CTA if present

3. Project repository clicks
- GitHub links inside Blue project cards

4. Project live/demo clicks
- external live/demo links inside Blue project cards

5. Contact form start
- first meaningful interaction with the Blue contact form
- example: first field focus or first user input

6. Contact form submit
- successful or attempted submission, depending on implementation

7. Switch from Blue to Red
- when user clicks the Blue Pill toggle into Red mode

Optional only if Blue skills become interactive later:
- skill click tracking

### Event design guidance

Keep the existing event schema style, but write Blue-appropriate details.

Examples:
- `type: "REPO_CLICK"` with metadata `{ project: "DICOM Local Viewer", mode: "blue" }`
- `type: "CONTACT_INIT"` with metadata `{ mode: "blue" }`
- `type: "CONTACT_SENT"` with metadata `{ company: "...", mode: "blue" }`
- `type: "PILL_SWITCH"` with metadata `{ mode: "red", source: "blue_toggle" }`

Do not invent a separate Blue-specific tracking system unless necessary.

### UI requirement

This task does not need a visible new section.

It needs event wiring in the existing Blue components:
- `components/blue/Hero.tsx` or `HeroDejaVu.tsx`
- `components/blue/ProjectsGrid.tsx`
- `components/blue/ProjectCard.tsx`
- `components/blue/ContactForm21st.tsx`
- `components/blue/Navbar.tsx`
- any new GitHub status section if it includes outbound links

### AI implementation prompt

```text
Add operator event tracking for Blue Pill interactions using the existing event pipeline.

Context:
- Blue Pill is the real-world / recruiter-friendly side of the portfolio
- No new visible sci-fi UI is needed for this task
- There is already an existing helper: trackOperatorEvent(...) in lib/operator-events.ts
- There is already an existing backend route: POST /api/operator-events
- Reuse the current tracking pipeline rather than inventing a new one

Task:
- Instrument Blue-only user interactions with trackOperatorEvent

Track these interactions:
1. Hero GitHub click
2. Hero LinkedIn click
3. Blue project repo clicks
4. Blue project live/demo clicks
5. Blue contact form first interaction / start
6. Blue contact form submit
7. Blue -> Red pill switch click
8. Any outbound click in the new Blue GitHub status section if applicable

Implementation guidance:
- keep the tracking clean and lightweight
- avoid duplicate firing where possible
- include useful metadata such as:
  - mode: "blue"
  - project name
  - destination type
  - company on contact submit if appropriate
- do not change the backend route unless absolutely necessary
- do not add visible tracking UI to Blue Pill

Code targets likely include:
- components/blue/HeroDejaVu.tsx
- components/blue/ProjectsGrid.tsx
- components/blue/ProjectCard.tsx
- components/blue/ContactForm21st.tsx
- components/blue/Navbar.tsx
- the new Blue GitHub status section
```

## Recommended Build Order

1. Build Blue Pill Live GitHub Status UI
2. Wire Blue Pill operator event tracking into existing components
3. Add tracking to the new GitHub status section if it includes outbound links

## Success Criteria

Blue Pill should gain:
- one polished live activity section powered by the existing GitHub API
- clean analytics wiring for important recruiter-facing interactions

Blue Pill should not gain:
- Matrix-fiction-heavy UI
- terminal gimmicks
- hidden secrets
- red-mode behavioral patterns

## Final Reminder For AI

If implementing from this file:
- preserve Blue Pill as the real-world mode
- reuse existing API routes first
- prefer UI additions and event wiring over backend invention
- keep the experience elegant, calm, and recruiter-friendly

---

## Blue Pill Visual Rework Blueprint

Date: 2026-05-28
Status: Design complete — pending Codex implementation
Scope: Blue Pill UI restructure only. No API, DB, or backend changes.

---

### Architectural Direction

Layout: Fixed Left-Rail Editorial Spine + Right-Stage Content Frames.

A fixed 220px left column acts as the typographic identity anchor for the entire page. All content lives in a right-side scroll stage. The left rail never scrolls and holds: name, subtitle, nav labels, active section marker, and the RED PILL toggle. This creates permanent spatial tension between the static identity column and the scrolling content reality. This is Blue Pill as The Illusion — corporate-designed, authoritative, and seductively polished.

---

### Layout Shell Summary

`
[fixed left 220px] | [right stage, remaining width, margin-left: 220px]
      ↓                         ↓
 Identity + Nav          Full-height section panels (min-height: 100vh)
 never scrolls           scroll natively, alternating surfaces
`

Desktop: right stage content max-width 840px. Left offset 64px from stage edge. Intentional empty right margin.
Mobile (<768px): left rail collapses. Top bar 56px with wordmark + hamburger. Full-screen overlay nav.

---

### Left Rail Navigation Structure

- position: fixed; left: 0; top: 0; width: 220px; height: 100vh
- Background: #FFFFFF, right border 1px solid #E8EEF4
- Top: KD. wordmark, Inter Black, 1.4rem, #0F172A
- Subtitle: Full-Stack Engineer, Inter Regular, 0.68rem, #94A3B8, tracking 0.1em
- Nav list (vertical): uppercase labels — ABOUT · EXPERIENCE · PROJECTS · SKILLS · SHIPPING · CONTACT
  - Font: Inter SemiBold, 0.82rem, tracking 0.12em, uppercase
  - Idle color: #475569, hover: #2563EB
  - Hover transition: color shift + 2px solid #2563EB left bar slides in, 140ms
- Active section marker: 2px × 20px #2563EB bar slides vertically with IntersectionObserver, 	ransition: top 220ms ease
- Bottom: version label 2.0 in #CBD5E1, small · RED PILL button above it

---

### Right-Side Content Frame Structure

Three alternating surface treatments — never same twice in a row:
- Surface A: #FFFFFF — pure white
- Surface B: #F8FAFC — slate-50 wash
- Surface C: linear-gradient(160deg, #F8FAFC 0%, #EFF6FF 100%) — pale blue gradient

Each section: full-width panel, min-height: 100vh, sharp edges (order-radius: 0 at panel level), internal content max-width 840px.

Section ordering: ABOUT → EXPERIENCE → PROJECTS → SKILLS → CERTIFICATIONS → SHIPPING → CONTACT → FOOTER

---

### Visual Token Recommendations

**Colors:**
- Primary accent: #2563EB (blue-600) — CTAs, active markers, labels only
- Headline: #0F172A (slate-900)
- Body: #475569 (slate-600)
- Secondary: #94A3B8 (slate-400)
- Surface wash: #F8FAFC (slate-50)
- Blue wash: #EFF6FF (blue-100)
- Border: #E2E8F0 (slate-200)
- Glass: gba(255,255,255,0.72) + ackdrop-filter: blur(12px)

**Typography:**
- Display: Inter Black (900), 56–80px, tracking -0.04em
- H2: Inter Bold (700), 28–36px, tracking -0.02em
- Body: Inter Regular (400), 0.95rem, line-height 1.75
- Label: Inter Bold (700), 0.72rem, tracking 0.14em, uppercase, blue-600
- Nav: Inter SemiBold (600), 0.82rem, tracking 0.12em, uppercase
- Mono (commit messages only): JetBrains Mono

**Shadow:**
- card:    2px 16px rgba(15,23,42,0.06)
- float:   8px 40px rgba(15,23,42,0.10)
- blue:    8px 28px rgba(37,99,235,0.18)

**Radii:**
- Panels:  px — sections and structural chrome
- Cards: 12–16px
- Buttons: 999px (pill)
- Tags: 6px

**Motion:**
- Hover: 180ms, cubic-bezier(0.16,1,0.3,1)
- Enter: opacity 0→1 + translateY 12→0, 320ms, staggered per element
- Nav marker: 	op transition 220ms ease
- No springs, no bounces, no scale on hover

---

### Section-by-Section UI Change Plan

**Navbar → Left Rail** (components/blue/Navbar.tsx)
Full rewrite from horizontal sticky to fixed vertical left rail. Remove tooltip popup, horizontal layout, and all desktop nav behavior. Add vertical nav list, active marker, version badge, and small RED PILL toggle at bottom of rail.

**Hero** (components/blue/HeroDejaVu.tsx)
Two-column layout within Surface A panel. Left 55%: Display name, title, bio, LinkedIn + GitHub CTAs. Right 45%: a tilted frosted glass frame otate(-6deg) containing the deja-vu cat images — removes the arbitrary float, gives the easter egg a designed container. Keep all existing deja-vu logic.

**Experience** (components/blue/ExperienceSection.tsx)
Surface B panel. Vertical timeline with a 1px #E2E8F0 spine. Each entry: 8×8px square blue-600 dot marker, company + role + date on right. No card borders. Square dots signal precision over softness.

**Projects** (components/blue/ProjectsGrid.tsx + ProjectCard.tsx)
Surface C panel. Featured first project: full-width editorial card (glass surface, wide layout, large title). Remaining: 2-col grid. Remove tilt from standard cards. Hover activates order-left: 3px solid #2563EB instead. Keep useTilt on featured card only.

**Skills** (components/blue/SkillsSection.tsx)
Surface A panel. 2×2 category group layout. Plain-text skill lists per category. No pill badges. Uppercase category label (blue-600) above each group. Structured like a capabilities sheet.

**Certifications** (components/blue/CertsSection.tsx)
Demote to horizontal inline strip within or below the Skills panel — no dedicated full-height section. Minimal: CERT · ISSUER · YEAR per entry. 24px grayscale logo, color on hover.

**GitHub Status / Shipping** (components/blue/GitHubStatusSection.tsx)
Surface B. Keep all fetch logic and 	rackOperatorEvent wiring — do not touch data layer. Upgrade visuals: left 3px solid #2563EB accent bar on card, LIVE pulse dot (6px blue circle, CSS ring animation), plain text link CTA with underline-sweep instead of pill button. Section label = SHIPPING.

**Contact** (components/blue/ContactForm21st.tsx)
Surface A. Left column becomes typographic — white background, no dark gradient, large & ampersand watermark in #EFF6FF behind headline. Right column: form with order-radius: 12px fields, blue focus ring ox-shadow: 0 0 0 3px rgba(37,99,235,0.12). Keep all 	rackOperatorEvent wiring (CONTACT_INIT, CONTACT_SENT).

**Footer** (components/blue/Footer.tsx)
Ultra-minimal. #F8FAFC, 1px solid #E2E8F0 top border. Single row: KD. © 2025 left · Made with intention, not templates. right. 24px vertical padding. No social icons.

---

### Anti-Slop Rules

1. No equal-weight cards. One element per section must be visually dominant.
2. Left rail is sacred. Nothing overlaps or visually competes with it.
3. No rounded panels at section level. order-radius: 0 for structural containers.
4. No icon-heavy UI. Icons ≤16px, monochrome, text label required nearby.
5. Typography carries the hierarchy. Never use a colored background to signal importance — use type weight, size, and color instead.
6. Hover states respond in ≤180ms. No sluggish transitions on interactive elements.
7. Blue-600 is accent only. Never as a fill background except the primary CTA button.
8. No generic SaaS gradient banners. No linear-gradient(135deg, #2563EB, #7C3AED) on any hero or section background.
9. Left-align everything. No center-aligned headlines or body copy within content areas.
10. White space is structural. The intentional empty right margin must remain. If content bleeds to the viewport right edge, the layout has failed.

---

### File-by-File Implementation Checklist

| File | Change |
|------|--------|
| components/blue/Navbar.tsx | Full rewrite → fixed vertical left rail |
| components/blue/HeroDejaVu.tsx | Two-column layout, tilted deja-vu frame |
| components/blue/ExperienceSection.tsx | Vertical timeline spine, square markers |
| components/blue/ProjectCard.tsx | Remove tilt from standard, add hover border-left |
| components/blue/ProjectsGrid.tsx | Featured first card full-width, 2-col remainder |
| components/blue/SkillsSection.tsx | Category-group plain-text list, remove badge pills |
| components/blue/CertsSection.tsx | Inline horizontal strip, minimal typography |
| components/blue/GitHubStatusSection.tsx | Left accent bar, LIVE pulse dot, plain link CTA |
| components/blue/ContactForm21st.tsx | White left column, ampersand watermark, blue focus ring |
| components/blue/Footer.tsx | Ultra-minimal single row |
| pp/portfolio/page.tsx | Add margin-left: 220px wrapper div for blue mode right stage |
| pp/globals.css | Left-rail tokens, panel surface classes, active-marker slide animation |

---

### Reusable API and Backend Pieces (No Changes Required)

The following backend routes must remain completely untouched and are reusable as-is after the visual rework:

- GET /api/github-status → powers GitHubStatusSection.tsx — no change needed
- POST /api/operator-events via lib/operator-events.ts → all 	rackOperatorEvent calls from Task 2 remain wired and valid after rework
- POST /api/contact → powers ContactForm21st.tsx submit — no change needed
- GET /api/github-status response shape (epo, message, time_ago, url, avatar_url) remains the contract

All tracking events from Task 2 (CONTACT_INIT, CONTACT_SENT, REPO_CLICK, PAGE_NAV, PILL_SWITCH) survive the rework unchanged because they are wired to user interactions, not visual structure.

---

### Final Guardrails and Codex Implementation Notes

Date finalized: 2026-05-28
Source: Second architectural pass — user confirmed guardrails

---

#### Blue-Only Shell Scoping

The fixed left-rail and right-stage offset must apply ONLY to Blue Pill mode.

In app/portfolio/page.tsx, the Blue branch (!isRed) must render:
1. BlueNavbar — a fixed left-rail sibling, NOT inside the stage wrapper
2. <div id="blue-stage"> with margin-left: 220px, position: relative — wraps all Blue content sections
3. The Red branch (<>) remains a flat fragment with zero margin offset and zero rail. Do not touch it.
4. TheConstruct renders outside both branches. Do not move it.

No global layout or body-level margin changes. Scoping is purely conditional inside the !isRed branch.

---

#### Z-Index Contract (explicit, no accidental stacking)

Layer               | Element                          | z-index
--------------------|----------------------------------|--------
Base                | Right-stage content panels       | 0 (flow)
Decorative          | Glass overlays, hero shapes      | 1
Rail                | Fixed left rail (BlueNavbar)     | 50
Mobile overlay      | Full-screen hamburger nav        | 200
Transition          | TheConstruct pill transition     | 500 (already set — do not touch)

No Blue stage element may exceed z-index 100 except the mobile nav overlay (200).
TheConstruct at 500 always wins. Never reassign its z-index.

---

#### No Scroll Snapping (default)

Do NOT add scroll-snap-type to the page or any section.
The left-rail active section indicator works via IntersectionObserver only.
- Observer threshold: 0.3 (section active when 30%+ in viewport)
- Each section must carry a stable id: #about, #experience, #projects, #skills, #shipping, #contact
- BlueNavbar receives activeSection prop or manages its own observer internally
- Marker top position: computed from the active nav item's offsetTop within the rail list
- Marker transition: CSS top 220ms ease

Natural scroll must be preserved. Scroll snapping is only permissible as a future optional enhancement confirmed by the user.

---

#### Mobile Collapse Rules

Breakpoint: width < 768px

At mobile:
- Left rail: hidden (display:none or translateX(-220px))
- #blue-stage: margin-left collapses to 0
- Top bar: 56px fixed, wordmark left, hamburger right, z-index 50
- Hamburger opens full-screen overlay: position fixed, inset 0, z-index 200, background #FFFFFF
- Overlay nav list: vertically centered, 2rem gap, 1.4rem SemiBold labels
- Overlay closes on nav click or X button
- Overlay is above all content (z-200), below TheConstruct (z-500)
- All Blue CSS must be scoped to .mode-blue or #blue-stage to prevent Red mode bleed

---

#### Section Surface Assignment (final confirmed order)

Section                     | Surface  | Background
----------------------------|----------|-----------------------------------------
ABOUT (Hero)                | A        | #FFFFFF
EXPERIENCE                  | B        | #F8FAFC
PROJECTS                    | C        | linear-gradient(160deg,#F8FAFC,#EFF6FF)
SKILLS + CERTS (merged)     | A        | #FFFFFF
SHIPPING (GitHub Status)    | B        | #F8FAFC
CONTACT                     | A        | #FFFFFF
FOOTER                      | —        | #F8FAFC + 1px solid #E2E8F0 top border

Skills and Certifications share one panel. Certs render as an inline strip below a thin divider inside the Skills panel. No dedicated full-height section for Certs.

---

#### Recruiter Readability Guardrail

Any layout or motion choice that harms scanability must be rejected.
Blue Pill is a professional reading surface first, a visual experience second.

Specific rules:
- No motion that delays text visibility by more than 320ms on initial load
- No parallax effects on body copy
- No opacity-0 text that requires interaction to reveal
- Section headings must be immediately visible on scroll entry
- All CTAs must be reachable without hover (keyboard accessible, visible by default)

---

#### Preserved Backend and API Integrations

The following must remain completely untouched through the entire visual rework:

Route/Helper                        | Powered By                        | Status
------------------------------------|-----------------------------------|------------------
GET /api/github-status              | GitHubStatusSection.tsx (fetch)   | untouched
POST /api/operator-events           | lib/operator-events.ts (helper)   | untouched
POST /api/contact                   | ContactForm21st.tsx (submit)      | untouched
trackOperatorEvent(...) calls       | HeroDejaVu, ProjectCard, Navbar,  | untouched
                                    | ContactForm21st, GitHubStatus     |

All Task 2 tracking events (CONTACT_INIT, CONTACT_SENT, REPO_CLICK, PAGE_NAV, PILL_SWITCH) survive the rework unchanged. They are wired to interactions, not visual structure. The visual rework must not rename, remove, or relocate any of these call sites.

---

#### Codex Handoff Checklist (final confirmed)

  [ ] 1. app/portfolio/page.tsx
         Wrap Blue branch: BlueNavbar sibling + <div id="blue-stage" marginLeft:220px>
         Red branch and TheConstruct: untouched

  [ ] 2. components/blue/Navbar.tsx
         Full rewrite: position fixed, 220px, full viewport height
         Props: onSwitchMode, (activeSection or internal observer)
         Vertical nav list, 2px blue active marker, RED PILL toggle at bottom
         Mobile: self-hides at <768px

  [ ] 3. components/blue/HeroDejaVu.tsx
         id="about". Two-column 55/45 split.
         Right column: tilted frosted frame containing deja-vu images
         Keep all existing deja-vu state and timer logic

  [ ] 4. components/blue/ExperienceSection.tsx
         id="experience". Surface B.
         Vertical timeline: 1px border spine, 8x8px square markers, no card wrappers

  [ ] 5. components/blue/ProjectsGrid.tsx + ProjectCard.tsx
         id="projects". Surface C.
         First project: full-width glass card, useTilt retained
         Remaining: 2-col grid, border-left hover activation, no tilt

  [ ] 6. components/blue/SkillsSection.tsx
         id="skills". Surface A.
         2x2 category groups, plain-text lists, no pill badges
         BlueCerts rendered inline below thin divider inside this panel

  [ ] 7. components/blue/CertsSection.tsx
         Rendered inside or immediately below SkillsSection panel
         Horizontal strip, minimal CERT · ISSUER · YEAR typography

  [ ] 8. components/blue/GitHubStatusSection.tsx
         id="shipping". Surface B.
         Left 3px blue accent bar, LIVE pulse dot (CSS ring), plain text CTA
         Do not touch fetch() or trackOperatorEvent()

  [ ] 9. components/blue/ContactForm21st.tsx
         id="contact". Surface A.
         Left column: white, typographic, ampersand watermark in #EFF6FF
         Form fields: border-radius 12px, blue focus ring box-shadow
         Do not touch trackOperatorEvent, handleSubmit, or fetch to /api/contact

  [ ] 10. components/blue/Footer.tsx
          Ultra-minimal: single row, 24px vertical padding, no icons
          Left: KD. c 2025  |  Right: Made with intention, not templates.

  [ ] 11. app/globals.css (or new blue-layout.css)
          Add scoped under .mode-blue or #blue-stage:
          - #blue-stage margin-left offset + mobile collapse
          - left-rail fixed dimensions + z-50
          - active-marker top-slide keyframe
          - LIVE pulse ring keyframe
          - Surface A/B/C class definitions
          - Mobile breakpoint rules
          No rule may affect .mode-red or Red Pill components

  [ ] 12. design-system/BLUE_MASTER.md
          Create if missing. Required sections:
          Concept Statement, Layout Primitives, Z-Index Contract, Surface System,
          Color Tokens, Typography Scale, Shadow + Radius System,
          Motion Contract, Component Behavior Rules, Anti-Slop Rules (10 verbatim)

---

### Hyper-Dreams Style Layer Notes

Date: 2026-05-28
Source: .agent/skills/hyper-dreams-style/DESIGN.md + ANIMATIONS.md reverse-engineering
Status: Architecture complete — pending Codex implementation

---

#### Token Updates (--bp-* variable set)

Key insight: hyper-dreams DESIGN.md extracts a DARK-mode palette. For Blue Pill light-mode, surface/text roles are inverted.
Structural elements imported directly: 5px grid discipline, radius scale (4px, 5px, 12px), easing curves, @keyframes grained.

New CSS custom properties to add inside .mode-blue {} in app/globals.css:

Core surfaces:
  --bp-cream:       #FAF8F4   (Surface A — warm off-white, not flat pure white)
  --bp-surface-b:   #F4F1EC   (Surface B — richer, warmer than previous #F8FAFC)
  --bp-rail-bg:     #FFFFFF   (Rail stays pure white — authority surface)

Text:
  --bp-ink:         #0B132B   (Deep midnight navy — primary headline/body text)
  --bp-ink-muted:   #4A5568   (Warm slate body text)

Accent (direct from hyper-dreams accent: #0050bd):
  --bp-accent:      #0050BD   (Replaces #2563EB — more authoritative, less SaaS-blue)
  --bp-accent-hover:#0040A0
  --bp-accent-shadow: rgba(0,80,189,0.22)

Warm heat:
  --bp-amber:       #F59E0B   (Y2K "fake warmth" accent)
  --bp-amber-wash:  rgba(245,158,11,0.06)  (Very low-opacity hero ambient)

Borders:
  --bp-border:      #D4C9BA   (Warm parchment — replaces cold slate-200)
  --bp-border-fine: #E8E2D9   (Thin structural lines, timeline spine)

Tags:
  --bp-tag-bg:      #EDE8E0   (Warm cream — replaces #EFF6FF blue wash)
  --bp-tag-text:    #3B4A6B   (Deep warm navy tag text)
  Tag border-radius: 4px (from hyper-dreams radius scale — not pill shape)

Shadows:
  --bp-shadow-card:   0 1px 4px rgba(11,19,43,0.06), 0 0 0 1px rgba(212,201,186,0.5)
  --bp-shadow-float:  0 8px 32px rgba(11,19,43,0.10)
  --bp-shadow-accent: 0 6px 24px rgba(0,80,189,0.20)
  --bp-shadow-form:   0 8px 40px rgba(0,80,189,0.08)

Gradients:
  --bp-grad-cta:       linear-gradient(135deg, #0050BD 0%, #003F99 100%)
  --bp-grad-panel-c:   linear-gradient(160deg, #EEE9E0 0%, #EAF1FF 100%)
  --bp-grad-hero-atm:  radial-gradient(ellipse 80% 60% at 65% 40%, rgba(245,158,11,0.08) 0%, rgba(0,80,189,0.05) 55%, transparent 80%)

---

#### Texture Overlay Notes

Source animation: @keyframes grained from ANIMATIONS.md (used by #grain-overlay::before on hyper-dreams.com).
Duration: 0.5s, easing: steps(20), iteration: infinite.

Implementation target: .mode-blue #blue-stage::before pseudo-element.
Properties: content:'', position:absolute, inset:-50%, width:200%, height:200%, pointer-events:none, z-index:1.
Background: inline SVG feTurbulence data-URI at baseFrequency:0.65, numOctaves:3, stitchTiles:stitch — rendered at opacity:0.025.
Animated with @keyframes grained — translate XY positions shift in stepped frames to simulate analog grain.

CRITICAL: Do NOT use backdrop-filter or blur(). DESIGN.md explicitly bans blur effects (Anti-Patterns section).
CRITICAL: Grain opacity must stay at or below 0.03 — barely perceptible, purely atmospheric.
Mobile: grain animation disabled (display:none on ::before at <768px) to preserve battery.
prefers-reduced-motion: animation-duration:0.01ms on ::before.

---

#### Cursor Atmosphere Notes

Target: components/blue/BpAtmosphere.tsx (NEW FILE — "use client").
Architecture: Framer Motion useMotionValue + useSpring cursor tracking.
  - useMotionValue for cursor X, Y (updated on mousemove on #blue-stage)
  - useSpring(x, { stiffness: 40, damping: 25 }) for soft lag
  - useTransform maps x/y to gradient center position string
  - Rendered as motion.div with gradient: radial-gradient(ellipse 500px 400px at Xpx Ypx, rgba(245,158,11,0.06), rgba(0,80,189,0.04) 45%, transparent 70%)

Placement: first child inside #blue-stage in app/portfolio/page.tsx (!isRed branch only).
CSS: position:fixed, top:0, left:220px, right:0, bottom:0, pointer-events:none, z-index:0.
Mobile (<768px): returns null — no cursor on touch devices.
prefers-reduced-motion: returns null.
Performance: will-change:background on motion.div. Framer handles RAF internally.

---

#### Component Restyle Priorities (implementation order for Codex)

Priority 1 — Foundation (unblocks everything else):
  app/globals.css — add --bp-* variables, @keyframes grained, grain overlay rule, .bp-reveal class, atmosphere div rule, prefers-reduced-motion block

Priority 2 — New component:
  components/blue/BpAtmosphere.tsx — cursor reactive gradient layer

Priority 3 — Shell wiring:
  app/portfolio/page.tsx — add <BpAtmosphere /> as first child of #blue-stage

Priority 4 — Surface token swap (all Blue components, in this order):
  Navbar.tsx, HeroDejaVu.tsx, ExperienceSection.tsx, ProjectCard.tsx, ProjectsGrid.tsx,
  SkillsSection.tsx, CertsSection.tsx, GitHubStatusSection.tsx, ContactForm21st.tsx, Footer.tsx

Priority 5 — Scroll-reveal:
  Add whileInView or IntersectionObserver .bp-reveal activation to:
  section headings, timeline job entries (stagger 60ms), project cards, skill category groups

Priority 6 — Documentation:
  design-system/BLUE_MASTER.md — append Section 13: Hyper-Dreams Token Layer

---

#### File Targets

| File                                        | Change type            |
|---------------------------------------------|------------------------|
| app/globals.css                             | Token vars + animations|
| app/portfolio/page.tsx                      | Add BpAtmosphere mount |
| components/blue/BpAtmosphere.tsx            | NEW — cursor atmosphere|
| components/blue/Navbar.tsx                  | Token swap             |
| components/blue/HeroDejaVu.tsx              | Token + frame swap     |
| components/blue/ExperienceSection.tsx       | Token + scroll-reveal  |
| components/blue/ProjectCard.tsx             | Token + tag radius     |
| components/blue/ProjectsGrid.tsx            | Token (gradient panel) |
| components/blue/SkillsSection.tsx           | Token + scroll-reveal  |
| components/blue/CertsSection.tsx            | Token swap             |
| components/blue/GitHubStatusSection.tsx     | Token swap             |
| components/blue/ContactForm21st.tsx         | Token + form styling   |
| components/blue/Footer.tsx                  | Token swap             |
| design-system/BLUE_MASTER.md                | Append Section 13      |

---

#### Red Pill Untouched

Confirmed full styling isolation:
- All --bp-* variables scoped inside .mode-blue {}
- @keyframes grained scoped to .mode-blue #blue-stage::before
- BpAtmosphere only renders inside !isRed branch
- components/red/* — zero contact
- Red mode CSS paths, dark terminal themes, matrix green values — completely uncompromised

---

#### API / DB Untouched

Zero modifications to:
- GET /api/github-status
- POST /api/contact
- POST /api/operator-events
- lib/operator-events.ts (trackOperatorEvent helper)
- prisma/* schema and client
- lib/prisma.ts
- .env* environment variables
- middleware.ts

All existing trackOperatorEvent call sites remain wired and valid.
The style pass is purely CSS variable substitution + a new Framer Motion component.
No data shape, fetch URL, or event payload changes.

---

#### Codex Handoff Checklist (Hyper-Dreams Style Pass)

  [ ] 1. app/globals.css
         Add inside .mode-blue {}: --bp-cream, --bp-surface-b, --bp-ink, --bp-ink-muted,
         --bp-accent (#0050BD), --bp-accent-hover, --bp-accent-shadow, --bp-amber, --bp-amber-wash,
         --bp-border, --bp-border-fine, --bp-tag-bg, --bp-tag-text,
         --bp-shadow-card, --bp-shadow-float, --bp-shadow-accent, --bp-shadow-form,
         --bp-grad-cta, --bp-grad-panel-c, --bp-grad-hero-atm
         Add @keyframes grained (from ANIMATIONS.md)
         Add .mode-blue #blue-stage { position: relative; } (required for ::before positioning)
         Add .mode-blue #blue-stage::before grain overlay rule at opacity:0.025
         Add .bp-reveal + .bp-reveal.visible scroll-reveal utility
         Add #bp-atmosphere position rule (fixed, left:220px, z-index:0, pointer-events:none)
         Add @media (prefers-reduced-motion: reduce) block

  [ ] 2. components/blue/BpAtmosphere.tsx (NEW)
         "use client" — useMotionValue, useSpring (stiffness:40, damping:25), useTransform
         mousemove listener on mount targeting #blue-stage
         Returns motion.div with reactive radial-gradient background
         Returns null on: window.innerWidth < 768, prefers-reduced-motion: reduce

  [ ] 3. app/portfolio/page.tsx
         Import BpAtmosphere
         Render as first child of #blue-stage in !isRed branch only

  [ ] 4–13. All Blue components (in priority order above)
         Swap hex color values to --bp-* CSS variables
         Update tag border-radius from 999px/6px to 4px (hyper-dreams scale)
         Update CTA gradient to --bp-grad-cta
         Update card shadows to --bp-shadow-* tokens
         Update border colors to --bp-border / --bp-border-fine warm tones
         Update deja-vu frame gradient to warm amber-cream (not flat #EFF6FF)
         Update ampersand watermark color from #EFF6FF to #F0EBDE
         Add whileInView / .bp-reveal to section headings, job entries, project cards, skill groups

  [ ] 14. design-system/BLUE_MASTER.md
          Append Section 13: Hyper-Dreams Token Layer
          Document: all --bp-* variables, grain overlay mechanics, atmosphere layer spec, updated motion curves

---

---

### Hyper-Dreams Implementation Log — 2026-05-28

Status: IMPLEMENTED — Full frontend restyle complete. TypeScript: 0 errors.

Files changed:
- app/globals.css — Hyper-Dreams token layer appended (--bp-* variables, @keyframes bp-grained, grain overlay, .bp-reveal, atmosphere CSS, prefers-reduced-motion block)
- components/blue/BpAtmosphere.tsx — NEW: cursor-reactive Framer Motion atmosphere layer
- app/portfolio/page.tsx — BpAtmosphere imported and mounted as first child of #blue-stage
- components/blue/Navbar.tsx — accent #0050BD, warm muted body color, warm separator
- components/blue/HeroDejaVu.tsx — deep navy ink, warm CTAs, amber-cream deja-vu frame, Framer enter animation
- components/blue/ExperienceSection.tsx — warm surface-b, warm timeline spine, square markers #0050BD, whileInView stagger
- components/blue/ProjectCard.tsx — warm cream glass (no blur), warm borders, 4px tag radius, warm tag bg/text
- components/blue/ProjectsGrid.tsx — warm gradient panel-c, whileInView enter animations
- components/blue/SkillsSection.tsx — warm surface-a, accent category labels, warm dividers, whileInView stagger
- components/blue/CertsSection.tsx — warm border-top, warm dot markers, deep navy cert names
- components/blue/GitHubStatusSection.tsx — warm surfaces, accent left bar, warm commit chip, whileInView
- components/blue/ContactForm21st.tsx — #F0EBDE ampersand watermark, warm form card, 5px field radius, accent focus ring, whileInView
- components/blue/Footer.tsx — warm border-top, warm text tokens

Design deviations from blueprint (intentional UX improvements):
1. Featured card: backdrop-filter:blur removed (per hyper-dreams DESIGN.md Anti-Patterns rule: 'No blur or backdrop-filter effects'). Replaced with solid #FDFAF6 warm cream glass. Visually equivalent, better performance.
2. Contact form success state: green (#EEF5E8 background) instead of blue — clearer semantic signal for form success.
3. Field border-radius: 5px (not 12px as in initial implementation) — matches hyper-dreams radius scale exactly.
4. Form card border-radius: 12px (not 20px) — tighter, more editorial.
5. Standard project card: border-radius 0 12px 12px 0 on right side (sharp left for accent bar mount point).

Red Pill: untouched — zero contact.
API/DB/tracking: all GET /api/github-status, POST /api/contact, POST /api/operator-events, and trackOperatorEvent() calls preserved.
