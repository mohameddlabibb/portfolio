import { useState } from "react";

export default function NameHeading() {
  const [hov, setHov] = useState(false);
  return (
    <h1
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: "clamp(40px,6.5vw,88px)",
        fontWeight: 900,
        letterSpacing: "-.03em",
        lineHeight: .92,
        marginBottom: 16,
        cursor: "default",
        display: "inline-block",
        transition: "all 0.4s ease",
        ...(hov
          ? { background: "linear-gradient(135deg,#4c1d95,#7c3aed,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
          : { color: "#0a0a0a", background: "none", WebkitTextFillColor: "#0a0a0a" }
        ),
      }}
    >
      Mohamed Labib
    </h1>
  );
}
