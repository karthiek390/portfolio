# 🚀 PHASE 6 — Nebuchadnezzar Status (Live GitHub Feed)

> **Read `MASTER.md` before this file.**
> This phase builds the "Ship Diagnostics" panel for Red Pill mode.
> It depends on Phase 7 (API route) being complete before the live data works.
> Build the UI first with mock data — swap to live API after Phase 7 is done.

---

## 📋 Phase Metadata

| Field          | Value                                              |
|----------------|----------------------------------------------------|
| Phase          | 6                                                  |
| Department     | UI + API (UI built here, API built in Phase 7)     |
| Depends On     | Phase 3 complete (Red Pill layout exists)          |
| Blocked By     | Phase 7 must be done before live data works        |
| Estimated Work | ~1.5 hours (UI) + wiring after Phase 7             |
| Phase Status   | ⏳ Not Started                                      |

---

## 🧠 Context for the AI/Developer

### What the Nebuchadnezzar Status Panel Shows
A terminal-styled "ship diagnostics" panel that displays:
- Your latest GitHub commit message + repo name
- Time since the commit (e.g. "3 hours ago")
- A link to the commit on GitHub
- A pulsing "ONLINE" indicator showing the ship is active

### Data Flow
```
NebuchadnezzarStatus.tsx
  → fetch("/api/github-status")         ← built in Phase 7
    → GitHub REST API (server-side)
      → returns: { repo, message, time_ago, url, avatar_url }
  → renders the panel with live data
```

### Mock Data (use until Phase 7 is complete)
```ts
const MOCK_DATA = {
  repo:      "karthiek/matrix-portfolio",
  message:   "feat: add terminal contact form",
  time_ago:  "2 hours ago",
  url:       "https://github.com",
  avatar_url: "",
};
```

### Where it lives in the page
Added to `portfolio/page.tsx` Red Pill layout, between `<RedCerts />` and `<TerminalContactForm />`.

---

## ✅ Tasks

---

### TASK 6.1 — Build NebuchadnezzarStatus UI Component

```
task_id: 6.1
task_completed: false
department: UI
depends_on: Phase 3 complete
file: /components/red/NebuchadnezzarStatus.tsx
```

**Build the component using mock data first. Phase 7 replaces the mock.**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GitHubStatus {
  repo:       string;
  message:    string;
  time_ago:   string;
  url:        string;
  avatar_url: string;
}

// ── Swap this out after Phase 7 is complete ──────────────
const MOCK_DATA: GitHubStatus = {
  repo:       "REPLACE_GITHUB_USERNAME/REPLACE_REPO_NAME",
  message:    "feat: add terminal contact form",
  time_ago:   "2 hours ago",
  url:        "https://github.com",
  avatar_url: "",
};
const USE_MOCK = true; // Set to false after Phase 7 API is live
// ────────────────────────────────────────────────────────

type LoadState = "loading" | "ready" | "error";

export default function NebuchadnezzarStatus() {
  const [data,  setData]  = useState<GitHubStatus | null>(null);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    if (USE_MOCK) {
      // Simulate a brief network delay for realism
      const t = setTimeout(() => { setData(MOCK_DATA); setState("ready"); }, 800);
      return () => clearTimeout(t);
    }

    fetch("/api/github-status")
      .then((r) => r.json())
      .then((d) => { setData(d); setState("ready"); })
      .catch(() => setState("error"));
  }, []);

  return (
    <section
      id="nebuchadnezzar-status"
      style={{ padding: "4rem 2.5rem", maxWidth: "780px", margin: "0 auto" }}
    >
      {/* Label */}
      <p style={{
        color: "#003B00", fontSize: "0.7rem",
        letterSpacing: "0.15em", marginBottom: "0.5rem",
        fontFamily: "JetBrains Mono, monospace",
      }}>
        // NEBUCHADNEZZAR_SHIP_DIAGNOSTICS
      </p>

      {/* Panel box */}
      <div style={{
        backgroundColor: "#050505",
        border: "1px solid rgba(0,255,65,0.25)",
        borderRadius: "4px",
        padding: "1.75rem 2rem",
        fontFamily: "JetBrains Mono, monospace",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Scanline overlay (pure CSS, cosmetic) */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)",
          zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: "1.5rem" }}>

            <p style={{ color: "#00FF41", fontSize: "0.85rem",
              fontWeight: 700, letterSpacing: "0.1em",
              textShadow: "0 0 8px #00FF41" }}>
              HOVERCRAFT: NEBUCHADNEZZAR
            </p>

            {/* Pulsing online indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <motion.div
                animate={{ opacity: [1, 0.2, 1], scale: [1, 0.85, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                style={{
                  width: "8px", height: "8px",
                  borderRadius: "50%", backgroundColor: "#00FF41",
                  boxShadow: "0 0 8px #00FF41",
                }}
              />
              <span style={{ color: "#00802B", fontSize: "0.68rem", letterSpacing: "0.1em" }}>
                ONLINE
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(0,255,65,0.15)", marginBottom: "1.5rem" }} />

          {/* Loading state */}
          {state === "loading" && (
            <motion.p
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              style={{ color: "#00802B", fontSize: "0.82rem" }}
            >
              SCANNING ZION MAINFRAME...
            </motion.p>
          )}

          {/* Error state */}
          {state === "error" && (
            <p style={{ color: "#FF4444", fontSize: "0.82rem" }}>
              [ERR]: Unable to reach Zion. Signal lost.
            </p>
          )}

          {/* Ready state */}
          {state === "ready" && data && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Current location */}
              <StatusRow
                label="CURRENT_LOCATION"
                value="Broadcasting from Zion Mainframe..."
              />

              {/* Active repo */}
              <StatusRow
                label="ACTIVE_CONSTRUCT"
                value={data.repo}
              />

              {/* Last commit */}
              <StatusRow
                label="LAST_SYSTEM_UPDATE"
                value={`"${data.message}"`}
                highlight
              />

              {/* Time ago */}
              <StatusRow
                label="UPDATE_TIMESTAMP"
                value={data.time_ago}
              />

              {/* Link to commit */}
              <div style={{ marginTop: "0.5rem" }}>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#00FF41",
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(0,255,65,0.35)",
                    paddingBottom: "1px",
                    transition: "text-shadow 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.textShadow = "0 0 8px #00FF41")}
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.textShadow = "none")}
                >
                  VIEW_IN_MAINFRAME →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Sub-component: a single status row ─── */
function StatusRow({
  label, value, highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start",
      flexWrap: "wrap" }}>
      <span style={{
        color: "#003B00", fontSize: "0.68rem",
        letterSpacing: "0.08em", minWidth: "180px",
        flexShrink: 0,
      }}>
        {label}:
      </span>
      <span style={{
        color: highlight ? "#00FF41" : "#00802B",
        fontSize: "0.82rem",
        textShadow: highlight ? "0 0 6px #00FF4166" : "none",
        wordBreak: "break-word",
      }}>
        {value}
      </span>
    </div>
  );
}
```

---

### TASK 6.2 — Wire Component into Portfolio Page + Flip to Live Data After Phase 7

```
task_id: 6.2
task_completed: false
department: UI
depends_on: 6.1
file: /app/portfolio/page.tsx
```

**Step A — Add to Red Pill layout in `portfolio/page.tsx`:**

```tsx
import NebuchadnezzarStatus from "@/components/red/NebuchadnezzarStatus";

// Red Pill layout (add between RedCerts and TerminalContactForm):
<RedNavbar onSwitchMode={switchMode} />
<RedHero />
<RedProjects />
<RedCerts />
<NebuchadnezzarStatus />        {/* ← add here */}
<TerminalContactForm />
```

**Step B — After Phase 7 is complete, update `NebuchadnezzarStatus.tsx`:**

```ts
// Change this one line at the top of NebuchadnezzarStatus.tsx:
const USE_MOCK = false;  // was: true
```

That's the only change needed — the `useEffect` already handles the live fetch path.

> ✅ This is the cleanest handoff point between UI (Phase 6) and API (Phase 7).
> The UI AI and API AI only need to coordinate on this single boolean flag.

---

## 🔍 Phase 6 Completion Checklist

- [ ] `NebuchadnezzarStatus` renders in Red Pill mode below certifications
- [ ] "SCANNING ZION MAINFRAME..." loading state shows for ~800ms then resolves
- [ ] Mock data displays correctly in all 4 status rows
- [ ] The green pulsing ONLINE dot animates continuously
- [ ] Scanline overlay is visible (faint horizontal lines on the panel)
- [ ] "VIEW_IN_MAINFRAME →" link is clickable (opens GitHub in new tab)
- [ ] Component does NOT appear in Blue Pill mode
- [ ] After Phase 7: `USE_MOCK = false` and real commit data loads from `/api/github-status`
- [ ] No TypeScript or console errors

---

## ➡️ Next Phase

Once Task 6.1 is `task_completed: true` →
Proceed to **Phase 7 and Phase 8 in parallel** (they don't depend on each other).

- **DB AI** → open `phase_8_database.md` first (schema must exist before API can write to it)
- **API AI** → open `phase_7_api.md` (reads Phase 8's schema to write queries)

---

*Phase: 6 | Department: UI | Last updated: 2026-05-21*
