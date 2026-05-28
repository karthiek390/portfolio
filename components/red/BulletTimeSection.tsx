"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";

const mono = "JetBrains Mono, monospace";
const CHARS = "ｱｲｳｴｵｶｷｸｹｺﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789ABCDEF";
type Phase = "idle" | "slowing" | "frozen" | "resuming" | "done";

// ── Canvas rain (self-contained, speed-controlled) ───────────────────────
function SlowRain({ phase }: { phase: Phase }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef  = useRef(1);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const target = phase === "slowing"  ? 0.04
                 : phase === "frozen"   ? 0.015
                 : phase === "resuming" ? 1
                 :                        0.8;
    const step = phase === "resuming" ? 0.025 : 0.008;
    const ease = () => {
      const diff = target - speedRef.current;
      if (Math.abs(diff) > 0.002) speedRef.current += diff * step;
    };
    const id = setInterval(ease, 30);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const cols = Math.floor(W / 18);
    const drops = Array.from({ length: cols }, () => Math.random() * -H);
    let acc = 0;

    const draw = () => {
      acc += speedRef.current;
      if (acc >= 1) {
        acc = 0;
        ctx.fillStyle = "rgba(0,0,0,0.06)";
        ctx.fillRect(0, 0, W, H);
        ctx.font = "14px " + mono;
        drops.forEach((y, i) => {
          const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
          const bright = Math.random() > 0.92;
          ctx.fillStyle = bright ? "#AFFFAF" : `rgba(0,${Math.floor(180 + Math.random() * 75)},65,${0.5 + Math.random() * 0.5})`;
          ctx.fillText(ch, i * 18, y);
          drops[i] = y > H + Math.random() * 200 ? -20 : y + 18;
        });
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas);
    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      opacity: 0.55, pointerEvents: "none",
    }} />
  );
}
// ─────────────────────────────────────────────────────────────────────────

const LINES = [
  { text: "Time, Mr. Anderson.",         delay: 0.6 },
  { text: "Have you ever had a dream...", delay: 1.3 },
  { text: "...that you were so sure",    delay: 1.9 },
  { text: "was real?",                   delay: 2.4 },
];

export default function BulletTimeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-15%" });
  const controls   = useAnimation();
  const [phase, setPhase]   = useState<Phase>("idle");
  const [hasRun, setHasRun] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    timerRef.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    if (!isInView || hasRun) return;
    setHasRun(true);

    setPhase("slowing");
    addTimer(() => setPhase("frozen"),   1500);
    addTimer(() => {
      controls.start("visible");
    },                                   1800);
    addTimer(() => setPhase("resuming"), 5200);
    addTimer(() => {
      controls.start("exit");
      setPhase("done");
    },                                   6500);

    return () => timerRef.current.forEach(clearTimeout);
  }, [isInView, hasRun, controls, addTimer]);

  const showContent = phase === "frozen" || phase === "slowing";

  return (
    <section ref={sectionRef}
      style={{ position: "relative", height: "100vh", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "#000" }}>

      {/* Rain backdrop */}
      <SlowRain phase={phase} />

      {/* Vignette */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)",
      }} />

      {/* Central 3D rotating element */}
      <AnimatePresence>
        {(phase === "frozen" || phase === "resuming") && (
          <motion.div
            key="ring"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ position: "absolute",
              width: "340px", height: "340px",
              borderRadius: "50%",
              border: "1px solid rgba(0,255,65,0.2)",
              boxShadow: "0 0 60px rgba(0,255,65,0.08), inset 0 0 60px rgba(0,255,65,0.04)",
              pointerEvents: "none",
            }}>
            {/* Spinning inner ring */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: "12px", borderRadius: "50%",
                border: "1px solid rgba(0,255,65,0.15)" }} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: "30px", borderRadius: "50%",
                border: "1px solid rgba(245,158,11,0.12)" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D rotating text element */}
      <AnimatePresence>
        {(phase === "frozen" || phase === "resuming") && (
          <motion.div key="text3d"
            initial={{ rotateY: -55, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 55, opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ perspective: "900px", position: "absolute",
              textAlign: "center", zIndex: 2, pointerEvents: "none" }}>

            {LINES.map((l, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: l.delay, duration: 0.5, ease: "easeOut" }}
                style={{
                  fontFamily: mono, letterSpacing: "0.06em",
                  fontSize: i === 0 ? "1.5rem" : i === 3 ? "2.2rem" : "1.1rem",
                  fontWeight: i === 3 ? 700 : 400,
                  color: i === 3 ? "#00FF41" : "#00802B",
                  textShadow: i === 3 ? "0 0 24px #00FF41, 0 0 48px #00FF4155" : "0 0 8px #00FF4133",
                  lineHeight: 1.9, margin: 0,
                }}>
                {l.text}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bullet-time label */}
      <AnimatePresence>
        {phase === "slowing" && (
          <motion.p key="slowing-label"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", bottom: "2.5rem",
              fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.2em",
              color: "#001800" }}>
            // BULLET_TIME_INITIATED
          </motion.p>
        )}
      </AnimatePresence>

      {/* Resume label */}
      <AnimatePresence>
        {phase === "resuming" && (
          <motion.p key="resume-label"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", bottom: "2.5rem",
              fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.2em",
              color: "#003B00" }}>
            // RESUMING_SIMULATION
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
