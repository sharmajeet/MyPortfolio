import { projects, profile } from "../data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { ProjectCarousel } from "./ProjectCarousel";
import { Reveal } from "./Reveal";
import { GithubIcon, ArrowIcon } from "./icons";

export function Projects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
      <SectionHeading index="01" title="Selected Projects" subtitle="Systems I've designed and shipped, end to end. Drag, swipe, or use the arrows." />

      <Reveal>
        <ProjectCarousel projects={featured} />
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
