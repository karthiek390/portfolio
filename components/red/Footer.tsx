const mono = "JetBrains Mono, monospace";

export default function RedFooter() {
  return (
    <footer style={{ padding: "3rem 2.5rem", borderTop: "1px solid rgba(0,255,65,0.12)",
      textAlign: "center", fontFamily: mono }}>
      <p style={{ color: "#003B00", fontSize: "0.68rem", letterSpacing: "0.12em" }}>
        © 2026 KARTHIEK DUGGIRALA // ZION MAINFRAME TERMINAL //
        <a href="https://github.com/karthiek390" target="_blank" rel="noopener noreferrer"
          style={{ color: "#00802B", textDecoration: "none", marginLeft: "0.5rem" }}>
          GITHUB
        </a>
        {" // "}
        <a href="https://www.linkedin.com/in/karthiek-duggirala/" target="_blank" rel="noopener noreferrer"
          style={{ color: "#00802B", textDecoration: "none" }}>
          LINKEDIN
        </a>
      </p>
      <a href="/mainframe" style={{ display: "block", marginTop: "0.75rem",
        color: "#001200", fontSize: "0.55rem", fontFamily: mono,
        letterSpacing: "0.1em", textDecoration: "none" }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#003B00")}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#001200")}>
        // operator_access
      </a>
    </footer>
  );
}
