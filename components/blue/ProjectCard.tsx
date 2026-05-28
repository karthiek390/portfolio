"use client";

import { trackOperatorEvent } from "@/lib/operator-events";
import { useTilt } from "@/lib/useTilt";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

// ── Featured card — full-width glass surface, useTilt ────────────────────
function FeaturedCard({ title, description, techStack, githubUrl, liveUrl }: ProjectCardProps) {
  const { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt(5);
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(226,232,240,0.75)",
        borderRadius: "16px",
        padding: "2.25rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
        boxShadow: "0 4px 32px rgba(15,23,42,0.08)",
        transition: "box-shadow 0.2s ease, transform 0.4s ease",
        willChange: "transform",
        marginBottom: "1.5rem",
      }}
      onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 12px 48px rgba(37,99,235,0.12)")}
      onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 32px rgba(15,23,42,0.08)")}
    >
      {/* Featured badge */}
      <span style={{
        alignSelf: "flex-start",
        fontSize: "0.62rem", fontWeight: 700,
        letterSpacing: "0.14em", color: "#2563EB",
        textTransform: "uppercase",
      }}>
        Featured Project
      </span>

      <h3 style={{
        fontSize: "1.5rem", fontWeight: 800,
        color: "#0F172A", letterSpacing: "-0.02em",
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: "0.9rem", color: "#475569", lineHeight: 1.75,
        maxWidth: "580px",
      }}>
        {description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {techStack.map((t) => (
          <span key={t} style={{
            padding: "0.2rem 0.6rem",
            backgroundColor: "#EFF6FF", color: "#1E40AF",
            borderRadius: "4px", fontSize: "0.72rem", fontWeight: 600,
            border: "1px solid #BFDBFE",
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.25rem" }}>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer"
            className="bp-sweep"
            onClick={() => trackOperatorEvent({
              type: "REPO_CLICK", detail: title, page: "blue",
              metadata: { mode: "blue", project: title, destination: "github-repo" },
            })}>
            GitHub →
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
            className="bp-sweep"
            style={{ color: "#64748B" }}
            onClick={() => trackOperatorEvent({
              type: "REPO_CLICK", detail: `${title}-live`, page: "blue",
              metadata: { mode: "blue", project: title, destination: "live-demo" },
            })}>
            Live →
          </a>
        )}
      </div>
    </div>
  );
}

// ── Standard card — no tilt, border-left hover ───────────────────────────
export default function BlueProjectCard({
  title, description, techStack, githubUrl, liveUrl, featured = false,
}: ProjectCardProps) {
  if (featured) return <FeaturedCard {...{ title, description, techStack, githubUrl, liveUrl }} />;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderLeft: "3px solid transparent",
        borderRadius: "12px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
        boxShadow: "0 2px 12px rgba(15,23,42,0.05)",
        transition: "border-left-color 140ms ease, box-shadow 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "#2563EB";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(15,23,42,0.09)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(15,23,42,0.05)";
      }}
    >
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>{title}</h3>
      <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.7 }}>{description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {techStack.map((t) => (
          <span key={t} style={{
            padding: "0.2rem 0.55rem",
            backgroundColor: "#F8FAFC", color: "#475569",
            borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600,
            border: "1px solid #E2E8F0",
          }}>
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "auto", flexWrap: "wrap" }}>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer"
            className="bp-sweep"
            onClick={() => trackOperatorEvent({
              type: "REPO_CLICK", detail: title, page: "blue",
              metadata: { mode: "blue", project: title, destination: "github-repo" },
            })}>
            GitHub →
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
            className="bp-sweep"
            style={{ color: "#64748B" }}
            onClick={() => trackOperatorEvent({
              type: "REPO_CLICK", detail: `${title}-live`, page: "blue",
              metadata: { mode: "blue", project: title, destination: "live-demo" },
            })}>
            Live →
          </a>
        )}
      </div>
    </div>
  );
}
