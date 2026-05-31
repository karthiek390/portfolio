"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { hasSeenAnalytics } from "@/lib/pill-discovery";

const mono = "JetBrains Mono, monospace";

export default function RedFooter() {
  const [showAnalyticsPrompt, setShowAnalyticsPrompt] = useState(false);

  useEffect(() => {
    setShowAnalyticsPrompt(!hasSeenAnalytics());
  }, []);

  return (
    <footer style={{ padding: "3rem 2.5rem", borderTop: "1px solid rgba(0,255,65,0.12)",
      textAlign: "center", fontFamily: mono }}>
      <p style={{ color: "#003B00", fontSize: "0.68rem", letterSpacing: "0.12em" }}>
        © 2026 KARTHIEK DUGGIRALA // ZION MAINFRAME TERMINAL //
        <a href="https://github.com/karthiek390" target="_blank" rel="noopener noreferrer"
          style={{ color: "#00802B", textDecoration: "none", marginLeft: "0.5rem" }}>
          GITHUB
        </a>
        {" // "}
        <a href="https://www.linkedin.com/in/karthiek-duggirala/" target="_blank" rel="noopener noreferrer"
          style={{ color: "#00802B", textDecoration: "none" }}>
          LINKEDIN
        </a>
      </p>
      <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
        <Link href="/mainframe" className={showAnalyticsPrompt ? "red-mode-switch-prompt" : undefined}
          style={{ display: "inline-block",
          color: "#003B00", fontSize: "0.82rem", fontFamily: mono,
          fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none" }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = "#00802B";
            (e.target as HTMLElement).style.textShadow = "0 0 10px #00FF41";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.color = "#003B00";
            (e.target as HTMLElement).style.textShadow = "none";
          }}>
          // ANALYTICS_DASHBOARD
        </Link>
        <span
          style={{
            color: "#F59E0B",
            fontSize: "0.82rem",
            fontFamily: mono,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textShadow: "0 0 6px rgba(245,158,11,0.45)",
          }}
        >
          &lt;NOTE: View the analytical visualization&gt;
        </span>
      </div>
    </footer>
  );
}
