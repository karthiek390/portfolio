# BLUE_MASTER.md — Blue Pill Design System

> **Last updated:** 2026-05-28
> **Scope:** Blue Pill UI only. Red Pill is a separate, independent system.

---

## 1. Concept Statement

Blue Pill is **The Illusion** — a world constructed to feel safe, corporate-beautiful, and frictionless.
Every design decision reinforces the sensation that this interface was designed *for you*, by authority.
Cool whites, precise spacing, and controlled blue accents signal institutional confidence.
It is the seductive opposite of the Red Pill: bright, cold, synthetic, overly polished.

This system is **not** a SaaS landing page, a startup template, or a generic portfolio theme.
It is an editorial layout system with typographic hierarchy and spatial discipline at its core.

---

## 2. Layout Shell

### Architecture
```
[fixed left rail 220px] | [right stage, margin-left: 220px]
       ↓                              ↓
  Identity + Nav              Full-height section panels
  never scrolls               scroll natively
```

### Shell Rules
- `#blue-rail` — `position: fixed; left: 0; top: 0; width: 220px; height: 100vh; z-index: 50`
- `#blue-stage` — `margin-left: 220px; position: relative; min-height: 100vh`
- Both `#blue-rail` and `#blue-stage` must only exist inside the `!isRed` branch of `app/portfolio/page.tsx`
- Red Pill renders as a flat fragment — zero margin offset, zero left rail

### Z-Index Contract

| Layer | Element | z-index |
|---|---|---|
| Base | Right-stage content panels | 0 (flow) |
| Decorative | Glass overlays, hero shapes | 1 |
| Rail | Fixed left rail | 50 |
| Mobile bar | Top header bar (mobile only) | 50 |
| Mobile overlay | Full-screen hamburger nav | 200 |
| Transition | TheConstruct pill transition | 500 |

No Blue stage element may exceed `z-index: 100`. TheConstruct at 500 always wins.

### Mobile Collapse (< 768px)
- `#blue-rail` hidden (`display: none !important`)
- `#blue-stage` collapses (`margin-left: 0 !important`)
- `#blue-mobile-bar` appears: 56px fixed top bar, wordmark left, hamburger right, `z-index: 50`
- Hamburger opens full-screen overlay (`position: fixed; inset: 0; z-index: 200; background: #FFFFFF`)
- Overlay closes on nav item click or ✕ button

---

## 3. Surface System

Three alternating panel surfaces — never the same twice in a row:

| Surface | Class | Background |
|---|---|---|
| A | `.bp-panel-a` | `#FFFFFF` — pure white |
| B | `.bp-panel-b` | `#F8FAFC` — slate-50 wash |
| C | `.bp-panel-c` | `linear-gradient(160deg, #F8FAFC 0%, #EFF6FF 100%)` |

### Section Assignments

| Section | Surface |
|---|---|
| ABOUT (Hero) | A |
| EXPERIENCE | B |
| PROJECTS | C |
| SKILLS | A |
| CERTS (inline strip) | A (same panel continuation) |
| SHIPPING | B |
| CONTACT | A |
| FOOTER | B + `border-top: 1px solid #E2E8F0` |

### Panel Structure
- All major sections: `min-height: 100vh`, `padding: 96px 64px`
- Certs exception: compact strip, `padding: 40px 64px 72px`
- Footer exception: `padding: 24px 64px`
- No `border-radius` on section panels — structural containers are always sharp-edged

---

## 4. Color Tokens

```
Primary accent:   #2563EB  (blue-600)  — CTAs, active markers, labels, left accent bars
Deep accent:      #1D4ED8  (blue-700)  — hover state of primary CTA
Headline:         #0F172A  (slate-900)
Body:             #475569  (slate-600)
Secondary:        #64748B  (slate-500)
Muted:            #94A3B8  (slate-400)
Subtle:           #CBD5E1  (slate-300)
Border:           #E2E8F0  (slate-200)
Rail border:      #E8EEF4
Surface wash:     #F8FAFC  (slate-50)
Blue wash:        #EFF6FF  (blue-100)
Blue tag bg:      #DBEAFE  (blue-200)
White:            #FFFFFF
Glass:            rgba(255,255,255,0.88) + backdrop-filter: blur(12px)
```

**Constraints:**
- `#2563EB` is accent-only — never as a section background fill
- No `linear-gradient(135deg, #2563EB, #7C3AED)` or similar multi-stop dark gradients on hero/section backgrounds
- Left-align everything — no centered headlines in content areas

---

## 5. Typography Scale

```
Display:   Inter Black (900),   clamp(2.6rem, 5vw, 4rem),  tracking -0.04em, line-height 1.05
H2:        Inter ExtraBold (800), clamp(1.8rem, 3vw, 2.6rem), tracking -0.03em
H3 (card): Inter Bold (700),    1rem–1.5rem,                tracking -0.02em
Body-lg:   Inter Regular (400), 1rem,                       line-height 1.85
Body:      Inter Regular (400), 0.95rem,                    line-height 1.75
Small:     Inter Regular (400), 0.875rem,                   line-height 1.7
Label:     Inter Bold (700),    0.68–0.72rem,               tracking 0.14em, uppercase, color #2563EB
Nav:       Inter SemiBold (600), 0.76rem,                   tracking 0.13em, uppercase
Caption:   Inter Regular (400), 0.7–0.72rem,                tracking 0.05em, color #94A3B8
Mono:      JetBrains Mono,      commit messages and date periods only
```

---

## 6. Spacing Rhythm

Base unit: 4px

```
4px   8px   12px   16px   24px   32px   40px   48px   64px   96px
```

- Section padding: `96px 64px` (top/bottom: 96px, left/right: 64px)
- Card internal padding: `1.75rem–2.5rem`
- Form field padding: `0.9rem 1rem`
- Rail internal: `40px 0 28px` vertical, `28px` horizontal
- Gap between timeline entries: `2.75rem`
- Gap between category skill groups: `2.25rem 2.5rem`

---

## 7. Shadow System

```
card:  0 2px 12px  rgba(15,23,42,0.05)
float: 0 4px 32px  rgba(15,23,42,0.08)
deep:  0 8px 40px  rgba(15,23,42,0.10)
form:  0 8px 40px  rgba(37,99,235,0.07)
blue:  0 4px 18px  rgba(37,99,235,0.28)
```

### Radius

```
Panels:    0px          — structural containers, sharp edges
Cards:     12–16px
Form card: 20px
Buttons:   999px (pill)
Tags:      4–6px
```

---

## 8. Motion Rules

- Hover duration cap: **180ms** — never exceed on interactive hover states
- Enter animation: `opacity 0→1 + translateY 12→0`, 320ms, staggered per element
- Easing curve: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for all transforms
- Nav active marker: `border-left-color` transition 140ms
- Glass frame (hero deja-vu): `transform rotate(-3deg → -4deg)` on anomaly, 180ms
- **No** spring physics or bounce easing
- **No** scale transforms on hover (signals SaaS-generic immediately)
- **No** CSS scroll-snap — preserve natural recruiter-friendly scrolling
- Active section indicator: IntersectionObserver threshold 0.25, rootMargin `-10% 0px -60% 0px`

---

## 9. Component Behavior Rules

### Left Rail Active Marker
- Per-item `border-left: 2px solid transparent` → `2px solid #2563EB` on active
- Color: `#64748B` idle → `#2563EB` active, `#0F172A` on hover-not-active
- Transition: 140ms ease for `color` and `border-color`

### Card Hover (Standard)
- `border-left-color: transparent → #2563EB` at 140ms
- `box-shadow` deepens from `0 2px 12px …` to `0 6px 24px …`
- No `transform: scale()`, no `translateY` on standard grid cards

### Card Hover (Featured)
- `box-shadow` only: `0 4px 32px … → 0 12px 48px rgba(37,99,235,0.12)`
- `useTilt` retained — featured card tilts on mouse move

### Link Underline Sweep (`.bp-sweep`)
- `::after` pseudo-element: `width: 0 → 100%` over 180ms `cubic-bezier(0.16,1,0.3,1)`
- `bottom: -1px; height: 1px; background: #2563EB`
- Used on: project links, GitHub CTA, contact LinkedIn link

### Form Field Focus
- `border-color: #CBD5E1 → #2563EB`
- `box-shadow: 0 0 0 3px rgba(37,99,235,0.12)`
- Applied inline via `onFocus` / `onBlur` — no CSS class needed

### LIVE Pulse Dot (`.bp-pulse-dot`)
- 7px blue-600 circle
- `::after` pseudo-element scales from `1 → 2.6` over 1.6s, opacity `0.9 → 0`
- Shows next to "SHIPPING" label when GitHub status data is successfully loaded

---

## 10. Anti-Slop Rules

1. **No equal-weight cards.** One element per section must be visually dominant over others.
2. **Left rail is sacred.** Nothing may overlap or visually compete with it at z-index ≤ 50.
3. **No rounded panels at section level.** `border-radius: 0` for full-width structural containers.
4. **No icon-heavy UI.** Icons ≤ 16px, monochrome, always paired with a text label.
5. **Typography carries the hierarchy.** Never use a colored background block to signal importance — use type weight, size, and color in text instead.
6. **Hover states ≤ 180ms.** Any transition longer than 200ms on a hover state reads as sluggish.
7. **Blue-600 is accent only.** Never as a section fill except the primary CTA button background.
8. **No generic gradient banners.** No `linear-gradient(135deg, #2563EB, #7C3AED)` on hero or section backgrounds.
9. **Left-align everything.** No center-aligned headlines or body copy within content areas.
10. **White space is structural.** The intentional empty right margin beyond `max-width: 840px` must remain. If content bleeds to the viewport right edge, the layout has failed.

---

## 11. File Ownership

| File | Responsibility |
|---|---|
| `app/globals.css` | Shell tokens, `#blue-rail`, `#blue-stage`, panel classes, pulse animation, bp-sweep, mobile breakpoints |
| `app/portfolio/page.tsx` | Blue/Red branch split, `#blue-stage` wrapper, import map |
| `components/blue/Navbar.tsx` | Left rail, IntersectionObserver active tracking, mobile bar + overlay |
| `components/blue/HeroDejaVu.tsx` | Two-column hero, deja-vu frame, identity CTAs |
| `components/blue/ExperienceSection.tsx` | Timeline spine, square markers |
| `components/blue/ProjectsGrid.tsx` | Featured + grid layout |
| `components/blue/ProjectCard.tsx` | Featured (glass+tilt) and standard (border-left hover) variants |
| `components/blue/SkillsSection.tsx` | Category-group capability sheet |
| `components/blue/CertsSection.tsx` | Compact horizontal strip |
| `components/blue/GitHubStatusSection.tsx` | SHIPPING section, left accent bar, pulse dot |
| `components/blue/ContactForm21st.tsx` | Typographic left column, form with blue focus ring |
| `components/blue/Footer.tsx` | Ultra-minimal single row |

---

## 12. Backend Integrations (Unchanged)

The following API routes are reused as-is. Do not modify them during any future visual iteration:

| Route | Consumer | Status |
|---|---|---|
| `GET /api/github-status` | `GitHubStatusSection.tsx` | Untouched |
| `POST /api/contact` | `ContactForm21st.tsx` | Untouched |
| `POST /api/operator-events` | `lib/operator-events.ts` | Untouched |

All `trackOperatorEvent(...)` call sites survive any future visual rework:
- `HeroDejaVu.tsx` — LinkedIn click, GitHub click
- `ProjectCard.tsx` — GitHub repo click, Live demo click
- `Navbar.tsx` — PILL_SWITCH on RED PILL toggle
- `ContactForm21st.tsx` — CONTACT_INIT (first focus, fires once via `useRef`), CONTACT_SENT (on success)
- `GitHubStatusSection.tsx` — REPO_CLICK on CTA and fallback link
