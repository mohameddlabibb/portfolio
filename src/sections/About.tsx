import { STATS, SERVICES } from "../data/constants";

export default function About() {
  return (
    <section id="about" className="pad">
      <h2 className="big rl"><span>I build things.</span></h2>
      <div className="about-row">
        <p className="rv">
          Full-Stack developer &amp; BIS student at AASTMT Cairo.{" "}
          I build clean, fast interfaces and the systems behind them —
          plus AI-driven fashion photography for
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
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
