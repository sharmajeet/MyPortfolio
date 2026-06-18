import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { prefersReducedMotion } from "../lib/gsap";

const lines = [
  { prompt: "$", cmd: "whoami", out: "jeet-sharma · backend developer" },
  { prompt: "$", cmd: "cat stack.txt", out: "Node.js · .NET · SQL · Redis" },
  { prompt: "$", cmd: "git log --oneline -1", out: "feat: ship boardroom esp module" },
  { prompt: "$", cmd: "deploy --cloud aws,azure", out: "✓ docker build  ✓ shipped to prod" },
];

const pills = [
  { label: "Node.js", x: "-7%", y: "8%", delay: 0 },
  { label: "AWS", x: "93%", y: "16%", delay: 0.4 },
  { label: "Azure", x: "-5%", y: "82%", delay: 0.8 },
  { label: "Docker", x: "90%", y: "88%", delay: 1.2 },
];

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = prefersReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });

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
      className="relative hidden h-[40rem] w-full items-center justify-center lg:flex"
      style={{ perspective: 1100 }}
    >
      <motion.div
        className="absolute h-96 w-96 rounded-full bg-brand-400/25 blur-[110px]"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="relative w-full max-w-[34rem] rounded-2xl border border-app bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 border-b border-app px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-brand-400/90" />
          <span className="ml-3 font-mono text-xs text-soft">jeet@portfolio: ~</span>
        </div>

        <motion.div
          className="space-y-5 p-6 font-mono text-[0.95rem]"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.3, delayChildren: 0.8 } } }}
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

      <motion.div
        className="absolute right-[-3%] top-[2%] flex items-center gap-2 rounded-xl border border-app bg-surface/90 px-3.5 py-2 shadow-lg backdrop-blur"
        initial={{ opacity: 0, scale: 0.6, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="font-mono text-xs">Available for work</span>
      </motion.div>

      {pills.map((pill) => (
        <motion.span
          key={pill.label}
          className="absolute rounded-full border border-app bg-surface/90 px-3 py-1.5 font-mono text-xs shadow-lg backdrop-blur"
          style={{ left: pill.x, top: pill.y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
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
