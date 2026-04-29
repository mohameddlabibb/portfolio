import { SKILL_CATS } from "../data/constants";
import SkillCard from "../components/SkillCard";

export default function Skills() {
  return (
    <section id="skills" style={{ background: "#0d0d0d", overflow: "hidden", position: "relative", padding: "100px 56px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>

        <div className="rv" style={{ marginBottom: 56 }}>
          <p style={{ fontSize: ".68rem", letterSpacing: ".22em", color: "#ff3500", fontFamily: "monospace", marginBottom: 10 }}>Skills</p>
          <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-.02em", color: "#fff" }}>What I Work With</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {SKILL_CATS.map((cat, ci) => <SkillCard key={cat.cat} cat={cat} ci={ci} />)}
        </div>

      </div>

      {/* ambient glow blobs */}
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,53,0,.05)",    top: "-10%", left: "60%",  filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "rgba(124,58,237,.05)", bottom: "0",  left: "10%",  filter: "blur(80px)", pointerEvents: "none" }} />
    </section>
  );
}
