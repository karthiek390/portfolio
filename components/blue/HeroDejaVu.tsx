"use client";

import { useEffect, useState } from "react";
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

  // Preload assets
  useEffect(() => {
    DEJA_VU_ASSETS.forEach((src) => { const img = new window.Image(); img.src = src; });
  }, []);

  // Deja-vu timer
  useEffect(() => {
    const t = window.setTimeout(() => {
      setAssetIndex((p) => pickNextIndex(p));
      setIsAnomalyActive(true);
      setCycle((v) => v + 1);
      setNextDelay((v) => Math.min(v * 2, MAX_DELAY_MS));
    }, nextDelay);
    return () => window.clearTimeout(t);
  }, [cycle, nextDelay]);

  // Reset anomaly
  useEffect(() => {
    if (!isAnomalyActive) return;
    const t = window.setTimeout(() => setIsAnomalyActive(false), ACTIVE_MS);
    return () => window.clearTimeout(t);
  }, [isAnomalyActive]);

  return (
    <section
      id="about"
      className="bp-panel-a"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "96px 64px",
      }}
    >
      <div style={{
        maxWidth: "840px",
        width: "100%",
        display: "flex",
        gap: "4rem",
        alignItems: "center",
      }}>

        {/* ── Left column — 55% ──────────────────────────────────────── */}
        <div style={{ flex: "0 0 55%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Eyebrow */}
          <p style={{
            color: "#2563EB", fontSize: "0.78rem", fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
          }}>
            Full-Stack Engineer & Cloud Practitioner
          </p>

          {/* Name */}
          <h1
            id="hero-name"
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              fontWeight: 900,
              color: "#0F172A",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            <NoSpoonText>Karthiek Duggirala</NoSpoonText>
          </h1>

          {/* Bio */}
          <p
            id="hero-bio"
            style={{
              maxWidth: "480px",
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "#475569",
            }}
          >
            {BIO_COPY}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
            <a
              id="hero-linkedin-btn"
              href="https://www.linkedin.com/in/karthiek-duggirala/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOperatorEvent({
                type: "PAGE_NAV",
                detail: "linkedin-hero-click",
                page: "blue",
                metadata: { mode: "blue", destination: "linkedin" },
              })}
              style={{
                padding: "0.72rem 1.6rem",
                backgroundColor: "#2563EB", color: "#FFFFFF",
                borderRadius: "999px", textDecoration: "none",
                fontWeight: 700, fontSize: "0.875rem",
                boxShadow: "0 4px 18px rgba(37,99,235,0.28)",
                transition: "background-color 0.18s, box-shadow 0.18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#1D4ED8";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(37,99,235,0.38)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#2563EB";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 18px rgba(37,99,235,0.28)";
              }}
            >
              LinkedIn
            </a>
            <a
              id="hero-github-btn"
              href="https://github.com/karthiek390"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOperatorEvent({
                type: "REPO_CLICK",
                detail: "github-hero-click",
                page: "blue",
                metadata: { mode: "blue", destination: "github-profile" },
              })}
              style={{
                padding: "0.72rem 1.6rem",
                backgroundColor: "transparent", color: "#0F172A",
                border: "1.5px solid #CBD5E1",
                borderRadius: "999px", textDecoration: "none",
                fontWeight: 600, fontSize: "0.875rem",
                transition: "border-color 0.18s, color 0.18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#2563EB";
                (e.currentTarget as HTMLElement).style.color = "#2563EB";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#CBD5E1";
                (e.currentTarget as HTMLElement).style.color = "#0F172A";
              }}
            >
              GitHub
            </a>
          </div>
        </div>

        {/* ── Right column — 45% — tilted deja-vu frame ─────────────── */}
        <div style={{
          flex: "0 0 40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            width: "100%",
            maxWidth: "320px",
            aspectRatio: "1 / 1",
            borderRadius: "24px",
            backgroundColor: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(226,232,240,0.8)",
            boxShadow: "0 16px 60px rgba(15,23,42,0.10)",
            transform: isAnomalyActive ? "rotate(-4deg) scale(1.02)" : "rotate(-3deg)",
            transition: "transform 0.18s cubic-bezier(0.16,1,0.3,1)",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Placeholder tint */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
              opacity: isAnomalyActive ? 0 : 1,
              transition: "opacity 0.18s ease",
            }} />

            {/* Deja-vu image */}
            <img
              key={`${assetIndex}-${cycle}`}
              src={DEJA_VU_ASSETS[assetIndex]}
              alt=""
              aria-hidden="true"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                opacity: isAnomalyActive ? 0.88 : 0,
                transition: "opacity 0.18s ease",
              }}
            />

            {/* Subtle inner label when inactive */}
            {!isAnomalyActive && (
              <p aria-hidden="true" style={{
                position: "absolute",
                color: "#BFDBFE",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                zIndex: 1,
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
