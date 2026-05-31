"use client";

import { motion } from "framer-motion";
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

// ── Tag chip — editorial warm style (4px radius per hyper-dreams scale) ──
function Tag({ label }: { label: string }) {
  return (
    <span style={{
      padding: "0.2rem 0.55rem",
      backgroundColor: "var(--bp-tag-bg)",
      color: "var(--bp-tag-text)",
      borderRadius: "4px",
      fontSize: "0.72rem", fontWeight: 600,
      border: "1px solid var(--bp-border)",
    }}>
      {label}
    </span>
  );
}

// ── Featured card — warm cream glass, useTilt ─────────────────────────────
function FeaturedCard({ title, description, techStack, githubUrl, liveUrl }: ProjectCardProps) {
  const { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter } = useTilt(5);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "#FDFAF6",   /* warm cream glass — no backdrop-filter per DESIGN.md */
        border: "1px solid rgba(212,201,186,0.65)",
        borderRadius: "16px",
        padding: "2.25rem 2.5rem",
        display: "flex", flexDirection: "column", gap: "1.1rem",
        boxShadow: "var(--bp-shadow-float)",
        transition: "box-shadow 0.2s cubic-bezier(0.165,0.84,0.44,1), transform 0.4s ease",
        willChange: "transform",
        marginBottom: "1.5rem",
      }}
      onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 12px 48px rgba(0,80,189,0.12)")}
      onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--bp-shadow-float)")}
    >
      <span style={{
        alignSelf: "flex-start",
        fontSize: "0.62rem", fontWeight: 700,
        letterSpacing: "0.14em", color: "var(--bp-accent)",
        textTransform: "uppercase",
      }}>
        Featured Project
      </span>

      <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--bp-ink)", letterSpacing: "-0.02em" }}>
        {title}
      </h3>

      <p style={{ fontSize: "0.9rem", color: "var(--bp-ink-muted)", lineHeight: 1.75, maxWidth: "580px" }}>
        {description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {techStack.map((t) => <Tag key={t} label={t} />)}
      </div>

      <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.25rem" }}>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer"
            className="bp-sweep"
            onClick={() => trackOperatorEvent({ type: "REPO_CLICK", detail: title, page: "blue", metadata: { mode: "blue", project: title, destination: "github-repo" } })}>
            GitHub →
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
            className="bp-sweep"
            style={{ color: "var(--bp-ink-muted)" }}
            onClick={() => trackOperatorEvent({ type: "REPO_CLICK", detail: `${title}-live`, page: "blue", metadata: { mode: "blue", project: title, destination: "live-demo" } })}>
            Live →
          </a>
        )}
      </div>
    </div>
  );
}

// ── Standard card — border-left activation, no tilt ──────────────────────
export default function BlueProjectCard({
  title, description, techStack, githubUrl, liveUrl, featured = false,
}: ProjectCardProps) {
  if (featured) return <FeaturedCard {...{ title, description, techStack, githubUrl, liveUrl }} />;

  return (
    <div
      style={{
        backgroundColor: "#FDFAF6",
        border: "1px solid rgba(212,201,186,0.65)",
        borderLeft: "3px solid transparent",
        borderRadius: "0 12px 12px 0",
        padding: "1.75rem",
        display: "flex", flexDirection: "column", gap: "0.9rem",
        boxShadow: "var(--bp-shadow-card)",
        transition: "border-left-color 140ms ease, box-shadow 0.2s cubic-bezier(0.165,0.84,0.44,1)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--bp-accent)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(11,19,43,0.09)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--bp-shadow-card)";
      }}
    >
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--bp-ink)" }}>{title}</h3>
      <p style={{ fontSize: "0.875rem", color: "var(--bp-ink-muted)", lineHeight: 1.7 }}>{description}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {techStack.map((t) => <Tag key={t} label={t} />)}
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "auto", flexWrap: "wrap" }}>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer"
            className="bp-sweep"
            onClick={() => trackOperatorEvent({ type: "REPO_CLICK", detail: title, page: "blue", metadata: { mode: "blue", project: title, destination: "github-repo" } })}>
            GitHub →
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
            className="bp-sweep"
            style={{ color: "var(--bp-ink-muted)" }}
            onClick={() => trackOperatorEvent({ type: "REPO_CLICK", detail: `${title}-live`, page: "blue", metadata: { mode: "blue", project: title, destination: "live-demo" } })}>
            Live →
          </a>
        )}
      </div>
    </div>
  );
}
