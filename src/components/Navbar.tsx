import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../lib/gsap";
import { navLinks, profile } from "../data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeButton } from "./ResumeButton";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(navRef.current, { y: -90, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    },
    { scope: navRef },
  );

  return (
    <>
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-accent-400"
      />
      <header ref={navRef} className="fixed inset-x-0 top-3 z-50 px-4 md:top-5">
        <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full border border-app bg-surface/60 py-2.5 pl-6 pr-2.5 shadow-xl shadow-black/5 backdrop-blur-xl">
          <Link to="/" className="font-display text-xl font-bold tracking-tight md:text-2xl">
            {profile.name.split(" ")[0]}
            <span className="text-accent">.</span>
            dev
          </Link>
          <ul className="hidden items-center gap-7 text-sm text-soft md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={`/${link.href}`} className="transition-colors hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ResumeButton className="hidden sm:inline-flex" />
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
