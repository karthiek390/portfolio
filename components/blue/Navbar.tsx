"use client";

import { useState } from "react";
import { PillMode } from "@/context/PillContext";

const NAV_LINKS = [
  { label: "About",    href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#certs" },
  { label: "Contact",  href: "#contact" },
];

export default function BlueNavbar({ onSwitchMode }: { onSwitchMode: (m: PillMode) => void }) {
  const [showRabbit, setShowRabbit] = useState(false);

  return (
    <nav id="blue-navbar" style={{
      position: "sticky", top: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1rem 2.5rem",
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E2E8F0",
      boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
      fontFamily: "Inter, sans-serif",
    }}>
      <span id="blue-nav-logo" style={{ fontWeight: 700, fontSize: "1.1rem", color: "#0F172A", letterSpacing: "-0.02em" }}>
        KD<span style={{ color: "#2563EB" }}>.</span>
      </span>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} id={`blue-nav-${link.label.toLowerCase()}`}
            style={{ color: "#64748B", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#2563EB")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748B")}>
            {link.label}
          </a>
        ))}
        <div
          style={{ position: "relative" }}
          onMouseEnter={() => setShowRabbit(true)}
          onMouseLeave={() => setShowRabbit(false)}
        >
          <button id="pill-toggle-btn" onClick={() => onSwitchMode("red")}
            style={{ padding: "0.4rem 1rem", backgroundColor: "#EF4444", color: "#fff", border: "none",
              borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
              letterSpacing: "0.05em", transition: "box-shadow 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.boxShadow = "0 0 12px #EF444488")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.boxShadow = "none")}>
            RED PILL
          </button>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "calc(100% + 0.9rem)",
              right: 0,
              width: "210px",
              padding: "0.8rem",
              borderRadius: "18px",
              border: "1px solid rgba(37,99,235,0.14)",
              background: "linear-gradient(160deg, rgba(255,255,255,0.98), rgba(239,246,255,0.97))",
              boxShadow: "0 20px 45px rgba(15,23,42,0.14)",
              opacity: showRabbit ? 1 : 0,
              transform: showRabbit ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.18s ease, transform 0.18s ease",
              pointerEvents: "none",
            }}
          >
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <img
                src="/easter-eggs/rabbit-matrix.jpg"
                alt=""
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "14px",
                  objectFit: "cover",
                  border: "1px solid rgba(15,23,42,0.08)",
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "grid", gap: "0.2rem" }}>
                <span
                  style={{
                    color: "#2563EB",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  White Rabbit
                </span>
                <span
                  style={{
                    color: "#0F172A",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    lineHeight: 1.35,
                  }}
                >
                  Wake up, Recruiter...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
