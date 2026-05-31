"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackOperatorEvent } from "@/lib/operator-events";
import { hasSeenZionProject, markZionProjectSeen } from "@/lib/pill-discovery";
import RedProjectCard from "./ProjectCard";

const mono = "JetBrains Mono, monospace";

const PROJECTS = [
  {
    title: "DICOM Local Viewer",
    description: "Local-first medical imaging platform. Securely view MRI, CT, X-ray, PET and more with zero cloud dependency. OHIF + Orthanc stack, Docker Compose, browser-driven workflow.",
    techStack: ["Vue 3", "Vite", "Node.js", "Express", "Orthanc", "OHIF", "Docker Compose", "Nginx"],
    githubUrl: "https://github.com/karthiek390/dicom-local-viewer",
  },
  {
    title: "CICD Stats Watcher",
    description: "GitHub Marketplace Action for self-hosted runners. Tracks storage, Docker, CPU, memory, and inode metrics across named workflow steps. Generates downloadable CI reports.",
    techStack: ["GitHub Actions", "Bash", "Python", "HTML Reports", "Linux", "Docker"],
    githubUrl: "https://github.com/karthiek390/cicd-stats-watcher",
    liveUrl: "https://github.com/marketplace/actions/cicd-stats-watcher",
  },
  {
    title: "Tic-Tac-Toe AI Coach",
    description: "Full-stack trainer that logs every move, analyzes decisions, and delivers coaching feedback to help players improve. Flask backend + React frontend, deployed to Vercel + Render.",
    techStack: ["React", "Tailwind CSS", "Vite", "TypeScript", "Flask", "SQLAlchemy", "SQLite"],
    githubUrl: "https://github.com/karthiek390/tic-tac-toe",
    liveUrl: "https://tic-tac-toe-roan-nine-56.vercel.app/",
  },
  {
    title: "Family Network Filtering",
    description: "Raspberry Pi 5 running Pi-hole as a network-wide DNS server. Separate filtering groups for kids (strict blocklists) and adults (ad/tracker only). Centralized — no per-device config.",
    techStack: ["Raspberry Pi 5", "Pi-hole", "DNS", "Cloudflare", "DHCP", "Network Security"],
  },
  {
    title: "Home Media Server",
    description: "Revived desktop turned secure homelab. TrueNAS SCALE + ZFS storage, Jellyfin streaming with NVIDIA GTX 1650 GPU transcoding, WireGuard/Tailscale VPN plan, least-privilege networking.",
    techStack: ["TrueNAS SCALE", "ZFS", "Jellyfin", "FFmpeg", "NVIDIA GTX 1650", "WireGuard", "Tailscale"],
  },
];

// Keymaker secret — type "zion" anywhere on the page
const SECRET_KEY = ["z", "i", "o", "n"];

const HIDDEN_PROJECT = {
  title: "Matrix Portfolio",
  description: "Dual-mode developer portfolio with Blue Pill and Red Pill experiences, cinematic transitions, interactive skill programs, secret unlock paths, Architect and Mainframe rooms, and operator analytics instrumentation across the experience.",
  techStack: ["Next.js", "React", "TypeScript", "Framer Motion", "Prisma", "PostgreSQL", "Tailwind CSS"],
  githubUrl: "https://github.com/karthiek390/portfolio",
};

export default function RedProjectsGrid() {
  const [unlocked, setUnlocked]   = useState(false);
  const [keyBuffer, setKeyBuffer] = useState<string[]>([]);
  const [flash, setFlash]         = useState(false);

  useEffect(() => {
    setUnlocked(hasSeenZionProject());
  }, []);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (unlocked) return;
    setKeyBuffer((prev) => {
      const next = [...prev, e.key.toLowerCase()].slice(-SECRET_KEY.length);
      if (next.join("") === SECRET_KEY.join("")) {
        markZionProjectSeen();
        setUnlocked(true);
        setFlash(true);
        trackOperatorEvent({
          type: "KEYMAKER",
          detail: "secret sequence [zion] decoded",
          page: "portfolio",
          metadata: { secret: "zion" },
        });
        setTimeout(() => setFlash(false), 800);
      }
      return next;
    });
  }, [unlocked]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <section id="projects" style={{ padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <style>{`
        @keyframes keymaker-lock-prompt {
          0%, 100% {
            opacity: 0.78;
            text-shadow: 0 0 0 rgba(0,255,65,0);
          }
          40% {
            opacity: 1;
            text-shadow: 0 0 8px rgba(0,255,65,0.7), 0 0 18px rgba(0,255,65,0.3);
          }
          65% {
            opacity: 0.92;
            text-shadow: 0 0 5px rgba(0,255,65,0.28);
          }
        }
      `}</style>
      <p style={{ color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.15em",
        marginBottom: "0.5rem", fontFamily: mono }}>
        // MAINFRAME_PENETRATIONS
      </p>
      <h2 style={{ color: "#00FF41", fontFamily: mono, fontSize: "2rem",
        fontWeight: 700, marginBottom: "0.5rem", textShadow: "0 0 12px #00FF4155" }}>
        Extracted Projects
      </h2>
      <p style={{ color: "#00802B", fontSize: "0.82rem", marginBottom: "3rem", fontFamily: mono }}>
        Software. Automation. Infrastructure.{" "}
        {!unlocked && (
          <span
            style={{
              color: "#00802B",
              fontSize: "0.65rem",
              letterSpacing: "0.06em",
              animation: "keymaker-lock-prompt 2.8s ease-in-out infinite",
            }}
          >
            // [KEYMAKER_LOCKED: 1 classified file hidden]{" "}
            <span
              style={{
                color: "#F59E0B",
                textShadow: "0 0 6px rgba(245,158,11,0.45)",
              }}
            >
              &lt;HINT: ZION&gt;
            </span>
          </span>
        )}
      </p>

      {/* Flash effect on unlock */}
      <AnimatePresence>
        {flash && (
          <motion.div key="flash"
            initial={{ opacity: 0.6 }} animate={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: "fixed", inset: 0, backgroundColor: "#00FF41",
              pointerEvents: "none", zIndex: 9998 }} />
        )}
      </AnimatePresence>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {PROJECTS.map((p) => <RedProjectCard key={p.title} {...p} />)}

        {/* Hidden project — unlocks on secret key sequence */}
        <AnimatePresence>
          {unlocked && (
            <motion.div key="keymaker"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}>
              {/* Unlock badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem",
                marginBottom: "0.5rem" }}>
                <span style={{ color: "#F59E0B", fontSize: "0.6rem", fontFamily: mono,
                  letterSpacing: "0.15em", textShadow: "0 0 6px #F59E0B" }}>
                  🔑 KEYMAKER FILE UNLOCKED
                </span>
              </div>
              <RedProjectCard {...HIDDEN_PROJECT} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle hint */}
      {!unlocked && (
        <p style={{ color: "#001200", fontSize: "0.58rem", fontFamily: mono,
          letterSpacing: "0.08em", marginTop: "2rem", textAlign: "center" }}>
          // not all files are visible to every operator
        </p>
      )}
    </section>
  );
}
