const CERTS = [
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2024" },
  { name: "NVIDIA-Certified Associate: Generative AI & LLMs",  issuer: "NVIDIA",                    year: "2024" },
  { name: "Microsoft Certified: Azure Fundamentals",           issuer: "Microsoft",                  year: "2024" },
  { name: "NDG Linux Essentials",                              issuer: "Cisco Networking Academy",   year: "2023" },
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
          fontSize: "0.68rem", fontWeight: 700,
          color: "var(--bp-ink-muted)", letterSpacing: "0.14em",
          textTransform: "uppercase", marginBottom: "1.25rem",
          opacity: 0.7,
        }}>
          Certifications
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 2rem" }}>
          {CERTS.map((c) => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              {/* Square dot marker — warm tone */}
              <div style={{
                width: "5px", height: "5px",
                borderRadius: "1px",
                backgroundColor: "var(--bp-border)",
                flexShrink: 0,
              }} />
              <div>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--bp-ink)" }}>
                  {c.name}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--bp-ink-muted)", marginLeft: "0.5rem", opacity: 0.8 }}>
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
