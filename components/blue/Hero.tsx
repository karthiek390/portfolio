export default function BlueHero() {
  return (
    <section id="hero" style={{
      minHeight: "90vh", display: "flex", alignItems: "center",
      padding: "6rem 2.5rem", maxWidth: "900px", margin: "0 auto",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        <p style={{ color: "#2563EB", fontSize: "1rem", fontWeight: 500, letterSpacing: "0.05em" }}>
          Hi, I&apos;m
        </p>

        <h1 id="hero-name" style={{
          fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 800,
          color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.03em",
        }}>
          Karthiek Duggirala
        </h1>

        <h2 id="hero-title" style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)", fontWeight: 400, color: "#64748B" }}>
          Full-Stack Engineer &amp; Cloud Practitioner
        </h2>

        <p id="hero-bio" style={{ maxWidth: "540px", fontSize: "1rem", lineHeight: 1.8, color: "#475569" }}>
          I build full-stack, cloud, and infrastructure projects that turn practical problems
          into reliable systems, from developer tooling and web apps to secure homelab and
          networking setups. I enjoy combining clean user experiences with strong backend,
          automation, and platform fundamentals.
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
          <a id="hero-linkedin-btn"
            href="https://www.linkedin.com/in/karthiek-duggirala/"
            target="_blank" rel="noopener noreferrer"
            style={{ padding: "0.75rem 1.75rem", backgroundColor: "#2563EB", color: "#fff",
              borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem",
              transition: "background-color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = "#1D4ED8")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = "#2563EB")}>
            LinkedIn
          </a>
          <a id="hero-github-btn"
            href="https://github.com/karthiek390"
            target="_blank" rel="noopener noreferrer"
            style={{ padding: "0.75rem 1.75rem", backgroundColor: "transparent", color: "#2563EB",
              border: "2px solid #2563EB", borderRadius: "8px", textDecoration: "none",
              fontWeight: 600, fontSize: "0.9rem", transition: "background-color 0.2s, color 0.2s" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = "#2563EB"; (e.target as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = "transparent"; (e.target as HTMLElement).style.color = "#2563EB"; }}>
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
