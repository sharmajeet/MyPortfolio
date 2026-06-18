import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match && match[1].includes(".") ? 1 : 0;
  const suffix = match ? match[2] : "";

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const obj = { n: 0 };
      gsap.to(obj, {
        n: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = obj.n.toFixed(decimals) + suffix;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {prefersReducedMotion() ? value : `0${suffix}`}
    </span>
  );
}
