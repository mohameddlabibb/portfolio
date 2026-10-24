export default function Navbar() {
  return (
    <nav>
      <span className="b">LABIB.</span>
      <span className="l mono">
        <a href="#about" data-link>About</a>
        <a href="#skills" data-link>Skills</a>
        <a href="#work" data-link>Work</a>
        <a href="#contact" data-link>Contact</a>
        <a href="/Mohamed-Labib-CV.pdf" download="Mohamed Labib CV.pdf">My CV</a>
      </span>
    </nav>
  );
}
