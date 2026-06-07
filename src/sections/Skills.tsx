import { SKILL_CATS } from "../data/constants";

export default function Skills() {
  return (
    <section id="skills" className="pad">
      <p className="eb rv">// Stack &amp; Tooling</p>
      <h2 className="big rl"><span>Toolbox.</span></h2>
      {SKILL_CATS.map((c) => (
        <div className="scat" key={c.n}>
          <div className="n" style={c.color ? { color: c.color } : undefined}>{c.n}</div>
          <div>
            <div className="nm">{c.cat}</div>
            <div className="chips">
              {c.items.map((it) => (
                <span className="chip" key={it}>{it}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
