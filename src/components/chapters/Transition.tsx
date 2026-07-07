import { Lightbulb, Rocket, Smartphone } from 'lucide-react';
import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';

const burnSequence = [
  {
    icon: Lightbulb,
    stage: 'The realisation',
    copy: 'One clinician helps one person at a time. Software carrying the same care can reach thousands. The impact I valued didn’t have to stay small.',
  },
  {
    icon: Rocket,
    stage: 'The decision',
    copy: '2023: a deliberate, all-in pivot. Enrolled in the Bachelor of Information Technology at Monash University and chose cybersecurity as the major.',
  },
  {
    icon: Smartphone,
    stage: 'The proof',
    copy: 'Within the same year I was building my first native mobile apps — and found the corner of software where I most wanted to live.',
  },
];

/**
 * Waypoint 02 — Escape Velocity. The 2023 pivot from care work into technology.
 */
export default function Transition() {
  return (
    <ChapterShell id="transition">
      <ChapterHeader
        id="transition"
        title="In 2023, I lit the engines."
        lede="The move into technology wasn't a drift — it was a burn. A considered decision that software was the way to scale the human impact I cared about."
      />

      <ol className="grid gap-5 md:grid-cols-3">
        {burnSequence.map(({ icon: Icon, stage, copy }, index) => (
          <li key={stage} className="list-none">
            <Reveal delay={index * 0.1} className="h-full">
              <div className="card-glow relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/70">
                  Burn {index + 1} of 3
                </span>
                <span className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-300/[0.06]">
                  <Icon className="h-4.5 w-4.5 text-cyan-200/90" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-100">{stage}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{copy}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </ChapterShell>
  );
}
