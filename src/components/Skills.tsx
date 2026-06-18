import type { ComponentType } from "react";
import { skills, systemDesign } from "../data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Tip } from "./Tip";
import { ServerIcon, CloudIcon, DatabaseIcon, LayersIcon } from "./icons";

type IconProps = { className?: string };
const groupIcons: Record<string, ComponentType<IconProps>> = {
  "Backend & APIs": ServerIcon,
  "Cloud & DevOps": CloudIcon,
  Databases: DatabaseIcon,
  Frontend: LayersIcon,
};

const TIPS: Record<string, string> = {
  "CI/CD": "Continuous Integration & Delivery",
  "REST APIs": "Representational State Transfer APIs",
  ".NET (C#)": "Microsoft .NET with C#",
  "Multi-tenant / RBAC": "Role-Based Access Control across tenants",
  "Caching (Redis)": "In-memory caching with Redis",
  "Message Queues (RabbitMQ)": "Async messaging with RabbitMQ",
  "Event-Driven Architecture": "Services communicating via events",
};

function Chip({ label }: { label: string }) {
  const tip = TIPS[label];
  const chip = (
    <span className="rounded-full border border-app bg-soft px-3 py-1.5 text-sm text-soft transition-colors hover:border-accent hover:text-accent">
      {label}
    </span>
  );
  return tip ? <Tip label={tip}>{chip}</Tip> : chip;
}

export function Skills() {
  return (
    <section id="skills" className="bg-soft py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeading index="03" title="Skills & Tools" subtitle="The stack I build and ship with — no filler." />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-app bg-surface p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent">Core focus</span>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] md:text-4xl">
                {systemDesign.title}
              </h3>
              <p className="mt-4 max-w-md text-soft">{systemDesign.body}</p>
              <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
                {systemDesign.tags.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </div>
            </div>
          </Reveal>

          {skills.map((group, i) => {
            const Icon = groupIcons[group.title] ?? ServerIcon;
            return (
              <Reveal
                key={group.title}
                delay={(i % 2) * 0.08}
                className="group rounded-3xl border border-app bg-surface p-6 transition-colors hover:border-accent"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-app text-accent transition-colors group-hover:border-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Chip label={item} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
