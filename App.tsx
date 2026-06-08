import G from "./src/styles/globals";
import { useV11 } from "./src/hooks/useV11";
import { MARQUEES } from "./src/data/constants";
import Navbar from "./src/components/Navbar";
import Hero from "./src/sections/Hero";
import Band from "./src/sections/Marquee";
import About from "./src/sections/About";
import Skills from "./src/sections/Skills";
import Work from "./src/sections/Projects";
import Contact from "./src/sections/Contact";

export default function Portfolio() {
  useV11();

  return (
    <>
      <style>{G}</style>

      <div className="cursor" id="cursor" />

      <div className="pre" id="pre">
        <div className="cnt anton" id="cnt">0</div>
        <div className="lbl">Loading<br />Mohamed Labib '26</div>
      </div>

      <Navbar />

      <div className="app">
        <Hero />
        <Band variant="dark" items={MARQUEES.tech} reps={2} />
        <About />
        <Band variant="acc" items={MARQUEES.available} reps={4} />
        <Skills />
        <Band variant="lime" items={MARQUEES.work} reps={4} />
        <Work />
        <Contact />
      </div>
    </>
  );
}
