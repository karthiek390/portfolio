# ✨ PHASE 4 — Transitions & Effects

> **Read `MASTER.md` before this file.**
> This phase layers cinematic effects on top of the existing UI.
> No new sections are added — only animations and transitions are wired in.

---

## 📋 Phase Metadata

| Field          | Value                                      |
|----------------|--------------------------------------------|
| Phase          | 4                                          |
| Department     | UI                                         |
| Depends On     | Phase 1 + Phase 2 + Phase 3 complete       |
| Blocks         | Nothing (last UI-only phase)               |
| Estimated Work | ~3–4 hours                                 |
| Phase Status   | ⏳ Not Started                              |

---

## 🧠 Context for the AI/Developer

This phase has 3 self-contained tasks. Each can be built independently.

| Task | Feature | Complexity |
|------|---------|-----------|
| 4.1 | "The Construct" — full-screen white room transition on pill switch | High |
| 4.2 | Glitch text reusable component (wraps any text node) | Low |
| 4.3 | Neo bullet-dodge 3D card tilt on project cards | Medium |

### How Pill Toggling Currently Works (Before This Phase)
Right now, clicking the pill toggle in the Navbar calls `setMode()` directly,
which instantly swaps the CSS class. After this phase, clicking the toggle
triggers `TheConstruct` transition first, then swaps the mode after the
animation completes.

---

## ✅ Tasks

---

### TASK 4.1 — "The Construct" Transition

```
task_id: 4.1
task_completed: false
department: UI
depends_on: Phase 3 complete
files:
  - /transitions/TheConstruct.tsx
  - /components/shared/Navbar.tsx   (update both pill toggles)
  - /components/blue/Navbar.tsx     (update toggle handler)
  - /components/red/Navbar.tsx      (update toggle handler)
```

**What this does:**
When the user clicks the pill toggle button, instead of instantly swapping modes:
1. A full-screen white overlay fades in (covers the entire page)
2. A single line of text types out in the center
3. After the text completes, the pill mode is swapped in context
4. The white overlay fades out, revealing the new mode

**Step A — Build `/transitions/TheConstruct.tsx`:**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TheConstructProps {
  isVisible: boolean;
  onComplete: () => void;
}

const CONSTRUCT_TEXT =
  "This is the Construct. It is our loading program. We can load anything.";

export default function TheConstruct({ isVisible, onComplete }: TheConstructProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex]         = useState(0);

  // Type out text character by character when visible
  useEffect(() => {
    if (!isVisible) {
      setDisplayedText("");
      setCharIndex(0);
      return;
    }

    if (charIndex < CONSTRUCT_TEXT.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + CONSTRUCT_TEXT[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 28); // typing speed in ms
      return () => clearTimeout(timer);
    }

    // Text fully typed — wait then signal complete
    const done = setTimeout(onComplete, 600);
    return () => clearTimeout(done);
  }, [isVisible, charIndex, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="the-construct-overlay"
          key="construct"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Typed text */}
          <p
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
              color: "#000000",
              textAlign: "center",
              maxWidth: "600px",
              padding: "0 2rem",
              letterSpacing: "0.02em",
              lineHeight: 1.6,
            }}
          >
            {displayedText}
            {/* Blinking cursor while typing */}
            {charIndex < CONSTRUCT_TEXT.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                style={{ marginLeft: "2px" }}
              >
                |
              </motion.span>
            )}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Step B — Create a `usePillTransition` hook** in `/context/PillContext.tsx`:

Add this hook alongside the existing exports:

```tsx
// Add to /context/PillContext.tsx

import { useState, useCallback } from "react";

// Hook that any component uses to trigger a pill switch WITH The Construct
export function usePillTransition() {
  const { setMode } = usePill();
  const [constructVisible, setConstructVisible] = useState(false);
  const [pendingMode, setPendingMode]           = useState<PillMode | null>(null);

  // Call this instead of setMode() directly
  const switchMode = useCallback((newMode: PillMode) => {
    setPendingMode(newMode);
    setConstructVisible(true);
  }, []);

  // Called by TheConstruct when animation finishes
  const onConstructComplete = useCallback(() => {
    if (pendingMode) setMode(pendingMode);
    setConstructVisible(false);
    setPendingMode(null);
  }, [pendingMode, setMode]);

  return { constructVisible, switchMode, onConstructComplete };
}
```

**Step C — Mount `TheConstruct` in `/app/portfolio/page.tsx`:**

```tsx
// Add to /app/portfolio/page.tsx
import TheConstruct from "@/transitions/TheConstruct";
import { usePillTransition } from "@/context/PillContext";

// Inside PortfolioPage component:
const { constructVisible, switchMode, onConstructComplete } = usePillTransition();

// Pass `switchMode` down to both Navbars as a prop:
// <BlueNavbar onSwitchMode={switchMode} />
// <RedNavbar  onSwitchMode={switchMode} />

// Add TheConstruct overlay at the bottom of the JSX (before closing div):
<TheConstruct isVisible={constructVisible} onComplete={onConstructComplete} />
```

**Step D — Update both Navbars to accept `onSwitchMode` prop:**

In `/components/blue/Navbar.tsx`, change the toggle button to:
```tsx
// Change component signature:
export default function BlueNavbar({ onSwitchMode }: { onSwitchMode: (m: PillMode) => void }) {

// Change toggle button onClick:
onClick={() => onSwitchMode("red")}
```

In `/components/red/Navbar.tsx`, same pattern:
```tsx
export default function RedNavbar({ onSwitchMode }: { onSwitchMode: (m: PillMode) => void }) {
// onClick:
onClick={() => onSwitchMode("blue")}
```

> ✅ After this task: Clicking any pill toggle flashes the white Construct room,
> types out the quote, then dissolves into the new mode.

---

### TASK 4.2 — Glitch Text Reusable Component

```
task_id: 4.2
task_completed: false
department: UI
depends_on: Phase 0 complete (globals.css already has .glitch CSS)
file: /components/shared/GlitchText.tsx
```

**What this does:**
A wrapper component that applies the `.glitch` CSS class from `globals.css`
to any text. Used on nav links, headings, and wherever glitch hover is needed.

> The CSS for `.glitch` is already written in `globals.css` (Task 0.4).
> This task just creates the reusable React wrapper.

```tsx
interface GlitchTextProps {
  children: string;       // Must be a plain string (used in data-text attr)
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  className?: string;
}

export default function GlitchText({
  children,
  as: Tag = "span",
  style,
  className,
}: GlitchTextProps) {
  return (
    // @ts-expect-error — dynamic tag is valid HTML element
    <Tag
      className={`glitch ${className ?? ""}`}
      data-text={children}
      style={style}
    >
      {children}
    </Tag>
  );
}
```

**Usage example** (already done in `red/Navbar.tsx` via `data-text` + `className="glitch"`,
but this component makes it cleaner in other places):

```tsx
import GlitchText from "@/components/shared/GlitchText";

<GlitchText as="h1" style={{ color: "#00FF41", fontSize: "2rem" }}>
  MATRIX PORTFOLIO
</GlitchText>
```

**Where to apply `GlitchText` after building it:**
- Red Pill Hero heading (Task 3.2) — wrap the name `<h1>` with `<GlitchText>`
- Red Pill Navbar logo (Task 3.1) — wrap the `KD://` span

> ⚠️ The glitch effect only activates in `.mode-red` context (see `globals.css`).
> In Blue Pill mode, `GlitchText` renders as plain text with no animation.

---

### TASK 4.3 — Neo Bullet-Dodge Card Tilt

```
task_id: 4.3
task_completed: false
department: UI
depends_on: Phase 3 complete (red/ProjectCard.tsx exists)
files:
  - /components/red/ProjectCard.tsx   (add tilt logic)
  - /components/blue/ProjectCard.tsx  (add tilt logic — optional, subtler)
```

**What this does:**
On mouse move over a project card, the card tilts in 3D perspective
away from the cursor — simulating Neo dodging bullets.
Uses pure CSS `transform: perspective() rotateX() rotateY()` driven by mouse position.
No external library needed.

**Add this hook inside both `ProjectCard.tsx` files** (or extract to `/lib/useTilt.ts`):

```tsx
// /lib/useTilt.ts
import { useRef, useCallback } from "react";

export function useTilt(intensity = 15) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = e.clientX - cx;
    const dy    = e.clientY - cy;

    // Tilt AWAY from cursor (negative multiplier = dodge effect)
    const rotateX =  (dy / (rect.height / 2)) * -intensity;
    const rotateY = -(dx / (rect.width  / 2)) * -intensity;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    cardRef.current.style.transition = "transform 0.5s ease";
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.1s ease";
  }, []);

  return { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter };
}
```

**Wire into `red/ProjectCard.tsx`** — add to the outer card `<div>`:

```tsx
import { useTilt } from "@/lib/useTilt";

// Inside RedProjectCard component:
const { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt(12);

// Add to the card div:
<div
  ref={cardRef}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  onMouseEnter={handleMouseEnter}
  style={{
    // ... existing styles ...
    transition: "transform 0.5s ease, border-color 0.2s, box-shadow 0.2s",
    willChange: "transform",
  }}
>
```

**Wire into `blue/ProjectCard.tsx`** — same hook, lower intensity:
```tsx
const { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt(6);
// Subtler tilt for the corporate Blue Pill mode
```

---

## 🔍 Phase 4 Completion Checklist

- [ ] Clicking pill toggle (Blue → Red) shows white Construct screen
- [ ] Construct text types out character by character
- [ ] After text completes, mode switches and white screen fades out
- [ ] Clicking pill toggle (Red → Blue) also goes through The Construct
- [ ] `GlitchText` component exists and is applied to Red Pill hero name
- [ ] Hovering a Red Pill project card causes it to tilt in 3D
- [ ] Card returns to flat position when mouse leaves
- [ ] Tilt transition is smooth (not janky)
- [ ] No TypeScript errors in any modified file
- [ ] The Construct overlay sits above all content (`z-index: 9999`)

---

## ➡️ Next Phase

Once all tasks above are `task_completed: true` → open `phase_5_terminal_and_404.md`

---

*Phase: 4 | Department: UI | Last updated: 2026-05-21*
