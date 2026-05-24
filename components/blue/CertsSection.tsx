import BlueCertCard from "./CertCard";

// REPLACE: real certifications
const CERTS = [
  { name: "AWS Cloud Practitioner",  issuer: "Amazon Web Services", year: "2024" },
  { name: "Google Cloud Associate",  issuer: "Google",              year: "2023" },
  { name: "Certified Scrum Master",  issuer: "Scrum Alliance",      year: "2023" },
  { name: "Security+",               issuer: "CompTIA",             year: "2022" },
];

export default function BlueCertsSection() {
  return (
    <section id="certs" style={{ padding: "6rem 2.5rem", backgroundColor: "#F1F5F9" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
          Certifications
        </h2>
        <p style={{ color: "#64748B", marginBottom: "2.5rem" }}>Verified credentials.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          {CERTS.map((c) => <BlueCertCard key={c.name} {...c} />)}
        </div>
      </div>
    </section>
  );
}
