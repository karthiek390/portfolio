"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mono = "JetBrains Mono, monospace";

const LINES = [
  { text: "Wake up, Recruiter...",       delay: 600 },
  { text: "The Matrix has you.",          delay: 2200 },
  { text: "Follow the white rabbit.",     delay: 3900 },
];

function useTypewriter(text: string, startMs: number, speed = 42) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startMs);
    return () => clearTimeout(start);
  }, [text, startMs, speed]);

  return { displayed, done };
}

function TypedLine({ text, delay }: { text: string; delay: number }) {
  const { displayed } = useTypewriter(text, delay);
  return (
    <p style={{ color: "#00FF41", fontFamily: mono, fontSize: "1.05rem",
      letterSpacing: "0.04em", margin: 0, minHeight: "1.6em",
      textShadow: "0 0 8px #00FF4166" }}>
      {displayed}
      {displayed.length < text.length && displayed.length > 0 && (
        <motion.span animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
      )}
    </p>
  );
}

export default function KnockKnockTerminal() {
  const [showRabbit, setShowRabbit] = useState(false);
  const rabbitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const lastDelay = LINES[LINES.length - 1].delay;
    const lastLen   = LINES[LINES.length - 1].text.length * 42;
    rabbitTimer.current = setTimeout(() => setShowRabbit(true), lastDelay + lastLen + 400);
    return () => { if (rabbitTimer.current) clearTimeout(rabbitTimer.current); };
  }, []);

  return (
    <section id="knock-knock" style={{ padding: "4rem 2.5rem 2rem", maxWidth: "780px", margin: "0 auto" }}>
      <div style={{
        backgroundColor: "#050505",
        border: "1px solid rgba(0,255,65,0.2)",
        borderRadius: "4px",
        padding: "2rem 2.5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* scanline */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
        }} />

        <p style={{ color: "#003B00", fontSize: "0.65rem", letterSpacing: "0.15em",
          fontFamily: mono, marginBottom: "1.5rem" }}>
          [INCOMING_TRANSMISSION // ZION_UPLINK]
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {LINES.map((line) => (
            <TypedLine key={line.text} text={line.text} delay={line.delay} />
          ))}
        </div>

        <AnimatePresence>
          {showRabbit && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ marginTop: "1.75rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* ASCII rabbit SVG */}
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <text x="0" y="28" fontSize="28" fill="#00FF41"
                  style={{ fontFamily: mono, filter: "drop-shadow(0 0 5px #00FF41)" }}>
                  🐇
                </text>
              </svg>
              <a href="#experience" style={{ color: "#00802B", fontFamily: mono,
                fontSize: "0.82rem", textDecoration: "none", letterSpacing: "0.06em",
                borderBottom: "1px solid rgba(0,255,65,0.3)", paddingBottom: "1px",
                transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00FF41")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#00802B")}>
                {">> follow the white rabbit"}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
