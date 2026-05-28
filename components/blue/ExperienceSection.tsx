"use client";

const JOBS = [
  {
    title: "AI / Full-Stack Engineer",
    company: "Future State University",
    period: "May 2025 – Jul 2025",
    bullets: [
      "Built backend services using Node.js, Python, and Java for scalable AI-driven applications.",
      "Developed REST APIs for user workflows, automated content generation, and structured data processing.",
      "Engineered data transformation pipelines with safeguards against data leakage and abuse paths.",
    ],
  },
  {
    title: "AI Engineer",
    company: "Siemens Energy",
    period: "Jan 2025 – Jul 2025",
    bullets: [
      "Built LLM-powered fault detection system for gas turbine maintenance using NLP and Knowledge Graphs.",
      "Designed GraphRAG architecture combining PostgreSQL + Neo4j for historical turbine fault retrieval.",
      "Developed NLP pipelines using spaCy, Prodigy, and LLMs to extract entities from engineering logs.",
      "Deployed containerized AI workflows using Docker, Azure, and CI/CD for enterprise-scale use.",
    ],
  },
  {
    title: "Research Software Engineer",
    company: "Indiana University School of Medicine",
    period: "Jun 2024 – Present",
    bullets: [
      "Developed full-stack research platforms for scientific and medical imaging datasets (Vue.js, Node.js, Prisma, PostgreSQL).",
      "Designed GitHub Actions CI/CD pipelines with PR-driven preview environments for multi-service Docker deployments.",
      "Integrated OHIF Viewer for secure browser-based DICOM visualization using DICOMweb + Orthanc.",
      "Built AI-powered test generation workflows using on-prem LLMs within containerized CI pipelines.",
    ],
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Samsung Research & Development Institute",
    period: "Jul 2021 – Mar 2022",
    bullets: [
      "Led development of emotion detection system for Samsung Bixby using ASR and VGG16 (~93% accuracy).",
      "Processed speech datasets using MFCCs, STFT, CWT, and t-SNE for feature extraction and analysis.",
      "Built Tableau dashboards to communicate model performance metrics to stakeholders.",
    ],
  },
  {
    title: "Graduate Teaching Assistant",
    company: "University of Central Florida",
    period: "Aug 2022 – May 2024",
    bullets: [
      "Assisted students across programming, OS, networking, and databases courses.",
      "Guided software development concepts, debugging strategies, and project-based learning.",
    ],
  },
  {
    title: "Full-Stack Developer",
    company: "SANRIDGE",
    period: "Jul 2021 – Oct 2021",
    bullets: [
      "Built Credit Card Management System using ReactJS, Redux, Express.js, and MySQL.",
      "Developed backend APIs for secure transaction and user management workflows.",
    ],
  },
];

export default function BlueExperienceSection() {
  return (
    <section
      id="experience"
      className="bp-panel-b"
      style={{ padding: "96px 64px", minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "840px" }}>
        {/* Section label */}
        <p className="bp-label" style={{ marginBottom: "12px" }}>
          Experience
        </p>

        <h2 style={{
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontWeight: 800,
          color: "#0F172A",
          letterSpacing: "-0.03em",
          marginBottom: "0.4rem",
        }}>
          Where I&apos;ve Built
        </h2>
        <p style={{
          color: "#64748B",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          marginBottom: "3.5rem",
        }}>
          A track record across AI, full-stack, research, and infrastructure engineering.
        </p>

        {/* Timeline */}
        <div style={{
          position: "relative",
          paddingLeft: "2rem",
          borderLeft: "1px solid #E2E8F0",
          display: "flex",
          flexDirection: "column",
          gap: "2.75rem",
        }}>
          {JOBS.map((job) => (
            <div key={`${job.title}-${job.company}`} style={{ position: "relative" }}>
              {/* Square marker — precision over softness */}
              <div style={{
                position: "absolute",
                left: "-2.4rem",
                top: "0.3rem",
                width: "8px",
                height: "8px",
                borderRadius: "2px",
                backgroundColor: "#2563EB",
              }} />

              {/* Role + Company */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                alignItems: "baseline",
                marginBottom: "0.15rem",
              }}>
                <span style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#0F172A",
                }}>
                  {job.title}
                </span>
                <span style={{ fontSize: "0.85rem", color: "#2563EB", fontWeight: 500 }}>
                  @ {job.company}
                </span>
              </div>

              {/* Period */}
              <p style={{
                fontSize: "0.72rem",
                color: "#94A3B8",
                letterSpacing: "0.05em",
                marginBottom: "0.85rem",
                fontFamily: "JetBrains Mono, monospace",
              }}>
                {job.period}
              </p>

              {/* Bullets */}
              <ul style={{
                margin: 0,
                paddingLeft: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}>
                {job.bullets.map((b, i) => (
                  <li key={i} style={{
                    fontSize: "0.875rem",
                    color: "#475569",
                    lineHeight: 1.75,
                  }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
