"use client";

import { useState, useRef, useCallback } from "react";
import { useTilt } from "@/lib/useTilt";

const CHARS = "ｱｲｳｴｵｶｷｸｹｺﾀﾁﾂﾃﾄ01#$%";

function useScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    let iter = 0;
    const max = original.length * 3;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const tick = () => {
      setDisplay(original.split("").map((ch, idx) =>
        idx < Math.floor(iter / 3) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join(""));
      iter++;
      if (iter < max) frameRef.current = requestAnimationFrame(tick);
      else setDisplay(original);
    };
    tick();
  }, [original]);

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplay(original);
  }, [original]);

  return { display, scramble, reset };
}

interface RedProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function RedProjectCard({ title, description, techStack, githubUrl, liveUrl }: RedProjectCardProps) {
  const { display, scramble, reset } = useScramble(title);
  const { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt(12);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => { handleMouseEnter(); scramble(); }}
      onMouseLeave={(e) => { handleMouseLeave(); reset(); }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#00FF41";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(0,255,65,0.15)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,65,0.2)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
      style={{ backgroundColor: "#0D0D0D", border: "1px solid rgba(0,255,65,0.2)",
        borderRadius: "4px", padding: "1.75rem", display: "flex", flexDirection: "column",
        gap: "1rem", transition: "border-color 0.2s, box-shadow 0.2s, transform 0.5s ease",
        cursor: "default", willChange: "transform" }}>

      <p style={{ color: "#003B00", fontSize: "0.62rem", letterSpacing: "0.1em",
        fontFamily: "JetBrains Mono, monospace" }}>
        [CLASSIFIED_FILE]
      </p>

      <h3 style={{ color: "#00FF41", fontFamily: "JetBrains Mono, monospace",
        fontSize: "1rem", fontWeight: 700, letterSpacing: "0.05em",
        textShadow: "0 0 8px #00FF4166", margin: 0 }}>
        {display}
      </h3>

      <p style={{ color: "#00802B", fontSize: "0.85rem", lineHeight: 1.7 }}>{description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {techStack.map((tech) => (
          <span key={tech} style={{ padding: "0.15rem 0.5rem",
            border: "1px solid rgba(0,255,65,0.3)", color: "#00FF41",
            borderRadius: "2px", fontSize: "0.68rem", letterSpacing: "0.08em",
            fontFamily: "JetBrains Mono, monospace" }}>
            EXPLOIT: {tech}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1.5rem", marginTop: "auto" }}>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: "#00FF41", textDecoration: "none", fontSize: "0.78rem",
              fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.05em",
              borderBottom: "1px solid rgba(0,255,65,0.3)" }}>
            EXTRACT_CODEBASE &rarr;
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: "#00802B", textDecoration: "none", fontSize: "0.78rem",
              fontFamily: "JetBrains Mono, monospace" }}>
            LIVE_INSTANCE &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
