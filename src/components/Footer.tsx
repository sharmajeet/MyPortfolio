import { motion } from "motion/react";
import { profile } from "../data";

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-app pt-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-sm text-soft">
            Backend engineer who builds for scale. Let's build something.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-sm text-accent transition-opacity hover:opacity-70"
          >
            {profile.email}
          </a>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 select-none whitespace-nowrap font-display text-[clamp(3.5rem,17vw,16rem)] font-bold leading-[0.8] tracking-[-0.04em]"
        >
          <span className="gradient-text">Jeet</span>{" "}
          <span>Sharma</span>
        </motion.h2>
      </div>

      <div className="mt-8 border-t border-app">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-7 text-sm text-soft">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
