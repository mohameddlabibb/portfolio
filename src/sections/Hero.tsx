export default function Hero() {
  return (
    <header className="hero" id="top">
      <canvas className="scene" id="scene" />
      <div className="pad">
        <div className="line anton"><span className="inner">Full-Stack</span></div>
        <div className="line anton o"><span className="inner">Developer</span></div>
        <div className="line anton fill"><span className="inner">Mohamed Labib</span></div>
      </div>
      <div className="meta" id="heroMeta">
        <p className="role">
          Full-Stack Developer specializing in creative frontends | React,
          Three.js/R3F, GSAP | AI integrations | Web + Flutter
        </p>
        <span className="avail">Cairo</span>
      </div>
    </header>
  );
}
