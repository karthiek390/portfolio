const CERTS = [
  { name: "AWS Certified Solutions Architect - Associate", issuer: "Amazon Web Services", year: "2024" },
  { name: "NVIDIA-Certified Associate: Generative AI & LLMs", issuer: "NVIDIA", year: "2024" },
  { name: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft", year: "2024" },
  { name: "NDG Linux Essentials", issuer: "Cisco Networking Academy", year: "2023" },
];

export default function BlueCertsSection() {
  return (
    <section
      id="certs"
      className="bp-panel-a"
      style={{
        padding: "40px 64px 72px",
        borderTop: "1px solid var(--bp-border)",
      }}
    >
      <div style={{ maxWidth: "840px" }}>
        <p style={{
          fontSize: "0.82rem",
          fontWeight: 700,
          color: "var(--bp-ink-muted)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
          opacity: 0.7,
        }}>
          Certifications
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {CERTS.map((c) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.7rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{
                width: "5px",
                height: "5px",
                borderRadius: "1px",
                backgroundColor: "var(--bp-border)",
                flexShrink: 0,
                marginTop: "0.45rem",
              }} />

              <div>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--bp-ink)" }}>
                  {c.name}
                </span>
                <span style={{ fontSize: "0.96rem", fontWeight: 700, color: "var(--bp-accent)", marginLeft: "0.7rem" }}>
                  {c.issuer} · {c.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
