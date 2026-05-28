"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackOperatorEvent } from "@/lib/operator-events";

const mono = "JetBrains Mono, monospace";
const ORACLE_QUOTE = "You've already made the choice. You're just here to understand why you made it.";
const NODE_ACTIVATION_SKILL = "[NODE_ACTIVATION]";

const NODES = [
  { id: "lang",  label: "LANGUAGES",       x: 50, y: 12, items: ["Python", "TypeScript", "JavaScript", "Java", "C", "Bash/Shell", "SQL"] },
  { id: "fe",    label: "FRONTEND",         x: 18, y: 35, items: ["React", "Vue.js", "HTML", "CSS", "Tailwind CSS"] },
  { id: "be",    label: "BACKEND",          x: 82, y: 35, items: ["Node.js", "Express.js", "Flask", "REST APIs", "GraphQL"] },
  { id: "ai",    label: "AI / ML",          x: 50, y: 38, items: ["LLMs", "GPT", "NLP", "GraphRAG", "LangChain", "LangGraph", "Hugging Face", "TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV"] },
  { id: "cloud", label: "CLOUD & DEVOPS",   x: 18, y: 62, items: ["AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Terraform", "Ansible", "Nginx", "Prometheus", "Grafana"] },
  { id: "db",    label: "DATABASES",        x: 82, y: 62, items: ["PostgreSQL", "MySQL", "MongoDB", "Neo4j", "SQLite", "Redis"] },
  { id: "infra", label: "INFRA & SECURITY", x: 30, y: 85, items: ["Linux", "SSH", "VPN", "TLS/SSL", "Reverse Proxy", "Firewall", "CodeQL", "Semgrep"] },
  { id: "tools", label: "TOOLS",            x: 70, y: 85, items: ["Git", "GitHub", "Prisma ORM", "Kafka", "Celery", "OHIF Viewer", "Orthanc", "DICOMweb", "Vercel", "TrueNAS SCALE"] },
];

const EDGES = [
  ["lang","fe"],["lang","be"],["lang","ai"],
  ["fe","cloud"],["be","db"],["ai","cloud"],
  ["ai","db"],["cloud","infra"],["db","tools"],
  ["infra","tools"],
];

// Per-node Oracle mutations: tint + accent color + flavour line
const MUTATIONS: Record<string, { accent: string; tint: string; flavour: string }> = {
  lang:  { accent: "#00FF41", tint: "rgba(0,255,65,0.04)",  flavour: "Every language is a door. You have opened many." },
  fe:    { accent: "#38BDF8", tint: "rgba(56,189,248,0.04)", flavour: "The illusion rendered. The viewer convinced." },
  be:    { accent: "#A78BFA", tint: "rgba(167,139,250,0.04)",flavour: "The real machine runs behind what they can see." },
  ai:    { accent: "#F59E0B", tint: "rgba(245,158,11,0.06)", flavour: "The Oracle predicted this. The model agreed." },
  cloud: { accent: "#34D399", tint: "rgba(52,211,153,0.04)", flavour: "Infinite scale. Deployed at the speed of thought." },
  db:    { accent: "#FB7185", tint: "rgba(251,113,133,0.04)",flavour: "Every truth persisted. Every query answered." },
  infra: { accent: "#FBBF24", tint: "rgba(251,191,36,0.05)", flavour: "The walls no one sees. The locks that hold the system." },
  tools: { accent: "#A3E635", tint: "rgba(163,230,53,0.04)", flavour: "The keymaker's collection. A key for every door." },
};

function nodeById(id: string) { return NODES.find((n) => n.id === id)!; }

export default function RedSkillsSection() {
  const [hovered,      setHovered]      = useState<string | null>(null);
  const [clicked,      setClicked]      = useState<string | null>(null);
  const [mutatedSkill, setMutatedSkill] = useState<string | null>(null);
  const [serverFlavour, setServerFlavour] = useState<string | null>(null);
  const [serverAccent, setServerAccent] = useState<string | null>(null);
  const [serverQuote, setServerQuote] = useState<string | null>(null);

  const displayId   = hovered ?? clicked;
  const displayNode = displayId ? nodeById(displayId) : null;
  const mutation    = clicked ? MUTATIONS[clicked] : null;

  const postSkillClick = useCallback((nodeId: string, skill: string) => {
    fetch("/api/skill-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nodeId,
        skill,
        timestamp: new Date().toISOString(),
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("skill click failed"))))
      .then((data: { accentColor?: string; flavour?: string; quote?: string }) => {
        setServerAccent(data.accentColor ?? null);
        setServerFlavour(data.flavour ?? null);
        setServerQuote(data.quote ?? null);
      })
      .catch(() => {
        const fallback = MUTATIONS[nodeId];
        setServerAccent(fallback?.accent ?? null);
        setServerFlavour(fallback?.flavour ?? null);
        setServerQuote(ORACLE_QUOTE);
      });
  }, []);

  const handleNodeClick = useCallback((id: string) => {
    const next = clicked === id ? null : id;
    setServerFlavour(null);
    setServerAccent(null);
    setServerQuote(null);
    setClicked(next);

    if (!next) return;

    const node = nodeById(id);
    trackOperatorEvent({
      type: "SKILLS_CLICK",
      detail: `oracle kitchen: ${node.label} node activated`,
      page: "portfolio",
      metadata: { nodeId: node.id, label: node.label },
    });
    postSkillClick(node.id, NODE_ACTIVATION_SKILL);
  }, [clicked, postSkillClick]);

  const handleSkillClick = useCallback((skill: string) => {
    setMutatedSkill(skill);
    setTimeout(() => setMutatedSkill(null), 1200);
    if (!clicked) return;
    postSkillClick(clicked, skill);
  }, [clicked, postSkillClick]);

  // Section-level accent driven by active mutation
  const sectionAccent  = serverAccent ?? mutation?.accent ?? "#00FF41";
  const sectionTint    = mutation?.tint   ?? "transparent";

  return (
    <section id="skills" style={{
      padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto",
      backgroundColor: sectionTint,
      transition: "background-color 0.5s ease",
      borderRadius: "4px",
    }}>
      <p style={{ color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.15em",
        marginBottom: "0.5rem", fontFamily: mono }}>
        // ORACLE_KITCHEN // RESIDUAL_SELF_IMAGE_PROGRAMS
      </p>

      <motion.h2 animate={{ color: sectionAccent, textShadow: `0 0 12px ${sectionAccent}55` }}
        transition={{ duration: 0.4 }}
        style={{ fontFamily: mono, fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Loaded Programs
      </motion.h2>

      <p style={{ color: "#00802B", fontSize: "0.82rem", marginBottom: "3rem", fontFamily: mono }}>
        {clicked
          ? "Click a node again to deselect. Click a skill to mutate."
          : "Hover to inspect. Click to enter the Oracle's Kitchen."}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* Node map */}
        <div style={{ position: "relative", width: "100%", paddingBottom: "90%" }}>
          <div style={{ position: "absolute", inset: 0 }}>

            <svg viewBox="0 0 100 100" preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
              {EDGES.map(([a, b]) => {
                const na = nodeById(a), nb = nodeById(b);
                const isClickedEdge = clicked === a || clicked === b;
                const isHoverEdge   = hovered === a || hovered === b;
                return (
                  <line key={`${a}-${b}`}
                    x1={`${na.x}%`} y1={`${na.y}%`}
                    x2={`${nb.x}%`} y2={`${nb.y}%`}
                    stroke={
                      isClickedEdge ? sectionAccent :
                      isHoverEdge   ? "rgba(0,255,65,0.5)" :
                                      "rgba(0,255,65,0.12)"
                    }
                    strokeWidth={isClickedEdge ? "0.6" : "0.4"}
                    style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                  />
                );
              })}
            </svg>

            {NODES.map((node) => {
              const isClicked = clicked === node.id;
              const isHovered = hovered === node.id;
              const isActive  = isClicked || isHovered;
              const accent    = isClicked ? (MUTATIONS[node.id]?.accent ?? "#00FF41") : "#00FF41";
              return (
                <motion.button key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleNodeClick(node.id)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: "absolute",
                    left: `${node.x}%`, top: `${node.y}%`,
                    transform: "translate(-50%, -50%)",
                    background: isClicked ? `${accent}18` : isHovered ? "rgba(0,255,65,0.12)" : "rgba(0,0,0,0.85)",
                    border: `${isClicked ? "2" : "1"}px solid ${isActive ? accent : "rgba(0,255,65,0.3)"}`,
                    borderRadius: "3px", padding: "0.3rem 0.6rem",
                    cursor: "pointer", fontFamily: mono,
                    fontSize: "clamp(0.45rem, 1.2vw, 0.65rem)",
                    color: isActive ? accent : "#00802B",
                    letterSpacing: "0.08em", whiteSpace: "nowrap",
                    boxShadow: isClicked ? `0 0 18px ${accent}44` : isHovered ? "0 0 14px rgba(0,255,65,0.25)" : "none",
                    transition: "border-color 0.2s, color 0.2s, box-shadow 0.2s, background 0.2s",
                    zIndex: 2, display: "flex", alignItems: "center", gap: "0.35rem",
                  }}>
                  <span style={{
                    display: "inline-block", width: "5px", height: "5px",
                    borderRadius: "50%", flexShrink: 0,
                    backgroundColor: isActive ? accent : "#003B00",
                    boxShadow: isActive ? `0 0 6px ${accent}` : "none",
                    transition: "background 0.2s, box-shadow 0.2s",
                  }} />
                  {node.label}
                  {isClicked && <span style={{ fontSize: "0.5rem", opacity: 0.7 }}>✦</span>}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Readout panel */}
        <motion.div animate={{ borderColor: `${sectionAccent}44` }}
          transition={{ duration: 0.4 }}
          style={{ minHeight: "120px", border: "1px solid rgba(0,255,65,0.18)",
            borderRadius: "2px", padding: "1.25rem 1.5rem",
            backgroundColor: "#050505", fontFamily: mono }}>
          <AnimatePresence mode="wait">
            {displayNode ? (
              <motion.div key={displayNode.id}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}>
                <p style={{ color: "#003B00", fontSize: "0.6rem", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
                  [{displayNode.label}] // {displayNode.items.length} MODULES LOADED
                  {clicked === displayNode.id && " // ORACLE_ACTIVE"}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {displayNode.items.map((skill) => {
                    const isMutated = mutatedSkill === skill;
                    return (
                      <motion.span key={skill}
                        onClick={() => clicked ? handleSkillClick(skill) : undefined}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: 1, scale: isMutated ? 1.12 : 1,
                          backgroundColor: isMutated ? sectionAccent : "transparent",
                          color: isMutated ? "#000" : sectionAccent,
                        }}
                        transition={{ duration: 0.12 }}
                        style={{
                          padding: "0.2rem 0.6rem",
                          border: `1px solid ${sectionAccent}55`,
                          borderRadius: "2px", fontSize: "0.75rem",
                          letterSpacing: "0.04em",
                          cursor: clicked ? "pointer" : "default",
                        }}>
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
                {clicked === displayNode.id && MUTATIONS[displayNode.id] && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: "#003B00", fontSize: "0.65rem", marginTop: "0.75rem",
                      fontStyle: "italic", letterSpacing: "0.04em" }}>
                    &gt; {serverFlavour ?? MUTATIONS[displayNode.id].flavour}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ color: "#003B00", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
                &gt; hover a node to load program data_
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Oracle quote — appears when any node is clicked */}
        <AnimatePresence>
          {clicked && (
            <motion.div key="oracle"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.4 }}
              style={{ borderLeft: `2px solid ${sectionAccent}`, paddingLeft: "1rem" }}>
              <p style={{ color: sectionAccent, fontFamily: mono, fontSize: "0.78rem",
                letterSpacing: "0.04em", fontStyle: "italic",
                textShadow: `0 0 8px ${sectionAccent}66` }}>
                &ldquo;{serverQuote ?? ORACLE_QUOTE}&rdquo;
              </p>
              <p style={{ color: "#003B00", fontSize: "0.58rem", fontFamily: mono,
                marginTop: "0.4rem", letterSpacing: "0.1em" }}>
                — The Oracle // MATRIX RELOADED
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
