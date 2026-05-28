"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Video, VideoOff } from "lucide-react";

const mono = "JetBrains Mono, monospace";

// ── Cylinder constants ────────────────────────────────────────────────────
const N    = 12;                                               // wall panels
const DEG  = 360 / N;                                         // 30° per panel
const PW   = 300;                                             // panel width  px
const PH   = 480;                                             // panel height px
const R    = Math.round((PW / 2) / Math.tan(Math.PI / N));   // ≈ 560 px radius
const COLS = 5;
const ROWS = 5;
const GAP  = 2;
const PAD  = 4;
const MW   = Math.floor((PW - PAD * 2 - GAP * (COLS - 1)) / COLS); // ≈ 56 px
const MH   = Math.floor((PH - PAD * 2 - GAP * (ROWS - 1)) / ROWS); // ≈ 91 px

// ── Static mock pools ─────────────────────────────────────────────────────
const T_EVENTS = [
  "> PILL_SWITCH → RED", "> SKILLS: AI/ML",    "> REPO: dicom-viewer",
  "> CONTACT_INIT",      "> AUDIO_ENABLED",    "> KEYMAKER: zion",
  "> PAGE_NAV #projects","> DISCONNECT TRIG",  "> RECONNECT: op99",
  "> NODE: CLOUD",       "> ANOMALY: none",    "> AGENT_SCAN: clr",
];
const T_SIGNALS = [
  "0xFE23A1 ◆ SYNC", "SYS_PING: 4ms",   "ZION_UPLINK:LIVE",
  "MATRIX_VER:6.19", "FIREWALL:NOMINAL","OPERATOR:ONLINE",
  "AGENT_SCAN:CLEAR", "ERR_RATE: 0.001","LOAD_BALANCER:OK",
];
const T_BINARY = [
  "10110010 11001101","01001101 10110010","11001001 00110110",
  "00111010 11100101","10001110 01011001","01110001 10100011",
];

// ── Monitor type distribution ─────────────────────────────────────────────
type MType = "bar" | "text" | "signal" | "anomaly" | "dark" | "cam";
function mtype(p: number, r: number, c: number): MType {
  const h = ((p * 73 + r * 17 + c * 41) ^ (p * 31)) % 100;
  if (h < 3)  return "anomaly";
  if (h < 22) return "text";
  if (h < 48) return "bar";
  if (h < 68) return "signal";
  if (h < 82) return "dark";
  return "text";
}

// ── BFS spread order ──────────────────────────────────────────────────────
const SPREAD_ORDER: string[] = (() => {
  const out: string[] = [];
  // Panel 0 first (door panel), all monitors
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      out.push(`0-${r}-${c}`);
  // Then radiate outward: panel 1 & 11, 2 & 10, …
  for (let d = 1; d <= Math.floor(N / 2); d++) {
    const ps = d === Math.floor(N / 2) ? [d] : [d, N - d];
    for (const p of ps)
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++)
          out.push(`${p}-${r}-${c}`);
  }
  return out;
})();

// ── Content cells (fully static – no JS timers) ───────────────────────────
function BarCell({ seed }: { seed: number }) {
  const labels = ["CPU", "MEM", "NET"];
  const vals   = labels.map((_, i) => 20 + ((seed * (i + 1) * 37) % 70));
  return (
    <div style={{ padding: "3px 4px", display: "flex", flexDirection: "column", gap: "3px" }}>
      {labels.map((l, i) => (
        <div key={l} style={{ display: "flex", gap: "3px", alignItems: "center" }}>
          <span style={{ color: "#001800", fontFamily: mono, fontSize: "0.34rem", minWidth: "14px" }}>{l}</span>
          <div style={{ flex: 1, height: "3px", backgroundColor: "rgba(0,255,65,0.08)", borderRadius: "1px" }}>
            <div style={{
              height: "100%", width: `${vals[i]}%`,
              backgroundColor: vals[i] > 75 ? "#F87171" : "#00FF41",
              borderRadius: "1px",
              animation: `bar-breathe ${1.5 + i * 0.3}s ease-in-out infinite alternate`,
            }} />
          </div>
          <span style={{ color: "#002800", fontFamily: mono, fontSize: "0.32rem" }}>{vals[i]}%</span>
        </div>
      ))}
    </div>
  );
}

function TextCell({ seed }: { seed: number }) {
  const lines = [T_EVENTS[seed % T_EVENTS.length], T_EVENTS[(seed + 3) % T_EVENTS.length]];
  return (
    <div style={{ padding: "3px 4px", display: "flex", flexDirection: "column", gap: "2px" }}>
      {lines.map((l, i) => (
        <p key={i} style={{
          color: i === 0 ? "#00802B" : "#002800",
          fontFamily: mono, fontSize: "0.34rem",
          margin: 0, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
        }}>{l}</p>
      ))}
    </div>
  );
}

function SignalCell({ seed }: { seed: number }) {
  return (
    <div style={{ padding: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
      <p style={{ color: "#006020", fontFamily: mono, fontSize: "0.36rem", margin: 0 }}>
        {T_SIGNALS[seed % T_SIGNALS.length]}
      </p>
      <p style={{ color: "#001800", fontFamily: mono, fontSize: "0.32rem", margin: 0 }}>
        {T_BINARY[seed % T_BINARY.length]}
      </p>
    </div>
  );
}

function AnomalyCell() {
  return (
    <div style={{
      padding: "4px", height: "100%", display: "flex", alignItems: "center",
      animation: "anomaly-pulse 1.1s ease-in-out infinite",
    }}>
      <p style={{ color: "#F87171", fontFamily: mono, fontSize: "0.36rem", margin: 0 }}>!! ANOMALY</p>
    </div>
  );
}

function DarkCell({ seed }: { seed: number }) {
  const chars = "▓░▒█01".split("");
  return (
    <div style={{ padding: "3px", display: "flex", flexWrap: "wrap", gap: "1px", opacity: 0.25 }}>
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} style={{ color: "#00FF41", fontFamily: mono, fontSize: "0.3rem" }}>
          {chars[(seed * i + 7) % chars.length]}
        </span>
      ))}
    </div>
  );
}

// CamCell: canvas RAF from shared video element
function CamCell({ video }: { video: HTMLVideoElement | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!video) return;
    let raf: number;
    const draw = () => {
      const c = ref.current; if (!c) return;
      const ctx = c.getContext("2d"); if (!ctx) return;
      if (video.readyState >= 2) {
        ctx.save();
        ctx.scale(-1, 1); // mirror
        ctx.drawImage(video, -c.width, 0, c.width, c.height);
        ctx.restore();
        ctx.fillStyle = "rgba(0,255,65,0.28)";
        ctx.fillRect(0, 0, c.width, c.height);
        // scanlines
        for (let y = 0; y < c.height; y += 2) {
          ctx.fillStyle = "rgba(0,0,0,0.18)";
          ctx.fillRect(0, y, c.width, 1);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [video]);
  return (
    <canvas ref={ref} width={MW} height={MH}
      style={{ width: "100%", height: "100%", display: "block" }} />
  );
}

// ── Single monitor tile ───────────────────────────────────────────────────
function Monitor({ p, r, c, isCam, video }: {
  p: number; r: number; c: number; isCam: boolean; video: HTMLVideoElement | null;
}) {
  const seed  = (p * 97 + r * 23 + c * 11) & 0xFFFF;
  const type: MType = isCam ? "cam" : mtype(p, r, c);
  const borderColor = type === "anomaly" ? "rgba(248,113,133,0.5)"
    : isCam ? "rgba(0,255,65,0.45)" : "rgba(0,255,65,0.12)";
  return (
    <div style={{
      width: MW, height: MH,
      backgroundColor: "#040404",
      border: `1px solid ${borderColor}`,
      borderRadius: "1px",
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      flexShrink: 0,
    }}>
      {/* Title bar */}
      <div style={{
        height: 5, flexShrink: 0,
        backgroundColor: "rgba(0,255,65,0.06)",
        display: "flex", alignItems: "center", paddingLeft: 3,
      }}>
        <div style={{
          width: 3, height: 3, borderRadius: "50%",
          backgroundColor: type === "anomaly" ? "#F87171" : isCam ? "#00FF41" : "rgba(0,255,65,0.4)",
          boxShadow: isCam ? "0 0 4px #00FF41" : "none",
        }} />
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {type === "cam"     ? <CamCell video={video} />  :
         type === "anomaly" ? <AnomalyCell />            :
         type === "bar"     ? <BarCell seed={seed} />    :
         type === "signal"  ? <SignalCell seed={seed} /> :
         type === "dark"    ? <DarkCell seed={seed} />   :
                              <TextCell seed={seed} />   }
      </div>
    </div>
  );
}

// ── Wall panel (one cylinder face) ────────────────────────────────────────
function WallPanel({ idx, camMonitors, video }: {
  idx: number; camMonitors: Set<string>; video: HTMLVideoElement | null;
}) {
  const isDoor = idx === 0;
  return (
    <div style={{
      position: "absolute",
      width: PW, height: PH,
      left: -PW / 2, top: -PH / 2,
      transform: `rotateY(${idx * DEG}deg) translateZ(${R}px)`,
      backfaceVisibility: "hidden",
      backgroundColor: "rgba(0,4,0,0.97)",
      borderLeft: "1px solid rgba(0,255,65,0.04)",
      borderRight: "1px solid rgba(0,255,65,0.04)",
      overflow: "hidden",
    }}>
      {/* Monitor grid */}
      <div style={{
        position: "absolute", inset: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${MW}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${MH}px)`,
        gap: GAP, padding: PAD,
        alignContent: "start", justifyContent: "center",
      }}>
        {Array.from({ length: ROWS * COLS }, (_, i) => {
          const r = Math.floor(i / COLS), c = i % COLS;
          const id = `${idx}-${r}-${c}`;
          return (
            <Monitor key={id} p={idx} r={r} c={c}
              isCam={camMonitors.has(id)}
              video={video} />
          );
        })}
      </div>

      {/* White door overlay (panel 0 only) */}
      {isDoor && (
        <div aria-label="White door – room origin" style={{
          position: "absolute",
          left: "50%", bottom: 0,
          transform: "translateX(-50%)",
          width: 58, height: "72%",
          backgroundColor: "#FFFFFF",
          borderRadius: "2px 2px 0 0",
          boxShadow: [
            "0 0 24px rgba(255,255,255,0.9)",
            "0 0 60px rgba(255,255,255,0.45)",
            "0 0 120px rgba(255,255,255,0.18)",
          ].join(","),
          zIndex: 5,
        }} />
      )}

      {/* Edge shadow to sell panel curvature */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.35) 100%)",
      }} />
    </div>
  );
}

// ── Architect Room ────────────────────────────────────────────────────────
export default function ArchitectPage() {
  const [angle,       setAngle]       = useState(0);   // current Y rotation
  const [dragging,    setDragging]    = useState(false);
  const [camState,    setCamState]    = useState<"off" | "requesting" | "on">("off");
  const [camMonitors, setCamMonitors] = useState<Set<string>>(new Set());
  const [stream,      setStream]      = useState<MediaStream | null>(null);

  const videoRef   = useRef<HTMLVideoElement>(null);
  const dragRef    = useRef({ startX: 0, baseAngle: 0 });
  const spreadRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spreadIdx  = useRef(0);

  // ── Pointer drag ──────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { startX: e.clientX, baseAngle: angle };
    setDragging(true);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }, [angle]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const delta = (dragRef.current.startX - e.clientX) * 0.22;
    setAngle(dragRef.current.baseAngle + delta);
  }, [dragging]);

  const onPointerUp = useCallback(() => setDragging(false), []);

  // ── Camera controls ───────────────────────────────────────────────────
  const startCam = useCallback(async () => {
    if (!navigator?.mediaDevices?.getUserMedia) return;
    setCamState("requesting");
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 320 }, height: { ideal: 240 } },
      });
      setStream(s);
      const v = videoRef.current;
      if (v) { v.srcObject = s; await v.play().catch(() => {}); }
      setCamState("on");
      // BFS spread wave
      spreadIdx.current = 0;
      const wave = () => {
        spreadIdx.current += 4;
        setCamMonitors(new Set(
          SPREAD_ORDER.slice(0, spreadIdx.current)
        ));
        if (spreadIdx.current < SPREAD_ORDER.length)
          spreadRef.current = setTimeout(wave, 320);
      };
      spreadRef.current = setTimeout(wave, 450);
    } catch {
      setCamState("off");
    }
  }, []);

  const stopCam = useCallback(() => {
    if (spreadRef.current) clearTimeout(spreadRef.current);
    stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setStream(null);
    setCamMonitors(new Set());
    setCamState("off");
  }, [stream]);

  useEffect(() => () => {
    if (spreadRef.current) clearTimeout(spreadRef.current);
    stream?.getTracks().forEach((t) => t.stop());
  }, [stream]);

  // panels memoized (only re-render when camMonitors or video changes)
  const panels = useMemo(() => (
    Array.from({ length: N }, (_, i) => (
      <WallPanel key={i} idx={i}
        camMonitors={camMonitors}
        video={videoRef.current} />
    ))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [camMonitors]);

  return (
    <>
      {/* Global CSS for static animations */}
      <style>{`
        @keyframes bar-breathe {
          from { opacity: 0.6; }
          to   { opacity: 1.0; }
        }
        @keyframes anomaly-pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.25; }
        }
      `}</style>

      <div
        id="architect-room"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          width: "100vw", height: "100vh", overflow: "hidden",
          backgroundColor: "#000",
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none", touchAction: "none",
        }}>

        {/* Hidden shared video element */}
        <video ref={videoRef} muted playsInline
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" }} />

        {/* Perspective viewport */}
        <div style={{
          width: "100%", height: "100%",
          perspective: "850px",
          perspectiveOrigin: "50% 44%",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Cylinder */}
          <div style={{
            width: 0, height: 0,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateY(${-angle}deg)`,
            transition: dragging ? "none" : "transform 0.08s ease-out",
          }}>
            {panels}
          </div>
        </div>

        {/* Floor darkening */}
        <div aria-hidden style={{
          position: "fixed", inset: 0, pointerEvents: "none",
          background: [
            "linear-gradient(to top,    rgba(0,0,0,0.92) 0%, transparent 38%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 30%)",
          ].join(","),
        }} />

        {/* ── UI chrome ─────────────────────────────────────────────── */}
        {/* Header */}
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 20, padding: "0.85rem 1.25rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          pointerEvents: "none",
        }}>
          <div>
            <p style={{ color: "#002500", fontFamily: mono, fontSize: "0.56rem",
              letterSpacing: "0.18em", margin: 0 }}>
              // ARCHITECT_ROOM // SYSTEM_62 // MATRIX_VER_6.19
            </p>
            <h1 style={{ color: "rgba(0,255,65,0.15)", fontFamily: mono, fontSize: "0.9rem",
              fontWeight: 700, letterSpacing: "0.1em", margin: "2px 0 0" }}>
              THE ARCHITECT&apos;S ROOM
            </h1>
          </div>

          {/* Cam toggle — needs pointer events re-enabled */}
          <button id="architect-cam-btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={camState === "on" ? stopCam : startCam}
            style={{
              pointerEvents: "all",
              display: "flex", alignItems: "center", gap: "0.4rem",
              fontFamily: mono, fontSize: "0.6rem", letterSpacing: "0.08em",
              padding: "0.4rem 0.9rem", borderRadius: "2px", cursor: "pointer",
              backgroundColor: "rgba(0,0,0,0.85)", outline: "none",
              color: camState === "on" ? "#00FF41" : "#003B00",
              border: `1px solid ${camState === "on" ? "rgba(0,255,65,0.55)" : "rgba(0,255,65,0.18)"}`,
              boxShadow: camState === "on" ? "0 0 12px rgba(0,255,65,0.15)" : "none",
              transition: "all 0.2s ease",
            }}>
            {camState === "requesting"
              ? <span style={{ fontSize: "0.58rem" }}>// CONNECTING…</span>
              : camState === "on"
              ? <><VideoOff size={12} /> DISCONNECT_SIM</>
              : <><Video size={12} /> ENTER_SIMULATION</>}
          </button>
        </div>

        {/* Cam monitor count badge */}
        <AnimatePresence>
          {camState === "on" && (
            <motion.div key="cam-badge"
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed", top: "3.5rem", right: "1.25rem",
                zIndex: 20, fontFamily: mono, fontSize: "0.52rem",
                color: "#003B00", letterSpacing: "0.1em", pointerEvents: "none",
              }}>
              {camMonitors.size} / {N * COLS * ROWS} MONITORS ACQUIRED
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint + nav */}
        <div style={{
          position: "fixed", bottom: "1.2rem", left: 0, right: 0,
          zIndex: 20, display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", padding: "0 1.25rem",
          pointerEvents: "none",
        }}>
          <div style={{ display: "flex", gap: "1.5rem", pointerEvents: "all" }}>
            {[["← MAINFRAME", "/mainframe"], ["← PORTFOLIO", "/portfolio"]].map(([l, h]) => (
              <a key={h} href={h}
                onPointerDown={(e) => e.stopPropagation()}
                style={{ color: "#001800", fontFamily: mono, fontSize: "0.56rem",
                  letterSpacing: "0.08em", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#003B00")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#001800")}>
                {l}
              </a>
            ))}
          </div>
          <p style={{ color: "#001200", fontFamily: mono, fontSize: "0.5rem",
            letterSpacing: "0.14em", margin: 0, textAlign: "right" }}>
            DRAG → 360° ROOM // WHITE DOOR = ORIGIN
          </p>
        </div>
      </div>
    </>
  );
}
