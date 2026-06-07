import Band from "./Marquee";
import { MARQUEES, EMAIL } from "../data/constants";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <Band variant="acc" items={MARQUEES.talk} reps={4} borderTopNone />
      <div className="inner">
        <p className="eb" style={{ color: "var(--lime)" }}>// Contact</p>
        <h2 className="rl"><span>LET'S BUILD</span></h2>
        <h2><span className="fill">SOMETHING</span></h2>
        <a className="mbtn" id="magnet" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </div>
    </section>
  );
}
