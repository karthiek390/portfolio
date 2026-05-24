"use client";

import { PillMode } from "@/context/PillContext";

const NAV_LINKS = [
  { label: "INIT",     href: "#hero" },
  { label: "PROJECTS", href: "#projects" },
  { label: "PROGRAMS", href: "#certs" },
  { label: "TRANSMIT", href: "#contact" },
];

export default function RedNavbar({ onSwitchMode }: { onSwitchMode: (m: PillMode) => void }) {
  return (
    <nav id="red-navbar" style={{
      position: "sticky", top: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1rem 2.5rem",
      backgroundColor: "#000",
      borderBottom: "1px solid rgba(0,255,65,0.2)",
      fontFamily: "JetBrains Mono, monospace",
    }}>
      <span id="red-nav-logo" style={{
        color: "#00FF41", fontWeight: 700, fontSize: "1rem",
        letterSpacing: "0.15em", textShadow: "0 0 8px #00FF41",
      }}>
        KD<span style={{ opacity: 0.4 }}>://</span>
      </span>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href}
            id={`red-nav-${link.label.toLowerCase()}`}
            data-text={link.label}
            className="glitch"
            style={{ color: "#00FF41", textDecoration: "none", fontSize: "0.78rem",
              letterSpacing: "0.1em", transition: "text-shadow 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.textShadow = "0 0 10px #00FF41")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.textShadow = "none")}>
            {link.label}
          </a>
        ))}

        <button id="red-pill-toggle-btn" onClick={() => onSwitchMode("blue")}
          style={{ background: "transparent", border: "1px solid rgba(0,255,65,0.4)",
            color: "#00FF41", borderRadius: "4px", padding: "0.35rem 0.85rem",
            fontSize: "0.72rem", letterSpacing: "0.08em", cursor: "pointer",
            fontFamily: "inherit", transition: "box-shadow 0.2s" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.boxShadow = "0 0 12px #00FF4188")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.boxShadow = "none")}>
          ☎ DISCONNECT
        </button>
      </div>
    </nav>
  );
}
