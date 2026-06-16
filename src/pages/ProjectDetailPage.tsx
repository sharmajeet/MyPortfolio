import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projectsBySlug, projects } from "../data/portfolio";
import { Reveal } from "../components/Reveal";
import { GithubIcon, ExternalIcon, ArrowIcon } from "../components/icons";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? projectsBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-5xl font-bold">Project not found</h1>
        <Link to="/" className="mt-6 text-accent hover:underline">
          ← Back home
        </Link>
      </section>
    );
  }

  const d = project.detail;
  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];

  return (
    <article className="pt-28 md:pt-36">
      <div className="mx-auto max-w-5xl px-6">
        <Link to="/#projects" className="inline-flex items-center gap-2 font-mono text-sm text-soft transition-colors hover:text-accent">
          <span className="rotate-180">
            <ArrowIcon className="h-4 w-4" />
          </span>
          All projects
        </Link>

        <header className="mt-10 border-b border-app pb-12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent">
            <span>{project.kind}</span>
            <span className="h-px w-8 bg-accent opacity-40" />
            <span className="text-soft">{project.period}</span>
          </div>

          {d.logo && (
            <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-[#0c0a14] px-5 py-3 shadow-lg">
              <img src={d.logo} alt={`${project.name} logo`} className="h-8 w-auto" />
            </div>
          )}

          <h1 className="mt-6 font-display text-5xl font-bold tracking-[-0.03em] md:text-7xl">{project.name}</h1>
          <p className="mt-3 text-xl text-accent">{project.blurb}</p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-soft">{d.overview}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-app px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent">
                <GithubIcon className="h-5 w-5" /> View code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-app px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent">
                <ExternalIcon className="h-5 w-5" /> Live site
              </a>
            )}
            {d.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-app px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                <ExternalIcon className="h-5 w-5" /> {link.label}
              </a>
            ))}
          </div>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {d.client && <Meta label="Client" value={d.client} />}
            {d.industry && <Meta label="Industry" value={d.industry} />}
            <Meta label="My role" value={d.role} />
            {d.exchanges && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-accent">Exchanges</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {d.exchanges.map((ex) => (
                    <span key={ex} className="rounded-md bg-soft px-2.5 py-1 font-mono text-xs">{ex}</span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </header>
      </div>

      {d.problem && (
        <Block index="01" title="The challenge">
          <div className="grid gap-5 md:grid-cols-2">
            {d.problem.map((p) => (
              <Reveal key={p.title} className="rounded-2xl border border-app bg-surface p-6">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-soft">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Block>
      )}

      {d.delivered && (
        <Block index="02" title="What I delivered">
          <div className="space-y-5">
            {d.delivered.map((item, i) => (
              <Reveal key={item.title} className="flex gap-5 rounded-2xl border border-app bg-surface p-6 md:p-8">
                <span className="font-display text-3xl font-bold text-accent opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-soft">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>
      )}

      {d.beforeAfter && (
        <Block index="03" title="Before vs. after">
          <div className="overflow-hidden rounded-2xl border border-app">
            <div className="grid grid-cols-2 bg-soft font-mono text-xs uppercase tracking-widest">
              <div className="border-r border-app p-4 text-soft">Before</div>
              <div className="p-4 text-accent">After</div>
            </div>
            {d.beforeAfter.map((row) => (
              <div key={row.before} className="grid grid-cols-2 border-t border-app text-sm">
                <div className="border-r border-app p-4 text-soft">{row.before}</div>
                <div className="p-4">{row.after}</div>
              </div>
            ))}
          </div>
        </Block>
      )}

      {d.metrics && (
        <Block index="04" title="By the numbers">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-app bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {d.metrics.map((m) => (
              <div key={m.label} className="bg-surface p-8">
                <div className="font-display text-4xl font-bold text-accent">{m.value}</div>
                <div className="mt-2 text-sm text-soft">{m.label}</div>
              </div>
            ))}
          </div>
        </Block>
      )}

      {d.tech && (
        <Block index="05" title="Technology snapshot">
          <div className="overflow-hidden rounded-2xl border border-app">
            {d.tech.map((row) => (
              <div key={row.category} className="grid border-t border-app first:border-t-0 sm:grid-cols-[200px_1fr]">
                <div className="bg-soft p-4 font-mono text-sm text-accent">{row.category}</div>
                <div className="p-4 text-soft">{row.details}</div>
              </div>
            ))}
          </div>
        </Block>
      )}

      {d.quote && (
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Reveal as="blockquote" className="border-l-2 border-accent pl-6 md:pl-10">
            <p className="font-display text-2xl font-medium leading-snug md:text-3xl">“{d.quote.text}”</p>
            <footer className="mt-4 font-mono text-sm text-soft">— {d.quote.author}</footer>
          </Reveal>
        </div>
      )}

      {d.closing && (
        <div className="mx-auto max-w-5xl px-6 pb-8">
          <Reveal>
            <p className="text-lg leading-relaxed text-soft">{d.closing}</p>
          </Reveal>
        </div>
      )}

      <div className="mx-auto mt-12 max-w-5xl border-t border-app px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-soft">Next project</p>
        <Link to={`/projects/${next.slug}`} className="group mt-3 flex items-center justify-between gap-4">
          <span className="font-display text-3xl font-bold tracking-[-0.02em] transition-colors group-hover:text-accent md:text-5xl">
            {next.name}
          </span>
          <ArrowIcon className="h-8 w-8 shrink-0 text-accent transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
        </Link>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-widest text-accent">{label}</dt>
      <dd className="mt-2 text-soft">{value}</dd>
    </div>
  );
}

function Block({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      <Reveal className="mb-8 flex items-center gap-3">
        <span className="font-mono text-sm text-accent">{index}</span>
        <span className="h-px w-10 bg-accent opacity-40" />
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em] md:text-3xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
