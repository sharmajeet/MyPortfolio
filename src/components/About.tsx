import { profile } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
      <SectionHeading index="02" title="About" />
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="text-2xl font-light leading-relaxed md:text-3xl">
            {profile.summary}
          </p>
        </Reveal>
        <Reveal delay={0.15} className="space-y-6 self-end text-soft">
          <div>
            <p className="text-sm uppercase tracking-widest text-accent">Focus</p>
            <p className="mt-2">Backend & APIs · Cloud & DevOps · Distributed systems</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-accent">Approach</p>
            <p className="mt-2">Agile delivery, clean code, and continuous learning.</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-accent">Based in</p>
            <p className="mt-2">{profile.location}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
