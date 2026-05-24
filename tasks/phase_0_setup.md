# ⚙️ PHASE 0 — Project Setup

> **Read `MASTER.md` before this file.**
> This phase creates the entire project foundation.
> Nothing else can be built until all tasks in this phase are marked complete.

---

## 📋 Phase Metadata

| Field          | Value                                 |
|----------------|---------------------------------------|
| Phase          | 0                                     |
| Department     | Setup                                 |
| Depends On     | Nothing — this is the first phase     |
| Blocks         | All other phases (1–8)                |
| Estimated Work | ~1–2 hours                            |
| Phase Status   | ⏳ Not Started                         |

---

## 🧠 Context for the AI/Developer

You are setting up a **Next.js 15 (App Router)** project with **TypeScript** and **Tailwind CSS v4**.
The project is a Matrix-themed portfolio with two visual modes ("Blue Pill" and "Red Pill").
The global pill state (`"blue" | "red"`) is stored in a React Context that wraps the entire app.
All theme colors, fonts, and glows are defined as CSS custom properties (not Tailwind hardcoded classes).

### Key Rules
- Use **App Router** (`/app` directory), NOT the Pages Router.
- Use **TypeScript** (`.tsx`, `.ts`) for all files — no plain `.js`.
- Use **Tailwind CSS v4** — the config approach changed in v4 (uses `@import "tailwindcss"` in CSS, not `tailwind.config.js` by default).
- Do **NOT** install `shadcn/ui` in this phase — 21st.dev components come later in individual phases.
- Folder structure must match exactly what is defined in `MASTER.md`.

---

## ✅ Tasks

---

### TASK 0.1 — Initialize Next.js 15 Project

```
task_id: 0.1
task_completed: false
department: Setup
```

**What to do:**

Run the following command inside the portfolio root directory
(`c:\Users\Karthiek Duggirala\OneDrive\Desktop\portfolio`):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*"
```

**Flags explained:**
- `.` — initialize in current directory (do not create a subfolder)
- `--typescript` — TypeScript enabled
- `--tailwind` — Tailwind CSS pre-configured
- `--eslint` — ESLint pre-configured
- `--app` — use App Router (not Pages Router)
- `--src-dir no` — do NOT use a `/src` folder; keep `/app` at root
- `--import-alias "@/*"` — allows `@/components/...` style imports

**After running, verify these files exist:**
- `app/layout.tsx`
- `app/page.tsx`
- `tailwind.config.ts` (or absence of it in v4 — check `globals.css` instead)
- `tsconfig.json`
- `package.json`
- `next.config.ts`

**Install additional dependencies immediately after:**

```bash
npm install framer-motion gsap @gsap/react
npm install prisma @prisma/client
npm install -D @types/node
```

> ⚠️ Do NOT install `three`, `react-three-fiber`, or `vanilla-tilt` yet.
> Those come in Phase 4 when the effect components are built.

---

### TASK 0.2 — Create Folder Structure

```
task_id: 0.2
task_completed: false
department: Setup
depends_on: 0.1
```

**What to do:**

Manually create the following folders and placeholder files.
The placeholder files can be empty (just `export {}`) but must exist so
TypeScript does not complain about missing modules.

```
Create these FOLDERS (if they don't exist after Next.js init):
  /app/portfolio/
  /app/api/contact/
  /app/api/github-status/
  /components/shared/
  /components/blue/
  /components/red/
  /context/
  /lib/
  /transitions/
  /prisma/
  /tasks/                        ← Already exists (this file is in here)
```

```
Create these PLACEHOLDER FILES (empty, just `export {}` inside):
  /app/portfolio/page.tsx
  /app/not-found.tsx
  /app/api/contact/route.ts
  /app/api/github-status/route.ts
  /components/shared/PillToggle.tsx
  /components/shared/Navbar.tsx
  /components/shared/MatrixRain.tsx
  /components/blue/Hero.tsx
  /components/blue/ProjectCard.tsx
  /components/blue/ProjectsGrid.tsx
  /components/blue/CertCard.tsx
  /components/blue/CertsSection.tsx
  /components/blue/Footer.tsx
  /components/red/Hero.tsx
  /components/red/ProjectCard.tsx
  /components/red/ProjectsGrid.tsx
  /components/red/CertCard.tsx
  /components/red/CertsSection.tsx
  /components/red/TerminalContactForm.tsx
  /components/red/NebuchadnezzarStatus.tsx
  /context/PillContext.tsx
  /lib/prisma.ts
  /lib/github.ts
  /transitions/TheConstruct.tsx
```

> ✅ After this task, the full project skeleton exists.
> All future phases fill in these placeholder files — they don't create new ones
> (unless a 21st.dev component adds files, which will be noted in that phase).

---

### TASK 0.3 — Create Global Pill Context

```
task_id: 0.3
task_completed: false
department: Setup
depends_on: 0.2
file: /context/PillContext.tsx
```

**What to do:**

Replace the placeholder in `/context/PillContext.tsx` with the following complete implementation:

```tsx
"use client";

import React, { createContext, useContext, useState } from "react";

// The two possible pill modes
export type PillMode = "blue" | "red";

interface PillContextType {
  mode: PillMode;
  setMode: (mode: PillMode) => void;
}

const PillContext = createContext<PillContextType | undefined>(undefined);

export function PillProvider({ children }: { children: React.ReactNode }) {
  // Default: no pill chosen yet — landing page handles this
  const [mode, setMode] = useState<PillMode>("blue");

  return (
    <PillContext.Provider value={{ mode, setMode }}>
      {/* Apply the CSS class to the wrapper so all children inherit theme tokens */}
      <div className={mode === "red" ? "mode-red" : "mode-blue"} style={{ minHeight: "100vh" }}>
        {children}
      </div>
    </PillContext.Provider>
  );
}

// Custom hook — all components use this to read or change the pill state
export function usePill(): PillContextType {
  const context = useContext(PillContext);
  if (!context) {
    throw new Error("usePill must be used inside a <PillProvider>");
  }
  return context;
}
```

**How other components use this:**
```tsx
// Any component can read or change the mode:
import { usePill } from "@/context/PillContext";

const { mode, setMode } = usePill();
// mode === "blue" | "red"
// setMode("red") → switches to Red Pill mode
```

---

### TASK 0.4 — Configure CSS Token System (globals.css)

```
task_id: 0.4
task_completed: false
department: Setup
depends_on: 0.1
file: /app/globals.css
```

**What to do:**

Replace the contents of `/app/globals.css` entirely with the following.
This defines the complete design token system for both pill modes.

```css
/* ============================================================
   MATRIX PORTFOLIO — GLOBAL STYLES
   All theme tokens are defined here.
   Red Pill tokens apply when parent has class "mode-red".
   Blue Pill tokens apply when parent has class "mode-blue".
   ============================================================ */

@import "tailwindcss";

/* ── Blue Pill (Corporate / Clean) ─────────────────────────── */
.mode-blue {
  --color-bg:        #F8FAFC;
  --color-surface:   #FFFFFF;
  --color-primary:   #2563EB;
  --color-secondary: #E2E8F0;
  --color-text:      #0F172A;
  --color-muted:     #64748B;
  --color-border:    #CBD5E1;
  --color-accent:    #3B82F6;
  --font-main:       'Inter', sans-serif;
  --font-mono:       'JetBrains Mono', monospace;
  --glow:            none;
  --glow-strong:     none;
  --transition-speed: 0.3s;
}

/* ── Red Pill (Hacker / Terminal) ───────────────────────────── */
.mode-red {
  --color-bg:        #000000;
  --color-surface:   #0D0D0D;
  --color-primary:   #00FF41;
  --color-secondary: #003B00;
  --color-text:      #00FF41;
  --color-muted:     #00802B;
  --color-border:    #00FF4133;
  --color-accent:    #39FF14;
  --font-main:       'JetBrains Mono', monospace;
  --font-mono:       'JetBrains Mono', monospace;
  --glow:            0 0 8px #00FF41, 0 0 16px #00FF4166;
  --glow-strong:     0 0 12px #00FF41, 0 0 30px #00FF41, 0 0 60px #00FF4144;
  --transition-speed: 0.3s;
}

/* ── Base Resets ─────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-main);
  transition:
    background-color var(--transition-speed) ease,
    color var(--transition-speed) ease;
  overflow-x: hidden;
}

/* ── Scrollbar (Red Pill only) ───────────────────────────────── */
.mode-red ::-webkit-scrollbar {
  width: 6px;
}
.mode-red ::-webkit-scrollbar-track {
  background: #000;
}
.mode-red ::-webkit-scrollbar-thumb {
  background: #00FF41;
  border-radius: 3px;
}

/* ── Utility: Glow Text ──────────────────────────────────────── */
.glow-text {
  text-shadow: var(--glow);
}

/* ── Utility: Glow Border ────────────────────────────────────── */
.glow-border {
  box-shadow: var(--glow);
  border-color: var(--color-primary);
}

/* ── Utility: Glitch Animation ───────────────────────────────── */
@keyframes glitch {
  0%   { clip-path: inset(0 0 95% 0); transform: translate(-3px, 0); }
  20%  { clip-path: inset(30% 0 50% 0); transform: translate(3px, 0); }
  40%  { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 0); }
  60%  { clip-path: inset(80% 0 5% 0); transform: translate(2px, 0); }
  80%  { clip-path: inset(10% 0 75% 0); transform: translate(-1px, 0); }
  100% { clip-path: inset(0 0 95% 0); transform: translate(0, 0); }
}

.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.mode-red .glitch:hover::before {
  opacity: 0.8;
  color: #ff0000;
  animation: glitch 0.3s steps(1) infinite;
}
.mode-red .glitch:hover::after {
  opacity: 0.8;
  color: #00ffff;
  animation: glitch 0.3s steps(1) infinite reverse;
}

/* ── Selection Color ─────────────────────────────────────────── */
.mode-red ::selection {
  background: #00FF41;
  color: #000;
}
.mode-blue ::selection {
  background: #2563EB;
  color: #fff;
}
```

---

### TASK 0.5 — Configure Fonts in Root Layout

```
task_id: 0.5
task_completed: false
department: Setup
depends_on: 0.3, 0.4
file: /app/layout.tsx
```

**What to do:**

Replace the contents of `/app/layout.tsx` with the following.
This wraps the app in `PillProvider` and loads both fonts via `next/font/google`.

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { PillProvider } from "@/context/PillContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--next-font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--next-font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matrix Portfolio — Choose Your Reality",
  description:
    "A Matrix-themed developer portfolio. Take the red pill to see the code. Take the blue pill to see the resume.",
  keywords: ["developer", "portfolio", "matrix", "fullstack", "react", "nextjs"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <PillProvider>{children}</PillProvider>
      </body>
    </html>
  );
}
```

> ⚠️ Note: The font CSS variables (`--next-font-inter`, `--next-font-mono`) are set on `<html>`.
> The `globals.css` `--font-main` tokens reference them via Tailwind or direct `var()` usage.
> You may need to update the CSS tokens in Task 0.4 to point to these font variables
> if the fonts don't load. Test after completing this task.

---

## 🔍 Phase 0 Completion Checklist

Before marking Phase 0 as done and moving to Phase 1, verify ALL of the following:

- [ ] `npm run dev` starts without errors
- [ ] The app loads at `http://localhost:3000`
- [ ] No TypeScript errors in any placeholder file
- [ ] `/context/PillContext.tsx` exports `PillProvider` and `usePill`
- [ ] `globals.css` contains `.mode-red` and `.mode-blue` CSS classes
- [ ] `app/layout.tsx` wraps children in `<PillProvider>`
- [ ] Inter and JetBrains Mono fonts are configured
- [ ] All placeholder files exist (from Task 0.2)
- [ ] `framer-motion`, `gsap`, `@gsap/react`, `prisma`, `@prisma/client` are in `package.json`

---

## ➡️ Next Phase

Once all tasks above are `task_completed: true` → open `phase_1_landing.md`

---

*Phase: 0 | Department: Setup | Last updated: 2026-05-21*
