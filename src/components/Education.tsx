import { education, achievements } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="flex min-h-screen flex-col justify-center bg-soft py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeading index="05" title="Education & Credentials" />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            {education.map((item, i) => (
              <Reveal
                key={item.degree}
                delay={i * 0.1}
                className="rounded-2xl border border-app bg-surface p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{item.degree}</h3>
                  <span className="font-mono text-sm text-accent">{item.score}</span>
                </div>
                <p className="mt-1 text-soft">{item.school}</p>
                <p className="mt-1 font-mono text-sm text-soft">{item.period}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="rounded-2xl border border-app bg-surface p-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-accent">
              Achievements & Certifications
            </h3>
            <ul className="mt-6 space-y-4">
              {achievements.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-accent">★</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
