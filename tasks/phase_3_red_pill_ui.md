# 🔴 PHASE 3 — Red Pill UI (Hacker/Terminal Mode)

> **Read `MASTER.md` before this file.**
> This phase builds all Red Pill (hacker/terminal) UI sections.
> Uses the same section layout as Phase 2 but with a completely different skin.

---

## 📋 Phase Metadata

| Field          | Value                                      |
|----------------|--------------------------------------------|
| Phase          | 3                                          |
| Department     | UI                                         |
| Depends On     | Phase 2 complete                           |
| Blocks         | Phase 4 (effects layer)                    |
| Estimated Work | ~4–5 hours                                 |
| Phase Status   | ⏳ Not Started                              |

---

## 🧠 Context for the AI/Developer

### Design Rules for Red Pill Mode
- Background: `#000000`
- Text / Primary: `#00FF41` (Matrix green)
- Font: `JetBrains Mono` (monospace everywhere)
- Borders: `1px solid rgba(0,255,65,0.25)`
- Cards: dark surface `#0D0D0D`, green glow on hover
- Use CSS class `.glitch` (defined in `globals.css`) on nav links for hover glitch effect
- All section headings styled like terminal output: prefix with `>` or `//`

### Text Scramble Effect (used on project card hover)
A lightweight JS utility that rapidly cycles random characters before
settling on the real text. Implementation is provided in Task 3.3.

### Updating portfolio/page.tsx
At end of this phase, uncomment the Red imports in `/app/portfolio/page.tsx`
and replace the placeholder `<div>` with the real Red components.

---

## ✅ Tasks

---

### TASK 3.1 — Red Pill Navbar

```
task_id: 3.1
task_completed: false
department: UI
depends_on: Phase 2 complete
file: /components/red/Navbar.tsx
```

**Design:** Pure black, green text, glitch effect on link hover, hardline phone toggle icon.

```tsx
"use client";
import { usePill } from "@/context/PillContext";

const NAV_LINKS = [
  { label: "INIT",     href: "#hero" },
  { label: "PROJECTS", href: "#projects" },
  { label: "PROGRAMS", href: "#certs" },
  { label: "TRANSMIT", href: "#contact" },
];

export default function RedNavbar() {
  const { setMode } = usePill();

  return (
    <nav
      id="red-navbar"
      style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 2.5rem",
        backgroundColor: "#000",
        borderBottom: "1px solid rgba(0,255,65,0.2)",
        fontFamily: "JetBrains Mono, monospace",
      }}
    >
      {/* Logo */}
      <span
        id="red-nav-logo"
        style={{ color: "#00FF41", fontWeight: 700, fontSize: "1rem",
          letterSpacing: "0.15em", textShadow: "0 0 8px #00FF41" }}
      >
        KD<span style={{ opacity: 0.5 }}>://</span>
      </span>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            id={`red-nav-${link.label.toLowerCase()}`}
            data-text={link.label}
            className="glitch"
            style={{
              color: "#00FF41", textDecoration: "none",
              fontSize: "0.78rem", letterSpacing: "0.1em",
              transition: "text-shadow 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.textShadow = "0 0 10px #00FF41")}
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.textShadow = "none")}
          >
            {link.label}
          </a>
        ))}

        {/* Pill toggle — hardline phone icon */}
        <button
          id="red-pill-toggle-btn"
          onClick={() => setMode("blue")}
          title="Disconnect — switch to Blue Pill"
          style={{
            background: "transparent",
            border: "1px solid rgba(0,255,65,0.4)",
            color: "#00FF41", borderRadius: "4px",
            padding: "0.35rem 0.85rem",
            fontSize: "0.72rem", letterSpacing: "0.08em",
            cursor: "pointer", fontFamily: "inherit",
            transition: "box-shadow 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.boxShadow = "0 0 12px #00FF4188")}
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.boxShadow = "none")}
        >
          ☎ DISCONNECT
        </button>
      </div>
    </nav>
  );
}
```

---

### TASK 3.2 — Red Pill Hero Section

```
task_id: 3.2
task_completed: false
department: UI
depends_on: 3.1
file: /components/red/Hero.tsx
```

**Design:** Terminal-style. Text appears to be typed line by line using Framer Motion.
Each line is a "system log" entry.

```tsx
"use client";
import { motion } from "framer-motion";

const LINES = [
  { prefix: "SYS",  text: "Wake up, Recruiter..." },
  { prefix: "SYS",  text: "The Matrix has you." },
  { prefix: "ID",   text: "SUBJECT: Karthiek Duggirala" },
  { prefix: "ROLE", text: "Full-Stack Engineer // Cloud Practitioner" },
  { prefix: "BIO",  text: "REPLACE: 1-2 sentence bio about yourself." },
  { prefix: "LOC",  text: "Broadcasting from Zion Mainframe..." },
];

export default function RedHero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "90vh", display: "flex", alignItems: "center",
        padding: "6rem 2.5rem", maxWidth: "860px", margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

        {LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.25, duration: 0.4 }}
            style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}
          >
            {/* Prefix badge */}
            <span style={{
              color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.1em",
              fontFamily: "JetBrains Mono, monospace", minWidth: "50px",
            }}>
              [{line.prefix}]
            </span>

            {/* Line text */}
            <span style={{
              color: i < 2 ? "#00802B" : "#00FF41",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: i === 3 ? "clamp(1.4rem,4vw,2.4rem)" : "1rem",
              fontWeight: i === 3 ? 700 : 400,
              textShadow: i === 3 ? "0 0 16px #00FF41" : "none",
              lineHeight: 1.5,
            }}>
              {i === 3 ? (
                <h1 style={{ margin: 0, fontSize: "inherit",
                  fontWeight: "inherit", color: "inherit" }}>
                  {line.text}
                </h1>
              ) : line.text}
            </span>
          </motion.div>
        ))}

        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{
            color: "#00FF41", fontSize: "1.2rem",
            fontFamily: "JetBrains Mono, monospace", marginTop: "0.5rem",
          }}
        >
          _
        </motion.span>

        {/* CTA links */}
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem" }}>
          {[
            { label: ">> LINKEDIN",  href: "https://linkedin.com/in/REPLACE" },
            { label: ">> GITHUB",    href: "https://github.com/REPLACE" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank" rel="noopener noreferrer"
              style={{
                color: "#00FF41", textDecoration: "none",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.85rem", letterSpacing: "0.08em",
                borderBottom: "1px solid rgba(0,255,65,0.4)",
                paddingBottom: "2px", transition: "text-shadow 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.textShadow = "0 0 10px #00FF41")}
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.textShadow = "none")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### TASK 3.3 — Red Pill Project Card + Text Scramble

```
task_id: 3.3
task_completed: false
department: UI
depends_on: 3.1
files:
  - /components/red/ProjectCard.tsx
  - /components/red/ProjectsGrid.tsx
```

**Text Scramble:** On hover, the card title rapidly cycles random Matrix characters
before locking into the real title. Add this hook inside `ProjectCard.tsx`:

```tsx
"use client";
import { useState, useRef, useCallback } from "react";

const CHARS = "ｱｲｳｴｵｶｷｸｹｺﾀﾁﾂﾃﾄ01";

function useScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIter = original.length * 3;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const tick = () => {
      setDisplay(
        original.split("").map((char, idx) =>
          idx < Math.floor(iteration / 3)
            ? char
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      iteration++;
      if (iteration < maxIter) frameRef.current = requestAnimationFrame(tick);
      else setDisplay(original);
    };
    tick();
  }, [original]);

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplay(original);
  }, [original]);

  return { display, scramble, reset };
}
```

**ProjectCard.tsx** (uses the hook above):

```tsx
interface RedProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export default function RedProjectCard({
  title, description, techStack, githubUrl, liveUrl,
}: RedProjectCardProps) {
  const { display, scramble, reset } = useScramble(title);

  return (
    <div
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{
        backgroundColor: "#0D0D0D",
        border: "1px solid rgba(0,255,65,0.2)",
        borderRadius: "4px", padding: "1.75rem",
        display: "flex", flexDirection: "column", gap: "1rem",
        transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#00FF41";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(0,255,65,0.15)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,65,0.2)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Encrypted label */}
      <p style={{ color: "#003B00", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
        [CLASSIFIED_FILE]
      </p>

      {/* Scrambling title */}
      <h3 style={{
        color: "#00FF41", fontFamily: "JetBrains Mono, monospace",
        fontSize: "1rem", fontWeight: 700, letterSpacing: "0.05em",
        textShadow: "0 0 8px #00FF4166",
      }}>
        {display}
      </h3>

      <p style={{ color: "#00802B", fontSize: "0.85rem", lineHeight: 1.7 }}>
        {description}
      </p>

      {/* Tech stack as "Exploits" */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {techStack.map((tech) => (
          <span key={tech} style={{
            padding: "0.15rem 0.5rem",
            border: "1px solid rgba(0,255,65,0.3)",
            color: "#00FF41", borderRadius: "2px",
            fontSize: "0.68rem", letterSpacing: "0.08em",
          }}>
            EXPLOIT: {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "1.5rem", marginTop: "auto" }}>
        <a
          href={githubUrl} target="_blank" rel="noopener noreferrer"
          style={{
            color: "#00FF41", textDecoration: "none",
            fontSize: "0.78rem", fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.05em", borderBottom: "1px solid rgba(0,255,65,0.3)",
          }}
        >
          EXTRACT_CODEBASE →
        </a>
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: "#00802B", textDecoration: "none", fontSize: "0.78rem" }}>
            LIVE_INSTANCE →
          </a>
        )}
      </div>
    </div>
  );
}
```

**ProjectsGrid.tsx** — import same `PROJECTS` data from Phase 2 or duplicate:

```tsx
import RedProjectCard from "./ProjectCard";

// REPLACE: Same projects as Blue Pill — same data, different card skin
const PROJECTS = [
  {
    title: "Project Alpha",
    description: "REPLACE: Description.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/REPLACE",
  },
  {
    title: "Project Beta",
    description: "REPLACE: Description.",
    techStack: ["Python", "Docker", "AWS"],
    githubUrl: "https://github.com/REPLACE",
  },
  {
    title: "Project Gamma",
    description: "REPLACE: Description.",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    githubUrl: "https://github.com/REPLACE",
  },
];

export default function RedProjectsGrid() {
  return (
    <section id="projects" style={{ padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <p style={{ color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
        // MAINFRAME_PENETRATIONS
      </p>
      <h2 style={{
        color: "#00FF41", fontFamily: "JetBrains Mono, monospace",
        fontSize: "2rem", fontWeight: 700, marginBottom: "3rem",
        textShadow: "0 0 12px #00FF4155",
      }}>
        Extracted Projects
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {PROJECTS.map((p) => <RedProjectCard key={p.title} {...p} />)}
      </div>
    </section>
  );
}
```

---

### TASK 3.4 — Red Pill Certifications ("Skill Programs")

```
task_id: 3.4
task_completed: false
department: UI
depends_on: 3.1
files:
  - /components/red/CertCard.tsx
  - /components/red/CertsSection.tsx
```

**CertCard.tsx** — clicking triggers a loading bar animation, then shows "PROGRAM LOADED":

```tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RedCertCardProps {
  name: string;
  issuer: string;
  year: string;
}

export default function RedCertCard({ name, issuer, year }: RedCertCardProps) {
  const [loading, setLoading]   = useState(false);
  const [loaded,  setLoaded]    = useState(false);

  const handleClick = () => {
    if (loaded || loading) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setLoaded(true); }, 2000);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: "#0D0D0D",
        border: `1px solid ${loaded ? "#00FF41" : "rgba(0,255,65,0.2)"}`,
        borderRadius: "4px", padding: "1.25rem 1.5rem",
        cursor: loaded ? "default" : "pointer",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: loaded ? "0 0 16px rgba(0,255,65,0.2)" : "none",
        minHeight: "90px",
      }}
    >
      <AnimatePresence mode="wait">
        {!loading && !loaded && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p style={{ color: "#003B00", fontSize: "0.65rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
              [SKILL_MODULE]
            </p>
            <p style={{ color: "#00FF41", fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", fontWeight: 700 }}>
              {name}
            </p>
            <p style={{ color: "#00802B", fontSize: "0.72rem", marginTop: "0.25rem" }}>
              {issuer} · {year}
            </p>
            <p style={{ color: "#003B00", fontSize: "0.65rem", marginTop: "0.75rem", letterSpacing: "0.05em" }}>
              [ CLICK TO LOAD PROGRAM ]
            </p>
          </motion.div>
        )}

        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p style={{ color: "#00802B", fontSize: "0.72rem", fontFamily: "JetBrains Mono, monospace", marginBottom: "0.75rem" }}>
              LOADING: {name}...
            </p>
            <div style={{ backgroundColor: "#001a00", borderRadius: "2px", height: "6px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                style={{ height: "100%", backgroundColor: "#00FF41",
                  boxShadow: "0 0 8px #00FF41" }}
              />
            </div>
          </motion.div>
        )}

        {loaded && (
          <motion.div key="loaded" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ color: "#00FF41", fontSize: "0.65rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
              ✓ PROGRAM LOADED
            </p>
            <p style={{ color: "#00FF41", fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.85rem", fontWeight: 700, textShadow: "0 0 8px #00FF41" }}>
              {name}
            </p>
            <p style={{ color: "#00802B", fontSize: "0.72rem", marginTop: "0.25rem" }}>
              {issuer} · {year} · 100% CORE COMPETENCY
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**CertsSection.tsx:**

```tsx
import RedCertCard from "./CertCard";

// REPLACE: Same certs as Blue Pill
const CERTS = [
  { name: "AWS Cloud Practitioner",  issuer: "Amazon Web Services", year: "2024" },
  { name: "Google Cloud Associate",  issuer: "Google",              year: "2023" },
  { name: "Certified Scrum Master",  issuer: "Scrum Alliance",      year: "2023" },
  { name: "Security+",               issuer: "CompTIA",             year: "2022" },
];

export default function RedCertsSection() {
  return (
    <section id="certs" style={{ padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <p style={{ color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
        // LOADED_SKILL_PROGRAMS
      </p>
      <h2 style={{
        color: "#00FF41", fontFamily: "JetBrains Mono, monospace",
        fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem",
      }}>
        Training Constructs
      </h2>
      <p style={{ color: "#00802B", fontSize: "0.82rem", marginBottom: "2.5rem",
        fontFamily: "JetBrains Mono, monospace" }}>
        Click a module to load the program directly into your neural net.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
        {CERTS.map((c) => <RedCertCard key={c.name} {...c} />)}
      </div>
    </section>
  );
}
```

---

### TASK 3.5 — Update portfolio/page.tsx to Use Red Components

```
task_id: 3.5
task_completed: false
department: UI
depends_on: 3.1, 3.2, 3.3, 3.4
file: /app/portfolio/page.tsx
```

**What to do:**

Uncomment the Red imports and replace the placeholder `<div>` in
`/app/portfolio/page.tsx` with the real Red Pill layout:

```tsx
// Uncomment these at the top:
import RedNavbar   from "@/components/red/Navbar";
import RedHero     from "@/components/red/Hero";
import RedProjects from "@/components/red/ProjectsGrid";
import RedCerts    from "@/components/red/CertsSection";

// Replace the Red Pill placeholder div with:
{isRed ? (
  <>
    <RedNavbar />
    <RedHero />
    <RedProjects />
    <RedCerts />
  </>
) : (
  // Blue Pill layout (unchanged from Phase 2)
  <>
    <BlueNavbar />
    <BlueHero />
    <BlueProjects />
    <BlueCerts />
    <BlueFooter />
  </>
)}
```

---

## 🔍 Phase 3 Completion Checklist

- [ ] Red Pill navbar visible with glitch hover on nav links
- [ ] DISCONNECT button switches back to Blue Pill mode
- [ ] Hero types in line by line with staggered animation
- [ ] Blinking cursor is present after the last hero line
- [ ] Project card titles scramble on mouse hover
- [ ] Project cards show `EXPLOIT:` tech tags and `EXTRACT_CODEBASE` link
- [ ] Clicking a cert card triggers the progress bar loader
- [ ] After 2 seconds, cert shows "✓ PROGRAM LOADED" state
- [ ] Toggling Blue → Red and Red → Blue works without page reload
- [ ] No TypeScript or console errors

---

## ➡️ Next Phase

Once all tasks above are `task_completed: true` → open `phase_4_effects.md`

---

*Phase: 3 | Department: UI | Last updated: 2026-05-21*
