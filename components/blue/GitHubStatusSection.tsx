"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { trackOperatorEvent } from "@/lib/operator-events";

type GitHubStatus = {
  repo:       string;
  message:    string;
  time_ago:   string;
  url:        string;
  avatar_url: string;
};

function Skeleton({ w, h = 13, r = 4 }: { w: number | string; h?: number; r?: number }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r,
      backgroundColor: "var(--bp-border-fine)",
      animation: "gh-shimmer 1.4s ease-in-out infinite",
    }} />
  );
}

export default function GitHubStatusSection() {
  const [data,    setData]    = useState<GitHubStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    fetch("/api/github-status")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d: GitHubStatus) => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <>
      <style>{`
        @keyframes gh-shimmer { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
      `}</style>

      <section
        id="shipping"
        className="bp-panel-b"
        aria-label="Recent engineering activity"
        style={{ padding: "96px 64px", minHeight: "60vh" }}
      >
        <div style={{ maxWidth: "840px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Label with optional LIVE pulse dot */}
            <div className="bp-label" style={{ marginBottom: "12px" }}>
              {!loading && !error && data && (
                <span className="bp-pulse-dot" aria-hidden="true" />
              )}
              Shipping
            </div>

            <h2 style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 800, color: "var(--bp-ink)",
              letterSpacing: "-0.03em", marginBottom: "0.4rem",
            }}>
              What I&apos;m Building
            </h2>
            <p style={{ color: "var(--bp-ink-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              A live signal that I&apos;m actively shipping code.
            </p>
          </motion.div>

          {/* Card with left accent bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            style={{
              backgroundColor: "#FDFAF6",
              border: "1px solid rgba(212,201,186,0.65)",
              borderLeft: "3px solid var(--bp-accent)",
              borderRadius: "0 14px 14px 0",
              padding: "1.75rem 2rem",
              boxShadow: "var(--bp-shadow-card)",
              display: "flex", flexDirection: "column", gap: "1.1rem",
            }}
          >
            {/* LOADING */}
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <Skeleton w={32} h={32} r={999} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <Skeleton w={130} /><Skeleton w={70} h={10} />
                  </div>
                </div>
                <Skeleton w="100%" h={16} r={4} /><Skeleton w="55%" h={13} /><Skeleton w={90} h={20} r={4} />
              </div>
            )}

            {/* ERROR */}
            {!loading && (error || !data) && (
              <div>
                <p style={{ color: "var(--bp-ink)", fontWeight: 600, fontSize: "0.95rem", margin: "0 0 0.3rem" }}>
                  No recent activity available
                </p>
                <p style={{ color: "var(--bp-ink-muted)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                  Check back soon — I push code regularly.{" "}
                  <a href="https://github.com/karthiek390" target="_blank" rel="noopener noreferrer"
                    className="bp-sweep"
                    onClick={() => trackOperatorEvent({ type: "REPO_CLICK", detail: "github-profile-fallback", page: "blue", metadata: { mode: "blue", destination: "github-profile" } })}>
                    View GitHub
                  </a>
                </p>
              </div>
            )}

            {/* SUCCESS */}
            {!loading && !error && data && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  {data.avatar_url && (
                    <img src={data.avatar_url} alt="GitHub avatar" width={30} height={30}
                      style={{ borderRadius: 999, border: "1.5px solid var(--bp-border)", flexShrink: 0 }} />
                  )}
                  <div>
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--bp-accent)", margin: 0 }}>
                      {data.repo}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: "#8A9AB0", margin: "2px 0 0", fontFamily: "JetBrains Mono, monospace" }}>
                      {data.time_ago}
                    </p>
                  </div>
                </div>

                {/* Commit chip */}
                <div style={{
                  backgroundColor: "var(--bp-surface-b)",
                  border: "1px solid var(--bp-border-fine)",
                  borderRadius: "6px", padding: "0.75rem 1rem",
                  display: "flex", gap: "0.6rem", alignItems: "flex-start",
                }}>
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 700,
                    color: "var(--bp-ink-muted)", letterSpacing: "0.1em",
                    flexShrink: 0, marginTop: "2px",
                    fontFamily: "JetBrains Mono, monospace", opacity: 0.6,
                  }}>
                    commit
                  </span>
                  <p style={{ fontSize: "0.9rem", color: "var(--bp-ink)", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                    {data.message}
                  </p>
                </div>

                <a
                  id="github-status-cta"
                  href={data.url}
                  target="_blank" rel="noopener noreferrer"
                  className="bp-sweep"
                  onClick={() => trackOperatorEvent({ type: "REPO_CLICK", detail: data.repo, page: "blue", metadata: { mode: "blue", destination: "github-commit", repo: data.repo } })}
                >
                  View on GitHub →
                </a>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
