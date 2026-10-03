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
          Full-Stack Developer | I build fast, interactive web experiences for
          brands | React · TypeScript · Node · WebGL
        </p>
        <span className="avail">Cairo</span>
      </div>
    </header>
  );
}
