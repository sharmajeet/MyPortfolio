import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { profile } from "../data/portfolio";
import { useTypewriter } from "../hooks/useTypewriter";
import { MagneticButton } from "./MagneticButton";
import { HeroVisual } from "./HeroVisual";
import { ArrowIcon } from "./icons";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const typed = useTypewriter(profile.roles);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-line span", { yPercent: 120, duration: 1, stagger: 0.12 })
        .from(".hero-role", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".hero-stat", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");

      gsap.to(".hero-orb", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10 grid-bg" />
      <div className="hero-orb pointer-events-none absolute -top-40 left-1/4 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-400/20 blur-[130px]" />
      <div className="hero-orb pointer-events-none absolute -bottom-20 right-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-accent-400/15 blur-[130px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h1 className="font-display text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.03em]">
            <span className="hero-line block overflow-hidden">
              <span className="block">Jeet</span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="block gradient-text">Sharma</span>
            </span>
          </h1>

          <div className="hero-role mt-7 flex items-center gap-3 font-mono text-xl md:text-2xl">
            <span className="text-accent">&gt;</span>
            <span aria-live="polite">{typed}</span>
            <span className="type-caret h-[1em]" aria-hidden="true" />
          </div>

          <p className="hero-sub mt-7 max-w-xl text-lg text-soft">
            I design and build scalable backend systems — distributed microservices, clean APIs,
            and cloud-native deployments with Node.js, .NET, AWS &amp; Azure.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#projects"
              className="hero-cta btn-primary gap-2 px-7 py-3.5 font-medium"
            >
              View my work <ArrowIcon className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="hero-cta border border-app px-7 py-3.5 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </MagneticButton>
          </div>

          <dl className="mt-14 flex flex-wrap gap-10">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <dt className="font-display text-3xl font-bold md:text-4xl">{stat.value}</dt>
                <dd className="mt-1 text-sm text-soft">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.3em] text-soft">
        Scroll
      </div>
    </section>
  );
}
