"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OperatorConsole from "@/components/shared/OperatorConsole";

const mono = "JetBrains Mono, monospace";

interface TrafficSource {
  label: string;
  count: number;
  pct: number;
}

interface TopProject {
  name: string;
  count: number;
}

interface DashboardStats {
  totals: {
    totalVisits: number;
    redChosen: number;
    blueChosen: number;
    mobileShare: number;
    operatorEvents: number;
    latestSignal: string | null;
  };
  pillSplit: {
    red: number;
    blue: number;
    redPct: number;
    bluePct: number;
  };
  trafficSources: TrafficSource[];
  topProjects: TopProject[];
  hourlyActivity: number[];
}

function Bar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#00802B", fontSize: "0.7rem", fontFamily: mono, letterSpacing: "0.08em" }}>{label}</span>
        <span style={{ color, fontSize: "0.7rem", fontFamily: mono }}>{value}</span>
      </div>
      <div style={{ height: "6px", backgroundColor: "rgba(0,255,65,0.08)", borderRadius: "2px", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            height: "100%",
            backgroundColor: color,
            borderRadius: "2px",
            boxShadow: `0 0 6px ${color}88`,
          }}
        />
      </div>
    </div>
  );
}

function StatBox({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,255,65,0.2)",
        borderTop: "2px solid #00FF41",
        borderRadius: "2px",
        padding: "1.25rem 1.5rem",
        backgroundColor: "#070707",
      }}
    >
      <p style={{ color: "#003B00", fontSize: "0.6rem", letterSpacing: "0.15em", fontFamily: mono, marginBottom: "0.5rem" }}>
        {label}
      </p>
      <p
        style={{
          color: "#00FF41",
          fontSize: "2rem",
          fontFamily: mono,
          fontWeight: 700,
          textShadow: "0 0 12px #00FF4166",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      {sub && <p style={{ color: "#003B00", fontSize: "0.6rem", fontFamily: mono, marginTop: "0.4rem" }}>{sub}</p>}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,255,65,0.15)",
        borderRadius: "2px",
        padding: "1.5rem",
        backgroundColor: "#070707",
      }}
    >
      <p style={{ color: "#003B00", fontSize: "0.62rem", letterSpacing: "0.15em", marginBottom: "1.25rem", fontFamily: mono }}>
        [{title}]
      </p>
      {children}
    </div>
  );
}

export default function MainframePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/architect-dashboard")
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const hourlyMax = stats ? Math.max(...stats.hourlyActivity, 1) : 1;
  const topSource = stats?.trafficSources[0];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#000", color: "#00FF41", fontFamily: mono, padding: "3rem 2.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ color: "#003B00", fontSize: "0.65rem", letterSpacing: "0.18em", marginBottom: "0.4rem" }}>
            // MAINFRAME_TRAFFIC_MONITOR // ZION_ANALYTICS_NODE
          </p>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              textShadow: "0 0 16px #00FF4155",
              letterSpacing: "-0.01em",
              marginBottom: "0.5rem",
            }}
          >
            Operator Dashboard
          </h1>
          <p style={{ color: "#00802B", fontSize: "0.82rem" }}>
            Real-time intelligence on who is accessing the Mainframe.
          </p>
        </div>

        {loading && (
          <p style={{ color: "#003B00", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
            [SYS]: Connecting to Zion uplink...
          </p>
        )}
        {error && (
          <p style={{ color: "#FF3333", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
            [ERR]: Signal lost. Database unreachable.
          </p>
        )}

        {stats && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1rem",
                marginBottom: "2.5rem",
              }}
            >
              <StatBox label="TOTAL_CONNECTIONS" value={stats.totals.totalVisits} sub="operator visits all time" />
              <StatBox label="OPERATOR_EVENTS" value={stats.totals.operatorEvents} sub="tracked console events" />
              <StatBox label="MOBILE_SHARE" value={`${stats.totals.mobileShare}%`} sub="handheld devices" />
              <StatBox
                label="LAST_SIGNAL"
                value={stats.totals.latestSignal ? new Date(stats.totals.latestSignal).toLocaleTimeString() : "—"}
                sub="most recent visit"
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <Panel title="LIVE_OPERATOR_CONSOLE // STREAM">
                <OperatorConsole endpoint="/api/operator-events" height="280px" maxEvents={60} />
              </Panel>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 0.72fr)",
                gap: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <Panel title="PILL_CHOICE_MATRIX">
                <div style={{ display: "flex", gap: "2.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ color: "#00FF41", fontSize: "2.4rem", fontWeight: 700, lineHeight: 1 }}>
                      {stats.pillSplit.redPct}%
                    </div>
                    <div style={{ color: "#00802B", fontSize: "0.72rem", letterSpacing: "0.08em" }}>RED PILL</div>
                  </div>
                  <div>
                    <div style={{ color: "#3B82F6", fontSize: "2.4rem", fontWeight: 700, lineHeight: 1 }}>
                      {stats.pillSplit.bluePct}%
                    </div>
                    <div style={{ color: "#4F8CFF", fontSize: "0.72rem", letterSpacing: "0.08em" }}>BLUE PILL</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <Bar label={`Red Pill (${stats.pillSplit.red})`} value={stats.pillSplit.red} max={stats.totals.totalVisits} color="#00FF41" />
                  <Bar label={`Blue Pill (${stats.pillSplit.blue})`} value={stats.pillSplit.blue} max={stats.totals.totalVisits} color="#3B82F6" />
                  <Bar
                    label={`Mobile (${stats.totals.mobileShare}%)`}
                    value={stats.totals.mobileShare}
                    max={100}
                    color="#F59E0B"
                  />
                </div>
              </Panel>

              <Panel title="SIGNAL_ORIGIN">
                {stats.trafficSources.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {stats.trafficSources.slice(0, 4).map((source) => (
                      <Bar
                        key={source.label}
                        label={`${source.label} (${source.count})`}
                        value={source.pct}
                        max={100}
                        color={source.label === topSource?.label ? "#F59E0B" : "#00FF41"}
                      />
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "#003B00", fontSize: "0.72rem" }}>No source telemetry yet.</p>
                )}
              </Panel>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 0.36fr)",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <Panel title="HOURLY_ACTIVITY_24H">
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "140px" }}>
                  {stats.hourlyActivity.map((value, index) => {
                    const height = Math.max((value / hourlyMax) * 100, value > 0 ? 10 : 2);
                    const label = index % 6 === 0 ? `${index}h` : "";
                    return (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          minWidth: 0,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: "0.45rem",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            flex: 1,
                            display: "flex",
                            alignItems: "flex-end",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: `${height}%`,
                              backgroundColor: value > hourlyMax * 0.7 ? "#00FF41" : "#00802B",
                              boxShadow: value > hourlyMax * 0.7 ? "0 0 12px rgba(0,255,65,0.35)" : "none",
                              borderRadius: "2px 2px 0 0",
                            }}
                          />
                        </div>
                        <span style={{ color: "#003B00", fontSize: "0.5rem" }}>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </Panel>

              <Panel title="PROJECT_VIEW_RANK">
                {stats.topProjects.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                    {stats.topProjects.map((project) => (
                      <div key={project.name} style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem" }}>
                        <span style={{ color: "#00802B", fontSize: "0.72rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {project.name}
                        </span>
                        <span style={{ color: "#00FF41", fontSize: "0.72rem" }}>{project.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "#003B00", fontSize: "0.72rem" }}>No project interaction data yet.</p>
                )}
              </Panel>
            </div>

            <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
              <a
                href="/architect"
                style={{ color: "#003B00", fontSize: "0.68rem", fontFamily: mono, letterSpacing: "0.1em", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00802B")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#003B00")}
              >
                ARCHITECT&apos;S ROOM →
              </a>
              <a
                href="/portfolio"
                style={{ color: "#003B00", fontSize: "0.68rem", fontFamily: mono, letterSpacing: "0.1em", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00802B")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#003B00")}
              >
                &lt; RETURN TO MAINFRAME
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
