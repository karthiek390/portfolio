# 🔴 MATRIX PORTFOLIO — V1 MASTER TASK FILE

> **Read this file first before reading any phase file.**
> This document defines the project architecture, technology decisions, component wiring,
> and a complete tree of all v1 phases and their tasks.
> Any AI agent or human developer picking up this project must start here.

---

## 📌 Project Overview

A Matrix-themed personal portfolio with two interactive modes:
- **Blue Pill Mode** — Clean, corporate, recruiter-friendly professional layout
- **Red Pill Mode** — Raw, terminal-style hacker layout with Matrix green aesthetic

The user selects a mode on the landing page. The entire site's appearance, fonts,
colors, and interactions change based on this global state.

---

## 🧱 Tech Stack (Locked)

| Layer           | Technology                        | Purpose                                              |
|-----------------|-----------------------------------|------------------------------------------------------|
| Framework       | Next.js 15 (App Router)           | Core frontend + built-in API routes (no separate server needed) |
| Language        | TypeScript                        | Type safety across all layers                        |
| Styling         | Tailwind CSS v4                   | Theme toggling via parent class, utility styling      |
| Animations      | Framer Motion                     | Page transitions, Construct loading, pill switch      |
| Animations      | GSAP + ScrollTrigger              | Scroll-based effects, bullet time (v2)               |
| Canvas FX       | 21st.dev components               | Matrix rain, liquid chrome mirror, glitch text        |
| 3D Tilt         | vanilla-tilt (or react-tilt)      | Neo bullet-dodge card hover effect                   |
| ORM             | Prisma                            | Type-safe DB queries                                 |
| Database        | Supabase (PostgreSQL)             | Contact form storage, future analytics               |
| GitHub API      | REST (fetch, no SDK)              | Nebuchadnezzar live commit status                    |
| Hosting         | Vercel (Hobby — Free)             | Deployment (decided later, built for Vercel)         |
| Package Manager | npm                               | Dependency management                                |

---

## 🗂️ Folder Structure

```
/portfolio                        ← Root workspace
├── /app                          ← Next.js App Router pages
│   ├── layout.tsx                ← Root layout (fonts, PillProvider, global CSS)
│   ├── page.tsx                  ← Landing page (pill choice screen)
│   ├── /portfolio                ← Main portfolio route (after pill is chosen)
│   │   └── page.tsx
│   ├── /not-found.tsx            ← 404 Agent Smith page
│   └── /api                     ← Next.js API routes (backend)
│       ├── /contact
│       │   └── route.ts          ← POST /api/contact
│       └── /github-status
│           └── route.ts          ← GET /api/github-status
│
├── /components
│   ├── /shared                   ← Used in BOTH pill modes
│   │   ├── PillToggle.tsx        ← The toggle button (hardline phone icon)
│   │   ├── Navbar.tsx            ← Renders blue or red variant based on pill state
│   │   └── MatrixRain.tsx        ← Canvas code rain (21st.dev component, used as bg)
│   │
│   ├── /blue                     ← Blue Pill (corporate) components
│   │   ├── Hero.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── CertCard.tsx
│   │   ├── CertsSection.tsx
│   │   └── Footer.tsx
│   │
│   └── /red                      ← Red Pill (hacker) components
│       ├── Hero.tsx
│       ├── ProjectCard.tsx       ← Scramble text on hover, EXTRACT_CODEBASE link
│       ├── ProjectsGrid.tsx
│       ├── CertCard.tsx          ← Progress bar loader on click
│       ├── CertsSection.tsx
│       ├── TerminalContactForm.tsx ← Morpheus sequential CLI prompts
│       └── NebuchadnezzarStatus.tsx ← Live GitHub commit panel
│
├── /context
│   └── PillContext.tsx            ← Global React Context for "blue" | "red" state
│
├── /lib
│   ├── prisma.ts                  ← Prisma client singleton
│   └── github.ts                  ← GitHub API fetch helper
│
├── /transitions
│   └── TheConstruct.tsx           ← Full-screen white room loading transition
│
├── /styles
│   └── globals.css                ← Tailwind directives + CSS token variables
│
├── /prisma
│   └── schema.prisma              ← DB schema (contacts + pageviews tables)
│
└── tasks/                         ← THIS FOLDER — task tracking for all AIs/humans
    ├── MASTER.md                  ← YOU ARE HERE
    ├── phase_0_setup.md
    ├── phase_1_landing.md
    ├── phase_2_blue_pill_ui.md
    ├── phase_3_red_pill_ui.md
    ├── phase_4_effects.md
    ├── phase_5_terminal_and_404.md
    ├── phase_6_nebuchadnezzar.md
    ├── phase_7_api.md
    └── phase_8_database.md
```

---

## 🔗 How Components Connect (Wiring Map)

```
Browser
  │
  ▼
app/layout.tsx
  ├── Wraps all pages with <PillProvider> (context)
  ├── Loads fonts (JetBrains Mono, Inter)
  └── Applies global CSS token variables

  │
  ▼
app/page.tsx  ← Landing Page (Phase 1)
  ├── Reads NO pill state (user hasn't chosen yet)
  ├── Renders MatrixRain canvas as background
  ├── Shows red + blue pill buttons
  └── On click → sets PillContext state → navigates to /portfolio

  │
  ▼
app/portfolio/page.tsx  ← Main Portfolio
  ├── Reads PillContext ("blue" | "red")
  ├── Applies Tailwind parent class to root div: "mode-blue" or "mode-red"
  ├── Renders Navbar (shared, reads pill state internally)
  ├── Renders Hero (blue/Hero.tsx OR red/Hero.tsx based on pill state)
  ├── Renders ProjectsGrid (blue or red variant)
  ├── Renders CertsSection (blue or red variant)
  ├── Renders TerminalContactForm (red only) OR standard form placeholder (blue)
  ├── Renders NebuchadnezzarStatus (red only)
  └── Renders Footer

  │
  ▼
PillToggle (inside Navbar)
  ├── Clicking it triggers TheConstruct.tsx transition (Phase 4)
  └── After transition completes → flips PillContext state

  │
  ▼
API Layer (Phase 7)
  ├── POST /api/contact
  │     ← Called by TerminalContactForm on submit
  │     → Writes to Supabase `contacts` table via Prisma
  │
  └── GET /api/github-status
        ← Called by NebuchadnezzarStatus on mount
        → Fetches latest commit from GitHub REST API
        → Returns: { repo, message, time_ago, url }

  │
  ▼
Database (Supabase PostgreSQL via Prisma — Phase 8)
  ├── contacts table  ← Stores contact form submissions
  └── pageviews table ← Reserved for future analytics (not active in v1)
```

---

## 📦 21st.dev Component Usage Plan

> 21st.dev components are installed via CLI and copied into the repo.
> They are React/TSX and work natively with Next.js + Tailwind.

| Component                | 21st.dev Source                                      | Used In                         |
|--------------------------|------------------------------------------------------|----------------------------------|
| Matrix Code Rain         | `community/components/wisedev/matrix-code-rain`      | Landing page background, Red Pill bg |
| Glitch Text Effect       | Search: "glitch text"                                | Navbar links (Red Pill hover)   |
| Liquid Chrome / Mirror   | `community/components/thanh/matrix-code`             | Pill transition overlay (Phase 4) |

> ⚠️ NOTE: If a 21st.dev component is not available or incompatible,
> a custom implementation will be built as fallback. This will be noted in the phase file.

---

## 🌡️ CSS Token System (Theme Variables)

All colors, fonts, and glows are defined as CSS custom properties in `globals.css`.
Tailwind reads these via `@theme` or `var()`.

```css
/* Red Pill Tokens */
.mode-red {
  --color-bg: #000000;
  --color-primary: #00FF41;
  --color-secondary: #003B00;
  --color-text: #00FF41;
  --color-muted: #00802b;
  --font-main: 'JetBrains Mono', monospace;
  --glow: 0 0 10px #00FF41, 0 0 20px #00FF41;
}

/* Blue Pill Tokens */
.mode-blue {
  --color-bg: #F8FAFC;
  --color-primary: #2563EB;
  --color-secondary: #E2E8F0;
  --color-text: #0F172A;
  --color-muted: #64748B;
  --font-main: 'Inter', sans-serif;
  --glow: none;
}
```

---

## 📁 Phase File Index

Each phase has its own `.md` file. Read them in order.

| File                         | Phase | Status        | Depends On      |
|------------------------------|-------|---------------|-----------------|
| `phase_0_setup.md`           | 0     | ⏳ Not Started | Nothing          |
| `phase_1_landing.md`         | 1     | ⏳ Not Started | Phase 0          |
| `phase_2_blue_pill_ui.md`    | 2     | ⏳ Not Started | Phase 0          |
| `phase_3_red_pill_ui.md`     | 3     | ⏳ Not Started | Phase 2          |
| `phase_4_effects.md`         | 4     | ⏳ Not Started | Phase 1, 2, 3   |
| `phase_5_terminal_and_404.md`| 5     | ⏳ Not Started | Phase 3          |
| `phase_6_nebuchadnezzar.md`  | 6     | ⏳ Not Started | Phase 7          |
| `phase_7_api.md`             | 7     | ⏳ Not Started | Phase 8          |
| `phase_8_database.md`        | 8     | ⏳ Not Started | Phase 0          |

---

## ✅ V1 Task Count Summary

| Phase | Description             | Tasks | Dept        |
|-------|-------------------------|-------|-------------|
| 0     | Project Setup           | 5     | Setup       |
| 1     | Landing Page            | 4     | UI          |
| 2     | Blue Pill UI            | 5     | UI          |
| 3     | Red Pill UI             | 4     | UI          |
| 4     | Transitions & Effects   | 3     | UI          |
| 5     | Terminal Form + 404     | 3     | UI          |
| 6     | Nebuchadnezzar Status   | 2     | UI + API    |
| 7     | API Layer               | 2     | API         |
| 8     | Database                | 4     | DB          |
| **—** | **TOTAL**               | **32**| —           |

> **Deferred to v2:** "There Is No Spoon" text warp, Analytics tracking (POST /api/track),
> Déjà Vu black cat easter egg, Bullet Time scroll effect, Architect's Room webcam,
> Audio design, EMP reset switch.

---

## 🚦 How to Use These Task Files

1. **Start a new AI session** → Have it read `MASTER.md` first
2. **Identify the current phase** → Open the corresponding `phase_X_*.md`
3. **Check task status** → `task_completed: false` = not done, `task_completed: true` = done
4. **Do NOT skip phases** — each phase has a `depends_on` field; respect it
5. **Mark tasks complete** → Update `task_completed` to `true` as each task finishes
6. **One AI per department** → UI tasks go to UI AI, API tasks go to API AI, DB tasks go to DB AI

---

*Last updated: 2026-05-21 | Version: v1.0*
