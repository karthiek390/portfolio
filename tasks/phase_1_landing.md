# 🌐 PHASE 1 — Landing Page "The Choice"

> **Read `MASTER.md` before this file.**
> This phase builds the first screen a visitor sees — the pill selection experience.
> No portfolio content is shown here. This is purely the entry gate.

---

## 📋 Phase Metadata

| Field          | Value                                      |
|----------------|--------------------------------------------|
| Phase          | 1                                          |
| Department     | UI                                         |
| Depends On     | Phase 0 (all tasks complete)               |
| Blocks         | Phase 4 (The Construct transition)         |
| Estimated Work | ~2–3 hours                                 |
| Phase Status   | ⏳ Not Started                              |

---

## 🧠 Context for the AI/Developer

This phase builds `app/page.tsx` — the root landing page.

### What this page does:
1. Fills the entire viewport (no scrolling, no navbar)
2. Renders the Matrix Code Rain canvas as the **full-screen background**
3. Overlays a centered **choice panel** on top of the rain
4. The choice panel shows:
   - A cryptic quote line
   - Two pill buttons (Red and Blue)
   - Subtle subtitle text
5. When a pill is clicked:
   - The `PillContext` mode is set to `"red"` or `"blue"`
   - The user is navigated to `/portfolio`

### Important design rules:
- The landing page has **no navbar**, **no footer**, **no scroll**
- The Matrix Rain canvas sits at `z-index: 0` (background)
- The choice panel sits at `z-index: 10` (foreground)
- The pill buttons must have a **glow hover effect** (red glow for red pill, blue glow for blue pill)
- Typography: Use `JetBrains Mono` for all text on this page (it's a Matrix moment, not corporate)
- This page does NOT use `mode-blue` or `mode-red` class — it is its own dark neutral state

### 21st.dev Component (Matrix Code Rain):
The Matrix Code Rain canvas is pulled from 21st.dev.
See Task 1.2 for exact installation instructions.
If the component is unavailable, Task 1.2 includes a built-from-scratch fallback.

---

## ✅ Tasks

---

### TASK 1.1 — Build the Landing Page Layout Shell

```
task_id: 1.1
task_completed: false
department: UI
depends_on: Phase 0 complete
file: /app/page.tsx
```

**What to do:**

Replace `/app/page.tsx` with the following shell structure.
Tasks 1.2, 1.3, and 1.4 will fill in the components referenced here.

```tsx
"use client";

import { useRouter } from "next/navigation";
import { usePill } from "@/context/PillContext";
import MatrixRain from "@/components/shared/MatrixRain";
import { PillMode } from "@/context/PillContext";

export default function LandingPage() {
  const { setMode } = usePill();
  const router = useRouter();

  const handlePillChoice = (choice: PillMode) => {
    setMode(choice);
    router.push("/portfolio");
  };

  return (
    <main
      id="landing-page"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* ── Layer 1: Matrix Rain Background ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        <MatrixRain />
      </div>

      {/* ── Layer 2: Choice Panel (foreground) ── */}
      <div
        id="choice-panel"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          textAlign: "center",
          padding: "3rem",
          border: "1px solid rgba(0,255,65,0.2)",
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          borderRadius: "4px",
          maxWidth: "480px",
          width: "90vw",
        }}
      >
        {/* Cryptic quote */}
        <p
          id="landing-quote"
          style={{
            color: "#00FF41",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          [ SYSTEM ALERT: ANOMALY DETECTED ]
        </p>

        {/* Main headline */}
        <h1
          id="landing-headline"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          This is your last chance.<br />
          After this, there is no turning back.
        </h1>

        {/* Pill buttons row */}
        <div
          id="pill-buttons"
          style={{
            display: "flex",
            gap: "2.5rem",
            alignItems: "center",
            marginTop: "0.5rem",
          }}
        >
          {/* Blue Pill */}
          <PillButton
            id="blue-pill-btn"
            color="blue"
            label="Blue Pill"
            sublabel="The story ends."
            onClick={() => handlePillChoice("blue")}
          />

          {/* Red Pill */}
          <PillButton
            id="red-pill-btn"
            color="red"
            label="Red Pill"
            sublabel="Stay in Wonderland."
            onClick={() => handlePillChoice("red")}
          />
        </div>

        {/* Footer hint */}
        <p
          id="landing-footer-hint"
          style={{
            color: "#00FF41",
            fontSize: "0.65rem",
            opacity: 0.4,
            letterSpacing: "0.1em",
          }}
        >
          YOU TAKE THE BLUE PILL — THE PORTFOLIO IS CLEAN. PROFESSIONAL. RECRUITER-READY.
          <br />
          YOU TAKE THE RED PILL — YOU SEE HOW DEEP THE CODE GOES.
        </p>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────
   PillButton — inline sub-component (local to this file)
   ───────────────────────────────────────────────────── */
interface PillButtonProps {
  id: string;
  color: "red" | "blue";
  label: string;
  sublabel: string;
  onClick: () => void;
}

function PillButton({ id, color, label, sublabel, onClick }: PillButtonProps) {
  const isRed = color === "red";

  const pillColor = isRed ? "#EF4444" : "#3B82F6";
  const glowColor = isRed
    ? "0 0 16px #EF4444, 0 0 40px #EF444466"
    : "0 0 16px #3B82F6, 0 0 40px #3B82F666";

  return (
    <button
      id={id}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6rem",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "'JetBrains Mono', monospace",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      {/* Pill SVG shape */}
      <div
        style={{
          width: "52px",
          height: "28px",
          borderRadius: "14px",
          backgroundColor: pillColor,
          boxShadow: glowColor,
          transition: "box-shadow 0.3s ease",
          transform: "rotate(-20deg)",
        }}
      />
      {/* Label */}
      <span
        style={{
          color: pillColor,
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textShadow: glowColor,
        }}
      >
        {label}
      </span>
      {/* Sublabel */}
      <span
        style={{
          color: "#888",
          fontSize: "0.65rem",
          letterSpacing: "0.05em",
        }}
      >
        {sublabel}
      </span>
    </button>
  );
}
```

---

### TASK 1.2 — Integrate Matrix Code Rain (21st.dev Component)

```
task_id: 1.2
task_completed: false
department: UI
depends_on: 1.1
file: /components/shared/MatrixRain.tsx
```

**What to do:**

#### Step A — Try the 21st.dev component first

Visit one of these two 21st.dev component pages and follow their CLI install instructions:
- `https://21st.dev/community/components/wisedev/matrix-code-rain/default`
- `https://21st.dev/community/components/thanh/matrix-code/matrix-code`

The install command will look like:
```bash
npx shadcn@latest add "https://21st.dev/r/[component-slug]"
```

After install, the component file will appear somewhere in `/components`.
Move or re-export it so that `@/components/shared/MatrixRain.tsx` is the import path
used by `app/page.tsx`.

The component MUST:
- Fill 100% width and 100% height of its parent container
- Accept no required props (or have sensible defaults)
- Use Katakana characters: `ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ10`
- Render green (`#00FF41`) characters on black

#### Step B — Fallback (if 21st.dev component is unavailable or broken)

If the 21st.dev component does not work, build this custom canvas implementation
and save it as `/components/shared/MatrixRain.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

const MATRIX_CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ10";
const FONT_SIZE = 16;
const COLOR = "#00FF41";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const columns = Math.floor(window.innerWidth / FONT_SIZE);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      // Fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = COLOR;
      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);

        // Reset drop randomly after it passes the screen
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="matrix-rain-canvas"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
}
```

> ✅ After this task: The landing page background should show animated green
> Matrix characters falling down the screen.

---

### TASK 1.3 — Add Framer Motion Entrance Animation to Choice Panel

```
task_id: 1.3
task_completed: false
department: UI
depends_on: 1.1, 1.2
file: /app/page.tsx
```

**What to do:**

Wrap the `choice-panel` `<div>` in `app/page.tsx` with a Framer Motion `motion.div`
so it fades in and slides up when the page loads.

Import at the top of `app/page.tsx`:
```tsx
import { motion } from "framer-motion";
```

Replace the choice panel `<div id="choice-panel" ...>` open tag with:
```tsx
<motion.div
  id="choice-panel"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
  style={{
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    textAlign: "center",
    padding: "3rem",
    border: "1px solid rgba(0,255,65,0.2)",
    backgroundColor: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(8px)",
    borderRadius: "4px",
    maxWidth: "480px",
    width: "90vw",
  }}
>
```

And close with `</motion.div>` instead of `</div>`.

Also wrap each pill button in a staggered `motion.div`:
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 1.2 }}
>
  <PillButton id="blue-pill-btn" ... />
</motion.div>

<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 1.5 }}
>
  <PillButton id="red-pill-btn" ... />
</motion.div>
```

> ✅ After this task: The panel and pills animate in smoothly on page load.

---

### TASK 1.4 — Wire Pill Choice to Navigation

```
task_id: 1.4
task_completed: false
department: UI
depends_on: 1.1
file: /app/page.tsx
```

**What to do:**

This task verifies the full click → state → navigate flow is working end-to-end.

The `handlePillChoice` function in `app/page.tsx` already does this:
```tsx
const handlePillChoice = (choice: PillMode) => {
  setMode(choice);           // Sets global context to "blue" or "red"
  router.push("/portfolio"); // Navigates to the portfolio page
};
```

**Verify the following manually:**

1. Click **Blue Pill** → `PillContext.mode` becomes `"blue"` → redirected to `/portfolio`
2. Click **Red Pill** → `PillContext.mode` becomes `"red"` → redirected to `/portfolio`
3. The `/portfolio` page receives the mode correctly (check with a `console.log(mode)` in `/app/portfolio/page.tsx` temporarily)
4. Going back to `/` with the browser back button works without errors

> ⚠️ Note: At this point `/app/portfolio/page.tsx` is still a placeholder.
> It will only show an empty page. That is expected — Phases 2 and 3 fill it in.
> The important thing here is that navigation and context state work correctly.

**Confirm routing is set up in `next.config.ts`:**

No special config needed for these routes. Next.js App Router handles them automatically:
- `/` → `app/page.tsx` ✅
- `/portfolio` → `app/portfolio/page.tsx` ✅
- Any unknown route → `app/not-found.tsx` ✅ (built in Phase 5)

---

## 🔍 Phase 1 Completion Checklist

Before marking Phase 1 as done and moving to Phase 2, verify ALL of the following:

- [ ] `http://localhost:3000` shows the landing page (not the Next.js default page)
- [ ] The Matrix Code Rain canvas fills the full screen background
- [ ] The choice panel is centered and visible on top of the rain
- [ ] The panel fades in with a slide-up animation on load
- [ ] Both pill buttons are visible with correct red/blue colors and glow
- [ ] Hovering a pill button causes it to scale up slightly
- [ ] Clicking **Blue Pill** → navigates to `/portfolio` with `mode === "blue"` in context
- [ ] Clicking **Red Pill** → navigates to `/portfolio` with `mode === "red"` in context
- [ ] No TypeScript errors in `app/page.tsx`
- [ ] No console errors in the browser

---

## 📸 Expected Visual Result

```
┌──────────────────────────────────────────────────────┐
│  [Matrix green rain falling in background]           │
│                                                      │
│         ┌────────────────────────────┐               │
│         │  [ SYSTEM ALERT: ANOMALY ] │               │
│         │                            │               │
│         │  This is your last chance. │               │
│         │  After this, there is no   │               │
│         │  turning back.             │               │
│         │                            │               │
│         │    💊 Blue    💊 Red        │               │
│         │  The story  Stay in        │               │
│         │   ends.    Wonderland.     │               │
│         │                            │               │
│         │  [footer hint text]        │               │
│         └────────────────────────────┘               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## ➡️ Next Phase

Once all tasks above are `task_completed: true` → open `phase_2_blue_pill_ui.md`

---

*Phase: 1 | Department: UI | Last updated: 2026-05-21*
