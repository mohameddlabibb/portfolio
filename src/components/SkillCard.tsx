import { useState, useRef } from "react";

type Cat = { cat: string; n: string; c: string; items: string[] };

export default function SkillCard({ cat, ci }: { cat: Cat; ci: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState<string | null>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rc = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rc.left) / rc.width - .5) * 24;
    const y = -((e.clientY - rc.top) / rc.height - .5) * 24;
    ref.current.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateZ(14px)`;
    ref.current.style.boxShadow = `0 24px 60px ${cat.c}22, 0 0 0 1px ${cat.c}30`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(700px) rotateY(0) rotateX(0) translateZ(0)";
    ref.current.style.boxShadow = "none";
  };

  return (
    <div className="rv" style={{ transitionDelay: `${ci * .1}s`, perspective: 700 }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          background: "#111", border: `1px solid ${cat.c}22`, borderRadius: 20,
          padding: "28px 24px", transition: "transform .15s ease,box-shadow .3s",
          transformStyle: "preserve-3d", cursor: "default", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%", background: cat.c, opacity: .07, filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 14, right: 18, fontFamily: "monospace", fontSize: "3rem", fontWeight: 900, color: cat.c, opacity: .06, lineHeight: 1, userSelect: "none" }}>{cat.n}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat.c, boxShadow: `0 0 10px ${cat.c}` }} />
          <span style={{ fontSize: ".7rem", fontFamily: "monospace", letterSpacing: ".2em", textTransform: "uppercase", color: cat.c, fontWeight: 700 }}>{cat.cat}</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {cat.items.map(s => (
            <span
              key={s}
              onMouseEnter={() => setHov(s)}
              onMouseLeave={() => setHov(null)}
              style={{
                padding: "7px 14px", borderRadius: 100, fontSize: ".8rem", fontWeight: 500,
                border: `1px solid ${hov === s ? cat.c : "#2a2a2a"}`,
                color: hov === s ? cat.c : "#666",
                background: hov === s ? `${cat.c}14` : "transparent",
                transform: hov === s ? "translateY(-2px) scale(1.04)" : "none",
                transition: "all .2s", cursor: "default", display: "inline-block",
                boxShadow: hov === s ? `0 4px 14px ${cat.c}22` : "none",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
