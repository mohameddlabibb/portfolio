const COLORS = ["#ff3500", "#7c3aed", "#f43f5e", "#2563eb", "#00c853", "#ffd600"];

export default function Confetti() {
  const pts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    c: COLORS[i % 6],
    l: 10 + Math.random() * 80,
    dl: Math.random() * .5,
    dur: .7 + Math.random() * .8,
    sz: 6 + Math.random() * 9,
    sh: i % 3 === 0 ? "50%" : "3px",
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {pts.map(c => (
        <div
          key={c.id}
          style={{
            position: "absolute", bottom: "38%", left: `${c.l}%`,
            width: c.sz, height: c.sz, borderRadius: c.sh,
            background: c.c,
            animation: `cf ${c.dur}s ${c.dl}s ease-out both`,
          }}
        />
      ))}
    </div>
  );
}
