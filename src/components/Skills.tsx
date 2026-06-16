import { skills, systemDesign } from "../data/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="flex min-h-screen flex-col justify-center bg-soft py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeading index="03" title="Skills & Tools" subtitle="A focused stack — the tools I actually build and ship with." />

        <Reveal className="mb-5 overflow-hidden rounded-2xl border border-app bg-surface">
          <div className="grid gap-8 p-8 md:grid-cols-[1fr_1.1fr] md:p-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">Core focus</span>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                {systemDesign.title}
              </h3>
              <p className="mt-4 max-w-md text-soft">{systemDesign.body}</p>
            </div>
            <div className="flex flex-wrap content-center gap-2.5">
              {systemDesign.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-app bg-soft px-3.5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <Reveal
              key={group.title}
              delay={(i % 4) * 0.08}
              className="group rounded-2xl border border-app bg-surface p-6 transition-colors hover:border-accent"
            >
              <h3 className="text-sm font-mono uppercase tracking-widest text-accent">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-app px-3 py-1.5 text-sm text-soft transition-colors group-hover:text-[var(--text)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
