export default function BlueFooter() {
  return (
    <footer
      id="blue-footer"
      className="bp-panel-b"
      style={{
        borderTop: "1px solid var(--bp-border)",
        padding: "24px 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.5rem",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <span style={{ color: "var(--bp-ink-muted)", fontSize: "0.78rem", fontWeight: 500 }}>
        KD. &copy; {new Date().getFullYear()}
      </span>
      <span style={{ color: "var(--bp-border)", fontSize: "0.72rem", letterSpacing: "0.02em" }}>
        Made with intention, not templates.
      </span>
    </footer>
  );
}
