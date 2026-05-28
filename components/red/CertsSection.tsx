import RedCertCard from "./CertCard";

const CERTS = [
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services",        year: "2024" },
  { name: "NVIDIA-Certified Associate: Generative AI & LLMs",  issuer: "NVIDIA",                year: "2024" },
  { name: "Microsoft Certified: Azure Fundamentals",          issuer: "Microsoft",               year: "2024" },
  { name: "NDG Linux Essentials",                             issuer: "Cisco Networking Academy", year: "2023" },
];

export default function RedCertsSection() {
  return (
    <section id="certs" style={{ padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <p style={{ color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.15em",
        marginBottom: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>
        // LOADED_SKILL_PROGRAMS
      </p>
      <h2 style={{ color: "#00FF41", fontFamily: "JetBrains Mono, monospace",
        fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
        Training Constructs
      </h2>
      <p style={{ color: "#00802B", fontSize: "0.82rem", marginBottom: "2.5rem",
        fontFamily: "JetBrains Mono, monospace" }}>
        Click a module to load the program directly into your neural net.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
        {CERTS.map((c) => <RedCertCard key={c.name} {...c} />)}
      </div>
    </section>
  );
}
