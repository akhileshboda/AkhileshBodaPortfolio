import { Zap } from 'lucide-react';
import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';
import { hackathonSeasons, hackathonEvidence } from '@/data/hackathons';

/**
 * Waypoint 05 — Meteor Showers. Hackathons: fast, bright, and over in a
 * weekend — but they leave marks.
 */
export default function Hackathons() {
  return (
    <ChapterShell id="hackathons">
      <ChapterHeader
        id="hackathons"
        title="Building at meteor speed."
        lede="Two hackathon seasons, 2024 and 2025. Compressed builds with real teams and real deadlines — the fastest feedback loop I know for product judgment."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {hackathonSeasons.map((season, index) => (
          <Reveal key={season.year} delay={index * 0.1} className="h-full">
            <article className="card-glow relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm md:p-7">
              {/* Meteor streak */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rotate-45 bg-gradient-to-b from-orange-300/[0.14] to-transparent blur-2xl"
              />
              <p className="font-mono text-3xl font-semibold tracking-tight text-orange-200/90">
                {season.year}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-50">{season.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {season.description}
              </p>
              <ul className="mt-5 space-y-2">
                {season.takeaways.map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Zap
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-300/80"
                      aria-hidden="true"
                    />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-8 rounded-2xl border border-white/[0.05] bg-white/[0.015] p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
            What the record shows
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {hackathonEvidence.map((item) => (
              <li
                key={item}
                className="rounded-full border border-orange-200/15 bg-orange-300/[0.05] px-3 py-1.5 text-xs font-medium text-orange-100/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </ChapterShell>
  );
}
