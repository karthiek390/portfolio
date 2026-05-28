"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PillMode } from "@/context/PillContext";
import { getClientId } from "@/lib/preferences";
import { trackOperatorEvent } from "@/lib/operator-events";
import { useMatrixAudio } from "@/lib/useMatrixAudio";
import AudioToggle from "@/components/red/AudioToggle";

const mono = "JetBrains Mono, monospace";

const NAV_LINKS = [
  { label: "INIT",     href: "#hero" },
  { label: "OPS",      href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "PROGRAMS", href: "#certs" },
  { label: "TRANSMIT", href: "#contact" },
];

const BOOT_LINES = [
  "HARDLINE DETECTED...",
  "INITIATING EXIT PROTOCOL...",
  "DISCONNECTING FROM MATRIX...",
  "",
];

export default function RedNavbar({ onSwitchMode }: { onSwitchMode: (m: PillMode) => void }) {
  const [exiting, setExiting] = useState(false);
  const { on: audioOn, setEnabled, strike, emp } = useMatrixAudio();
  const clientIdRef = useRef<string | null>(null);

  useEffect(() => {
    const clientId = getClientId();
    clientIdRef.current = clientId;
    if (!clientId) return;

    fetch(`/api/preferences?clientId=${encodeURIComponent(clientId)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("preferences load failed"))))
      .then((data: { audioEnabled?: boolean }) => {
        if (typeof data.audioEnabled === "boolean") {
          setEnabled(data.audioEnabled);
        }
      })
      .catch(() => {});
  }, [setEnabled]);

  const handleAudioToggle = useCallback(() => {
    const next = !audioOn;
    const clientId = clientIdRef.current ?? getClientId();
    clientIdRef.current = clientId;
    trackOperatorEvent({
      type: "AUDIO_TOGGLE",
      detail: `ambient audio ${next ? "enabled" : "disabled"}`,
      page: "portfolio",
      metadata: { enabled: next },
    });
    setEnabled(next);

    if (!clientId) return;
    fetch("/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        audioEnabled: next,
      }),
    }).catch(() => {});
  }, [audioOn, setEnabled]);

  const handleDisconnect = useCallback(() => {
    if (exiting) return;
    trackOperatorEvent({
      type: "DISCONNECT",
      detail: "hardline exit triggered",
      page: "portfolio",
      metadata: { mode: "red" },
    });
    emp();
    setExiting(true);
    setTimeout(() => onSwitchMode("blue"), 1800);
  }, [exiting, onSwitchMode, emp]);

  return (
    <>
      {/* Phone Booth Exit Overlay */}
      <AnimatePresence>
        {exiting && (
          <motion.div
            key="phonebooth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              backgroundColor: "#000",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "0.6rem",
              overflow: "hidden",
            }}>

            {/* Rapid horizontal scan sweep */}
            <motion.div aria-hidden
              initial={{ scaleY: 0, opacity: 0.8 }}
              animate={{ scaleY: [0, 1, 1, 0], opacity: [0.8, 0.3, 0.3, 0] }}
              transition={{ duration: 1.6, times: [0, 0.2, 0.8, 1] }}
              style={{
                position: "absolute", inset: 0,
                background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.06) 3px, rgba(0,255,65,0.06) 6px)",
                transformOrigin: "top",
              }} />

            {/* Zoom-in circle blast from center */}
            <motion.div aria-hidden
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 40, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeIn" }}
              style={{
                position: "absolute",
                width: "60px", height: "60px", borderRadius: "50%",
                border: "2px solid #00FF41",
                boxShadow: "0 0 20px #00FF41",
              }} />

            {/* Boot lines */}
            <div style={{ position: "relative", zIndex: 1,
              display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "center" }}>
              {BOOT_LINES.map((line, i) => (
                <motion.p key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.28 }}
                  style={{ color: "#00FF41", fontFamily: mono,
                    fontSize: "0.8rem", letterSpacing: "0.12em",
                    textShadow: "0 0 8px #00FF41", minHeight: "1.2em" }}>
                  {line}
                </motion.p>
              ))}

              {/* White flash at end */}
              <motion.div aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 0] }}
                transition={{ duration: 1.8, times: [0, 0.7, 0.88, 1] }}
                style={{
                  position: "fixed", inset: 0,
                  backgroundColor: "#FFFFFF",
                  pointerEvents: "none",
                }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav id="red-navbar" style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 2.5rem",
        backgroundColor: "#000",
        borderBottom: "1px solid rgba(0,255,65,0.2)",
        fontFamily: mono,
      }}>
        <span id="red-nav-logo" style={{
          color: "#00FF41", fontWeight: 700, fontSize: "1rem",
          letterSpacing: "0.15em", textShadow: "0 0 8px #00FF41",
        }}>
          KD<span style={{ opacity: 0.4 }}>://</span>
        </span>

        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}
              id={`red-nav-${link.label.toLowerCase()}`}
              data-text={link.label}
              className="glitch"
              onMouseEnter={(e) => { strike(); (e.target as HTMLElement).style.textShadow = "0 0 10px #00FF41"; }}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.textShadow = "none")}
              style={{ color: "#00FF41", textDecoration: "none", fontSize: "0.78rem",
                letterSpacing: "0.1em", transition: "text-shadow 0.2s" }}>
              {link.label}
            </a>
          ))}

          <AudioToggle on={audioOn} onToggle={handleAudioToggle} />

          <button id="red-pill-toggle-btn" onClick={handleDisconnect}
            style={{ background: "transparent", border: "1px solid rgba(0,255,65,0.4)",
              color: "#00FF41", borderRadius: "4px", padding: "0.35rem 0.85rem",
              fontSize: "0.72rem", letterSpacing: "0.08em", cursor: "pointer",
              fontFamily: "inherit", transition: "box-shadow 0.2s, border-color 0.2s" }}
            onMouseEnter={(e) => {
              (e.currentTarget).style.boxShadow = "0 0 12px #00FF4188";
              (e.currentTarget).style.borderColor = "#00FF41";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget).style.boxShadow = "none";
              (e.currentTarget).style.borderColor = "rgba(0,255,65,0.4)";
            }}>
            ☎ DISCONNECT
          </button>
        </div>
      </nav>
    </>
  );
}
