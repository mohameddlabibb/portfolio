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
          Building production web apps end-to-end with React, TypeScript &amp; Node. BIS
          student @ AASTMT Cairo — graduating 2026.
        </p>
        <span className="avail"><span className="dot" /> Available · Cairo · Hire me</span>
      </div>
      <div className="scrollcue">Scroll ↓</div>
    </header>
  );
}
