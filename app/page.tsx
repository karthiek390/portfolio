"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import MatrixRain from "@/components/shared/MatrixRain";
import { usePill, PillMode } from "@/context/PillContext";

export default function LandingPage() {
  const { setMode } = usePill();
  const router = useRouter();

  const handleChoice = async (choice: PillMode) => {
    try {
      await setMode(choice);
      router.replace("/portfolio");
    } catch (error) {
      console.error("[LandingPage] Failed to save pill choice", error);
    }
  };

  return (
    <main
      id="landing-page"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.6 }}>
        <MatrixRain />
      </div>

      {/* Choice panel */}
      <motion.div
        id="choice-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          textAlign: "center",
          padding: "3rem",
          border: "1px solid rgba(0,255,65,0.2)",
          backgroundColor: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          borderRadius: "4px",
          maxWidth: "480px",
          width: "90vw",
        }}
      >
        <p style={{ color: "#00FF41", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7 }}>
          [ SYSTEM ALERT: ANOMALY DETECTED ]
        </p>

        <h1 style={{ color: "#FFFFFF", fontSize: "clamp(1.1rem, 4vw, 1.7rem)", fontWeight: 400, lineHeight: 1.7 }}>
          This is your last chance.<br />
          After this, there is no turning back.
        </h1>

        <div id="pill-buttons" style={{ display: "flex", gap: "2.5rem", alignItems: "center", marginTop: "0.5rem" }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
            <PillButton id="blue-pill-btn" color="blue" label="Blue Pill" sublabel="The story ends." onClick={() => handleChoice("blue")} />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
            <PillButton id="red-pill-btn" color="red" label="Red Pill" sublabel="Stay in Wonderland." onClick={() => handleChoice("red")} />
          </motion.div>
        </div>

        <p style={{ color: "#00FF41", fontSize: "0.6rem", opacity: 0.35, letterSpacing: "0.08em", lineHeight: 1.8 }}>
          BLUE PILL — CLEAN. PROFESSIONAL. RECRUITER-READY.<br />
          RED PILL — SEE HOW DEEP THE CODE GOES.
        </p>
      </motion.div>
    </main>
  );
}

interface PillButtonProps {
  id: string;
  color: "red" | "blue";
  label: string;
  sublabel: string;
  onClick: () => void;
}

function PillButton({ id, color, label, sublabel, onClick }: PillButtonProps) {
  const isRed = color === "red";
  const pillColor = isRed ? "#EF4444" : "#3B82F6";
  const glow = isRed ? "0 0 16px #EF4444, 0 0 40px #EF444466" : "0 0 16px #3B82F6, 0 0 40px #3B82F666";

  return (
    <button
      id={id}
      onClick={onClick}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", transition: "transform 0.2s ease" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
    >
      <div style={{ width: "52px", height: "28px", borderRadius: "14px", backgroundColor: pillColor, boxShadow: glow, transform: "rotate(-20deg)", transition: "box-shadow 0.3s ease" }} />
      <span style={{ color: pillColor, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textShadow: glow }}>
        {label}
      </span>
      <span style={{ color: "#888", fontSize: "0.65rem" }}>{sublabel}</span>
    </button>
  );
}
