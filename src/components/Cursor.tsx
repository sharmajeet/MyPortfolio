import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { prefersReducedMotion } from "../lib/gsap";

const interactiveSelector = "a, button, [role='link'], input, textarea, select, label";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest(interactiveSelector));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x, y }}
        animate={{ scale: hovering ? 0 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent"
      />
    </>
  );
}
