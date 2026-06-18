import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "../data";
import { projectBackground } from "./projectBackgrounds";
import { prefersReducedMotion } from "../lib/gsap";
import { ChevronIcon, GithubIcon, ExternalIcon, ArrowIcon } from "./icons";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 320 : -320, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -320 : 320, opacity: 0 }),
};

const kindColor: Record<Project["kind"], string> = {
  Professional: "text-accent-2",
  Personal: "text-accent",
  Academic: "text-accent-3",
};

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const navigate = useNavigate();
  const reduce = prefersReducedMotion();
  const [[page, dir], setPage] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const n = projects.length;
  const index = ((page % n) + n) % n;
  const project = projects[index];

  const paginate = (d: number) => setPage([page + d, d]);
  const goTo = (i: number) => setPage([i, i > index ? 1 : -1]);

  useEffect(() => {
    if (paused || reduce || n < 2) return;
    const id = window.setInterval(() => setPage(([p]) => [p + 1, 1]), 6000);
    return () => window.clearInterval(id);
  }, [paused, reduce, n]);

  if (!n) return null;

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-app bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[32rem] sm:h-[30rem]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={project.slug}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 260, damping: 30 }, opacity: { duration: 0.3 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) paginate(1);
              else if (info.offset.x > 80) paginate(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div className="pointer-events-none absolute inset-0 text-accent opacity-90">
              {projectBackground(project.slug, true)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-[var(--surface)]/92 to-[var(--surface)]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />

            <div className="relative flex h-full max-w-2xl flex-col justify-center p-8 md:p-12">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`font-mono text-xs uppercase tracking-widest ${kindColor[project.kind]}`}
              >
                {project.kind} · {project.period}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-4 font-display text-4xl font-bold tracking-[-0.02em] md:text-6xl"
              >
                {project.name}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-2 text-lg text-accent"
              >
                {project.blurb}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
                className="mt-4 max-w-xl text-soft"
              >
                {project.description}
              </motion.p>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-5 flex flex-wrap gap-2"
              >
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-app bg-surface/70 px-3 py-1 text-xs text-soft backdrop-blur">
                    {tag}
                  </li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  className="btn-primary group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                >
                  View case study
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-accent">
                    <GithubIcon className="h-5 w-5" /> Code
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-accent">
                    <ExternalIcon className="h-5 w-5" /> Live
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
        <div className="pointer-events-auto flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => goTo(i)}
              aria-label={`Go to ${p.name}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 28 : 10,
                backgroundColor: i === index ? "var(--accent)" : "var(--border)",
              }}
            />
          ))}
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous project"
            className="grid h-10 w-10 place-items-center rounded-full border border-app bg-surface/80 backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next project"
            className="grid h-10 w-10 place-items-center rounded-full border border-app bg-surface/80 backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
