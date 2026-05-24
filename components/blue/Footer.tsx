export default function BlueFooter() {
  return (
    <footer id="blue-footer" style={{
      padding: "2.5rem", textAlign: "center",
      borderTop: "1px solid #E2E8F0", color: "#94A3B8", fontSize: "0.8rem",
      fontFamily: "Inter, sans-serif",
    }}>
      © {new Date().getFullYear()} Karthiek Duggirala · Built with Next.js
    </footer>
  );
}
