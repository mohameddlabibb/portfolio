const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  return (
    <nav>
      <button
        className="nl"
        onClick={() => go("hero")}
        style={{ color: "#0a0a0a", fontWeight: 800, fontSize: ".95rem", letterSpacing: ".06em" }}
      >
        LABIB<span style={{ color: "#ff3500" }}>.</span>
      </button>

      <div style={{ display: "flex", gap: 32 }}>
        {["About", "Skills", "Projects", "Contact"].map(s => (
          <button key={s} className="nl" onClick={() => go(s.toLowerCase())}>{s}</button>
        ))}
      </div>

      <a
        href="https://github.com/mohameddlabibb"
        target="_blank"
        rel="noopener"
        className="nl"
        style={{ textDecoration: "none" }}
      >
        GitHub ↗
      </a>
    </nav>
  );
}
