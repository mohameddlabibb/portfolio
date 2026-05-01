import { useState, useEffect, useRef } from "react";
import { ICONS_3D, IC, TECH_STRIP, WORDS } from "../data/constants";
import NameHeading from "../components/NameHeading";

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  const [typed, setTyped] = useState("");
  const tw = useRef({ wi: 0, ci: 0, del: false });

  useEffect(() => {
    const t = tw.current;
    const tick = () => {
      const w = WORDS[t.wi];
      if (t.del) {
        t.ci--;
        setTyped(w.slice(0, t.ci));
        if (t.ci === 0) { t.del = false; t.wi = (t.wi + 1) % WORDS.length; }
        return setTimeout(tick, 55);
      }
      t.ci++;
      setTyped(w.slice(0, t.ci));
      if (t.ci === w.length) { t.del = true; return setTimeout(tick, 1600); }
      setTimeout(tick, 85);
    };
    const id = setTimeout(tick, 300);
    return () => clearTimeout(id);
  }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 80, position: "relative", overflow: "hidden", background: "#fff" }}>

      {/* floating 3D tech icons */}
      {ICONS_3D.map(b => {
        const Fn = IC[b.k];
        const sz = Math.round(b.sz * (b.is ?? .58));
        const sh = `0 ${Math.round(b.sz / 3)}px ${b.sz * 1.4}px rgba(${b.gl},.2),0 6px 18px rgba(0,0,0,.08),4px 4px 0 rgba(${b.gl},.25),8px 8px 0 rgba(${b.gl},.14),12px 12px 0 rgba(${b.gl},.07),inset 0 1.5px 0 rgba(255,255,255,.95)`;
        return (
          <div key={b.k} style={{ position: "absolute", left: b.l, top: b.t, zIndex: 1, pointerEvents: "none", animation: `f${b.fan} ${b.fd}s ${b.dl}s ease-in-out infinite` }}>
            <div style={{ width: b.sz, height: b.sz, background: b.bg, borderRadius: Math.round(b.sz * .2), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: sh, border: `1.5px solid rgba(${b.gl},.18)`, animation: `t${b.tan} ${b.td}s ${b.dl}s ease-in-out infinite` }}>
              {Fn && Fn(sz)}
            </div>
          </div>
        );
      })}

      {/* spinning "available" badge */}
      <div style={{ position: "absolute", top: "7%", right: "6%", zIndex: 3 }}>
        <svg viewBox="0 0 100 100" width="124" height="124" style={{ animation: "spin 12s linear infinite", display: "block" }}>
          <path id="cr" fill="none" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          <text fontSize="9.2" fontFamily="monospace" letterSpacing="2" fill="#ff3500">
            <textPath href="#cr"> · AVAILABLE · CAIRO · 2026 · HIRE MEE · </textPath>
          </text>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00c853", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#00c853", animation: "pulse 2s ease-out infinite" }} />
          </div>
        </div>
      </div>

      {/* main content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 960 }}>
        <NameHeading />

        <div style={{ height: "clamp(34px,4vw,50px)", display: "flex", alignItems: "center", marginBottom: 28 }}>
          <span style={{ fontSize: "clamp(15px,2.2vw,24px)", fontWeight: 300, color: "#aaa" }}>
            {typed}<span className="tc" />
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 32, paddingTop: 20, paddingBottom: 20, borderTop: "1px solid rgba(0,0,0,.07)", borderBottom: "1px solid rgba(0,0,0,.07)" }}>
          {TECH_STRIP.map(t => (
            <div key={t.n} className="tpill">
              {IC[t.k] && IC[t.k](20)}
              <span style={{ fontSize: ".75rem", color: "#444", fontWeight: 600 }}>{t.n}</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: ".95rem", color: "#bbb", maxWidth: 440, lineHeight: 1.9, marginBottom: 36 }}>
          Building performant web experiences with React & TypeScript.<br />BIS student @ AASTMT Cairo — graduating 2026.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {([["View Work ↓", "#0a0a0a", "#fff", "projects"], ["Let's Build →", "transparent", "#0a0a0a", "contact"]] as const).map(([label, bg, col, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              style={{ padding: "14px 32px", background: bg, color: col, border: `2px solid ${bg === "transparent" ? "rgba(0,0,0,.14)" : bg}`, borderRadius: 10, fontWeight: 700, fontSize: ".85rem", letterSpacing: ".08em", textTransform: "uppercase", cursor: "pointer", transition: "all .3s", fontFamily: "inherit" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#ff3500"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#ff3500"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = bg; e.currentTarget.style.color = col; e.currentTarget.style.borderColor = bg === "transparent" ? "rgba(0,0,0,.14)" : bg; e.currentTarget.style.transform = "none"; }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
