"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXT = "This is the Construct. It is our loading program. We can load anything.";

// Ripple ring config — purely additive, does not affect core transition logic
const RIPPLES = [
  { delay: 0,    size: 120, duration: 1.4 },
  { delay: 0.18, size: 220, duration: 1.6 },
  { delay: 0.34, size: 360, duration: 1.8 },
  { delay: 0.48, size: 540, duration: 2.0 },
];

interface TheConstructProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function TheConstruct({ isVisible, onComplete }: TheConstructProps) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  // ── core logic unchanged ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isVisible) { setDisplayed(""); setIdx(0); return; }
    if (idx < TEXT.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + TEXT[idx]);
        setIdx((p) => p + 1);
      }, 26);
      return () => clearTimeout(t);
    }
    const done = setTimeout(onComplete, 500);
    return () => clearTimeout(done);
  }, [isVisible, idx, onComplete]);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="the-construct-overlay"
          key="construct"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            backgroundColor: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>

          {/* Liquid mirror ripple rings — additive only */}
          {RIPPLES.map((r, i) => (
            <motion.div
              key={i}
              aria-hidden
              initial={{ width: 0, height: 0, opacity: 0.55 }}
              animate={{ width: r.size, height: r.size, opacity: 0 }}
              transition={{ delay: r.delay, duration: r.duration, ease: "easeOut" }}
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: "1.5px solid rgba(0,0,0,0.18)",
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
                left: "50%", top: "50%",
              }}
            />
          ))}

          {/* Shimmer sweep — single diagonal highlight */}
          <motion.div
            aria-hidden
            initial={{ x: "-120%", opacity: 0.35 }}
            animate={{ x: "220%", opacity: 0 }}
            transition={{ delay: 0.1, duration: 1.1, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(105deg, transparent 30%, rgba(0,0,0,0.07) 50%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ── core content unchanged ── */}
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
            color: "#000000", textAlign: "center",
            maxWidth: "580px", padding: "0 2rem",
            letterSpacing: "0.02em", lineHeight: 1.7,
            position: "relative", zIndex: 1,
          }}>
            {displayed}
            {idx < TEXT.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                style={{ marginLeft: "2px" }}>|</motion.span>
            )}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
