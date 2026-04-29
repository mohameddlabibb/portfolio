const ITEMS = ["React", "TypeScript", "Node.js", "Vite", "Tailwind", "MySQL", "Supabase", "Express", "REST API", "Git", "Figma", "Dart"];

export default function Marquee() {
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(0,0,0,.07)", padding: "11px 0", background: "#0a0a0a" }}>
      <div className="mtrack">
        {[0, 1].map(k => (
          <span key={k} style={{ display: "flex", gap: 36, paddingRight: 36 }}>
            {ITEMS.map(s => (
              <span key={s} style={{ fontSize: ".7rem", letterSpacing: ".16em", color: "rgba(255,255,255,.28)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {s}<span style={{ color: "#ff3500", margin: "0 8px", fontSize: ".55rem" }}>✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
