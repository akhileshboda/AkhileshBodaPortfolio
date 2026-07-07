import type { ReactNode } from 'react';
import { chapters } from '@/data/chapters';
import Reveal from './Reveal';

interface ChapterShellProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Use the wider content column (project grids etc.) */
  wide?: boolean;
}

/** Standard section scaffold for a waypoint chapter. */
export function ChapterShell({ id, children, className = '', wide = false }: ChapterShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-20 px-6 py-24 md:px-10 md:py-36 ${className}`}
    >
      <div className={`mx-auto ${wide ? 'max-w-6xl' : 'max-w-5xl'}`}>{children}</div>
    </section>
  );
}

interface ChapterHeaderProps {
  id: string;
  title: ReactNode;
  lede?: ReactNode;
}

/** Waypoint eyebrow + chapter title + optional lede. */
export function ChapterHeader({ id, title, lede }: ChapterHeaderProps) {
  const chapter = chapters.find((c) => c.id === id);

  return (
    <Reveal className="mb-12 md:mb-16">
      {chapter && (
        <p className="waypoint-eyebrow">
          <span aria-hidden="true" className="eyebrow-line" />
          Waypoint {chapter.number} · {chapter.waypoint}
        </p>
      )}
      <h2
        id={`${id}-title`}
        className="mt-4 text-3xl font-bold tracking-tight text-slate-50 md:text-[2.75rem] md:leading-[1.12]"
      >
        {title}
      </h2>
      {lede && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          {lede}
        </p>
      )}
    </Reveal>
  );
}
