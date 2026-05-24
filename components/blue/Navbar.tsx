"use client";

import Link from "next/link";
import { usePill } from "@/context/PillContext";
import { PillMode } from "@/context/PillContext";

const NAV_LINKS = [
  { label: "About",    href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#certs" },
  { label: "Contact",  href: "#contact" },
];

export default function BlueNavbar({ onSwitchMode }: { onSwitchMode: (m: PillMode) => void }) {
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
        <button id="pill-toggle-btn" onClick={() => onSwitchMode("red")}
          style={{ padding: "0.4rem 1rem", backgroundColor: "#EF4444", color: "#fff", border: "none",
            borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
            letterSpacing: "0.05em", transition: "box-shadow 0.2s" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.boxShadow = "0 0 12px #EF444488")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.boxShadow = "none")}>
          RED PILL
        </button>
      </div>
    </nav>
  );
}
