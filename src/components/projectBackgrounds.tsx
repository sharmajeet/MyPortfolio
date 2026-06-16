import { motion } from "motion/react";
import { prefersReducedMotion } from "../lib/gsap";

type BgProps = { active: boolean };

const candles = [
  { x: 24, o: 185, c: 170 },
  { x: 56, o: 170, c: 178 },
  { x: 88, o: 178, c: 150 },
  { x: 120, o: 150, c: 160 },
  { x: 152, o: 160, c: 128 },
  { x: 184, o: 128, c: 138 },
  { x: 216, o: 138, c: 108 },
  { x: 248, o: 108, c: 120 },
  { x: 280, o: 120, c: 90 },
  { x: 312, o: 90, c: 100 },
  { x: 344, o: 100, c: 66 },
  { x: 376, o: 66, c: 52 },
];

export function StockChartBg({ active }: BgProps) {
  const reduce = prefersReducedMotion();
  const line = candles.map((c) => `${c.x},${c.c}`).join(" ");
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      <defs>
        <linearGradient id="stockGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 90, 140, 190].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeOpacity="0.06" />
      ))}
      {candles.map((c, i) => {
        const up = c.c <= c.o;
        const top = Math.min(c.o, c.c);
        const h = Math.max(4, Math.abs(c.o - c.c));
        const color = up ? "#34d399" : "#fb7185";
        return (
          <motion.g
            key={c.x}
            initial={{ opacity: 0, y: 14 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.4 }}
          >
            <line x1={c.x} y1={top - 12} x2={c.x} y2={top + h + 12} stroke={color} strokeWidth="1.5" strokeOpacity="0.7" />
            <motion.rect
              x={c.x - 6}
              y={top}
              width="12"
              height={h}
              rx="1.5"
              fill={color}
              style={{ transformOrigin: `${c.x}px ${top + h / 2}px` }}
              animate={reduce || !active ? undefined : { scaleY: [1, 1.12, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
            />
          </motion.g>
        );
      })}
      <motion.polyline
        points={line}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      <motion.circle
        cx={candles[candles.length - 1].x}
        cy={candles[candles.length - 1].c}
        r="5"
        fill="#22d3ee"
        animate={reduce || !active ? undefined : { r: [4, 7, 4], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
    </svg>
  );
}

const aiNodes = [
  { x: 50, y: 60 }, { x: 50, y: 120 }, { x: 50, y: 180 },
  { x: 200, y: 50 }, { x: 200, y: 120 }, { x: 200, y: 190 },
  { x: 350, y: 90 }, { x: 350, y: 160 },
];
const aiEdges = [
  [0, 3], [0, 4], [1, 4], [1, 5], [2, 4], [2, 5],
  [3, 6], [4, 6], [4, 7], [5, 7],
];

export function AIWorkflowBg({ active }: BgProps) {
  const reduce = prefersReducedMotion();
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {aiEdges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={aiNodes[a].x}
          y1={aiNodes[a].y}
          x2={aiNodes[b].x}
          y2={aiNodes[b].y}
          stroke="#22d3ee"
          strokeWidth="1.4"
          strokeDasharray="5 7"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.55, strokeDashoffset: reduce ? 0 : [0, -24] } : { opacity: 0 }}
          transition={{
            opacity: { delay: 0.03 * i, duration: 0.4 },
            strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" },
          }}
        />
      ))}
      {aiNodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="7"
          fill={i % 2 ? "#a78bfa" : "#22d3ee"}
          initial={{ scale: 0 }}
          animate={
            active
              ? { scale: 1, opacity: reduce ? 0.9 : [0.6, 1, 0.6] }
              : { scale: 0 }
          }
          transition={{
            scale: { delay: 0.05 * i, type: "spring", stiffness: 300, damping: 16 },
            opacity: { duration: 2.2, repeat: Infinity, delay: i * 0.2 },
          }}
        />
      ))}
    </svg>
  );
}

const netNodes = [
  { x: 60, y: 70 }, { x: 140, y: 40 }, { x: 220, y: 80 }, { x: 320, y: 50 },
  { x: 90, y: 160 }, { x: 180, y: 190 }, { x: 280, y: 150 }, { x: 350, y: 200 },
  { x: 200, y: 120 },
];
const netEdges = [
  [8, 0], [8, 1], [8, 2], [8, 4], [8, 5], [8, 6], [2, 3], [6, 7], [1, 2], [4, 5],
];

export function NetworkBg({ active }: BgProps) {
  const reduce = prefersReducedMotion();
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
      {netEdges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={netNodes[a].x}
          y1={netNodes[a].y}
          x2={netNodes[b].x}
          y2={netNodes[b].y}
          stroke="#22d3ee"
          strokeWidth="1.3"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={active ? { opacity: 0.5, pathLength: 1 } : { opacity: 0 }}
          transition={{ delay: 0.04 * i, duration: 0.7 }}
        />
      ))}
      {netNodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 8 ? 11 : 6}
          fill="#22d3ee"
          initial={{ scale: 0 }}
          animate={active ? { scale: 1, y: reduce ? 0 : [0, i % 2 ? 6 : -6, 0] } : { scale: 0 }}
          transition={{
            scale: { delay: 0.05 * i, type: "spring", stiffness: 300, damping: 15 },
            y: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </svg>
  );
}

const orbs = [
  { x: "18%", y: "30%", s: 90, c: "#fbbf24" },
  { x: "70%", y: "22%", s: 130, c: "#f59e0b" },
  { x: "55%", y: "70%", s: 110, c: "#fcd34d" },
  { x: "30%", y: "75%", s: 70, c: "#fbbf24" },
];

export function LearningBg({ active }: BgProps) {
  const reduce = prefersReducedMotion();
  return (
    <div className="relative h-full w-full">
      {orbs.map((o, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{ left: o.x, top: o.y, width: o.s, height: o.s, background: o.c, opacity: 0.4 }}
          initial={{ scale: 0 }}
          animate={active ? { scale: 1, y: reduce ? 0 : [0, -18, 0] } : { scale: 0 }}
          transition={{
            scale: { delay: 0.08 * i, duration: 0.5 },
            y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}

export function projectBackground(slug: string, active: boolean) {
  switch (slug) {
    case "boardroom":
      return <StockChartBg active={active} />;
    case "promptsdk":
      return <AIWorkflowBg active={active} />;
    case "social-media-backend":
      return <NetworkBg active={active} />;
    case "studynotion":
      return <LearningBg active={active} />;
    default:
      return <NetworkBg active={active} />;
  }
}
