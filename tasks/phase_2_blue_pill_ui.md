# 🔵 PHASE 2 — Blue Pill UI (Corporate Mode)

> **Read `MASTER.md` before this file.**
> This phase builds all Blue Pill (corporate/clean) UI sections.
> Content placeholders are used — replace with real data when available.

---

## 📋 Phase Metadata

| Field          | Value                                        |
|----------------|----------------------------------------------|
| Phase          | 2                                            |
| Department     | UI                                           |
| Depends On     | Phase 0 + Phase 1 complete                   |
| Blocks         | Phase 3 (Red Pill UI uses same structure)    |
| Estimated Work | ~3–4 hours                                   |
| Phase Status   | ⏳ Not Started                                |

---

## 🧠 Context for the AI/Developer

This phase fills in `/app/portfolio/page.tsx` and all `/components/blue/` files.

### Design Rules for Blue Pill Mode
- Background: `var(--color-bg)` → `#F8FAFC`
- Text: `var(--color-text)` → `#0F172A`
- Accent: `var(--color-primary)` → `#2563EB`
- Font: `Inter` (sans-serif)
- Cards: white background, subtle `box-shadow`, smooth `border-radius: 12px`
- No glitch, no glow, no terminal fonts — clean and corporate

### Portfolio Page Shell
`/app/portfolio/page.tsx` is the main container. It:
- Reads `PillContext` to get `"blue"` or `"red"`
- Applies the correct CSS class to its root wrapper
- Conditionally renders **Blue** or **Red** variants of each section

> ⚠️ In this phase, only the Blue variants are built.
> Red variants come in Phase 3. Use a placeholder `<div>Red Pill - Coming Phase 3</div>` for now.

### Content Placeholders
Real content (LinkedIn, GitHub, projects, certs) will be filled in later.
Use the placeholder values defined in each task below.

---

## ✅ Tasks

---

### TASK 2.1 — Wire the Portfolio Page Shell

```
task_id: 2.1
task_completed: false
department: UI
depends_on: Phase 1 complete
file: /app/portfolio/page.tsx
```

**What to do:**

Replace `/app/portfolio/page.tsx` with:

```tsx
"use client";

import { usePill } from "@/context/PillContext";

// Blue components
import BlueNavbar    from "@/components/blue/Navbar";
import BlueHero      from "@/components/blue/Hero";
import BlueProjects  from "@/components/blue/ProjectsGrid";
import BlueCerts     from "@/components/blue/CertsSection";
import BlueFooter    from "@/components/blue/Footer";

// Red components (Phase 3 — placeholders for now)
// import RedNavbar   from "@/components/red/Navbar";
// import RedHero     from "@/components/red/Hero";
// import RedProjects from "@/components/red/ProjectsGrid";
// import RedCerts    from "@/components/red/CertsSection";

export default function PortfolioPage() {
  const { mode } = usePill();
  const isRed = mode === "red";

  return (
    <div
      id="portfolio-root"
      className={isRed ? "mode-red" : "mode-blue"}
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
        fontFamily: "var(--font-main)",
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
    >
      {isRed ? (
        // Red Pill layout (Phase 3)
        <div style={{ padding: "2rem", color: "#00FF41", fontFamily: "monospace" }}>
          Red Pill Mode — Coming in Phase 3
        </div>
      ) : (
        // Blue Pill layout
        <>
          <BlueNavbar />
          <BlueHero />
          <BlueProjects />
          <BlueCerts />
          <BlueFooter />
        </>
      )}
    </div>
  );
}
```

---

### TASK 2.2 — Blue Pill Navbar

```
task_id: 2.2
task_completed: false
department: UI
depends_on: 2.1
file: /components/blue/Navbar.tsx
```

**Design:** White background, shadow on scroll, logo left, links right, pill toggle far right.

```tsx
"use client";

import Link from "next/link";
import { usePill } from "@/context/PillContext";

const NAV_LINKS = [
  { label: "About",    href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#certs" },
  { label: "Contact",  href: "#contact" },
];

export default function BlueNavbar() {
  const { setMode } = usePill();

  return (
    <nav
      id="blue-navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2.5rem",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
        fontFamily: "var(--font-main)",
      }}
    >
      {/* Logo / Name */}
      <span
        id="blue-nav-logo"
        style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0F172A", letterSpacing: "-0.02em" }}
      >
        {/* REPLACE: Your Name */}
        KD<span style={{ color: "#2563EB" }}>.</span>
      </span>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            id={`blue-nav-${link.label.toLowerCase()}`}
            style={{
              color: "#64748B",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#2563EB")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748B")}
          >
            {link.label}
          </a>
        ))}

        {/* Pill Toggle Button */}
        <button
          id="pill-toggle-btn"
          onClick={() => setMode("red")}
          title="Switch to Red Pill mode"
          style={{
            padding: "0.4rem 1rem",
            backgroundColor: "#EF4444",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.05em",
            transition: "box-shadow 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.boxShadow = "0 0 12px #EF444488")}
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.boxShadow = "none")}
        >
          RED PILL
        </button>
      </div>
    </nav>
  );
}
```

---

### TASK 2.3 — Blue Pill Hero Section

```
task_id: 2.3
task_completed: false
department: UI
depends_on: 2.1
file: /components/blue/Hero.tsx
```

**Design:** Full-width section, left-aligned text, name large, title, short bio, CTA buttons.

```tsx
export default function BlueHero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 2.5rem",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Greeting */}
        <p style={{ color: "#2563EB", fontSize: "1rem", fontWeight: 500, letterSpacing: "0.05em" }}>
          Hi, I'm
        </p>

        {/* Name — REPLACE with real name */}
        <h1
          id="hero-name"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 800,
            color: "#0F172A",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Karthiek Duggirala
        </h1>

        {/* Title — REPLACE with real title */}
        <h2
          id="hero-title"
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            fontWeight: 400,
            color: "#64748B",
          }}
        >
          Full-Stack Engineer &amp; Cloud Practitioner
        </h2>

        {/* Bio — REPLACE with real bio */}
        <p
          id="hero-bio"
          style={{
            maxWidth: "540px",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "#475569",
          }}
        >
          I build scalable systems and clean interfaces.
          Passionate about turning complex problems into elegant solutions.
          {/* REPLACE: 2–3 sentence personal bio */}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <a
            id="hero-linkedin-btn"
            href="https://linkedin.com/in/REPLACE_YOUR_LINKEDIN"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.75rem 1.75rem",
              backgroundColor: "#2563EB",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "background-color 0.2s",
            }}
          >
            LinkedIn
          </a>

          <a
            id="hero-github-btn"
            href="https://github.com/REPLACE_YOUR_GITHUB"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.75rem 1.75rem",
              backgroundColor: "transparent",
              color: "#2563EB",
              border: "2px solid #2563EB",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "background-color 0.2s, color 0.2s",
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

### TASK 2.4 — Blue Pill Project Card + Projects Grid

```
task_id: 2.4
task_completed: false
department: UI
depends_on: 2.1
files:
  - /components/blue/ProjectCard.tsx
  - /components/blue/ProjectsGrid.tsx
```

**ProjectCard.tsx:**

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export default function BlueProjectCard({
  title, description, techStack, githubUrl, liveUrl,
}: ProjectCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(37,99,235,0.15)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0F172A" }}>{title}</h3>
      <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.7 }}>{description}</p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {techStack.map((tech) => (
          <span
            key={tech}
            style={{
              padding: "0.2rem 0.65rem",
              backgroundColor: "#EFF6FF",
              color: "#2563EB",
              borderRadius: "999px",
              fontSize: "0.72rem",
              fontWeight: 600,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "auto" }}>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#2563EB", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}
        >
          GitHub →
        </a>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#64748B", fontSize: "0.8rem", textDecoration: "none" }}
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}
```

**ProjectsGrid.tsx:**

```tsx
import BlueProjectCard from "./ProjectCard";

// REPLACE: Add your real projects here
const PROJECTS = [
  {
    title: "Project Alpha",
    description: "REPLACE: Short 1–2 sentence description of what this project does and its impact.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/REPLACE",
    liveUrl: "",
  },
  {
    title: "Project Beta",
    description: "REPLACE: Short 1–2 sentence description of what this project does and its impact.",
    techStack: ["Python", "Docker", "AWS"],
    githubUrl: "https://github.com/REPLACE",
  },
  {
    title: "Project Gamma",
    description: "REPLACE: Short 1–2 sentence description of what this project does and its impact.",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    githubUrl: "https://github.com/REPLACE",
    liveUrl: "",
  },
];

export default function BlueProjectsGrid() {
  return (
    <section
      id="projects"
      style={{ padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}
    >
      <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
        Projects
      </h2>
      <p style={{ color: "#64748B", marginBottom: "3rem" }}>
        A selection of things I've built.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {PROJECTS.map((p) => (
          <BlueProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
```

---

### TASK 2.5 — Blue Pill Certifications + Footer

```
task_id: 2.5
task_completed: false
department: UI
depends_on: 2.1
files:
  - /components/blue/CertCard.tsx
  - /components/blue/CertsSection.tsx
  - /components/blue/Footer.tsx
```

**CertCard.tsx:**

```tsx
interface CertCardProps {
  name: string;
  issuer: string;
  year: string;
  badgeUrl?: string;
}

export default function BlueCertCard({ name, issuer, year, badgeUrl }: CertCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "10px",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      }}
    >
      {badgeUrl && (
        <img src={badgeUrl} alt={name} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
      )}
      <div>
        <p style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.9rem" }}>{name}</p>
        <p style={{ color: "#64748B", fontSize: "0.78rem" }}>{issuer} · {year}</p>
      </div>
    </div>
  );
}
```

**CertsSection.tsx:**

```tsx
import BlueCertCard from "./CertCard";

// REPLACE: Add your real certifications
const CERTS = [
  { name: "AWS Cloud Practitioner",    issuer: "Amazon Web Services", year: "2024" },
  { name: "Google Cloud Associate",    issuer: "Google",              year: "2023" },
  { name: "Certified Scrum Master",    issuer: "Scrum Alliance",      year: "2023" },
  { name: "Security+",                 issuer: "CompTIA",             year: "2022" },
];

export default function BlueCertsSection() {
  return (
    <section
      id="certs"
      style={{
        padding: "6rem 2.5rem",
        backgroundColor: "#F1F5F9",
        marginTop: "2rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
          Certifications
        </h2>
        <p style={{ color: "#64748B", marginBottom: "2.5rem" }}>
          Verified credentials and skill programs.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {CERTS.map((c) => <BlueCertCard key={c.name} {...c} />)}
        </div>
      </div>
    </section>
  );
}
```

**Footer.tsx:**

```tsx
export default function BlueFooter() {
  return (
    <footer
      id="blue-footer"
      style={{
        padding: "2.5rem",
        textAlign: "center",
        borderTop: "1px solid #E2E8F0",
        color: "#94A3B8",
        fontSize: "0.8rem",
      }}
    >
      {/* REPLACE: Your name */}
      © {new Date().getFullYear()} Karthiek Duggirala · Built with Next.js
    </footer>
  );
}
```

---

## 🔍 Phase 2 Completion Checklist

- [ ] `/portfolio` loads without errors in Blue Pill mode
- [ ] Navbar is sticky, shows logo + links + RED PILL toggle button
- [ ] Hero shows name, title, bio, LinkedIn + GitHub buttons
- [ ] Projects grid shows 3 cards in a responsive grid
- [ ] Certifications section shows cert cards
- [ ] Footer renders at the bottom
- [ ] All `REPLACE` placeholders are visible (will be filled with real content later)
- [ ] Switching to Red Pill (via toggle) shows the Phase 3 placeholder message
- [ ] No TypeScript or console errors

---

## ➡️ Next Phase

Once all tasks above are `task_completed: true` → open `phase_3_red_pill_ui.md`

---

*Phase: 2 | Department: UI | Last updated: 2026-05-21*
