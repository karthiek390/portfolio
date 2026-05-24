"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXT = "This is the Construct. It is our loading program. We can load anything.";

interface TheConstructProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function TheConstruct({ isVisible, onComplete }: TheConstructProps) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

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
          }}
        >
          <p style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
            color: "#000000", textAlign: "center",
            maxWidth: "580px", padding: "0 2rem",
            letterSpacing: "0.02em", lineHeight: 1.7,
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
