import { useRef, type ElementType } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
};

export function RevealText({ text, as: Tag = "h2", className, delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current.querySelectorAll(".rt-inner"), {
        yPercent: 115,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.07,
        delay,
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" style={{ marginRight: "0.24em" }}>
          <span className="rt-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
