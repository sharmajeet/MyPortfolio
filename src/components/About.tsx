import { profile } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
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
            <p className="mt-2">Clean, maintainable code — shipped on schedule.</p>
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
