import { useState } from "react";

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = (id: string) => { go(id); setOpen(false); };

  return (
    <>
      <nav>
        <button
          className="nl"
          onClick={() => go("hero")}
          style={{ color: "#0a0a0a", fontWeight: 800, fontSize: ".95rem", letterSpacing: ".06em" }}
        >
          LABIB<span style={{ color: "#ff3500" }}>.</span>
        </button>

        <div className="nav-links">
          {["About", "Skills", "Projects", "Contact"].map(s => (
            <button key={s} className="nl" onClick={() => go(s.toLowerCase())}>{s}</button>
          ))}
        </div>

        <a
          href="https://github.com/mohameddlabibb"
          target="_blank"
          rel="noopener"
          className="nl gh-link"
          style={{ textDecoration: "none" }}
        >
          GitHub ↗
        </a>

        <button className="ham" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span style={{ transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </nav>

      <div className={`mob-menu${open ? " open" : ""}`}>
        {["About", "Skills", "Projects", "Contact"].map(s => (
          <button key={s} className="nl" onClick={() => nav(s.toLowerCase())}>{s}</button>
        ))}
        <a
          href="https://github.com/mohameddlabibb"
          target="_blank"
          rel="noopener"
          className="nl"
          style={{ textDecoration: "none", marginTop: 4 }}
        >
          GitHub ↗
        </a>
      </div>
    </>
  );
}
