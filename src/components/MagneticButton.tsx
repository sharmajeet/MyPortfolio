import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  download?: boolean;
  target?: string;
};

export function MagneticButton({ children, href, onClick, className, download, target }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const el = ref.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * 0.4);
        yTo((e.clientY - (rect.top + rect.height / 2)) * 0.4);
      };
      const reset = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      };
    },
    { scope: ref },
  );

  const classes = `inline-flex items-center justify-center rounded-full will-change-transform ${className ?? ""}`;

  if (href) {
    return (
      <a ref={ref} href={href} download={download} target={target} rel={target ? "noreferrer" : undefined} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
