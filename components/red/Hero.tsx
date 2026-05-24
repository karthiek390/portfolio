"use client";

import { motion } from "framer-motion";

const LINES = [
  { prefix: "SYS",  text: "Wake up, Karthiek...",                                         dim: true },
  { prefix: "SYS",  text: "The Matrix has you.",                                           dim: true },
  { prefix: "ID",   text: "Karthiek Duggirala",                                            heading: true },
  { prefix: "ROLE", text: "Full-Stack Engineer // Cloud & Infrastructure Practitioner",    sub: true },
  { prefix: "BIO",  text: "Builds full-stack, cloud, and infrastructure systems — from developer tooling", normal: true },
  { prefix: "BIO",  text: "and web apps to secure homelab and networking setups.",         normal: true },
  { prefix: "LOC",  text: "Broadcasting from Zion Mainframe...",                           normal: true },
];

export default function RedHero() {
  return (
    <section id="hero" style={{
      minHeight: "90vh", display: "flex", alignItems: "center",
      padding: "6rem 2.5rem", maxWidth: "860px", margin: "0 auto",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", width: "100%" }}>
        {LINES.map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.22, duration: 0.4 }}
            style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
            <span style={{ color: "#003B00", fontSize: "0.68rem", letterSpacing: "0.1em",
              fontFamily: "JetBrains Mono, monospace", minWidth: "52px", flexShrink: 0 }}>
              [{line.prefix}]
            </span>
            {line.heading ? (
              <h1 style={{ margin: 0, color: "#00FF41", fontFamily: "JetBrains Mono, monospace",
                fontSize: "clamp(1.6rem, 5vw, 2.8rem)", fontWeight: 700,
                textShadow: "0 0 16px #00FF41", lineHeight: 1.2 }}>
                {line.text}
              </h1>
            ) : (
              <span style={{
                color: line.dim ? "#00802B" : line.sub ? "#00FF41" : "#00802B",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: line.sub ? "1rem" : "0.9rem",
                opacity: line.dim ? 0.6 : 1,
              }}>
                {line.text}
              </span>
            )}
          </motion.div>
        ))}

        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{ color: "#00FF41", fontSize: "1.2rem", fontFamily: "JetBrains Mono, monospace", marginTop: "0.4rem" }}>
          _
        </motion.span>

        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          {[
            { label: ">> LINKEDIN", href: "https://www.linkedin.com/in/karthiek-duggirala/" },
            { label: ">> GITHUB",   href: "https://github.com/karthiek390" },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ color: "#00FF41", textDecoration: "none", fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.85rem", letterSpacing: "0.08em",
                borderBottom: "1px solid rgba(0,255,65,0.4)", paddingBottom: "2px", transition: "text-shadow 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.textShadow = "0 0 10px #00FF41")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.textShadow = "none")}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
