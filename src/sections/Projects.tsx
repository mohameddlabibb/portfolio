import { useRef } from "react";

// ── Add new projects here ────────────────────────────────────────────────────
const PROJECTS = [
  {
    gradient: "#ff3500,#f43f5e",
    accentColor: "#ff3500",
    label: "01 — GRADUATION PROJECT",
    title: "SANAD Web",
    description: "Full-stack platform connecting people with social support services. React/TypeScript frontend, Node.js/Express/MySQL backend, custom JWT auth, admin dashboard, and booking flow.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MySQL", "JWT", "Supabase", "Tailwind"],
    tagColor: "#c53500",
    tagBg: "#fff5f2",
    tagBorder: "#ffd5c8",
    delay: "0s",
  },
  {
    gradient: "#7c3aed,#2563eb",
    accentColor: "#7c3aed",
    label: "02 — UTILITY",
    title: "FindDocs",
    description: "Offline financial document management system with full CRUD capabilities. Built for local-first workflows — no cloud dependency, fully self-hosted.",
    tags: ["Node.js", "Express", "SQLite", "React"],
    tagColor: "#5b21b6",
    tagBg: "#f5f3ff",
    tagBorder: "#ddd6fe",
    delay: ".12s",
  },
];

function tilt(e: React.MouseEvent, el: HTMLDivElement | null) {
  if (!el) return;
  const rc = el.getBoundingClientRect();
  el.style.transform = `perspective(900px) rotateX(${-((e.clientY - rc.top - rc.height / 2) / rc.height) * 12}deg) rotateY(${((e.clientX - rc.left - rc.width / 2) / rc.width) * 12}deg) translateZ(10px)`;
}

function untilt(el: HTMLDivElement | null) {
  if (el) el.style.transform = "none";
}

export default function Projects() {
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const refs = [ref0, ref1];

  return (
    <section id="projects" style={{ background: "#f9f9f9" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div className="rv">
          <p style={{ fontSize: ".75rem", letterSpacing: ".22em", color: "#ff3500", fontFamily: "monospace", marginBottom: 10 }}>Projects</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-.02em", marginBottom: 48 }}>Selected Work</h2>
        </div>

        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="pc3d rv"
            ref={refs[i]}
            style={{ marginBottom: 24, transitionDelay: p.delay }}
            onMouseMove={e => tilt(e, refs[i].current)}
            onMouseLeave={() => untilt(refs[i].current)}
          >
            <div style={{ height: 5, background: `linear-gradient(90deg,${p.gradient})` }} />
            <div style={{ padding: "40px 44px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: ".66rem", letterSpacing: ".18em", color: p.accentColor, marginBottom: 7, fontFamily: "monospace", fontWeight: 700 }}>{p.label}</p>
                  <h3 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, letterSpacing: "-.02em" }}>{p.title}</h3>
                </div>
                <a
                  href="https://github.com/mohameddlabibb"
                  target="_blank"
                  rel="noopener"
                  style={{ padding: "9px 18px", border: "1.5px solid rgba(0,0,0,.1)", borderRadius: 8, color: "#bbb", textDecoration: "none", fontSize: ".76rem", letterSpacing: ".08em", textTransform: "uppercase", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff3500"; e.currentTarget.style.color = "#ff3500"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,.1)"; e.currentTarget.style.color = "#bbb"; }}
                >
                  GitHub ↗
                </a>
              </div>
              <p style={{ color: "#999", lineHeight: 1.9, maxWidth: 680, marginBottom: 28, fontSize: ".94rem" }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tags.map(t => (
                  <span key={t} style={{ padding: "4px 12px", background: p.tagBg, border: `1.5px solid ${p.tagBorder}`, color: p.tagColor, fontSize: ".72rem", fontFamily: "monospace", borderRadius: 100 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="rv" style={{ border: "2px dashed rgba(0,0,0,.07)", borderRadius: 18, padding: "38px", display: "flex", alignItems: "center", justifyContent: "center", transitionDelay: ".2s" }}>
          <p style={{ color: "rgba(0,0,0,.15)", letterSpacing: ".18em", fontSize: ".8rem", fontFamily: "monospace" }}>[ MORE COMING SOON ]</p>
        </div>

      </div>
    </section>
  );
}
