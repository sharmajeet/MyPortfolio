import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

type SectionHeadingProps = {
  index: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ index, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-3 text-sm font-mono text-accent">
          <span>{index}</span>
          <span className="h-px w-12 bg-accent opacity-40" />
        </div>
      </Reveal>
      <RevealText
        as="h2"
        text={title}
        className="mt-3 font-display text-4xl font-bold tracking-[-0.02em] md:text-6xl"
      />
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-lg text-soft">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
