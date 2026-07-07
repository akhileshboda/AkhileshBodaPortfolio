import { Waves, Shield, Dumbbell } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';
import { athleticDisciplines } from '@/data/skills';

const disciplineIcons: Record<string, LucideIcon> = {
  Rowing: Waves,
  'Field Hockey': Shield,
  'Natural Bodybuilding': Dumbbell,
};

/**
 * Waypoint 08 — Gravity Training. The athletic background that built
 * the discipline everything else runs on.
 */
export default function Athletics() {
  return (
    <ChapterShell id="discipline">
      <ChapterHeader
        id="discipline"
        title="Trained under gravity."
        lede="Before astronauts fly, they train under load. Sport was mine — three disciplines that built the consistency, composure, and endurance I bring to building software."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {athleticDisciplines.map((discipline, index) => {
          const Icon = disciplineIcons[discipline.sport] ?? Dumbbell;
          return (
            <Reveal key={discipline.sport} delay={index * 0.09} className="h-full">
              <article className="card-glow flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-200/15 bg-rose-300/[0.05]">
                    <Icon className="h-4.5 w-4.5 text-rose-200/85" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    {discipline.level}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-50">
                  {discipline.sport}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-rose-200/70">
                  {discipline.attribute}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {discipline.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.15}>
        <p className="mt-10 max-w-2xl border-l-2 border-rose-300/30 pl-4 text-base leading-relaxed text-slate-300">
          The transfer is direct: show up daily, execute under pressure, trust
          the process over the outcome. Sport taught it first — software just
          gave it a new arena.
        </p>
      </Reveal>
    </ChapterShell>
  );
}
