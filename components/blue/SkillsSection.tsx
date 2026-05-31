"use client";

import { motion } from "framer-motion";

const SKILLS = [
  { cat: "Languages",           items: ["Python", "JavaScript", "TypeScript", "Java", "C", "Bash/Shell", "SQL"] },
  { cat: "Frontend",            items: ["React", "Vue.js", "HTML", "CSS", "Tailwind CSS"] },
  { cat: "Backend",             items: ["Node.js", "Express.js", "Flask", "REST APIs", "GraphQL"] },
  { cat: "AI / ML",             items: ["LLMs", "GPT", "NLP", "GraphRAG", "LangChain", "LangGraph", "Hugging Face", "Prompt Engineering", "Vector Databases", "TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV", "Computer Vision"] },
  { cat: "Cloud & DevOps",      items: ["AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Terraform", "Ansible", "Nginx", "Prometheus", "Grafana"] },
  { cat: "Databases",           items: ["PostgreSQL", "MySQL", "MongoDB", "Neo4j", "SQLite", "Redis"] },
  { cat: "Data & Visualization", items: ["Pandas", "NumPy", "Apache ECharts", "Tableau"] },
  { cat: "Infra & Security",    items: ["Linux", "SSH", "VPN", "TLS/SSL", "Reverse Proxy", "Access Control", "Firewall", "CodeQL", "Semgrep"] },
  { cat: "Tools & Platforms",   items: ["Git", "GitHub", "Prisma ORM", "Kafka", "Celery", "OHIF Viewer", "Orthanc", "DICOMweb", "Jira", "Vercel", "Render", "TrueNAS SCALE"] },
];

export default function BlueSkillsSection() {
  return (
    <section
      id="skills"
      className="bp-panel-a"
      style={{ padding: "96px 64px", minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "840px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="bp-label" style={{ marginBottom: "12px" }}>Skills</p>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 800, color: "var(--bp-ink)",
            letterSpacing: "-0.03em", marginBottom: "0.4rem",
          }}>
            Technical Capabilities
          </h2>
          <p style={{ color: "var(--bp-ink-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            Technologies and tools I work with across the full stack.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "2.25rem 2.5rem",
        }}>
          {SKILLS.map(({ cat, items }, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: i * 0.05 }}
            >
              {/* Category header */}
              <p style={{
                fontSize: "0.68rem", fontWeight: 700,
                color: "var(--bp-accent)",
                letterSpacing: "0.14em", textTransform: "uppercase",
                marginBottom: "0.6rem", paddingBottom: "0.5rem",
                borderBottom: "1px solid var(--bp-border-fine)",
              }}>
                {cat}
              </p>

              {/* Plain-text skill list — no pill badges */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {items.map((skill, j) => (
                  <span key={skill} style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--bp-ink)",
                    lineHeight: 1.5,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
