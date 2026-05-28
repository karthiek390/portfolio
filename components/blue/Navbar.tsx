"use client";

import { useState, useEffect } from "react";
import { PillMode } from "@/context/PillContext";
import { trackOperatorEvent } from "@/lib/operator-events";
import { hasSeenMode } from "@/lib/pill-discovery";

const NAV_ITEMS = [
  { id: "about",      label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects",   label: "PROJECTS" },
  { id: "skills",     label: "SKILLS" },
  { id: "shipping",   label: "SHIPPING" },
  { id: "contact",    label: "CONTACT" },
];
const CROSSOVER_PROMPT_DELAY_MS = 22_000;

export default function BlueNavbar({ onSwitchMode }: { onSwitchMode: (m: PillMode) => void }) {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [showRedPillPrompt, setShowRedPillPrompt] = useState(false);

  useEffect(() => {
    const els = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveSection(top.target.id);
        }
      },
      { threshold: 0.25, rootMargin: "-10% 0px -60% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hasSeenMode("red")) return;

    const timer = window.setTimeout(() => {
      if (!hasSeenMode("red")) {
        setShowRedPillPrompt(true);
      }
    }, CROSSOVER_PROMPT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const handleRedPill = () => {
    setShowRedPillPrompt(false);
    trackOperatorEvent({
      type: "PILL_SWITCH",
      detail: "blue-to-red",
      page: "blue",
      metadata: { mode: "red", source: "blue_toggle" },
    });
    onSwitchMode("red");
  };

  const navItems = NAV_ITEMS.map(({ id, label }) => {
    const active = activeSection === id;
    return (
      <button
        key={id}
        id={`blue-nav-${id}`}
        onClick={() => scrollTo(id)}
        style={{
          display: "block",
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          borderLeft: `2px solid ${active ? "var(--bp-accent)" : "transparent"}`,
          padding: "0.52rem 1.5rem",
          color: active ? "var(--bp-accent)" : "#6B7280",
          fontSize: "0.76rem",
          fontWeight: 600,
          letterSpacing: "0.13em",
          cursor: "pointer",
          transition: "color 140ms ease, border-color 140ms ease",
          fontFamily: "Inter, sans-serif",
        }}
        onMouseEnter={(e) => {
          if (!active) (e.currentTarget as HTMLElement).style.color = "var(--bp-ink)";
        }}
        onMouseLeave={(e) => {
          if (!active) (e.currentTarget as HTMLElement).style.color = "#6B7280";
        }}
      >
        {label}
      </button>
    );
  });

  return (
    <>
      {/* ── Fixed left rail (desktop) ── */}
      <aside
        id="blue-rail"
        aria-label="Portfolio navigation"
        style={{ padding: "40px 0 28px", fontFamily: "Inter, sans-serif" }}
      >
        <div style={{ padding: "0 28px", marginBottom: "32px" }}>
          <p style={{
            fontSize: "1.3rem", fontWeight: 900,
            color: "var(--bp-ink)", letterSpacing: "-0.03em", lineHeight: 1.1,
          }}>
            KD<span style={{ color: "var(--bp-accent)" }}>.</span>
          </p>
          <p style={{
            fontSize: "0.63rem", color: "var(--bp-ink-muted)",
            letterSpacing: "0.09em", marginTop: "5px", textTransform: "uppercase",
          }}>
            Full-Stack Engineer
          </p>
        </div>

        <div style={{ height: "1px", background: "var(--bp-border-fine)", marginBottom: "20px" }} />

        <nav aria-label="Sections">{navItems}</nav>

        <div style={{ flex: 1, minHeight: "24px" }} />

        <div style={{ padding: "0 28px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
          <p style={{ fontSize: "0.56rem", color: "var(--bp-border)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            v2.0 · Blue Mode
          </p>
          <button
            id="pill-toggle-btn"
            onClick={handleRedPill}
            className={showRedPillPrompt ? "bp-mode-switch-prompt" : undefined}
            aria-label={showRedPillPrompt ? "Red pill available. Explore the alternate mode." : "Switch to red pill mode"}
            style={{
              alignSelf: "flex-start",
              padding: "0.4rem 1rem",
              backgroundColor: "#EF4444", color: "#FFFFFF",
              border: "none", borderRadius: "999px",
              fontSize: "0.68rem", fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.06em",
              transition: "box-shadow 0.18s ease",
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 14px rgba(239,68,68,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
          >
            RED PILL
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div id="blue-mobile-bar" aria-label="Mobile navigation bar">
        <span style={{
          fontSize: "1.15rem", fontWeight: 900, color: "var(--bp-ink)",
          letterSpacing: "-0.02em", fontFamily: "Inter, sans-serif",
        }}>
          KD<span style={{ color: "var(--bp-accent)" }}>.</span>
        </span>
        <button
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", color: "var(--bp-ink-muted)", display: "flex", flexDirection: "column", gap: "4px" }}
        >
          {[0,1,2].map((i) => (
            <span key={i} style={{ display: "block", width: "20px", height: "2px", background: "var(--bp-ink-muted)", borderRadius: "1px" }} />
          ))}
        </button>
      </div>

      {/* ── Mobile nav overlay (z-200) ── */}
      {mobileOpen && (
        <div
          role="dialog" aria-modal="true" aria-label="Navigation menu"
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "var(--bp-cream)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: "0.25rem", fontFamily: "Inter, sans-serif",
          }}
        >
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", fontSize: "1.4rem", color: "var(--bp-ink-muted)", cursor: "pointer" }}
          >
            ✕
          </button>
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none", border: "none",
                fontSize: "1.5rem", fontWeight: 700,
                color: activeSection === id ? "var(--bp-accent)" : "var(--bp-ink)",
                cursor: "pointer", letterSpacing: "0.06em",
                padding: "0.6rem 1rem", fontFamily: "Inter, sans-serif",
                transition: "color 140ms ease",
              }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleRedPill}
            className={showRedPillPrompt ? "bp-mode-switch-prompt" : undefined}
            style={{
              marginTop: "1.5rem", padding: "0.55rem 1.4rem",
              backgroundColor: "#EF4444", color: "#FFFFFF",
              border: "none", borderRadius: "999px",
              fontSize: "0.8rem", fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.06em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            RED PILL
          </button>
        </div>
      )}
    </>
  );
}
