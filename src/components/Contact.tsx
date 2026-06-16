import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { profile } from "../data/portfolio";
import { MagneticButton } from "./MagneticButton";
import { GithubIcon, LinkedinIcon, ArrowIcon } from "./icons";

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".contact-word", {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
      <p className="font-mono text-sm text-accent">06 · Contact</p>
      <div className="mt-6 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            <span className="block overflow-hidden">
              <span className="contact-word block">Let's build</span>
            </span>
            <span className="block overflow-hidden">
              <span className="contact-word block gradient-text">something great.</span>
            </span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-soft">
            Open to backend, system-design, and cloud roles across India — and interesting
            collaborations. The fastest way to reach me is email.
          </p>
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="btn-primary mt-8 gap-2 px-7 py-3.5 font-medium"
          >
            {profile.email} <ArrowIcon className="h-4 w-4" />
          </MagneticButton>
        </div>

        <div className="rounded-3xl border border-app bg-surface p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Get in touch</p>
          <div className="mt-6 space-y-5">
            <InfoRow label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <InfoRow label="Location" value={profile.location} />
            <InfoRow label="Availability" value="Across India · Open to roles" />
          </div>
          <div className="mt-8 flex gap-3 border-t border-app pt-6">
            <MagneticButton
              href={profile.linkedin}
              target="_blank"
              className="flex-1 gap-2 border border-app px-4 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon className="h-5 w-5" /> LinkedIn
            </MagneticButton>
            <MagneticButton
              href={profile.github}
              target="_blank"
              className="flex-1 gap-2 border border-app px-4 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon className="h-5 w-5" /> GitHub
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-app pb-4">
      <span className="font-mono text-xs uppercase tracking-widest text-soft">{label}</span>
      {href ? (
        <a href={href} className="text-right transition-colors hover:text-accent">
          {value}
        </a>
      ) : (
        <span className="text-right">{value}</span>
      )}
    </div>
  );
}
