import { cn } from "@/lib/utils";

/** Charpente en treillis stylisée — reprend le motif du toit du logo NTK. */
export function TrussLine({ className, animated = true }: { className?: string; animated?: boolean }) {
  const top = (x: number) => 60 - (60 - 8) * (1 - Math.abs(x - 300) / 300);
  const xs = Array.from({ length: 11 }, (_, i) => 30 + i * 54);
  return (
    <svg viewBox="0 0 600 80" fill="none" aria-hidden className={cn(animated && "truss-draw", className)}>
      <path d="M0 62 L300 8 L600 62" pathLength={1} stroke="currentColor" strokeWidth="2" />
      <path d="M40 70 L560 70" pathLength={1} stroke="currentColor" strokeWidth="1.5" />
      {xs.map((x, i) => (
        <line
          key={x}
          x1={x}
          y1={70}
          x2={i % 2 === 0 ? x + 27 : x - 27}
          y2={top(i % 2 === 0 ? x + 27 : x - 27) + 2}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
