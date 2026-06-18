import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

const defaultItems = [
  "Node.js",
  ".NET",
  "AWS",
  "Azure",
  "Docker",
  "PostgreSQL",
  "Redis",
  "RabbitMQ",
  "Microservices",
  "REST APIs",
  "System Design",
  "CI/CD",
];

export function Marquee({ items = defaultItems }: { items?: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = root.current!.querySelector(".marquee-track") as HTMLElement;
      const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });

      gsap.to(track, {
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const dir = self.direction === 1 ? 1 : -1;
            gsap.to(loop, { timeScale: dir * (1 + Math.abs(self.getVelocity()) / 2500), duration: 0.3, overwrite: true });
          },
        },
      });

      const el = root.current!;
      const pause = () => loop.pause();
      const play = () => loop.play();
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", play);
      return () => {
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", play);
      };
    },
    { scope: root },
  );

  const group = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="font-display text-3xl font-semibold tracking-tight text-soft md:text-5xl">{item}</span>
          <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className="overflow-hidden border-y border-app bg-soft py-7 md:py-9">
      <div className="marquee-track flex w-max flex-nowrap will-change-transform">
        {group}
        {group}
      </div>
    </div>
  );
}
