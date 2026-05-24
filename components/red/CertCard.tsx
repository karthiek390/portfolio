"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RedCertCardProps {
  name: string;
  issuer: string;
  year: string;
}

export default function RedCertCard({ name, issuer, year }: RedCertCardProps) {
  const [state, setState] = useState<"idle" | "loading" | "loaded">("idle");

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => setState("loaded"), 2000);
  };

  return (
    <div onClick={handleClick} style={{
      backgroundColor: "#0D0D0D",
      border: `1px solid ${state === "loaded" ? "#00FF41" : "rgba(0,255,65,0.2)"}`,
      borderRadius: "4px", padding: "1.25rem 1.5rem",
      cursor: state === "idle" ? "pointer" : "default",
      transition: "border-color 0.3s, box-shadow 0.3s",
      boxShadow: state === "loaded" ? "0 0 16px rgba(0,255,65,0.2)" : "none",
      minHeight: "100px", fontFamily: "JetBrains Mono, monospace",
    }}>
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p style={{ color: "#003B00", fontSize: "0.62rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
              [SKILL_MODULE]
            </p>
            <p style={{ color: "#00FF41", fontSize: "0.85rem", fontWeight: 700 }}>{name}</p>
            <p style={{ color: "#00802B", fontSize: "0.72rem", marginTop: "0.25rem" }}>{issuer} · {year}</p>
            <p style={{ color: "#003B00", fontSize: "0.62rem", marginTop: "0.75rem" }}>[ CLICK TO LOAD PROGRAM ]</p>
          </motion.div>
        )}
        {state === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p style={{ color: "#00802B", fontSize: "0.72rem", marginBottom: "0.75rem" }}>
              LOADING: {name}...
            </p>
            <div style={{ backgroundColor: "#001a00", borderRadius: "2px", height: "6px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: "0%" }} animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                style={{ height: "100%", backgroundColor: "#00FF41", boxShadow: "0 0 8px #00FF41" }} />
            </div>
          </motion.div>
        )}
        {state === "loaded" && (
          <motion.div key="loaded" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ color: "#00FF41", fontSize: "0.62rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
              ✓ PROGRAM LOADED
            </p>
            <p style={{ color: "#00FF41", fontSize: "0.85rem", fontWeight: 700, textShadow: "0 0 8px #00FF41" }}>
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
