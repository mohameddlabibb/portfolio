const EMAIL = "mohameddlabibb@gmail.com";

export default function Footer() {
  return (
    <footer style={{ padding: "26px clamp(20px,5.6vw,56px)", borderTop: "1px solid #111", background: "#0a0a0a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      <span style={{ fontFamily: "monospace", fontSize: ".7rem", color: "#2a2a2a" }}>© 2026 — Mohamed Labib</span>
      <a
        href={`mailto:${EMAIL}`}
        style={{ fontFamily: "monospace", fontSize: ".7rem", color: "#333", textDecoration: "none", transition: "color .25s" }}
        onMouseEnter={e => e.currentTarget.style.color = "#ff3500"}
        onMouseLeave={e => e.currentTarget.style.color = "#333"}
      >
        {EMAIL}
      </a>
      <span style={{ fontFamily: "monospace", fontSize: ".7rem", color: "#2a2a2a" }}>
        Built with React
      </span>
    </footer>
  );
}
