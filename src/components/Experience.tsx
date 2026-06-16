import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { experience } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { ExternalIcon } from "./icons";

export function Experience() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(".timeline-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 70%", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
      <SectionHeading index="04" title="Experience" />
      <div className="timeline relative pl-8 md:pl-12">
        <div className="absolute left-0 top-2 h-full w-px bg-app md:left-1.5">
          <div className="timeline-line absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-brand-500 to-accent-400" />
        </div>
        <div className="space-y-14">
          {experience.map((job) => (
            <div key={job.company} className="timeline-item relative grid gap-6 rounded-2xl border border-app bg-surface p-6 md:grid-cols-[280px_1fr] md:p-8">
              <span className="absolute -left-8 top-8 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-[var(--bg)] md:-left-[2.9rem]" />
              <div>
                <span className="font-mono text-sm text-accent">{job.period}</span>
                <h3 className="mt-2 text-2xl font-semibold">{job.role}</h3>
                <p className="mt-1 text-soft">
                  {job.url ? (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--text)] transition-colors hover:text-accent"
                    >
                      {job.company}
                      <ExternalIcon className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-[var(--text)]">{job.company}</span>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-soft">{job.location}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <li key={t} className="rounded-full bg-soft px-2.5 py-1 font-mono text-xs text-soft">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="space-y-2.5 md:border-l md:border-app md:pl-8">
                {job.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
