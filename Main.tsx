import { useState, useEffect, useRef } from "react";

const IMGS = {
  React:      "https://i.postimg.cc/0b40NRcK/React-icon-svg.png",
  TypeScript: "https://i.postimg.cc/VdhWNQDw/TS.png",
  NodeJS:     "https://i.postimg.cc/Cz54YLC4/Node.webp",
  JavaScript: "https://i.postimg.cc/WtX7QJZn/JS.png",
  MySQL:      "https://i.postimg.cc/ThCcZWb7/mysql.png",
  Git:        "https://i.postimg.cc/Ln5VR6kC/Git-icon-svg.png",
  Tailwind:   "https://i.postimg.cc/pprBxXYT/Tailwind-CSS-Logo-svg.png",
  Supabase:   "https://i.postimg.cc/7fhNDY1R/supabase.webp",
  Vite:       "https://i.postimg.cc/gn7H0FNY/vite.webp",
  Figma:      "https://i.postimg.cc/NLpxWrXD/figma.png",
  Dart:       "https://i.postimg.cc/QV0qRW71/dart.png",
};
const IC = Object.fromEntries(Object.entries(IMGS).map(([k,src])=>[k,(s)=><img src={src} width={s} height={s} style={{objectFit:"contain",display:"block"}} alt={k}/>]));

const ICONS_3D = [
  {k:"React",      bg:"#eef9ff",gl:"97,218,251",  l:"6%",  t:"10%",sz:80,td:9,  fd:6.5,tan:1,fan:1,dl:0  },
  {k:"TypeScript", bg:"#eef3ff",gl:"49,120,198",  l:"74%", t:"7%", sz:72,td:11, fd:7,  tan:2,fan:2,dl:.9 },
  {k:"NodeJS",     bg:"#edfaed",gl:"83,158,67",   l:"87%", t:"24%",sz:82,td:7.5,fd:5.5,tan:3,fan:3,dl:1.6},
  {k:"JavaScript", bg:"#fffde6",gl:"247,220,30",  l:"44%", t:"4%", sz:72,td:12, fd:8,  tan:4,fan:4,dl:2.2},
  {k:"MySQL",      bg:"#eef2fa",gl:"68,121,161",  l:"59%", t:"40%",sz:80,td:9,  fd:6,  tan:5,fan:5,dl:.5 },
  {k:"Git",        bg:"#fff1ef",gl:"240,80,50",   l:"18%", t:"47%",sz:78,td:11, fd:7,  tan:6,fan:6,dl:1.3},
  {k:"Tailwind",   bg:"#eafafd",gl:"6,182,212",   l:"79%", t:"56%",sz:74,td:8,  fd:5,  tan:2,fan:1,dl:2.4},
  {k:"Supabase",   bg:"#ecfaf5",gl:"62,207,142",  l:"6%",  t:"66%",sz:72,td:10, fd:7,  tan:3,fan:2,dl:.7 },
  {k:"Vite",       bg:"#f3eeff",gl:"130,80,220",  l:"48%", t:"76%",sz:74,td:8,  fd:6,  tan:5,fan:4,dl:3.1},
  {k:"Figma",      bg:"#fff2ef",gl:"242,78,30",   l:"33%", t:"12%",sz:72,td:9,  fd:7,  tan:6,fan:3,dl:1.1},
  {k:"Dart",       bg:"#eaf6ff",gl:"13,135,200",  l:"22%", t:"28%",sz:70,td:11, fd:5,  tan:4,fan:6,dl:2.0},
];

const TECH_STRIP = [
  {n:"React",k:"React"},{n:"TypeScript",k:"TypeScript"},{n:"Node.js",k:"NodeJS"},
  {n:"JavaScript",k:"JavaScript"},{n:"Tailwind",k:"Tailwind"},{n:"MySQL",k:"MySQL"},
  {n:"Supabase",k:"Supabase"},{n:"Git",k:"Git"},{n:"Vite",k:"Vite"},
  {n:"Figma",k:"Figma"},{n:"Dart",k:"Dart"},
];

const SVCS = [
  {id:"web",l:"Websites",      d:"Responsive sites from scratch",  c:"#ff3500",bg:"#fff5f2"},
  {id:"des",l:"Web Design",    d:"Modern UI/UX that converts",     c:"#7c3aed",bg:"#f5f3ff"},
  {id:"ai", l:"AI Photoshoots",d:"Hyper-realistic AI fashion",     c:"#f43f5e",bg:"#fff1f4"},
  {id:"app",l:"Mobile Apps",   d:"iOS & Android applications",     c:"#2563eb",bg:"#eff6ff"},
];

const SKILL_CATS = [
  {cat:"Frontend",n:"01",c:"#ff3500",items:["React","TypeScript","Vite","Tailwind CSS","HTML/CSS","JavaScript"]},
  {cat:"Backend", n:"02",c:"#7c3aed",items:["Node.js","Express","MySQL","Supabase","JWT Auth","REST APIs"]},
  {cat:"Tools",   n:"03",c:"#06b6d4",items:["Git","VS Code","Postman","Figma","Vercel","Claude Code"]},
];

const WORDS = ["Frontend Developer","React Specialist","UI Engineer","Full-Stack Builder"];

const G = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#fff;color:#0a0a0a;font-family:'Inter',system-ui,sans-serif;overflow-x:hidden}
@keyframes t1{0%,100%{transform:perspective(520px) rotateY(-34deg) rotateX(13deg)}50%{transform:perspective(520px) rotateY(34deg) rotateX(-10deg)}}
@keyframes t2{0%,100%{transform:perspective(520px) rotateY(28deg) rotateX(-15deg)}50%{transform:perspective(520px) rotateY(-28deg) rotateX(13deg)}}
@keyframes t3{0%,100%{transform:perspective(520px) rotateX(-26deg) rotateY(18deg)}50%{transform:perspective(520px) rotateX(26deg) rotateY(-14deg)}}
@keyframes t4{0%,100%{transform:perspective(520px) rotateY(22deg) rotateZ(6deg)}50%{transform:perspective(520px) rotateY(-22deg) rotateZ(-6deg)}}
@keyframes t5{0%,100%{transform:perspective(520px) rotateX(19deg) rotateY(-30deg)}50%{transform:perspective(520px) rotateX(-19deg) rotateY(30deg)}}
@keyframes t6{0%,100%{transform:perspective(520px) rotateY(31deg) rotateX(9deg) rotateZ(-5deg)}50%{transform:perspective(520px) rotateY(-31deg) rotateX(-7deg) rotateZ(5deg)}}
@keyframes f1{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
@keyframes f2{0%,100%{transform:translateY(-12px)}50%{transform:translateY(16px)}}
@keyframes f3{0%,100%{transform:translateY(0)}33%{transform:translateY(-18px)}66%{transform:translateY(9px)}}
@keyframes f4{0%,100%{transform:translateY(-8px)}50%{transform:translateY(20px)}}
@keyframes f5{0%,100%{transform:translateY(0)}25%{transform:translateY(-22px)}75%{transform:translateY(8px)}}
@keyframes f6{0%,100%{transform:translateY(5px)}50%{transform:translateY(-16px)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(2.4);opacity:.1}}
@keyframes mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes cf{0%{transform:translateY(0) rotate(0) scale(1);opacity:1}100%{transform:translateY(-150px) rotate(580deg) scale(.2);opacity:0}}
@keyframes popIn{0%{transform:scale(.85);opacity:0}60%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
.tc{display:inline-block;width:3px;height:.82em;background:#ff3500;vertical-align:text-bottom;margin-left:4px;animation:blink 1s step-end infinite}
.mtrack{display:flex;animation:mq 22s linear infinite;white-space:nowrap}
.rv{opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s}
.rv.in{opacity:1;transform:translateY(0)}
nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:18px 56px;display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.88);backdrop-filter:blur(16px);border-bottom:1px solid rgba(0,0,0,.06)}
.nl{position:relative;color:#bbb;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:color .25s;border:none;background:none;font-family:inherit;padding:0}
.nl::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:2px;background:#ff3500;transition:width .3s}
.nl:hover{color:#0a0a0a}.nl:hover::after{width:100%}
.pc3d{background:#fff;border-radius:18px;border:1.5px solid rgba(0,0,0,.07);transform-style:preserve-3d;overflow:hidden;will-change:transform;transition:box-shadow .3s}
.pc3d:hover{box-shadow:0 30px 70px rgba(0,0,0,.13)}
.tpill{display:flex;align-items:center;gap:8px;padding:7px 14px;border-radius:9px;background:rgba(255,255,255,.95);border:1px solid rgba(0,0,0,.08);transition:all .22s;cursor:default;box-shadow:0 2px 8px rgba(0,0,0,.05)}
.tpill:hover{transform:translateY(-3px);box-shadow:0 8px 22px rgba(0,0,0,.1)}
.svc{border-radius:16px;padding:22px;cursor:pointer;transition:all .25s;border:2px solid transparent;user-select:none}
.fi{width:100%;padding:13px 18px;border:1.5px solid rgba(0,0,0,.1);border-radius:10px;font-size:.95rem;font-family:inherit;background:#fff;color:#0a0a0a;transition:border .25s;outline:none}
.fi:focus{border-color:#ff3500;box-shadow:0 0 0 4px rgba(255,53,0,.08)}
.fi.err{border-color:#f43f5e}
textarea.fi{resize:vertical;min-height:120px}
.sbtn{display:inline-flex;align-items:center;gap:10px;padding:15px 38px;border:none;border-radius:12px;font-size:.92rem;font-weight:700;letter-spacing:.06em;cursor:pointer;transition:all .35s;font-family:inherit;background:#0a0a0a;color:#fff;position:relative;overflow:hidden}
.sbtn::before{content:'';position:absolute;inset:0;background:#ff3500;transform:scaleX(0);transform-origin:left;transition:transform .4s}
.sbtn:hover:not(:disabled)::before{transform:scaleX(1)}
.sbtn span{position:relative;z-index:1}
.sbtn:disabled{opacity:.55;cursor:not-allowed}
section{padding:100px 56px}
`;

function NameHeading() {
  const [hov, setHov] = useState(false);
  return (
    <h1
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: "clamp(54px,9.5vw,128px)",
        fontWeight: 900,
        letterSpacing: "-.03em",
        lineHeight: .92,
        marginBottom: 16,
        cursor: "default",
        display: "inline-block",
        transition: "all 0.4s ease",
        ...(hov ? {
          background: "linear-gradient(135deg,#4c1d95,#7c3aed,#a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        } : {
          color: "#0a0a0a",
          background: "none",
          WebkitTextFillColor: "#0a0a0a",
        })
      }}
    >
      Mohamed Labib
    </h1>
  );
}

function SkillCard({ cat, ci }) {
  const ref = useRef(null);
  const [hov, setHov] = useState(null);
  const onMove = e => {
    if (!ref.current) return;
    const rc = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rc.left) / rc.width - .5) * 24;
    const y = -(( e.clientY - rc.top) / rc.height - .5) * 24;
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
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{
        background: "#111", border: `1px solid ${cat.c}22`, borderRadius: 20,
        padding: "28px 24px", transition: "transform .15s ease,box-shadow .3s",
        transformStyle: "preserve-3d", cursor: "default", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%", background: cat.c, opacity: .07, filter: "blur(28px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 14, right: 18, fontFamily: "monospace", fontSize: "3rem", fontWeight: 900, color: cat.c, opacity: .06, lineHeight: 1, userSelect: "none" }}>{cat.n}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat.c, boxShadow: `0 0 10px ${cat.c}` }} />
          <span style={{ fontSize: ".7rem", fontFamily: "monospace", letterSpacing: ".2em", textTransform: "uppercase", color: cat.c, fontWeight: 700 }}>{cat.cat}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {cat.items.map(s => (
            <span key={s} onMouseEnter={() => setHov(s)} onMouseLeave={() => setHov(null)} style={{
              padding: "7px 14px", borderRadius: 100, fontSize: ".8rem", fontWeight: 500,
              border: `1px solid ${hov === s ? cat.c : "#2a2a2a"}`,
              color: hov === s ? cat.c : "#666",
              background: hov === s ? `${cat.c}14` : "transparent",
              transform: hov === s ? "translateY(-2px) scale(1.04)" : "none",
              transition: "all .2s", cursor: "default", display: "inline-block",
              boxShadow: hov === s ? `0 4px 14px ${cat.c}22` : "none",
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const pts = Array.from({ length: 20 }, (_, i) => ({
    id: i, c: ["#ff3500","#7c3aed","#f43f5e","#2563eb","#00c853","#ffd600"][i % 6],
    l: 10 + Math.random() * 80, dl: Math.random() * .5, dur: .7 + Math.random() * .8,
    sz: 6 + Math.random() * 9, sh: i % 3 === 0 ? "50%" : "3px"
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {pts.map(c => <div key={c.id} style={{ position: "absolute", bottom: "38%", left: `${c.l}%`, width: c.sz, height: c.sz, borderRadius: c.sh, background: c.c, animation: `cf ${c.dur}s ${c.dl}s ease-out both` }} />)}
    </div>
  );
}

export default function Portfolio() {
  const [typed, setTyped] = useState("");
  const tw = useRef({ wi: 0, ci: 0, del: false });
  const [selSvc, setSelSvc] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const c1 = useRef(null), c2 = useRef(null);

  useEffect(() => {
    const t = tw.current;
    const tick = () => {
      const w = WORDS[t.wi];
      if (t.del) { t.ci--; setTyped(w.slice(0, t.ci)); if (t.ci === 0) { t.del = false; t.wi = (t.wi + 1) % WORDS.length; } return setTimeout(tick, 55); }
      t.ci++; setTyped(w.slice(0, t.ci)); if (t.ci === w.length) { t.del = true; return setTimeout(tick, 1600); } setTimeout(tick, 85);
    };
    const id = setTimeout(tick, 300); return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold: .1 });
    document.querySelectorAll(".rv").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const tilt = (e, r) => { if (!r.current) return; const rc = r.current.getBoundingClientRect(); r.current.style.transform = `perspective(900px) rotateX(${-((e.clientY - rc.top - rc.height / 2) / rc.height) * 12}deg) rotateY(${((e.clientX - rc.left - rc.width / 2) / rc.width) * 12}deg) translateZ(10px)`; };
  const untilt = r => { if (r.current) r.current.style.transform = "none"; };
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const tog = id => setSelSvc(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
  const validate = () => { const e: Record<string, string> = {}; if (!form.name.trim()) e.name = "Required"; if (!form.email.includes("@")) e.email = "Valid email required"; if (!form.msg.trim()) e.msg = "Required"; if (!selSvc.length) e.svc = "Pick at least one"; setErrs(e); return !Object.keys(e).length; };

  const submit = async () => {
    if (!validate()) return; setLoading(true);
    const svcs = selSvc.map(id => SVCS.find(s => s.id === id).l).join(", ");
    try {
      const res = await fetch("https://formsubmit.co/ajax/mohameddlabibb@gmail.com", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, services: svcs, message: form.msg, _subject: `Inquiry from ${form.name}`, _captcha: "false" }) });
      const d = await res.json(); setLoading(false);
      if (d.success === "true" || d.success === true) setDone(true); else throw new Error();
    } catch {
      setLoading(false);
      window.open(`mailto:mohameddlabibb@gmail.com?subject=${encodeURIComponent("Portfolio Inquiry")}&body=${encodeURIComponent("Name: " + form.name + "\nEmail: " + form.email + "\nServices: " + svcs + "\n\nMessage:\n" + form.msg)}`);
      setDone(true);
    }
  };

  return (
    <>
      <style>{G}</style>

      <nav>
        <button className="nl" onClick={() => go("hero")} style={{ color: "#0a0a0a", fontWeight: 800, fontSize: ".95rem", letterSpacing: ".06em" }}>LABIB<span style={{ color: "#ff3500" }}>.</span></button>
        <div style={{ display: "flex", gap: 32 }}>{["About", "Skills", "Projects", "Contact"].map(s => <button key={s} className="nl" onClick={() => go(s.toLowerCase())}>{s}</button>)}</div>
        <a href="https://github.com/mohameddlabibb" target="_blank" rel="noopener" className="nl" style={{ textDecoration: "none" }}>GitHub ↗</a>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 80, position: "relative", overflow: "hidden", background: "#fff" }}>
        {ICONS_3D.map((b, i) => {
          const Fn = IC[b.k];
          const sz = Math.round(b.sz * .58);
          const sh = `0 ${Math.round(b.sz / 3)}px ${b.sz * 1.4}px rgba(${b.gl},.2),0 6px 18px rgba(0,0,0,.08),4px 4px 0 rgba(${b.gl},.25),8px 8px 0 rgba(${b.gl},.14),12px 12px 0 rgba(${b.gl},.07),inset 0 1.5px 0 rgba(255,255,255,.95)`;
          return (
            <div key={b.k} style={{ position: "absolute", left: b.l, top: b.t, zIndex: 1, pointerEvents: "none", animation: `f${b.fan} ${b.fd}s ${b.dl}s ease-in-out infinite` }}>
              <div style={{ width: b.sz, height: b.sz, background: b.bg, borderRadius: Math.round(b.sz * .2), display: "flex", alignItems: "center", justifyContent: "center", boxShadow: sh, border: `1.5px solid rgba(${b.gl},.18)`, animation: `t${b.tan} ${b.td}s ${b.dl}s ease-in-out infinite` }}>
                {Fn && Fn(sz)}
              </div>
            </div>
          );
        })}

        <div style={{ position: "absolute", top: "7%", right: "6%", zIndex: 3 }}>
          <svg viewBox="0 0 100 100" width="124" height="124" style={{ animation: "spin 12s linear infinite", display: "block" }}>
            <path id="cr" fill="none" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
            <text fontSize="9.2" fontFamily="monospace" letterSpacing="2" fill="#ff3500"><textPath href="#cr">AVAILABLE · CAIRO · 2026 · HIRE ME ·</textPath></text>
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00c853", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#00c853", animation: "pulse 2s ease-out infinite" }} />
            </div>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 960 }}>
          <NameHeading />
          <div style={{ height: "clamp(34px,4vw,50px)", display: "flex", alignItems: "center", marginBottom: 28 }}>
            <span style={{ fontSize: "clamp(15px,2.2vw,24px)", fontWeight: 300, color: "#aaa" }}>{typed}<span className="tc" /></span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 32, paddingTop: 20, paddingBottom: 20, borderTop: "1px solid rgba(0,0,0,.07)", borderBottom: "1px solid rgba(0,0,0,.07)" }}>
            {TECH_STRIP.map(t => (
              <div key={t.n} className="tpill">
                {IC[t.k] && IC[t.k](20)}
                <span style={{ fontSize: ".75rem", color: "#444", fontWeight: 600 }}>{t.n}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: ".95rem", color: "#bbb", maxWidth: 440, lineHeight: 1.9, marginBottom: 36 }}>Building performant web experiences with React & TypeScript.<br />BIS student @ AASTMT Cairo — graduating 2026.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[["View Work ↓", "#0a0a0a", "#fff", "projects"], ["Let's Build →", "transparent", "#0a0a0a", "contact"]].map(([label, bg, col, id]) => (
              <button key={id} onClick={() => go(id)} style={{ padding: "14px 32px", background: bg, color: col, border: `2px solid ${bg === "transparent" ? "rgba(0,0,0,.14)" : bg}`, borderRadius: 10, fontWeight: 700, fontSize: ".85rem", letterSpacing: ".08em", textTransform: "uppercase", cursor: "pointer", transition: "all .3s", fontFamily: "inherit" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#ff3500"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#ff3500"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = bg; e.currentTarget.style.color = col; e.currentTarget.style.borderColor = bg === "transparent" ? "rgba(0,0,0,.14)" : bg; e.currentTarget.style.transform = "none"; }}>{label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(0,0,0,.07)", padding: "11px 0", background: "#0a0a0a" }}>
        <div className="mtrack">{[0, 1].map(k => <span key={k} style={{ display: "flex", gap: 36, paddingRight: 36 }}>{["React", "TypeScript", "Node.js", "Vite", "Tailwind", "MySQL", "Supabase", "Express", "REST API", "Git", "Figma", "Dart"].map(s => <span key={s} style={{ fontSize: ".7rem", letterSpacing: ".16em", color: "rgba(255,255,255,.28)", textTransform: "uppercase", whiteSpace: "nowrap" }}>{s}<span style={{ color: "#ff3500", margin: "0 8px", fontSize: ".55rem" }}>✦</span></span>)}</span>)}</div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ background: "#0a0a0a", padding: "90px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rv" style={{ marginBottom: 48 }}>
            <p style={{ fontSize: ".68rem", letterSpacing: ".22em", color: "#ff3500", fontFamily: "monospace", marginBottom: 10 }}>// 01 — About + Services</p>
            <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-.02em", color: "#fff" }}>I Build Things That Matter</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 56 }}>
            {SVCS.map((s, i) => (
              <div key={s.id} className="rv" style={{ transitionDelay: `${i * .07}s`, background: "#111", borderRadius: 16, padding: "26px 22px", border: "1px solid #1e1e1e", transition: "all .3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.c; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${s.c}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 12, height: 12, borderRadius: "50%", background: s.c }} /></div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", marginBottom: 7 }}>{s.l}</h3>
                <p style={{ fontSize: ".8rem", color: "#444", lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, borderTop: "1px solid #1a1a1a", paddingTop: 44, marginBottom: 44 }} className="rv">
            {[["5+", "Projects"], ["12+", "Technologies"], ["SomaBay", "Internship"], ["2026", "Graduating"]].map(([v, l]) => (
              <div key={l}><div style={{ fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 900, color: "#fff", fontFamily: "monospace", marginBottom: 6 }}>{v}</div><div style={{ fontSize: ".7rem", color: "#444", letterSpacing: ".1em", textTransform: "uppercase" }}>{l}</div></div>
            ))}
          </div>
          <p className="rv" style={{ color: "#555", lineHeight: 1.9, fontSize: ".95rem", maxWidth: 620, transitionDelay: ".15s" }}>
            Frontend developer & BIS student at AASTMT Cairo. React/TypeScript specialist from pixel-perfect UIs to REST APIs. Completed an IT internship at <span style={{ color: "#888" }}>SomaBay</span> and produce <span style={{ color: "#ff3500" }}>AI-driven fashion photography</span> for Egyptian streetwear brands.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: "#0d0d0d", overflow: "hidden", position: "relative", padding: "100px 56px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="rv" style={{ marginBottom: 56 }}>
            <p style={{ fontSize: ".68rem", letterSpacing: ".22em", color: "#ff3500", fontFamily: "monospace", marginBottom: 10 }}>// 02 — Skills</p>
            <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-.02em", color: "#fff" }}>What I Work With</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {SKILL_CATS.map((cat, ci) => <SkillCard key={cat.cat} cat={cat} ci={ci} />)}
          </div>
        </div>
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,53,0,.05)", top: "-10%", left: "60%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "rgba(124,58,237,.05)", bottom: "0", left: "10%", filter: "blur(80px)", pointerEvents: "none" }} />
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: "#f9f9f9" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="rv"><p style={{ fontSize: ".68rem", letterSpacing: ".22em", color: "#ff3500", fontFamily: "monospace", marginBottom: 10 }}>// 03 — Projects</p><h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-.02em", marginBottom: 48 }}>Selected Work</h2></div>
          {[
            { r: c1, dl: "0s", gr: "#ff3500,#f43f5e", lc: "#ff3500", lb: "01 — GRADUATION PROJECT", ti: "SANAD Web", de: "Full-stack platform connecting people with social support services. React/TypeScript frontend, Node.js/Express/MySQL backend, custom JWT auth, admin dashboard, and booking flow.", tg: ["React", "TypeScript", "Node.js", "Express", "MySQL", "JWT", "Supabase", "Tailwind"], tc: "#c53500", tbg: "#fff5f2", tbd: "#ffd5c8" },
            { r: c2, dl: ".12s", gr: "#7c3aed,#2563eb", lc: "#7c3aed", lb: "02 — UTILITY", ti: "FindDocs", de: "Offline financial document management system with full CRUD capabilities. Built for local-first workflows — no cloud dependency, fully self-hosted.", tg: ["Node.js", "Express", "SQLite", "React"], tc: "#5b21b6", tbg: "#f5f3ff", tbd: "#ddd6fe" },
          ].map(p => (
            <div key={p.ti} className="pc3d rv" ref={p.r} style={{ marginBottom: 24, transitionDelay: p.dl }} onMouseMove={e => tilt(e, p.r)} onMouseLeave={() => untilt(p.r)}>
              <div style={{ height: 5, background: `linear-gradient(90deg,${p.gr})` }} />
              <div style={{ padding: "40px 44px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: ".66rem", letterSpacing: ".18em", color: p.lc, marginBottom: 7, fontFamily: "monospace", fontWeight: 700 }}>{p.lb}</p>
                    <h3 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, letterSpacing: "-.02em" }}>{p.ti}</h3>
                  </div>
                  <a href="https://github.com/mohameddlabibb" target="_blank" rel="noopener" style={{ padding: "9px 18px", border: "1.5px solid rgba(0,0,0,.1)", borderRadius: 8, color: "#bbb", textDecoration: "none", fontSize: ".76rem", letterSpacing: ".08em", textTransform: "uppercase", transition: "all .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff3500"; e.currentTarget.style.color = "#ff3500"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,.1)"; e.currentTarget.style.color = "#bbb"; }}>GitHub ↗</a>
                </div>
                <p style={{ color: "#999", lineHeight: 1.9, maxWidth: 680, marginBottom: 28, fontSize: ".94rem" }}>{p.de}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{p.tg.map(t => <span key={t} style={{ padding: "4px 12px", background: p.tbg, border: `1.5px solid ${p.tbd}`, color: p.tc, fontSize: ".72rem", fontFamily: "monospace", borderRadius: 100 }}>{t}</span>)}</div>
              </div>
            </div>
          ))}
          <div className="rv" style={{ border: "2px dashed rgba(0,0,0,.07)", borderRadius: 18, padding: "38px", display: "flex", alignItems: "center", justifyContent: "center", transitionDelay: ".2s" }}>
            <p style={{ color: "rgba(0,0,0,.15)", letterSpacing: ".18em", fontSize: ".8rem", fontFamily: "monospace" }}>[ MORE COMING SOON ]</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#0a0a0a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="rv"><p style={{ fontSize: ".68rem", letterSpacing: ".22em", color: "#ff3500", fontFamily: "monospace", marginBottom: 10 }}>// 04 — Contact</p><h2 style={{ fontSize: "clamp(32px,5vw,58px)", fontWeight: 900, letterSpacing: "-.02em", color: "#fff", marginBottom: 10 }}>Let's Build Together</h2></div>
          <div className="rv" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, transitionDelay: ".05s" }}>
            <a href="mailto:mohameddlabibb@gmail.com" style={{ fontSize: ".9rem", color: "#ff3500", textDecoration: "none", fontFamily: "monospace", transition: "opacity .2s" }} onMouseEnter={e => e.currentTarget.style.opacity = ".7"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>mohameddlabibb@gmail.com</a>
            <span style={{ color: "#333", fontSize: ".8rem" }}>· Available for work</span>
          </div>
          {!done ? (
            <>
              <div className="rv" style={{ marginBottom: 30, transitionDelay: ".08s" }}>
                <p style={{ fontSize: ".78rem", color: "#444", marginBottom: 16 }}>What do you need? <span style={{ color: "#ff3500" }}>*</span></p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
                  {SVCS.map(s => { const on = selSvc.includes(s.id); return (
                    <div key={s.id} className="svc" onClick={() => tog(s.id)} style={{ background: on ? "#161616" : "#111", borderColor: on ? s.c : "transparent", boxShadow: on ? `0 8px 26px ${s.c}28` : "0 2px 8px rgba(0,0,0,.4)", transform: on ? "translateY(-4px)" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: s.c }} /></div>
                        <span style={{ fontWeight: 700, color: on ? s.c : "#fff", fontSize: ".9rem" }}>{s.l}</span>
                        {on && <span style={{ marginLeft: "auto", fontSize: ".66rem", background: s.c, color: "#fff", padding: "2px 8px", borderRadius: 100, fontWeight: 700 }}>✓</span>}
                      </div>
                      <p style={{ fontSize: ".78rem", color: "#444", lineHeight: 1.55, paddingLeft: 42 }}>{s.d}</p>
                    </div>
                  ); })}
                </div>
                {errs.svc && <p style={{ fontSize: ".78rem", color: "#f43f5e", marginTop: 8 }}>{errs.svc}</p>}
              </div>
              <div className="rv" style={{ display: "flex", flexDirection: "column", gap: 14, transitionDelay: ".12s" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[["Name", "name", "text", "Your name"], ["Email", "email", "email", "you@example.com"]].map(([lb, k, tp, ph]) => (
                    <div key={k}>
                      <label style={{ fontSize: ".72rem", color: "#444", letterSpacing: ".1em", display: "block", marginBottom: 8, textTransform: "uppercase" }}>{lb}</label>
                      <input className={`fi${errs[k] ? " err" : ""}`} type={tp} placeholder={ph} style={{ background: "#111", border: "1.5px solid #222", color: "#fff" }} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} onFocus={e => e.target.style.borderColor = "#ff3500"} onBlur={e => e.target.style.borderColor = errs[k] ? "#f43f5e" : "#222"} />
                      {errs[k] && <p style={{ fontSize: ".74rem", color: "#f43f5e", marginTop: 4 }}>{errs[k]}</p>}
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: ".72rem", color: "#444", letterSpacing: ".1em", display: "block", marginBottom: 8, textTransform: "uppercase" }}>Message</label>
                  <textarea className={`fi${errs.msg ? " err" : ""}`} placeholder="Tell me about your project..." style={{ background: "#111", border: "1.5px solid #222", color: "#fff" }} value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} onFocus={e => e.target.style.borderColor = "#ff3500"} onBlur={e => e.target.style.borderColor = errs.msg ? "#f43f5e" : "#222"} />
                  {errs.msg && <p style={{ fontSize: ".74rem", color: "#f43f5e", marginTop: 4 }}>{errs.msg}</p>}
                </div>
                <button className="sbtn" onClick={submit} disabled={loading}><span>{loading ? "Sending…" : "Send Message →"}</span></button>
              </div>
            </>
          ) : (
            <div style={{ background: "#111", borderRadius: 22, padding: "58px 40px", textAlign: "center", position: "relative", overflow: "hidden", animation: "popIn .5s ease both" }}>
              <Confetti />
              <div style={{ fontSize: 50, marginBottom: 16, position: "relative", zIndex: 1 }}>🎉</div>
              <h3 style={{ fontSize: "1.9rem", fontWeight: 900, marginBottom: 10, color: "#fff", position: "relative", zIndex: 1 }}>Message sent!</h3>
              <p style={{ color: "#555", lineHeight: 1.8, position: "relative", zIndex: 1 }}>I'll get back to you at <span style={{ color: "#ff3500" }}>mohameddlabibb@gmail.com</span></p>
              <button onClick={() => { setDone(false); setForm({ name: "", email: "", msg: "" }); setSelSvc([]); setErrs({}); }} style={{ marginTop: 22, padding: "10px 24px", background: "transparent", border: "1.5px solid #1e1e1e", borderRadius: 8, cursor: "pointer", fontSize: ".84rem", color: "#444", fontFamily: "inherit", transition: "all .25s", position: "relative", zIndex: 1 }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.color = "#444"; }}>Send another →</button>
            </div>
          )}
        </div>
      </section>

      <footer style={{ padding: "26px 56px", borderTop: "1px solid #111", background: "#0a0a0a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "monospace", fontSize: ".7rem", color: "#2a2a2a" }}>© 2026 — Mohamed Labib</span>
        <a href="mailto:mohameddlabibb@gmail.com" style={{ fontFamily: "monospace", fontSize: ".7rem", color: "#333", textDecoration: "none", transition: "color .25s" }} onMouseEnter={e => e.currentTarget.style.color = "#ff3500"} onMouseLeave={e => e.currentTarget.style.color = "#333"}>mohameddlabibb@gmail.com</a>
        <span style={{ fontFamily: "monospace", fontSize: ".7rem", color: "#2a2a2a" }}>Built with React + <span style={{ color: "#ff3500" }}>♥</span></span>
      </footer>
    </>
  );
}