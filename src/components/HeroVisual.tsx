import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { prefersReducedMotion } from "../lib/gsap";

const lines = [
  { prompt: "$", cmd: "whoami", out: "jeet-sharma · backend developer" },
  { prompt: "$", cmd: "cat stack.txt", out: "Node.js · .NET · SQL · Redis" },
  { prompt: "$", cmd: "deploy --cloud aws,azure", out: "✓ docker build  ✓ shipped to prod" },
];

const pills = [
  { label: "Node.js", x: "-8%", y: "12%", delay: 0 },
  { label: "AWS", x: "92%", y: "22%", delay: 0.4 },
  { label: "Azure", x: "-6%", y: "74%", delay: 0.8 },
  { label: "Docker", x: "88%", y: "82%", delay: 1.2 },
];

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = prefersReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative hidden h-[34rem] w-full items-center justify-center lg:flex"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute h-72 w-72 rounded-full bg-brand-400/25 blur-[90px]"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="relative w-[26rem] max-w-full rounded-2xl border border-app bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 border-b border-app px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-brand-400/90" />
          <span className="ml-3 font-mono text-xs text-soft">jeet@portfolio: ~</span>
        </div>

        <motion.div
          className="space-y-4 p-5 font-mono text-sm"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.35, delayChildren: 0.8 } } }}
        >
          {lines.map((line) => (
            <motion.div
              key={line.cmd}
              variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex gap-2">
                <span className="text-accent">{line.prompt}</span>
                <span className="text-[var(--text)]">{line.cmd}</span>
              </div>
              <div className="mt-1 pl-4 text-soft">{line.out}</div>
            </motion.div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-accent">$</span>
            <span className="type-caret h-[1.1em]" />
          </div>
        </motion.div>
      </motion.div>

      {pills.map((pill) => (
        <motion.span
          key={pill.label}
          className="absolute rounded-full border border-app bg-surface/90 px-3 py-1.5 font-mono text-xs shadow-lg backdrop-blur"
          style={{ left: pill.x, top: pill.y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            reduce
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1, y: [0, -10, 0] }
          }
          transition={{
            opacity: { delay: 1.2 + pill.delay, duration: 0.4 },
            scale: { delay: 1.2 + pill.delay, duration: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: pill.delay },
          }}
        >
          {pill.label}
        </motion.span>
      ))}
    </div>
  );
}
