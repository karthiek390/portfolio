"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Dialogue sequence (portfolio-adapted from The Matrix) ─────────────────────
const LINES = [
  "This is the Construct.",
  "It is our loading program. We can load anything.",
  "What do you need?",
  "Programs. Lots of programs.",
] as const;

// ── Timing constants (ms) ─────────────────────────────────────────────────────
const CHAR_MS          = 20;   // ms per keystroke
const LINE_PAUSE_MS    = 110;  // gap between lines
const POST_TYPE_MS     = 140;  // hold after last line before rack fires
const RACK_DURATION_MS = 680;  // rack zoom runs before furniture enters
const FURNITURE_HOLD   = 860;  // furniture is visible for this long
const EXIT_FADE_S      = 0.42; // overlay dissolve in seconds

// ── Phase state machine ───────────────────────────────────────────────────────
// idle → typing → rack → furniture → (onComplete fires → isVisible=false → exit)
type Phase = "idle" | "typing" | "rack" | "furniture";

// ── Contract unchanged — wiring in PillContext is not touched ─────────────────
interface TheConstructProps {
  isVisible: boolean;
  onComplete: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// WINGBACK CHAIR SILHOUETTE
// Classic high-back leather wingback — recognisable in flat black silhouette.
// ─────────────────────────────────────────────────────────────────────────────
function ChairSilhouette({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="86"
      height="130"
      viewBox="0 0 86 130"
      fill="#111111"
      aria-hidden
      style={{ display: "block", transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* high back */}
      <rect x="11" y="0" width="64" height="70" rx="5" />
      {/* left wing */}
      <path d="M11 14 Q1 14 1 24 L1 60 Q1 70 11 70 Z" />
      {/* right wing */}
      <path d="M75 14 Q85 14 85 24 L85 60 Q85 70 75 70 Z" />
      {/* seat cushion */}
      <rect x="7" y="69" width="72" height="24" rx="4" />
      {/* apron rail */}
      <rect x="11" y="93" width="64" height="7" rx="2" />
      {/* front legs */}
      <rect x="13" y="100" width="9" height="28" rx="3" />
      <rect x="64" y="100" width="9" height="28" rx="3" />
      {/* back legs (recessed, dimmer) */}
      <rect x="20" y="96" width="7" height="30" rx="3" opacity="0.5" />
      <rect x="59" y="96" width="7" height="30" rx="3" opacity="0.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VINTAGE RADIOLA TELEVISION SILHOUETTE
// Boxy mid-century TV cabinet with screen, knobs and splayed legs.
// ─────────────────────────────────────────────────────────────────────────────
function TVSilhouette() {
  return (
    <svg
      width="128"
      height="102"
      viewBox="0 0 128 102"
      fill="#111111"
      aria-hidden
    >
      {/* cabinet body */}
      <rect x="4" y="4" width="120" height="68" rx="6" />
      {/* screen bezel */}
      <rect x="13" y="12" width="102" height="52" rx="3" fill="#252525" />
      {/* screen shine */}
      <rect x="15" y="14" width="34" height="18" rx="2" fill="rgba(255,255,255,0.06)" />
      {/* right-side control knobs */}
      <circle cx="112" cy="28" r="4" fill="#0a0a0a" />
      <circle cx="112" cy="46" r="4" fill="#0a0a0a" />
      {/* bottom speaker grille stripe */}
      <rect x="13" y="68" width="102" height="4" rx="1" fill="#1c1c1c" />
      {/* splayed legs */}
      <path d="M22 72 L14 100 Q13 102 20 102 L28 102 Q30 102 30 100 Z" />
      <path d="M106 72 L114 100 Q115 102 108 102 L100 102 Q98 102 98 100 Z" />
      {/* centre support */}
      <rect x="56" y="72" width="16" height="26" rx="3" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WEAPON / ASSET RACK PANEL
//
// Simulates the symmetric wireframe corridors from the Construct scene.
// Two instances are mounted — one left, one right — with perspective origins
// pinned at the screen's horizontal centre, so the shelf lines converge to
// a shared vanishing point exactly as in the film.
//
// Technique: CSS perspective on the outer container + Framer Motion `z` on
// the inner preserve-3d wrapper. At z=-2400 the structure is a tiny dot in
// the distance; at z=+800 it has flown completely past the camera.
// The transition easing front-loads all the velocity (cubic-bezier with a
// steep initial slope) to match the film's breakneck hyper-zoom.
// ─────────────────────────────────────────────────────────────────────────────
function RackPanel({ side, active }: { side: "left" | "right"; active: boolean }) {
  const isLeft  = side === "left";
  const SHELVES = 11;
  const STRUTS  = [0.12, 0.38, 0.65, 0.90] as const;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 0, bottom: 0,
        [isLeft ? "left" : "right"]: 0,
        width: "50%",
        overflow: "hidden",
        // Perspective pinned to inner edge = vanishing point at screen centre
        perspective: "440px",
        perspectiveOrigin: isLeft ? "100% 50%" : "0% 50%",
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
        }}
        initial={{ z: -2400 }}
        animate={{ z: active ? 800 : -2400 }}
        transition={{
          // explosive ease-out — front-heavy velocity burst
          duration: 0.62,
          ease: [0.03, 0.88, 0.14, 1.0],
        }}
      >
        {/* Horizontal shelf bars */}
        {Array.from({ length: SHELVES }, (_, i) => (
          <div
            key={`shelf-${i}`}
            style={{
              position: "absolute",
              top: `${((i + 0.5) / SHELVES) * 100}%`,
              left: 0,
              right: 0,
              height: i === 0 || i === SHELVES - 1 ? "3px" : "2px",
              backgroundColor: `rgba(0,0,0,${0.13 + (i % 3) * 0.055})`,
              // secondary shelf shadow line below each bar
              boxShadow: "0 11px 0 rgba(0,0,0,0.045)",
            }}
          />
        ))}

        {/* Vertical structural struts */}
        {STRUTS.map((x, i) => (
          <div
            key={`strut-${i}`}
            style={{
              position: "absolute",
              top: 0, bottom: 0,
              // mirror position for right panel
              [isLeft ? "right" : "left"]: `${x * 100}%`,
              width: "2px",
              backgroundColor: `rgba(0,0,0,${0.11 + i * 0.04})`,
            }}
          />
        ))}

        {/* Frame outline */}
        <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(0,0,0,0.07)" }} />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FURNITURE SCENE
// Two wingback chairs flank a vintage TV cabinet, dropped from above via
// spring physics. The chairs land with a slight stagger.
// ─────────────────────────────────────────────────────────────────────────────
function FurnitureScene() {
  const SPRING = { type: "spring", stiffness: 220, damping: 22 } as const;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "16%",
        pointerEvents: "none",
      }}
    >
      {/* Left chair */}
      <motion.div
        initial={{ y: -280, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ ...SPRING, delay: 0.06 }}
        style={{ marginRight: "-14px", zIndex: 1 }}
      >
        <ChairSilhouette />
      </motion.div>

      {/* Radiola TV (drops first, lands centre) */}
      <motion.div
        initial={{ y: -240, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ ...SPRING, stiffness: 260, damping: 24, delay: 0 }}
        style={{ zIndex: 2, display: "flex", alignItems: "flex-end", paddingBottom: "3px" }}
      >
        <TVSilhouette />
      </motion.div>

      {/* Right chair (mirrored, drops last) */}
      <motion.div
        initial={{ y: -280, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ ...SPRING, delay: 0.12 }}
        style={{ marginLeft: "-14px", zIndex: 1 }}
      >
        <ChairSilhouette flip />
      </motion.div>

      {/* Ground shadow */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.08 }}
        transition={{ delay: 0.28, duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: "calc(16% - 6px)",
          width: "320px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "#000",
          filter: "blur(6px)",
          transformOrigin: "center",
        }}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THE CONSTRUCT — MAIN EXPORT
// Props interface is identical — PillContext wiring is completely untouched.
// ─────────────────────────────────────────────────────────────────────────────
export default function TheConstruct({ isVisible, onComplete }: TheConstructProps) {
  const [phase,    setPhase]    = useState<Phase>("idle");
  const [lineIdx,  setLineIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [revealed, setRevealed] = useState<[string, string, string, string]>(["", "", "", ""]);

  // Stable ref so effect dependency arrays stay stable
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  // ── Reset + start ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isVisible) {
      setPhase("idle");
      setLineIdx(0);
      setCharIdx(0);
      setRevealed(["", "", "", ""]);
      return;
    }
    setPhase("typing");
  }, [isVisible]);

  // ── Per-character typewriter ───────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "typing") return;
    const line = LINES[lineIdx];

    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setRevealed((prev) => {
          const next = [...prev] as [string, string, string, string];
          next[lineIdx] = line.slice(0, charIdx + 1);
          return next;
        });
        setCharIdx((c) => c + 1);
      }, CHAR_MS);
      return () => clearTimeout(t);
    }

    // Line complete — advance or finish
    if (lineIdx < LINES.length - 1) {
      const t = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, LINE_PAUSE_MS);
      return () => clearTimeout(t);
    }

    // All 4 lines typed — trigger rack zoom
    const t = setTimeout(() => setPhase("rack"), POST_TYPE_MS);
    return () => clearTimeout(t);
  }, [phase, lineIdx, charIdx]);

  // ── Post-typing phase chain ────────────────────────────────────────────────
  useEffect(() => {
    if (phase === "rack") {
      // After rack zoom peaks, drop the furniture
      const t = setTimeout(() => setPhase("furniture"), RACK_DURATION_MS);
      return () => clearTimeout(t);
    }

    if (phase === "furniture") {
      // Hold furniture, then fire onComplete.
      // onComplete → parent sets isVisible=false → AnimatePresence exit fade runs.
      const t = setTimeout(() => onCompleteRef.current(), FURNITURE_HOLD);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const allTyped    = phase === "rack" || phase === "furniture";
  const rackActive  = phase === "rack" || phase === "furniture";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="the-construct-overlay"
          key="construct"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_FADE_S, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
            // Own compositor layer — prevents jank from page underneath
            transform: "translateZ(0)",
            willChange: "opacity",
          }}
        >

          {/* ── CRT scan-line texture ── */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.016) 3px, rgba(0,0,0,0.016) 4px)",
            }}
          />

          {/* ── Weapon / asset rack corridors ── */}
          <RackPanel side="left"  active={rackActive} />
          <RackPanel side="right" active={rackActive} />

          {/* ── Radial vignette — keeps centre text legible over racks ── */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none",
              background:
                "radial-gradient(ellipse 58% 62% at 50% 50%, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.68) 52%, transparent 100%)",
            }}
          />

          {/* ── Opening shimmer sweep ── */}
          <motion.div
            aria-hidden
            initial={{ x: "-130%", opacity: 0.3 }}
            animate={{ x: "230%",  opacity: 0 }}
            transition={{ delay: 0.05, duration: 1.2, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0, zIndex: 7, pointerEvents: "none",
              background:
                "linear-gradient(108deg, transparent 26%, rgba(0,0,0,0.05) 50%, transparent 74%)",
            }}
          />

          {/* ── Radar pulse rings (fire on mount) ── */}
          {[
            { delay: 0,    dur: 1.6, maxR: 150 },
            { delay: 0.25, dur: 1.9, maxR: 290 },
            { delay: 0.48, dur: 2.2, maxR: 460 },
            { delay: 0.68, dur: 2.5, maxR: 640 },
          ].map((p, i) => (
            <motion.div
              key={`pulse-${i}`}
              aria-hidden
              initial={{ width: 0, height: 0, opacity: 0.55 }}
              animate={{ width: p.maxR, height: p.maxR, opacity: 0 }}
              transition={{ delay: p.delay, duration: p.dur, ease: "easeOut" }}
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: "1px solid rgba(0,0,0,0.18)",
                top: "50%", left: "50%",
                translate: "-50% -50%",
                zIndex: 8,
                pointerEvents: "none",
                willChange: "width, height, opacity",
              }}
            />
          ))}

          {/* ── Dialogue text ── */}
          <div
            style={{
              position: "absolute", inset: 0, zIndex: 10,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "0 1.5rem",
            }}
          >
            {LINES.map((line, i) => {
              const isActiveTyping = phase === "typing" && lineIdx === i;
              const isPastLine     = phase === "typing" && lineIdx > i;
              const lineVisible    = (phase === "typing" && lineIdx >= i) || allTyped;
              const isCursored     = isActiveTyping && charIdx < line.length;

              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={
                    lineVisible
                      ? {
                          opacity: isPastLine ? 0.38 : 1,
                          y: 0,
                          filter: "blur(0px)",
                        }
                      : { opacity: 0, y: 10, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    margin: "0.22rem 0",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "clamp(0.85rem, 1.85vw, 1.08rem)",
                    letterSpacing: "0.025em",
                    color: "#000000",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    minHeight: "1.65rem",
                    textAlign: "center",
                  }}
                >
                  {revealed[i]}
                  {isCursored && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.52 }}
                      style={{ marginLeft: "2px", display: "inline-block" }}
                    >
                      |
                    </motion.span>
                  )}
                </motion.p>
              );
            })}

            {/* Completion underline — expands when all text is typed */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={allTyped ? { scaleX: 1, opacity: 0.18 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                marginTop: "0.9rem",
                height: "1px",
                width: "240px",
                backgroundColor: "#000",
                transformOrigin: "center",
              }}
            />
          </div>

          {/* ── Furniture scene (armchairs + Radiola TV) ── */}
          <AnimatePresence>
            {phase === "furniture" && <FurnitureScene key="furniture" />}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
