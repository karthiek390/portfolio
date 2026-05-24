"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ORIGINAL = "Threat detected: Anomaly in Sector 404. The system has been compromised. An Agent has been deployed to resolve the anomaly. Resistance is futile.";

const ASCII = `
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    ░░ ▄▄▄▄▄ ░░░░░░░░░░░░░░ ▄▄▄▄▄ ░░
    ░░ █████ ░░░░░░▀█▀░░░░░ █████ ░░
    ░░ ▀▀▀▀▀ ░░░░░░░░░░░░░░ ▀▀▀▀▀ ░░
    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`;

export default function NotFound() {
  const router = useRouter();
  const words  = ORIGINAL.split(" ");
  const [prog, setProg] = useState(0);

  useEffect(() => {
    if (prog >= words.length) return;
    const t = setTimeout(() => setProg((p) => p + 1), 120);
    return () => clearTimeout(t);
  }, [prog, words.length]);

  const display = words.map((w, i) => (i < prog ? "SMITH" : w)).join(" ");
  const done    = prog >= words.length;

  return (
    <div id="agent-smith-404" style={{ minHeight: "100vh", backgroundColor: "#000",
      color: "#00FF41", fontFamily: "JetBrains Mono, monospace",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem", gap: "2rem" }}>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#003B00" }}>
        [ SYSTEM_BREACH_DETECTED ]
      </motion.p>

      <motion.pre initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        style={{ color: "#00FF41", fontSize: "clamp(0.5rem, 1.2vw, 0.85rem)",
          textShadow: "0 0 12px #00FF41", textAlign: "center", lineHeight: 1.4 }}>
        {ASCII}
      </motion.pre>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ maxWidth: "520px", textAlign: "center",
          fontSize: "clamp(0.8rem, 1.5vw, 1rem)", lineHeight: 1.8,
          color: done ? "#FF0000" : "#00FF41",
          textShadow: done ? "0 0 12px #FF0000" : "0 0 6px #00FF41",
          transition: "color 0.3s, text-shadow 0.3s" }}>
        {display}
      </motion.p>

      <motion.button id="smith-disconnect-btn"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        onClick={() => router.push("/")}
        style={{ padding: "0.75rem 2rem", backgroundColor: "transparent",
          border: "1px solid #00FF41", color: "#00FF41",
          fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem",
          letterSpacing: "0.12em", cursor: "pointer", borderRadius: "2px" }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.boxShadow = "0 0 20px #00FF4188";
          (e.target as HTMLElement).style.backgroundColor = "rgba(0,255,65,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.boxShadow = "none";
          (e.target as HTMLElement).style.backgroundColor = "transparent";
        }}>
        [ DISCONNECT ]
      </motion.button>
    </div>
  );
}
