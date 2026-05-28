"use client";

import { motion } from "framer-motion";

const mono = "JetBrains Mono, monospace";

const JOBS = [
  {
    title: "AI / Full-Stack Engineer",
    company: "Future State University",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Node.js + Python + Java backend services for AI-driven applications.",
      "REST APIs for content generation + structured data processing pipelines.",
      "Safeguards against data leakage across workflow orchestration systems.",
    ],
  },
  {
    title: "AI Engineer",
    company: "Siemens Energy",
    period: "Jan 2025 – Jul 2025",
    bullets: [
      "LLM-powered fault detection for gas turbine maintenance via NLP + Knowledge Graphs.",
      "GraphRAG: PostgreSQL + Neo4j for historical turbine fault/resolution retrieval.",
      "NLP pipelines (spaCy, Prodigy, LLMs) — entity extraction from engineering logs.",
      "Containerized AI workflows on Docker + Azure + CI/CD for enterprise scale.",
    ],
  },
  {
    title: "Research Software Engineer",
    company: "Indiana University School of Medicine",
    period: "Jun 2024 – Present",
    bullets: [
      "Full-stack research platforms for medical imaging datasets (Vue.js, Node.js, Prisma, PostgreSQL).",
      "GitHub Actions CI/CD with PR-driven preview environments for Docker deployments.",
      "OHIF Viewer integration — secure browser-based DICOM via DICOMweb + Orthanc.",
      "AI test generation inside CI using on-prem LLMs + containerized Playwright execution.",
    ],
  },
  {
    title: "ML Engineer Intern",
    company: "Samsung R&D Institute",
    period: "Jul 2021 – Mar 2022",
    bullets: [
      "Emotion detection for Samsung Bixby using ASR + VGG16 (~93% accuracy).",
      "Feature extraction via MFCCs, STFT, CWT, t-SNE on speech datasets.",
    ],
  },
  {
    title: "Graduate Teaching Assistant",
    company: "University of Central Florida",
    period: "Aug 2022 – May 2024",
    bullets: [
      "Supported CS coursework: OS, networking, databases, software engineering.",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "SANRIDGE",
    period: "Jul 2021 – Oct 2021",
    bullets: [
      "Credit Card Management System — ReactJS + Redux + Express.js + MySQL.",
    ],
  },
];

export default function RedExperienceSection() {
  return (
    <section id="experience" style={{ padding: "6rem 2.5rem", maxWidth: "860px", margin: "0 auto" }}>
      <p style={{ color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.15em",
        marginBottom: "0.5rem", fontFamily: mono }}>
        // OPERATOR_DEPLOYMENT_LOG
      </p>
      <h2 style={{ color: "#00FF41", fontFamily: mono, fontSize: "2rem",
        fontWeight: 700, marginBottom: "0.5rem", textShadow: "0 0 12px #00FF4155" }}>
        Field Operations
      </h2>
      <p style={{ color: "#00802B", fontSize: "0.82rem", marginBottom: "3rem", fontFamily: mono }}>
        Missions executed inside the system.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {JOBS.map((job, i) => (
          <motion.div key={`${job.title}-${job.company}`}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ borderLeft: "1px solid rgba(0,255,65,0.25)", paddingLeft: "1.25rem" }}>

            <p style={{ color: "#003B00", fontSize: "0.62rem", letterSpacing: "0.1em",
              fontFamily: mono, marginBottom: "0.3rem" }}>
              [MISSION_{String(i + 1).padStart(2, "0")}]
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem",
              alignItems: "baseline", marginBottom: "0.2rem" }}>
              <span style={{ color: "#00FF41", fontFamily: mono, fontSize: "0.95rem",
                fontWeight: 700, textShadow: "0 0 6px #00FF4166" }}>
                {job.title}
              </span>
              <span style={{ color: "#00802B", fontFamily: mono, fontSize: "0.8rem" }}>
                // {job.company}
              </span>
            </div>
            <p style={{ color: "#003B00", fontSize: "0.68rem", fontFamily: mono,
              letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
              {job.period}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {job.bullets.map((b, j) => (
                <p key={j} style={{ color: "#00802B", fontSize: "0.82rem",
                  fontFamily: mono, lineHeight: 1.7 }}>
                  &gt; {b}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
