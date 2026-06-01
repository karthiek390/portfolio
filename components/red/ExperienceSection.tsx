"use client";

import { motion } from "framer-motion";

const mono = "JetBrains Mono, monospace";

const JOBS = [
  {
    title: "Research Software Engineer",
    company: "Indiana University School of Medicine",
    period: "Jun 2024 - Present",
    bullets: [
      "Developed full-stack research platforms for scientific and medical imaging datasets (Vue.js, Node.js, PostgreSQL).",
      "Designed GitHub Actions CI/CD pipelines with PR-driven preview environments for multi-service Docker deployments.",
      "Integrated OHIF Viewer for secure browser-based DICOM visualization using DICOMweb + Orthanc.",
    ],
  },
  {
    title: "AI Engineer",
    company: "Siemens Energy",
    period: "Jan 2025 - Jul 2025",
    bullets: [
      "Contributed to the development of NLP & LLM-powered solutions for power plant maintenance & intelligence.",
      "Supported information retrieval pilot projects using GPT models, knowledge graphs, & enterprise engineering data.",
      "Collaborated with cross-functional teams to evaluate and implement data-driven AI innovations.",
    ],
  },
  {
    title: "AI / Full-Stack Engineer",
    company: "Future State University",
    period: "May 2025 - Jul 2025",
    bullets: [
      "Built backend services using Node.js, and Python for scalable AI-driven applications.",
      "Developed REST APIs for user workflows, automated content generation, and structured data processing.",
      "Engineered data transformation pipelines with safeguards against data leakage and abuse paths.",
    ],
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Samsung Research & Development Institute",
    period: "Jul 2021 - Mar 2022",
    bullets: [
      "Led development of emotion detection system for Samsung Bixby using ASR and VGG16 (~93% accuracy).",
      "Processed speech datasets using MFCCs, STFT, CWT, and t-SNE for feature extraction and analysis.",
      "Built Tableau dashboards to communicate model performance metrics to stakeholders.",
    ],
  },
  {
    title: "Graduate Teaching Assistant",
    company: "University of Central Florida",
    period: "Aug 2022 - May 2024",
    bullets: [
      "Assisted students across Advanced AI, programming, OS, networking, and databases courses.",
      "Guided software development concepts, debugging strategies, and project-based learning.",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "SANRIDGE",
    period: "Jul 2021 - Oct 2021",
    bullets: [
      "Built Credit Card Management System using ReactJS, Redux, Express.js, and MySQL.",
      "Developed backend APIs for secure transaction and user management workflows.",
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
            <p style={{ color: "#00802B", fontSize: "0.8rem", fontFamily: mono,
              letterSpacing: "0.06em", marginBottom: "0.75rem", fontWeight: 500 }}>
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
