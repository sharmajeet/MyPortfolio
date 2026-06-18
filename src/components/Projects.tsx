import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { projects, profile } from "../data";
import { SectionHeading } from "./SectionHeading";
import { ProjectCarousel } from "./ProjectCarousel";
import { Reveal } from "./Reveal";
import { GithubIcon, ArrowIcon } from "./icons";

const TABS = [
  { value: "all", label: "All" },
  { value: "Professional", label: "Professional" },
  { value: "Personal", label: "Personal" },
  { value: "Academic", label: "Academic" },
];

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const [tab, setTab] = useState("all");

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading index="01" title="Selected Projects" subtitle="A few systems I've shipped end to end — drag or use the arrows." />

      <Reveal>
        <Tabs.Root value={tab} onValueChange={setTab}>
          <Tabs.List className="inline-flex flex-wrap gap-1 rounded-full border border-app bg-surface p-1">
            {TABS.map((t) => (
              <Tabs.Trigger
                key={t.value}
                value={t.value}
                className="rounded-full px-4 py-2 text-sm font-medium text-soft transition-colors hover:text-accent data-[state=active]:text-[var(--on-accent)] data-[state=active]:[background:var(--accent-solid)]"
              >
                {t.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {TABS.map((t) => (
            <Tabs.Content key={t.value} value={t.value} className="mt-8 focus:outline-none">
              <ProjectCarousel projects={t.value === "all" ? featured : featured.filter((p) => p.kind === t.value)} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Reveal>

      <Reveal className="mt-10 flex justify-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-app px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          <GithubIcon className="h-5 w-5" />
          View all repositories on GitHub
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </Reveal>
    </section>
  );
}
