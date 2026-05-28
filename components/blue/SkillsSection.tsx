"use client";

const SKILLS = [
  {
    cat: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C", "Bash/Shell", "SQL"],
  },
  {
    cat: "Frontend",
    items: ["React", "Vue.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    cat: "Backend",
    items: ["Node.js", "Express.js", "Flask", "REST APIs", "GraphQL"],
  },
  {
    cat: "AI / ML",
    items: ["LLMs", "GPT", "NLP", "GraphRAG", "LangChain", "LangGraph", "Hugging Face",
      "Prompt Engineering", "Vector Databases", "TensorFlow", "PyTorch", "Scikit-Learn",
      "OpenCV", "Computer Vision"],
  },
  {
    cat: "Cloud & DevOps",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "GitHub Actions", "CI/CD",
      "Terraform", "Ansible", "Nginx", "Prometheus", "Grafana"],
  },
  {
    cat: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Neo4j", "SQLite", "Redis"],
  },
  {
    cat: "Data & Visualization",
    items: ["Pandas", "NumPy", "Apache ECharts", "Tableau"],
  },
  {
    cat: "Infra & Security",
    items: ["Linux", "SSH", "VPN", "TLS/SSL", "Reverse Proxy", "Access Control",
      "Firewall", "CodeQL", "Semgrep"],
  },
  {
    cat: "Tools & Platforms",
    items: ["Git", "GitHub", "Prisma ORM", "Kafka", "Celery", "OHIF Viewer",
      "Orthanc", "DICOMweb", "Jira", "Vercel", "Render", "TrueNAS SCALE"],
  },
];

export default function BlueSkillsSection() {
  return (
    <section
      id="skills"
      className="bp-panel-a"
      style={{ padding: "96px 64px", minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "840px" }}>
        {/* Label + heading */}
        <p className="bp-label" style={{ marginBottom: "12px" }}>Skills</p>
        <h2 style={{
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontWeight: 800,
          color: "#0F172A",
          letterSpacing: "-0.03em",
          marginBottom: "0.4rem",
        }}>
          Technical Capabilities
        </h2>
        <p style={{
          color: "#64748B",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          marginBottom: "3rem",
        }}>
          Technologies and tools I work with across the full stack.
        </p>

        {/* Category group grid — 3 columns on desktop */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "2.25rem 2.5rem",
        }}>
          {SKILLS.map(({ cat, items }) => (
            <div key={cat}>
              {/* Category label */}
              <p style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#2563EB",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid #E2E8F0",
              }}>
                {cat}
              </p>

              {/* Plain-text skill list — no pill badges */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {items.map((skill, i) => (
                  <span key={skill} style={{
                    fontSize: i < 3 ? "0.9rem" : "0.8rem",
                    fontWeight: i < 3 ? 600 : 400,
                    color: i < 3 ? "#0F172A" : "#475569",
                    lineHeight: 1.5,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
