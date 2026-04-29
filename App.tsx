import { useEffect } from "react";
import G from "./src/styles/globals";
import Navbar   from "./src/components/Navbar";
import Hero     from "./src/sections/Hero";
import Marquee  from "./src/sections/Marquee";
import About    from "./src/sections/About";
import Skills   from "./src/sections/Skills";
import Projects from "./src/sections/Projects";
import Contact  from "./src/sections/Contact";
import Footer   from "./src/sections/Footer";

export default function Portfolio() {
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: .1 }
    );
    document.querySelectorAll(".rv").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{G}</style>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
