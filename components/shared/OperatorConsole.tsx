"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OperatorEventRecord } from "@/lib/operator-events";

const EVENT_POOL = [
  { type: "PILL_SWITCH",  color: "#00FF41", detail: () => `${pick(["desktop", "desktop", "mobile"])} -> RED_PILL` },
  { type: "PILL_SWITCH",  color: "#3B82F6", detail: () => `${pick(["desktop", "mobile"])} -> BLUE_PILL` },
  { type: "PAGE_NAV",     color: "#38BDF8", detail: () => `scrolled to ${pick(["#hero", "#projects", "#skills", "#experience", "#contact"])}` },
  { type: "REPO_CLICK",   color: "#F59E0B", detail: () => `opened ${pick(["dicom-local-viewer", "cicd-stats-watcher", "tic-tac-toe", "portfolio"])}` },
  { type: "CONTACT_INIT", color: "#A78BFA", detail: () => "terminal contact form opened" },
  { type: "CONTACT_SENT", color: "#C084FC", detail: () => `transmission sent from ${pick(["Acme Corp", "NovaTech", "Stealth Co", "Zion Labs"])}` },
  { type: "KEYMAKER",     color: "#FBBF24", detail: () => "secret sequence [zion] decoded" },
  { type: "SKILLS_CLICK", color: "#34D399", detail: () => `oracle kitchen: ${pick(["AI / ML", "CLOUD & DEVOPS", "LANGUAGES", "INFRA"])} node activated` },
  { type: "AUDIO_TOGGLE", color: "#6EE7B7", detail: () => `ambient audio ${pick(["enabled", "disabled"])}` },
  { type: "DISCONNECT",   color: "#F87171", detail: () => "hardline exit triggered" },
  { type: "RECONNECT",    color: "#00FF41", detail: () => "operator reconnected via blue pill" },
  { type: "NODE_HOVER",   color: "#38BDF8", detail: () => `skills node hovered: ${pick(["BACKEND", "FRONTEND", "DATABASES", "TOOLS"])}` },
] as const;

const EVENT_COLORS: Record<string, string> = {
  PILL_SWITCH: "#00FF41",
  PAGE_NAV: "#38BDF8",
  REPO_CLICK: "#F59E0B",
  CONTACT_INIT: "#A78BFA",
  CONTACT_SENT: "#C084FC",
  KEYMAKER: "#FBBF24",
  SKILLS_CLICK: "#34D399",
  AUDIO_TOGGLE: "#6EE7B7",
  DISCONNECT: "#F87171",
  RECONNECT: "#00FF41",
  NODE_HOVER: "#38BDF8",
  CAM_SESSION: "#22D3EE",
};

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeEvent(id: number) {
  const pool = EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)];
  return {
    id,
    type: pool.type,
    color: pool.color,
    detail: pool.detail(),
    time: new Date().toLocaleTimeString("en-US", { hour12: false }),
  };
}

type ConsoleEvent = ReturnType<typeof makeEvent>;
interface ConsoleEventShape {
  id: number;
  type: string;
  color: string;
  detail: string;
  time: string;
}

function mapApiEvent(event: OperatorEventRecord): ConsoleEventShape {
  return {
    id: event.id,
    type: event.type,
    color: EVENT_COLORS[event.type] ?? "#00FF41",
    detail: event.detail ?? "event recorded",
    time: new Date(event.createdAt).toLocaleTimeString("en-US", { hour12: false }),
  };
}

function seedEvents(count: number): ConsoleEventShape[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const pool = EVENT_POOL[(i * 3) % EVENT_POOL.length];
    const date = new Date(now - (count - i) * 47000 - Math.random() * 20000);
    return {
      id: i,
      type: pool.type,
      color: pool.color,
      detail: pool.detail(),
      time: date.toLocaleTimeString("en-US", { hour12: false }),
    };
  });
}

interface OperatorConsoleProps {
  autoScroll?: boolean;
  compact?: boolean;
  endpoint?: string;
  height?: string;
  maxEvents?: number;
  pollMs?: number;
}

export default function OperatorConsole({
  autoScroll = true,
  compact = false,
  endpoint,
  height = "340px",
  maxEvents = 40,
  pollMs = 5000,
}: OperatorConsoleProps) {
  const mono = "JetBrains Mono, monospace";
  const [events, setEvents] = useState<ConsoleEventShape[]>(() => seedEvents(12));
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [liveMode, setLiveMode] = useState(Boolean(endpoint));
  const counterRef = useRef(100);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!endpoint || paused) return;

    let active = true;
    const load = () => {
      fetch(`${endpoint}?limit=${maxEvents}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error("load failed"))))
        .then((data: { events?: OperatorEventRecord[] }) => {
          if (!active || !Array.isArray(data.events)) return;
          setEvents(data.events.slice().reverse().map(mapApiEvent));
          setLiveMode(true);
        })
        .catch(() => {
          if (!active) return;
          setLiveMode(false);
        });
    };

    load();
    const interval = setInterval(load, pollMs);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [endpoint, paused, maxEvents, pollMs]);

  useEffect(() => {
    if (endpoint && liveMode) return;
    if (paused) return;

    const base = 2200;
    const jitter = () => base + Math.random() * 2800;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        counterRef.current += 1;
        setEvents((prev) => {
          const next = [...prev, makeEvent(counterRef.current)];
          return next.length > maxEvents ? next.slice(-maxEvents) : next;
        });
        schedule();
      }, jitter());
    };

    schedule();
    return () => clearTimeout(timer);
  }, [endpoint, liveMode, paused, maxEvents]);

  useEffect(() => {
    if (!autoScroll || paused) return;
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [events, autoScroll, paused]);

  const categories = Array.from(new Set(events.map((event) => event.type)));
  const displayed = filter ? events.filter((event) => event.type === filter) : events;
  const fontSize = compact ? "0.6rem" : "0.68rem";

  const togglePause = useCallback(() => setPaused((value) => !value), []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.4rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          <button
            onClick={() => setFilter(null)}
            style={{
              fontFamily: mono,
              fontSize: "0.55rem",
              letterSpacing: "0.08em",
              padding: "0.15rem 0.45rem",
              borderRadius: "2px",
              cursor: "pointer",
              backgroundColor: !filter ? "rgba(0,255,65,0.15)" : "transparent",
              border: `1px solid ${!filter ? "#00FF41" : "rgba(0,255,65,0.2)"}`,
              color: !filter ? "#00FF41" : "#003B00",
            }}
          >
            ALL
          </button>
          {categories.slice(0, compact ? 4 : 8).map((category) => (
            <button
              key={category}
              onClick={() => setFilter((value) => (value === category ? null : category))}
              style={{
                fontFamily: mono,
                fontSize: "0.55rem",
                letterSpacing: "0.06em",
                padding: "0.15rem 0.45rem",
                borderRadius: "2px",
                cursor: "pointer",
                backgroundColor: filter === category ? "rgba(0,255,65,0.1)" : "transparent",
                border: `1px solid ${filter === category ? "#00802B" : "rgba(0,255,65,0.12)"}`,
                color: filter === category ? "#00802B" : "#001800",
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={togglePause}
          style={{
            fontFamily: mono,
            fontSize: "0.55rem",
            letterSpacing: "0.1em",
            padding: "0.15rem 0.55rem",
            borderRadius: "2px",
            cursor: "pointer",
            backgroundColor: "transparent",
            border: `1px solid ${paused ? "#F59E0B" : "rgba(0,255,65,0.2)"}`,
            color: paused ? "#F59E0B" : "#003B00",
          }}
        >
          {paused ? "RESUME" : "PAUSE"}
        </button>
      </div>

      <div
        ref={scrollRef}
        style={{
          height,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          scrollbarWidth: "thin",
          scrollbarColor: "#003B00 #000",
        }}
      >
        <AnimatePresence initial={false}>
          {displayed.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10, backgroundColor: `${event.color}18` }}
              animate={{ opacity: 1, x: 0, backgroundColor: "transparent" }}
              transition={{ duration: 0.25 }}
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "baseline",
                padding: "0.2rem 0.5rem",
                borderLeft: `2px solid ${event.color}44`,
              }}
            >
              <span
                style={{
                  color: "#001800",
                  fontFamily: mono,
                  fontSize: "0.56rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {event.time}
              </span>
              <span
                style={{
                  color: event.color,
                  fontFamily: mono,
                  fontSize,
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  textShadow: `0 0 6px ${event.color}44`,
                }}
              >
                {event.type}
              </span>
              <span
                style={{
                  color: "#00802B",
                  fontFamily: mono,
                  fontSize: "0.6rem",
                  opacity: 0.8,
                }}
              >
                {event.detail}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(0,255,65,0.08)",
          paddingTop: "0.4rem",
        }}
      >
        <span style={{ color: "#001800", fontFamily: mono, fontSize: "0.55rem", letterSpacing: "0.1em" }}>
          {displayed.length} events {filter ? `[${filter}]` : "[ALL]"}
        </span>
        <span style={{ color: "#001200", fontFamily: mono, fontSize: "0.52rem" }}>
          {paused ? "// STREAM PAUSED" : liveMode ? "// LIVE // DB-BACKED" : "// LIVE // MOCK FALLBACK"}
        </span>
      </div>
    </div>
  );
}
