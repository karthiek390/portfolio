"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NoSpoonText from "@/components/shared/NoSpoonText";
import { trackOperatorEvent } from "@/lib/operator-events";

const BIO_COPY =
  "I build full-stack, cloud, and infrastructure projects that turn practical problems into reliable systems — from developer tooling and web apps to secure homelab and networking setups. I enjoy combining clean user experiences with strong backend, automation, and platform fundamentals.";

const INITIAL_DELAY_MS = 2000;
const MAX_DELAY_MS     = 16000;
const ACTIVE_MS        = 420;

const DEJA_VU_ASSETS = [
  "/deja-vu/cat-gif.gif",
  "/deja-vu/coding-the-matrix.gif",
  "/deja-vu/matrix-cat-still.jpg",
  "/deja-vu/matrix4-cat.webp",
  "/deja-vu/matrix-cat.webp",
];

function pickNextIndex(prev: number) {
  if (DEJA_VU_ASSETS.length <= 1) return 0;
  let next = Math.floor(Math.random() * DEJA_VU_ASSETS.length);
  while (next === prev) next = Math.floor(Math.random() * DEJA_VU_ASSETS.length);
  return next;
}

export default function BlueHeroDejaVu() {
  const [isAnomalyActive, setIsAnomalyActive] = useState(false);
  const [nextDelay,       setNextDelay]       = useState(INITIAL_DELAY_MS);
  const [cycle,           setCycle]           = useState(0);
  const [assetIndex,      setAssetIndex]      = useState(0);

  useEffect(() => {
    DEJA_VU_ASSETS.forEach((src) => { const img = new window.Image(); img.src = src; });
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setAssetIndex((p) => pickNextIndex(p));
      setIsAnomalyActive(true);
      setCycle((v) => v + 1);
      setNextDelay((v) => Math.min(v * 2, MAX_DELAY_MS));
    }, nextDelay);
    return () => window.clearTimeout(t);
  }, [cycle, nextDelay]);

  useEffect(() => {
    if (!isAnomalyActive) return;
    const t = window.setTimeout(() => setIsAnomalyActive(false), ACTIVE_MS);
    return () => window.clearTimeout(t);
  }, [isAnomalyActive]);

  return (
    <section
      id="about"
      className="bp-panel-a"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "96px 64px" }}
    >
      <div style={{ maxWidth: "840px", width: "100%", display: "flex", gap: "4rem", alignItems: "center" }}>

        {/* ── Left column (55%) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ flex: "0 0 55%", display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <p style={{
            color: "var(--bp-accent)", fontSize: "0.9rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
          }}>
            Full-Stack Engineer & Cloud Practitioner
          </p>

          <h1
            id="hero-name"
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              fontWeight: 900,
              color: "var(--bp-ink)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            <NoSpoonText>Karthiek Duggirala</NoSpoonText>
          </h1>

          <p id="hero-bio" style={{ maxWidth: "480px", fontSize: "1rem", lineHeight: 1.85, color: "var(--bp-ink-muted)" }}>
            {BIO_COPY}
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
            {/* LinkedIn — primary solid CTA */}
            <a
              id="hero-linkedin-btn"
              href="https://www.linkedin.com/in/karthiek-duggirala/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOperatorEvent({
                type: "PAGE_NAV", detail: "linkedin-hero-click", page: "blue",
                metadata: { mode: "blue", destination: "linkedin" },
              })}
              style={{
                padding: "0.72rem 1.6rem",
                background: "var(--bp-grad-cta)", color: "#FFFFFF",
                borderRadius: "999px", textDecoration: "none",
                fontWeight: 700, fontSize: "0.875rem",
                boxShadow: "var(--bp-shadow-accent)",
                transition: "box-shadow 0.18s ease, transform 0.12s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,80,189,0.30)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--bp-shadow-accent)";
              }}
            >
              LinkedIn
            </a>
            {/* GitHub — ghost */}
            <a
              id="hero-github-btn"
              href="https://github.com/karthiek390"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOperatorEvent({
                type: "REPO_CLICK", detail: "github-hero-click", page: "blue",
                metadata: { mode: "blue", destination: "github-profile" },
              })}
              style={{
                padding: "0.72rem 1.6rem",
                backgroundColor: "transparent", color: "var(--bp-ink)",
                border: "1.5px solid var(--bp-border)",
                borderRadius: "999px", textDecoration: "none",
                fontWeight: 600, fontSize: "0.875rem",
                transition: "border-color 0.18s ease, color 0.18s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--bp-accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--bp-accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--bp-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--bp-ink)";
              }}
            >
              GitHub
            </a>
          </div>
        </motion.div>

        {/* ── Right column (40%) — tilted deja-vu frame ── */}
        <div style={{ flex: "0 0 40%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            width: "100%", maxWidth: "320px", aspectRatio: "1 / 1",
            borderRadius: "24px",
            /* Warm amber-cream glass — no backdrop-filter per anti-pattern */
            backgroundColor: isAnomalyActive
              ? "rgba(250,246,240,0.92)"
              : "rgba(245,232,208,0.55)",
            border: "1px solid rgba(212,201,186,0.7)",
            boxShadow: "var(--bp-shadow-float)",
            transform: isAnomalyActive ? "rotate(-4deg) scale(1.02)" : "rotate(-3deg)",
            transition: "transform 0.18s cubic-bezier(0.16,1,0.3,1), background-color 0.18s ease",
            overflow: "hidden",
            position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {/* Warm tint wash when no anomaly */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(245,220,180,0.4) 0%, rgba(210,230,255,0.4) 100%)",
              opacity: isAnomalyActive ? 0 : 1,
              transition: "opacity 0.18s ease",
            }} />

            {/* Deja-vu image */}
            <img
              key={`${assetIndex}-${cycle}`}
              src={DEJA_VU_ASSETS[assetIndex]}
              alt="" aria-hidden="true"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                opacity: isAnomalyActive ? 0.88 : 0,
                transition: "opacity 0.18s ease",
              }}
            />

            {!isAnomalyActive && (
              <p aria-hidden="true" style={{
                position: "absolute",
                color: "var(--bp-border)",
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase", zIndex: 1,
              }}>
                Déjà vu?
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
