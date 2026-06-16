import { motion, useScroll, useTransform } from "motion/react";
import { prefersReducedMotion } from "../lib/gsap";

export function ScrollBackground() {
  const reduce = prefersReducedMotion();
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "60%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-50%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: reduce ? 0 : y1 }}
        animate={reduce ? undefined : { x: [0, 70, 0], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 left-[8%] h-[42rem] w-[42rem] rounded-full bg-brand-500/15 blur-[140px]"
      />
      <motion.div
        style={{ y: reduce ? 0 : y2 }}
        animate={reduce ? undefined : { x: [0, -60, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-[2%] h-[36rem] w-[36rem] rounded-full bg-accent-400/12 blur-[140px]"
      />
      <motion.div
        style={{ y: reduce ? 0 : y3 }}
        animate={reduce ? undefined : { x: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-brand-400/12 blur-[140px]"
      />
    </div>
  );
}
