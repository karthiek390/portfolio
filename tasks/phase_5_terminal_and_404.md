# 💬 PHASE 5 — Terminal Contact Form + 404 Page

> **Read `MASTER.md` before this file.**
> Two self-contained UI features. Phase 5 can begin once Phase 3 is complete.
> API wiring for the contact form is completed in Phase 7 — this phase builds the UI only.

---

## 📋 Phase Metadata

| Field          | Value                                              |
|----------------|----------------------------------------------------|
| Phase          | 5                                                  |
| Department     | UI                                                 |
| Depends On     | Phase 3 complete                                   |
| Blocks         | Phase 7 (API wires into the form built here)       |
| Estimated Work | ~3 hours                                           |
| Phase Status   | ⏳ Not Started                                      |

---

## 🧠 Context for the AI/Developer

### Task 5.1 — Terminal Contact Form
- Lives in `/components/red/TerminalContactForm.tsx`
- Added to `portfolio/page.tsx` in the Red Pill layout (after `<RedCerts />`)
- Blue Pill gets a simple placeholder link to LinkedIn for contact (no form in v1)
- The form presents prompts **one at a time**, sequentially — like a terminal interrogation
- On submit, it calls `POST /api/contact` — **stub this call for now** (Phase 7 implements the route)
- Fields: `company` → `email` → `message`

### Task 5.2 — 404 Agent Smith Page
- Lives in `/app/not-found.tsx` (Next.js App Router catches all unknown routes here automatically)
- Fullscreen dark layout, no navbar
- Screen glitches, then text on the page systematically mutates to "SMITH"
- A single "DISCONNECT" button links back to `/`

---

## ✅ Tasks

---

### TASK 5.1 — Morpheus Terminal Contact Form

```
task_id: 5.1
task_completed: false
department: UI
depends_on: Phase 3 complete
file: /components/red/TerminalContactForm.tsx
```

**Interaction flow:**
```
> [SYS]: State your organization's designation...
  User types: Acme Corp          ← input appears inline
  User presses Enter

> [SYS]: Provide secure terminal routing address...
  User types: agent@acme.com
  User presses Enter

> [SYS]: What is the nature of your anomaly?
  User types: I want to hire you.
  User presses Enter

> SIGNAL READY — [ BROADCAST TO ZION ] button appears
  On click → POST /api/contact (stubbed) → shows confirmation
```

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROMPTS = [
  { key: "company", label: "[SYS]: State your organization's designation..." },
  { key: "email",   label: "[SYS]: Provide secure terminal routing address..." },
  { key: "message", label: "[SYS]: What is the nature of your anomaly?" },
] as const;

type FieldKey = (typeof PROMPTS)[number]["key"];

type FormData = Record<FieldKey, string>;

type Step = number; // 0 = company, 1 = email, 2 = message, 3 = review, 4 = sent

const STYLE = {
  green:  { color: "#00FF41", fontFamily: "JetBrains Mono, monospace" },
  muted:  { color: "#00802B", fontFamily: "JetBrains Mono, monospace" },
  dark:   { color: "#003B00", fontFamily: "JetBrains Mono, monospace" },
  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#00FF41",
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.9rem",
    width: "100%",
    caretColor: "#00FF41",
  } as React.CSSProperties,
};

export default function TerminalContactForm() {
  const [step, setStep]       = useState<Step>(0);
  const [current, setCurrent] = useState("");
  const [data, setData]       = useState<FormData>({ company: "", email: "", message: "" });
  const [status, setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle");
  const inputRef              = useRef<HTMLInputElement>(null);

  // Auto-focus input when step changes
  useEffect(() => {
    if (step < 3) inputRef.current?.focus();
  }, [step]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if (!current.trim()) return;

    const key = PROMPTS[step]?.key;
    if (!key) return;

    // Validate email on step 1
    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(current)) {
      setCurrent("");
      return;
    }

    setData((prev) => ({ ...prev, [key]: current.trim() }));
    setCurrent("");
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      // Phase 7 will implement this route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) setStep(4);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{ padding: "6rem 2.5rem", maxWidth: "780px", margin: "0 auto" }}
    >
      {/* Section label */}
      <p style={{ ...STYLE.dark, fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
        // MORPHEUS_INTERROGATION_PROTOCOL
      </p>
      <h2 style={{ ...STYLE.green, fontSize: "2rem", fontWeight: 700, marginBottom: "2.5rem" }}>
        Establish Contact
      </h2>

      {/* Terminal box */}
      <div style={{
        backgroundColor: "#050505",
        border: "1px solid rgba(0,255,65,0.25)",
        borderRadius: "4px",
        padding: "2rem",
        minHeight: "320px",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}>

        {/* Completed lines */}
        {PROMPTS.slice(0, step).map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
          >
            <p style={{ ...STYLE.dark, fontSize: "0.78rem" }}>{p.label}</p>
            <p style={{ ...STYLE.muted, fontSize: "0.9rem", paddingLeft: "1rem" }}>
              &gt; {data[PROMPTS[i].key]}
            </p>
          </motion.div>
        ))}

        {/* Active input prompt */}
        <AnimatePresence>
          {step < 3 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <p style={{ ...STYLE.muted, fontSize: "0.78rem" }}>
                {PROMPTS[step].label}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem" }}>
                <span style={{ ...STYLE.green, fontSize: "0.9rem" }}>&gt;</span>
                <input
                  ref={inputRef}
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={STYLE.input}
                  type={PROMPTS[step].key === "email" ? "email" : "text"}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="type and press Enter..."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review + submit */}
        {step === 3 && status !== "sent" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p style={{ ...STYLE.muted, fontSize: "0.78rem" }}>
              [SYS]: Signal ready. Confirm transmission?
            </p>
            <button
              id="contact-submit-btn"
              onClick={handleSubmit}
              disabled={status === "sending"}
              style={{
                alignSelf: "flex-start",
                padding: "0.65rem 1.5rem",
                backgroundColor: "transparent",
                border: "1px solid #00FF41",
                color: "#00FF41",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.82rem",
                letterSpacing: "0.08em",
                cursor: "pointer",
                borderRadius: "2px",
                boxShadow: status === "sending" ? "0 0 12px #00FF4166" : "none",
                transition: "box-shadow 0.2s",
              }}
            >
              {status === "sending" ? "TRANSMITTING..." : "[ BROADCAST TO ZION ]"}
            </button>
            {status === "error" && (
              <p style={{ ...STYLE.dark, fontSize: "0.75rem" }}>
                [ERR]: Transmission failed. Retry or contact via LinkedIn.
              </p>
            )}
          </motion.div>
        )}

        {/* Success state */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{ ...STYLE.green, fontSize: "0.9rem", textShadow: "0 0 8px #00FF41" }}>
              ✓ SIGNAL RECEIVED BY ZION MAINFRAME
            </p>
            <p style={{ ...STYLE.muted, fontSize: "0.78rem", marginTop: "0.5rem" }}>
              Message from {data.company} logged. I'll respond within 24 hours.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
```

**Add to `portfolio/page.tsx` Red layout** (after `<RedCerts />`):
```tsx
import TerminalContactForm from "@/components/red/TerminalContactForm";

// In the Red Pill layout:
<RedNavbar onSwitchMode={switchMode} />
<RedHero />
<RedProjects />
<RedCerts />
<TerminalContactForm />   {/* ← add this */}
```

---

### TASK 5.2 — 404 Agent Smith Page

```
task_id: 5.2
task_completed: false
department: UI
depends_on: Phase 0 complete
file: /app/not-found.tsx
```

**What this does:**
- Full-screen black page — no navbar
- Glitch animation plays on load (CSS keyframes)
- Paragraph text mutates to "SMITH" word by word using a timed interval
- ASCII sunglasses art renders in the center
- "DISCONNECT" button returns to homepage

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ORIGINAL_TEXT = "Threat detected: Anomaly in Sector 404. The system has been compromised. An Agent has been deployed to resolve the anomaly. Resistance is futile.";

// Splits text to words and replaces them with SMITH progressively
function smithify(text: string, progress: number): string {
  const words = text.split(" ");
  return words
    .map((word, i) => (i < progress ? "SMITH" : word))
    .join(" ");
}

const ASCII_GLASSES = `
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░ ▄▄▄▄▄ ░░░░░░░░░░░░░░ ▄▄▄▄▄ ░░
    ░░ █████ ░░░░░░▀█▀░░░░░ █████ ░░
    ░░ ▀▀▀▀▀ ░░░░░░░░░░░░░░ ▀▀▀▀▀ ░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`;

export default function NotFound() {
  const router                  = useRouter();
  const [smithProgress, setSmithProgress] = useState(0);
  const totalWords              = ORIGINAL_TEXT.split(" ").length;

  // Progressively replace words with SMITH
  useEffect(() => {
    if (smithProgress >= totalWords) return;
    const t = setTimeout(
      () => setSmithProgress((p) => p + 1),
      120 // ms between each word mutation
    );
    return () => clearTimeout(t);
  }, [smithProgress, totalWords]);

  return (
    <div
      id="agent-smith-404"
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#00FF41",
        fontFamily: "JetBrains Mono, monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        gap: "2rem",
        overflow: "hidden",
      }}
    >
      {/* Glitch header */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7, 1] }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#003B00" }}
      >
        [ SYSTEM_BREACH_DETECTED ]
      </motion.p>

      {/* ASCII sunglasses */}
      <motion.pre
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          color: "#00FF41",
          fontSize: "clamp(0.5rem, 1.2vw, 0.85rem)",
          textShadow: "0 0 12px #00FF41",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {ASCII_GLASSES}
      </motion.pre>

      {/* Mutating paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          maxWidth: "520px",
          textAlign: "center",
          fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
          lineHeight: 1.8,
          color: smithProgress === totalWords ? "#FF0000" : "#00FF41",
          textShadow: smithProgress === totalWords ? "0 0 12px #FF0000" : "0 0 6px #00FF41",
          transition: "color 0.3s, text-shadow 0.3s",
        }}
      >
        {smithify(ORIGINAL_TEXT, smithProgress)}
      </motion.p>

      {/* Disconnect button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        id="smith-disconnect-btn"
        onClick={() => router.push("/")}
        style={{
          padding: "0.75rem 2rem",
          backgroundColor: "transparent",
          border: "1px solid #00FF41",
          color: "#00FF41",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          cursor: "pointer",
          borderRadius: "2px",
          transition: "box-shadow 0.2s, background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.boxShadow = "0 0 20px #00FF4188";
          (e.target as HTMLElement).style.backgroundColor = "rgba(0,255,65,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.boxShadow = "none";
          (e.target as HTMLElement).style.backgroundColor = "transparent";
        }}
      >
        [ DISCONNECT ]
      </motion.button>
    </div>
  );
}
```

> ✅ Next.js automatically renders `app/not-found.tsx` for any unmatched route.
> No routing config needed.

---

## 🔍 Phase 5 Completion Checklist

- [ ] Terminal form appears in Red Pill portfolio page below certifications
- [ ] Form prompts appear one at a time (company → email → message)
- [ ] Pressing Enter advances to the next prompt
- [ ] Invalid email input does NOT advance (clears and stays on email step)
- [ ] "BROADCAST TO ZION" button appears after all 3 fields are filled
- [ ] Clicking submit calls `/api/contact` (returns 404 for now — Phase 7 builds the route)
- [ ] Success state shows "✓ SIGNAL RECEIVED BY ZION MAINFRAME"
- [ ] Visiting any unknown URL (e.g. `/xyz`) renders the 404 Agent Smith page
- [ ] Text on 404 page mutates word-by-word to "SMITH" on load
- [ ] DISCONNECT button on 404 page routes back to `/`
- [ ] No TypeScript or console errors

---

## ➡️ Next Phase

Once all tasks above are `task_completed: true` → open `phase_6_nebuchadnezzar.md`

---

*Phase: 5 | Department: UI | Last updated: 2026-05-21*
