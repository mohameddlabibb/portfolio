interface BandProps {
  variant: "dark" | "acc" | "lime";
  items: string[];
  /** repeats so the -50% loop stays seamless; even & wide enough to fill */
  reps?: number;
  borderTopNone?: boolean;
}

export default function Band({ variant, items, reps = 2, borderTopNone }: BandProps) {
  const run = Array.from({ length: reps }).flatMap(() => items);
  return (
    <div className={`band ${variant}`} style={borderTopNone ? { borderTop: "none" } : undefined}>
      <div className="run anton" data-marquee>
        {run.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </div>
    </div>
  );
}
