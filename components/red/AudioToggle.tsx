"use client";

import { motion } from "framer-motion";

const mono = "JetBrains Mono, monospace";

interface AudioToggleProps {
  on: boolean;
  onToggle: () => void;
}

export default function AudioToggle({ on, onToggle }: AudioToggleProps) {
  return (
    <motion.button
      id="audio-toggle-btn"
      onClick={onToggle}
      title={on ? "Mute ambient audio" : "Enable ambient audio (off by default)"}
      whileTap={{ scale: 0.9 }}
      style={{
        background: "transparent",
        border: `1px solid ${on ? "rgba(0,255,65,0.5)" : "rgba(0,255,65,0.15)"}`,
        borderRadius: "3px",
        padding: "0.3rem 0.55rem",
        cursor: "pointer",
        fontFamily: mono,
        fontSize: "0.65rem",
        color: on ? "#00FF41" : "#003B00",
        letterSpacing: "0.06em",
        display: "flex", alignItems: "center", gap: "0.35rem",
        transition: "border-color 0.3s, color 0.3s",
        boxShadow: on ? "0 0 8px rgba(0,255,65,0.2)" : "none",
      }}>
      {/* Animated bars when on */}
      <span style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "10px" }}>
        {[3, 6, 4, 8, 5].map((h, i) => (
          <motion.span key={i}
            animate={on ? {
              height: [`${h}px`, `${h * 1.6}px`, `${h}px`],
              backgroundColor: "#00FF41",
            } : {
              height: "3px",
              backgroundColor: "#003B00",
            }}
            transition={on ? { repeat: Infinity, duration: 0.6 + i * 0.1, delay: i * 0.08 } : { duration: 0.3 }}
            style={{
              display: "inline-block", width: "2px",
              borderRadius: "1px",
            }} />
        ))}
      </span>
      {on ? "SND" : "SND"}
    </motion.button>
  );
}
