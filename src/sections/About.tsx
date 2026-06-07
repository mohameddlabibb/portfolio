import { STATS, SERVICES } from "../data/constants";

export default function About() {
  return (
    <section id="about" className="pad">
      <p className="eb rv">// About</p>
      <h2 className="big rl"><span>I build things.</span></h2>
      <div className="about-row">
        <p className="rv">
          Frontend developer &amp; BIS student at AASTMT Cairo.{" "}
          <span className="h">React / TypeScript specialist</span> from pixel-perfect UIs to
          REST APIs — plus <span className="h2">AI-driven fashion photography</span> for
          Egyptian streetwear brands.
        </p>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              {s.count !== undefined ? (
                <div className="v" data-count={s.count} data-suffix={s.suffix || ""}>0</div>
              ) : (
                <div className="v" style={{ fontSize: "1.5rem" }}>{s.v}</div>
              )}
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="svcs">
        {SERVICES.map((s) => (
          <div className="svc rv" key={s.n}>
            <div className="n">{s.n}</div>
            <h3>{s.t}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
