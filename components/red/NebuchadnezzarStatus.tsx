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

const MOCK: GitHubStatus = {
  repo:       "REPLACE_GITHUB_USERNAME/REPLACE_REPO_NAME",
  message:    "feat: add terminal contact form",
  time_ago:   "2 hours ago",
  url:        "https://github.com",
  avatar_url: "",
};

// Set false after Phase 7 API is live
const USE_MOCK = false;

const mono = "JetBrains Mono, monospace";

type LoadState = "loading" | "ready" | "error";

export default function NebuchadnezzarStatus() {
  const [data,  setData]  = useState<GitHubStatus | null>(null);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    if (USE_MOCK) {
      const t = setTimeout(() => { setData(MOCK); setState("ready"); }, 800);
      return () => clearTimeout(t);
    }
    fetch("/api/github-status")
      .then((r) => r.json())
      .then((d) => { setData(d); setState("ready"); })
      .catch(() => setState("error"));
  }, []);

  return (
    <section id="nebuchadnezzar-status" style={{ padding: "4rem 2.5rem", maxWidth: "780px", margin: "0 auto" }}>
      <p style={{ color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.15em",
        marginBottom: "0.5rem", fontFamily: mono }}>
        // NEBUCHADNEZZAR_SHIP_DIAGNOSTICS
      </p>

      <div style={{ backgroundColor: "#050505", border: "1px solid rgba(0,255,65,0.25)",
        borderRadius: "4px", padding: "1.75rem 2rem", fontFamily: mono,
        position: "relative", overflow: "hidden" }}>

        {/* scanline */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)",
          zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* header */}
          <div style={{ display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <p style={{ color: "#00FF41", fontSize: "0.85rem", fontWeight: 700,
              letterSpacing: "0.1em", textShadow: "0 0 8px #00FF41" }}>
              HOVERCRAFT: NEBUCHADNEZZAR
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <motion.div
                animate={{ opacity: [1, 0.2, 1], scale: [1, 0.85, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                style={{ width: "8px", height: "8px", borderRadius: "50%",
                  backgroundColor: "#00FF41", boxShadow: "0 0 8px #00FF41" }} />
              <span style={{ color: "#00802B", fontSize: "0.68rem", letterSpacing: "0.1em" }}>ONLINE</span>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(0,255,65,0.15)", marginBottom: "1.5rem" }} />

          {state === "loading" && (
            <motion.p animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }}
              style={{ color: "#00802B", fontSize: "0.82rem" }}>
              SCANNING ZION MAINFRAME...
            </motion.p>
          )}

          {state === "error" && (
            <p style={{ color: "#FF4444", fontSize: "0.82rem" }}>
              [ERR]: Unable to reach Zion. Signal lost.
            </p>
          )}

          {state === "ready" && data && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Row label="CURRENT_LOCATION"  value="Broadcasting from Zion Mainframe..." />
              <Row label="ACTIVE_CONSTRUCT"  value={data.repo} />
              <Row label="LAST_SYSTEM_UPDATE" value={`"${data.message}"`} highlight />
              <Row label="UPDATE_TIMESTAMP"  value={data.time_ago} />
              <div style={{ marginTop: "0.5rem" }}>
                <a href={data.url} target="_blank" rel="noopener noreferrer"
                  style={{ color: "#00FF41", fontSize: "0.75rem", letterSpacing: "0.08em",
                    textDecoration: "none", borderBottom: "1px solid rgba(0,255,65,0.35)",
                    paddingBottom: "1px" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.textShadow = "0 0 8px #00FF41")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.textShadow = "none")}>
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

function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>
      <span style={{ color: "#003B00", fontSize: "0.68rem", letterSpacing: "0.08em",
        minWidth: "180px", flexShrink: 0, fontFamily: "JetBrains Mono, monospace" }}>
        {label}:
      </span>
      <span style={{ color: highlight ? "#00FF41" : "#00802B", fontSize: "0.82rem",
        textShadow: highlight ? "0 0 6px #00FF4166" : "none", wordBreak: "break-word",
        fontFamily: "JetBrains Mono, monospace" }}>
        {value}
      </span>
    </div>
  );
}
