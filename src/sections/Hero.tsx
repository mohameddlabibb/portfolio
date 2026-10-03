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
          Full-Stack Dev building immersive, AI-powered web &amp; mobile experiences
          for businesses — plus AI fashion photography for Egyptian streetwear brands.
        </p>
        <span className="avail">Cairo</span>
      </div>
    </header>
  );
}
