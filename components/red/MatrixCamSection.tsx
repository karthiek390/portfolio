"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, VideoOff, RefreshCw, Eye } from "lucide-react";
import { trackOperatorEvent } from "@/lib/operator-events";

const mono = "JetBrains Mono, monospace";

// Character density map: light → dense (brightness → char)
const DENS = " .:-=+*#%@MWｱｲｳｴｵ0";
const BLOCK = 10; // px per character cell

type Perm = "idle" | "requesting" | "granted" | "denied" | "unsupported";

// ── Fallback: noise canvas when camera denied ─────────────────────────────
function NoiseFallback() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    c.width = c.offsetWidth; c.height = c.offsetHeight;
    const cols = Math.floor(c.width  / BLOCK);
    const rows = Math.floor(c.height / BLOCK);
    let raf: number;
    const draw = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${BLOCK}px ${mono}`;
      for (let r = 0; r < rows; r++) {
        for (let k = 0; k < cols; k++) {
          const v = Math.random();
          const ch = DENS[Math.floor(v * DENS.length)];
          ctx.fillStyle = v < 0.04
            ? `rgba(180,255,180,${0.6 + v * 8})`
            : `rgba(0,${Math.floor(80 + v * 175)},${Math.floor(40 + v * 25)},${0.3 + v * 0.7})`;
          ctx.fillText(ch, k * BLOCK, (r + 1) * BLOCK);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ width: "100%", height: "100%",
    display: "block", opacity: 0.7 }} />;
}
// ─────────────────────────────────────────────────────────────────────────

// ── Matrix cam canvas ─────────────────────────────────────────────────────
function MatrixCam({ stream }: { stream: MediaStream }) {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const offRef     = useRef<HTMLCanvasElement | null>(null);
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current; if (!video) return;
    video.srcObject = stream;
    video.play().catch(() => {});

    const off = document.createElement("canvas");
    offRef.current = off;
    const offCtx = off.getContext("2d")!;

    const render = () => {
      const canvas = canvasRef.current; if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      if (canvas.width !== W) canvas.width = W;
      if (canvas.height !== H) canvas.height = H;

      const cols = Math.floor(W / BLOCK);
      const rows = Math.floor(H / BLOCK);
      off.width = cols; off.height = rows;

      // Draw mirrored video to offscreen at low res
      offCtx.save();
      offCtx.scale(-1, 1);
      offCtx.drawImage(video, -cols, 0, cols, rows);
      offCtx.restore();

      const data = offCtx.getImageData(0, 0, cols, rows).data;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${BLOCK}px ${mono}`;

      for (let r = 0; r < rows; r++) {
        for (let k = 0; k < cols; k++) {
          const base = (r * cols + k) * 4;
          // brightness: weighted luminance
          const lum = (data[base] * 0.299 + data[base + 1] * 0.587 + data[base + 2] * 0.114) / 255;
          const ch = DENS[Math.floor(lum * (DENS.length - 1))];
          const g  = Math.floor(60 + lum * 195);
          ctx.fillStyle = lum > 0.88
            ? `rgba(200,255,200,0.9)`
            : `rgba(0,${g},${Math.floor(g * 0.25)},${0.55 + lum * 0.45})`;
          ctx.fillText(ch, k * BLOCK, (r + 1) * BLOCK);
        }
      }
      rafRef.current = requestAnimationFrame(render);
    };

    video.addEventListener("loadedmetadata", () => { render(); });
    return () => { cancelAnimationFrame(rafRef.current); video.srcObject = null; };
  }, [stream]);

  return (
    <>
      <video ref={videoRef} muted playsInline
        style={{ display: "none", position: "absolute" }} />
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </>
  );
}
// ─────────────────────────────────────────────────────────────────────────

export default function MatrixCamSection() {
  const [perm,   setPerm]   = useState<Perm>("idle");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const startedAtRef = useRef<number | null>(null);

  const requestCam = useCallback(async () => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      setPerm("unsupported"); return;
    }
    setPerm("requesting");
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
      });
      setStream(s);
      setPerm("granted");
      startedAtRef.current = Date.now();
      trackOperatorEvent({
        type: "CAM_SESSION",
        detail: "camera permission granted",
        page: "portfolio",
        metadata: { granted: true, denied: false },
      });
    } catch {
      setPerm("denied");
      trackOperatorEvent({
        type: "CAM_SESSION",
        detail: "camera permission denied",
        page: "portfolio",
        metadata: { granted: false, denied: true },
      });
    }
  }, []);

  const revoke = useCallback(() => {
    stream?.getTracks().forEach((t) => t.stop());
    const durationSec = startedAtRef.current ? Math.round((Date.now() - startedAtRef.current) / 1000) : 0;
    trackOperatorEvent({
      type: "CAM_SESSION",
      detail: "camera session disconnected",
      page: "portfolio",
      metadata: { granted: true, denied: false, durationSec },
    });
    startedAtRef.current = null;
    setStream(null);
    setPerm("idle");
  }, [stream]);

  const frameStyle: React.CSSProperties = {
    position: "relative", width: "100%", maxWidth: "640px", aspectRatio: "4/3",
    backgroundColor: "#000",
    border: "1px solid rgba(0,255,65,0.25)",
    borderRadius: "2px", overflow: "hidden",
  };

  return (
    <section id="cam" style={{ padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <p style={{ color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.15em",
        marginBottom: "0.5rem", fontFamily: mono }}>
        // MATRIX_WEBCAM_FILTER // BROWSER_LOCAL_ONLY
      </p>
      <h2 style={{ color: "#00FF41", fontFamily: mono, fontSize: "2rem",
        fontWeight: 700, marginBottom: "0.5rem", textShadow: "0 0 12px #00FF4155" }}>
        See Through the Code
      </h2>
      <p style={{ color: "#00802B", fontSize: "0.82rem", marginBottom: "2.5rem", fontFamily: mono }}>
        Your camera, rendered as the Matrix sees you. No data leaves this device.
      </p>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

        {/* Camera frame */}
        <div style={frameStyle}>
          <AnimatePresence mode="wait">

            {/* IDLE — opt-in */}
            {perm === "idle" && (
              <motion.div key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "absolute", inset: 0, display: "flex",
                  flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "1.25rem", backgroundColor: "#050505" }}>
                <Video size={40} color="rgba(0,255,65,0.3)" strokeWidth={1} />
                <p style={{ color: "#003B00", fontFamily: mono, fontSize: "0.7rem",
                  letterSpacing: "0.12em", textAlign: "center", maxWidth: "220px" }}>
                  // CAMERA_FEED_OFFLINE<br />Click to enter the simulation.
                </p>
                <button id="matrix-cam-enable-btn" onClick={requestCam}
                  style={{ fontFamily: mono, fontSize: "0.72rem", letterSpacing: "0.1em",
                    padding: "0.5rem 1.25rem", borderRadius: "2px", cursor: "pointer",
                    backgroundColor: "transparent", color: "#00FF41",
                    border: "1px solid rgba(0,255,65,0.4)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.boxShadow = "0 0 12px rgba(0,255,65,0.2)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.boxShadow = "none")}>
                  ENTER_SIMULATION
                </button>
              </motion.div>
            )}

            {/* REQUESTING */}
            {perm === "requesting" && (
              <motion.div key="requesting"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "absolute", inset: 0, display: "flex",
                  flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "1rem", backgroundColor: "#050505" }}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}>
                  <RefreshCw size={28} color="rgba(0,255,65,0.5)" />
                </motion.div>
                <p style={{ color: "#003B00", fontFamily: mono, fontSize: "0.68rem",
                  letterSpacing: "0.1em" }}>
                  // AWAITING_PERMISSION...
                </p>
              </motion.div>
            )}

            {/* GRANTED — live matrix cam */}
            {perm === "granted" && stream && (
              <motion.div key="granted"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "absolute", inset: 0 }}>
                <MatrixCam stream={stream} />
                {/* Scanline overlay */}
                <div aria-hidden style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)",
                }} />
              </motion.div>
            )}

            {/* DENIED — noise fallback */}
            {perm === "denied" && (
              <motion.div key="denied"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "absolute", inset: 0 }}>
                <NoiseFallback />
                <div style={{ position: "absolute", inset: 0, display: "flex",
                  flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "0.75rem", backgroundColor: "rgba(0,0,0,0.55)" }}>
                  <VideoOff size={28} color="rgba(251,113,133,0.7)" />
                  <p style={{ color: "#F87171", fontFamily: mono, fontSize: "0.68rem",
                    letterSpacing: "0.12em", textAlign: "center" }}>
                    ACCESS DENIED<br />
                    <span style={{ color: "#003B00", fontSize: "0.58rem" }}>
                      // simulation running on noise data
                    </span>
                  </p>
                  <button onClick={() => setPerm("idle")}
                    style={{ fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.08em",
                      padding: "0.3rem 0.75rem", borderRadius: "2px", cursor: "pointer",
                      backgroundColor: "transparent", color: "#003B00",
                      border: "1px solid rgba(0,255,65,0.15)" }}>
                    RETRY
                  </button>
                </div>
              </motion.div>
            )}

            {/* UNSUPPORTED */}
            {perm === "unsupported" && (
              <motion.div key="unsupported"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "absolute", inset: 0, display: "flex",
                  flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "0.75rem", backgroundColor: "#050505" }}>
                <Eye size={28} color="rgba(0,255,65,0.2)" />
                <p style={{ color: "#003B00", fontFamily: mono, fontSize: "0.68rem",
                  letterSpacing: "0.1em", textAlign: "center" }}>
                  // BROWSER_NOT_SUPPORTED<br />
                  <span style={{ fontSize: "0.58rem" }}>upgrade your terminal</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls — only when granted */}
        {perm === "granted" && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <p style={{ color: "#003B00", fontFamily: mono, fontSize: "0.62rem",
              letterSpacing: "0.08em" }}>
              // LIVE // ALL PROCESSING LOCAL // NO DATA TRANSMITTED
            </p>
            <button id="matrix-cam-stop-btn" onClick={revoke}
              style={{ fontFamily: mono, fontSize: "0.62rem", letterSpacing: "0.08em",
                padding: "0.25rem 0.65rem", borderRadius: "2px", cursor: "pointer",
                backgroundColor: "transparent", color: "#F87171",
                border: "1px solid rgba(248,113,133,0.3)" }}>
              DISCONNECT
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
