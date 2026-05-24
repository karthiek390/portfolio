"use client";

import { useTilt } from "@/lib/useTilt";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function BlueProjectCard({ title, description, techStack, githubUrl, liveUrl }: ProjectCardProps) {
  const { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt(6);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOver={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(37,99,235,0.15)"; }}
      onMouseOut={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}
      style={{
        backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px",
        padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, transform 0.5s ease",
        willChange: "transform",
      }}>
      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A" }}>{title}</h3>
      <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.7 }}>{description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {techStack.map((tech) => (
          <span key={tech} style={{ padding: "0.2rem 0.65rem", backgroundColor: "#EFF6FF",
            color: "#2563EB", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 600 }}>
            {tech}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "auto", flexWrap: "wrap" }}>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: "#2563EB", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}>
            GitHub &rarr;
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: "#64748B", fontSize: "0.8rem", textDecoration: "none" }}>
            Live &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
