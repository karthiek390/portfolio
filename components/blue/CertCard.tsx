interface CertCardProps {
  name: string;
  issuer: string;
  year: string;
}

export default function BlueCertCard({ name, issuer, year }: CertCardProps) {
  return (
    <div style={{
      backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px",
      padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem",
      boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
    }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#EFF6FF",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>
        🏅
      </div>
      <div>
        <p style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.88rem" }}>{name}</p>
        <p style={{ color: "#64748B", fontSize: "0.75rem", marginTop: "0.1rem" }}>{issuer} · {year}</p>
      </div>
    </div>
  );
}
