"use client";

import { useEffect, useState } from "react";

const BIO_COPY =
  "I build full-stack, cloud, and infrastructure projects that turn practical problems into reliable systems, from developer tooling and web apps to secure homelab and networking setups. I enjoy combining clean user experiences with strong backend, automation, and platform fundamentals.";

const INITIAL_DELAY_MS = 2000;
const MAX_DELAY_MS = 16000;
const ACTIVE_MS = 420;

const DEJA_VU_ASSETS = [
  "/deja-vu/cat-gif.gif",
  "/deja-vu/coding-the-matrix.gif",
  "/deja-vu/matrix-cat-still.jpg",
  "/deja-vu/matrix4-cat.webp",
  "/deja-vu/matrix-cat.webp",
];

const POSITIONS = [
  { top: "-2.6rem", right: "-0.2rem", rotate: "-4deg" },
  { top: "-0.9rem", right: "1.4rem", rotate: "3deg" },
  { top: "-2rem", right: "3.3rem", rotate: "-2deg" },
];

function pickNextIndex(previousIndex: number) {
  if (DEJA_VU_ASSETS.length <= 1) return 0;

  let nextIndex = Math.floor(Math.random() * DEJA_VU_ASSETS.length);
  while (nextIndex === previousIndex) {
    nextIndex = Math.floor(Math.random() * DEJA_VU_ASSETS.length);
  }

  return nextIndex;
}

export default function BlueHeroDejaVu() {
  const [isAnomalyActive, setIsAnomalyActive] = useState(false);
  const [nextDelay, setNextDelay] = useState(INITIAL_DELAY_MS);
  const [cycle, setCycle] = useState(0);
  const [assetIndex, setAssetIndex] = useState(0);
  const [positionIndex, setPositionIndex] = useState(0);

  useEffect(() => {
    DEJA_VU_ASSETS.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAssetIndex((previousIndex) => pickNextIndex(previousIndex));
      setPositionIndex(Math.floor(Math.random() * POSITIONS.length));
      setIsAnomalyActive(true);
      setCycle((value) => value + 1);
      setNextDelay((value) => Math.min(value * 2, MAX_DELAY_MS));
    }, nextDelay);

    return () => window.clearTimeout(timer);
  }, [cycle, nextDelay]);

  useEffect(() => {
    if (!isAnomalyActive) return;

    const settleTimer = window.setTimeout(() => {
      setIsAnomalyActive(false);
    }, ACTIVE_MS);

    return () => window.clearTimeout(settleTimer);
  }, [isAnomalyActive]);

  const activePosition = POSITIONS[positionIndex];

  return (
    <section
      id="hero"
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 2.5rem",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
        <p
          style={{
            color: isAnomalyActive ? "#1D4ED8" : "#2563EB",
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "0.05em",
            transition: "color 0.18s ease",
          }}
        >
          Hi, I&apos;m
        </p>

        <h1
          id="hero-name"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 800,
            color: "#0F172A",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Karthiek Duggirala
        </h1>

        <h2
          id="hero-title"
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
            fontWeight: 400,
            color: "#64748B",
          }}
        >
          Full-Stack Engineer &amp; Cloud Practitioner
        </h2>

        <div style={{ position: "relative", maxWidth: "540px" }}>
          {isAnomalyActive && (
            <>
              <p
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: 0,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(37,99,235,0.28)",
                  transform: "translate(-1px, -1px)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {BIO_COPY}
              </p>
              <p
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: 0,
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(15,23,42,0.10)",
                  transform: "translate(2px, 0)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {BIO_COPY}
              </p>
            </>
          )}

          <p
            id="hero-bio"
            style={{
              maxWidth: "540px",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: isAnomalyActive ? "#334155" : "#475569",
              transform: isAnomalyActive ? "translateX(1px)" : "translateX(0)",
              transition: "color 0.18s ease, transform 0.18s ease",
            }}
          >
            {BIO_COPY}
          </p>

          <img
            key={`${assetIndex}-${cycle}`}
            src={DEJA_VU_ASSETS[assetIndex]}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              top: activePosition.top,
              right: activePosition.right,
              width: "92px",
              height: "92px",
              objectFit: "cover",
              borderRadius: "14px",
              border: "1px solid rgba(15,23,42,0.12)",
              boxShadow: "0 14px 30px rgba(15,23,42,0.12)",
              opacity: isAnomalyActive ? 0.82 : 0,
              transform: isAnomalyActive
                ? `translateY(0) rotate(${activePosition.rotate}) scale(1)`
                : `translateY(8px) rotate(${activePosition.rotate}) scale(0.96)`,
              transition: "opacity 0.16s ease, transform 0.16s ease",
              pointerEvents: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
          <a
            id="hero-linkedin-btn"
            href="https://www.linkedin.com/in/karthiek-duggirala/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.75rem 1.75rem",
              backgroundColor: "#2563EB",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#1D4ED8")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "#2563EB")}
          >
            LinkedIn
          </a>
          <a
            id="hero-github-btn"
            href="https://github.com/karthiek390"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.75rem 1.75rem",
              backgroundColor: "transparent",
              color: "#2563EB",
              border: "2px solid #2563EB",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              transition: "background-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "#2563EB";
              (e.target as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "transparent";
              (e.target as HTMLElement).style.color = "#2563EB";
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
