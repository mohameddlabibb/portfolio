import { PROJECTS } from "../data/constants";

export default function Work() {
  return (
    <section className="work-pin" id="work">
      <div className="htrack" id="htrack">
        {PROJECTS.map((p) => (
          <article className="pcard" key={p.n}>
            <div className="media">
              <div
                className="img"
                data-img
                style={{ backgroundImage: p.img ? `url('${p.img}'),${p.gradient}` : p.gradient }}
              />
              <div className="pn anton">{p.n}</div>
            </div>
            <div className="body">
              <p className="k">{p.kicker}</p>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="row">
                <span className="tags">{p.tags}</span>
                <span className="links">
                  {p.live && <a className="gh" href={p.live} target="_blank" rel="noopener">Live ↗</a>}
                  <a className="gh" href={p.github} target="_blank" rel="noopener">GitHub ↗</a>
                </span>
              </div>
            </div>
          </article>
        ))}
        <article
          className="pcard"
          style={{ flexBasis: "min(60vw,440px)", display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "dashed" }}
        >
          <p className="anton" style={{ fontSize: "clamp(28px,4vw,52px)", color: "var(--mut)", textAlign: "center", lineHeight: 0.9 }}>
            More<br />coming<br />soon
          </p>
        </article>
      </div>
    </section>
  );
}
