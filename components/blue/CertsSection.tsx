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
        borderTop: "1px solid #E2E8F0",
      }}
    >
      <div style={{ maxWidth: "840px" }}>
        {/* Compact header */}
        <p style={{
          fontSize: "0.68rem", fontWeight: 700,
          color: "#94A3B8", letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
        }}>
          Certifications
        </p>

        {/* Horizontal strip — minimal typography */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem 2rem",
        }}>
          {CERTS.map((c) => (
            <div key={c.name} style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}>
              {/* Shield icon substitute — minimal dot */}
              <div style={{
                width: "5px", height: "5px",
                borderRadius: "1px",
                backgroundColor: "#CBD5E1",
                flexShrink: 0,
              }} />
              <div>
                <span style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#0F172A",
                }}>
                  {c.name}
                </span>
                <span style={{
                  fontSize: "0.72rem",
                  color: "#94A3B8",
                  marginLeft: "0.5rem",
                }}>
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
