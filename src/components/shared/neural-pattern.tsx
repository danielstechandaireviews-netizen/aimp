import { cn } from "@/lib/utils";

/**
 * Decorative neural-network line pattern. Pure SVG, no JS.
 * Nodes and edges are fixed so server and client render identically.
 * Deliberately static: animating SVG opacity forces a style recalculation
 * every frame, which hurts performance on mobile.
 */
const nodes = [
  [40, 60], [140, 30], [250, 80], [360, 40], [470, 90], [560, 50],
  [80, 170], [200, 150], [310, 190], [420, 160], [530, 200],
  [30, 280], [150, 260], [260, 300], [380, 270], [500, 310], [580, 260],
];

const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [1, 7], [2, 7], [2, 8], [3, 9], [4, 9], [4, 10], [5, 10],
  [6, 7], [7, 8], [8, 9], [9, 10], [6, 11], [6, 12], [7, 12], [8, 13], [9, 14], [10, 15], [10, 16],
  [11, 12], [12, 13], [13, 14], [14, 15], [15, 16],
];

export function NeuralPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 610 340"
      fill="none"
      className={cn("pointer-events-none select-none", className)}
    >
      <defs>
        <linearGradient id="np-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g stroke="url(#np-line)" strokeWidth="1">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g>
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 4 === 0 ? 4 : 2.5}
            fill={i % 3 === 0 ? "var(--brand)" : "var(--violet)"}
            opacity={0.8}
          />
        ))}
      </g>
    </svg>
  );
}
