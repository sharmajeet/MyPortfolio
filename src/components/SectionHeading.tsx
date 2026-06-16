import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ index, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 text-sm font-mono text-accent">
        <span>{index}</span>
        <span className="h-px w-12 bg-accent opacity-40" />
      </div>
      <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-[-0.02em]">{title}</h2>
      {subtitle && <p className="mt-4 max-w-xl text-soft text-lg">{subtitle}</p>}
    </Reveal>
  );
}
