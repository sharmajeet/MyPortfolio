import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../lib/gsap";
import { navLinks, profile } from "../data";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeButton } from "./ResumeButton";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-accent-400"
      />
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-out ${scrolled ? "px-4 pt-3 md:pt-4" : "px-0 pt-0"}`}
      >
        <nav
          className={`mx-auto flex items-center justify-between gap-4 border-app backdrop-blur-xl transition-[max-width,border-radius,padding,box-shadow,background-color] duration-500 ease-out ${
            scrolled
              ? "max-w-4xl rounded-full border bg-surface/70 py-2.5 pl-6 pr-2.5 shadow-xl shadow-black/5"
              : "max-w-full rounded-none border-b bg-surface/80 px-6 py-4 md:px-10"
          }`}
        >
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
