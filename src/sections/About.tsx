import { SVCS } from "../data/constants";

const STATS: [string, string][] = [
  ["5+",      "Projects"],
  ["12+",     "Technologies"],
  ["SomaBay", "Internship"],
  ["2026",    "Graduating"],
];

export default function About() {
  return (
    <section id="about" style={{ background: "#0a0a0a", padding: "90px 56px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div className="rv" style={{ marginBottom: 48 }}>
          <p style={{ fontSize: ".75rem", letterSpacing: ".22em", color: "#ff3500", fontFamily: "monospace", marginBottom: 10 }}>About + Services</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-.02em", color: "#fff" }}>I Build Things That Matter</h2>
        </div>

        {/* service cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 56 }}>
          {SVCS.map((s, i) => (
            <div
              key={s.id}
              className="rv"
              style={{ transitionDelay: `${i * .07}s`, background: "#111", borderRadius: 16, padding: "26px 22px", border: "1px solid #1e1e1e", transition: "all .3s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.c; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${s.c}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: s.c }} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", marginBottom: 7 }}>{s.l}</h3>
              <p style={{ fontSize: ".8rem", color: "#444", lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>

        {/* stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, borderTop: "1px solid #1a1a1a", paddingTop: 44, marginBottom: 44 }} className="rv">
          {STATS.map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#fff", fontFamily: "monospace", marginBottom: 6 }}>{v}</div>
              <div style={{ fontSize: ".7rem", color: "#444", letterSpacing: ".1em", textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>

        <p className="rv" style={{ color: "#555", lineHeight: 1.9, fontSize: ".95rem", maxWidth: 620, transitionDelay: ".15s" }}>
          Frontend developer & BIS student at AASTMT Cairo. React/TypeScript specialist from pixel-perfect UIs to REST APIs,
          and produce{" "}
          <span style={{ color: "#ff3500" }}>AI-driven fashion photography</span> for Egyptian streetwear brands.
        </p>

      </div>
    </section>
  );
}
