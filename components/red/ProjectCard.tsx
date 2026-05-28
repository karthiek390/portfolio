"use client";

import { useState, useRef, useCallback } from "react";
import { trackOperatorEvent } from "@/lib/operator-events";
import { useTilt } from "@/lib/useTilt";

const mono = "JetBrains Mono, monospace";
const CHARS = "ｱｲｳｴｵｶｷｸｹｺﾀﾁﾂﾃﾄ01#$%@!?";

function dossierID(title: string) {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) >>> 0;
  return `ZN-${(h % 9000 + 1000).toString()}-${String.fromCharCode(65 + (h % 26))}`;
}

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
  const { cardRef, ghost1, ghost2, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt(14);
  const [hovered, setHovered] = useState(false);
  const id = dossierID(title);

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#070707",
    border: `1px solid ${hovered ? "rgba(0,255,65,0.5)" : "rgba(0,255,65,0.15)"}`,
    borderTop: `2px solid ${hovered ? "#00FF41" : "#F59E0B"}`,
    borderRadius: "2px",
    padding: "1.5rem",
    display: "flex", flexDirection: "column", gap: "0.9rem",
    willChange: "transform",
    position: "relative", overflow: "hidden",
  };

  const trackProjectClick = useCallback((kind: "github" | "live") => {
    trackOperatorEvent({
      type: "REPO_CLICK",
      detail: `${kind} opened for ${title}`,
      page: "portfolio",
      metadata: { project: title, kind },
    });
  }, [title]);

  return (
    <div style={{ position: "relative" }}>
      {/* Ghost trail layer 2 — slowest, most transparent */}
      <div ref={ghost2} style={{
        ...cardStyle,
        position: "absolute", inset: 0,
        opacity: 0.07,
        border: "1px solid rgba(0,255,65,0.08)",
        borderTop: "2px solid rgba(245,158,11,0.15)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Ghost trail layer 1 — medium lag */}
      <div ref={ghost1} style={{
        ...cardStyle,
        position: "absolute", inset: 0,
        opacity: 0.15,
        border: "1px solid rgba(0,255,65,0.14)",
        borderTop: "2px solid rgba(245,158,11,0.25)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Main card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { handleMouseEnter(); scramble(); setHovered(true); }}
        onMouseLeave={() => { handleMouseLeave(); reset(); setHovered(false); }}
        style={{
          ...cardStyle,
          boxShadow: hovered ? "0 0 28px rgba(0,255,65,0.12), inset 0 0 40px rgba(0,255,65,0.02)" : "none",
          cursor: "default",
          transition: "border-color 0.2s, box-shadow 0.2s",
          zIndex: 2,
        }}>

        {/* Amber corner accent */}
        <div aria-hidden style={{
          position: "absolute", top: 0, right: 0,
          width: "32px", height: "32px",
          borderBottom: "1px solid rgba(245,158,11,0.3)",
          borderLeft: "1px solid rgba(245,158,11,0.3)",
          borderBottomLeftRadius: "4px",
        }} />

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <p style={{ color: "#F59E0B", fontSize: "0.58rem", letterSpacing: "0.18em", fontFamily: mono, margin: 0 }}>
              CLASSIFIED // DOSSIER
            </p>
            <p style={{ color: "#003B00", fontSize: "0.58rem", letterSpacing: "0.12em", fontFamily: mono, margin: 0 }}>
              ID: {id}
            </p>
          </div>
          <span style={{ color: "#00FF41", fontSize: "0.55rem", fontFamily: mono, letterSpacing: "0.1em", opacity: 0.5, paddingTop: "2px" }}>
            ██ ZION
          </span>
        </div>

        <h3 style={{ color: "#00FF41", fontFamily: mono, fontSize: "0.95rem", fontWeight: 700,
          letterSpacing: "0.05em", margin: 0,
          textShadow: hovered ? "0 0 12px #00FF41" : "0 0 6px #00FF4144" }}>
          {display}
        </h3>

        <div style={{ height: "1px",
          background: "linear-gradient(to right, rgba(245,158,11,0.4), rgba(0,255,65,0.15), transparent)" }} />

        <p style={{ color: "#00802B", fontSize: "0.82rem", lineHeight: 1.75, fontFamily: mono, margin: 0 }}>
          {description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {techStack.map((tech) => (
            <span key={tech} style={{ padding: "0.18rem 0.55rem",
              border: "1px solid rgba(245,158,11,0.35)", color: "#F59E0B",
              borderRadius: "2px", fontSize: "0.62rem", letterSpacing: "0.08em", fontFamily: mono }}>
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1.5rem", marginTop: "auto", paddingTop: "0.25rem" }}>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              onClick={() => trackProjectClick("github")}
              style={{ color: "#00FF41", textDecoration: "none", fontSize: "0.75rem",
                fontFamily: mono, letterSpacing: "0.06em",
                borderBottom: "1px solid rgba(0,255,65,0.3)", paddingBottom: "1px" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.textShadow = "0 0 8px #00FF41")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.textShadow = "none")}>
              EXTRACT_CODEBASE &rarr;
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
              onClick={() => trackProjectClick("live")}
              style={{ color: "#F59E0B", textDecoration: "none", fontSize: "0.75rem", fontFamily: mono, letterSpacing: "0.06em" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.textShadow = "0 0 8px #F59E0B")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.textShadow = "none")}>
              LIVE_INSTANCE &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
