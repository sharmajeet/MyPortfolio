import * as Accordion from "@radix-ui/react-accordion";
import { experience } from "../data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ExternalIcon, ChevronIcon } from "./icons";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading index="04" title="Experience" subtitle="Where I've shipped — tap a role to expand." />

      <Reveal>
        <Accordion.Root type="single" collapsible defaultValue={experience[0].company} className="space-y-4">
          {experience.map((job) => (
            <Accordion.Item
              key={job.company}
              value={job.company}
              className="overflow-hidden rounded-2xl border border-app bg-surface transition-colors data-[state=open]:border-accent/60"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-6 text-left md:p-8">
                  <div>
                    <span className="font-mono text-sm text-accent">{job.period}</span>
                    <h3 className="mt-1 text-xl font-semibold md:text-2xl">{job.role}</h3>
                    <p className="mt-0.5 text-soft">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-app text-soft transition-transform duration-300 group-data-[state=open]:rotate-90 group-data-[state=open]:text-accent">
                    <ChevronIcon className="h-5 w-5" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="accordion-content">
                <div className="px-6 pb-6 md:px-8 md:pb-8">
                  <div className="border-t border-app pt-6">
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-accent transition-opacity hover:opacity-70"
                      >
                        Visit {job.company}
                        <ExternalIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <ul className="mt-4 space-y-2.5">
                      {job.highlights.map((point) => (
                        <li key={point} className="flex gap-3 text-soft">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <li key={t} className="rounded-full bg-soft px-2.5 py-1 font-mono text-xs text-soft">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Reveal>
    </section>
  );
}
