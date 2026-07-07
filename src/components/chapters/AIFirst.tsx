import { Lightbulb, PencilRuler, Hammer, Bug, Gauge } from 'lucide-react';
import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';

const workflow = [
  {
    icon: Lightbulb,
    stage: 'Ideate',
    copy: 'Pressure-testing ideas early — exploring the problem space, edge cases, and prior art before a line of code exists.',
  },
  {
    icon: PencilRuler,
    stage: 'Prototype',
    copy: 'Turning a concept into something clickable in hours instead of days, so real feedback arrives while the idea is still cheap to change.',
  },
  {
    icon: Hammer,
    stage: 'Build',
    copy: 'AI-assisted implementation with human review on every change — scaffolding, refactoring, and the repetitive middle of the work.',
  },
  {
    icon: Bug,
    stage: 'Debug',
    copy: 'A second pair of eyes on stack traces, regressions, and the bugs that hide in assumptions rather than syntax.',
  },
  {
    icon: Gauge,
    stage: 'Velocity',
    copy: 'The compound effect: shorter loops between idea, feedback, and shipped improvement — more product per unit of time.',
  },
];

const principles = [
  {
    title: 'Judgment stays human',
    copy: 'AI drafts; I decide. Architecture, product calls, and anything security-relevant get human eyes and human accountability.',
  },
  {
    title: 'Velocity with verification',
    copy: 'Speed only counts if the output holds up. Generated code gets read, tested, and understood before it ships.',
  },
  {
    title: 'Tools, not oracles',
    copy: 'I treat models as very fast, occasionally wrong collaborators — powerful in a tight loop, dangerous on autopilot.',
  },
];

/**
 * Waypoint 07 — New Propulsion. The 2026 shift to an AI-first
 * development workflow.
 */
export default function AIFirst() {
  return (
    <ChapterShell id="ai-first" wide>
      <ChapterHeader
        id="ai-first"
        title="New propulsion: AI-first development."
        lede="In 2026 I rebuilt my workflow around AI — not as a novelty, but as the engine layer under how I ideate, prototype, build, and debug. The destination hasn't changed. The travel time has."
      />

      {/* Workflow pipeline */}
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {workflow.map(({ icon: Icon, stage, copy }, index) => (
          <li key={stage} className="list-none">
            <Reveal delay={index * 0.07} className="h-full">
              <div className="card-glow relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-200/20 bg-teal-300/[0.06]">
                    <Icon className="h-4 w-4 text-teal-200/90" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] text-slate-600">0{index + 1}</span>
                </div>
                <h3 className="mt-3.5 text-sm font-semibold text-slate-100">{stage}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{copy}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Principles */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {principles.map(({ title, copy }, index) => (
          <Reveal key={title} delay={index * 0.08} className="h-full">
            <div className="h-full rounded-2xl border border-teal-300/[0.12] bg-gradient-to-b from-teal-400/[0.05] to-transparent p-6">
              <h3 className="text-base font-semibold text-teal-100/95">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </ChapterShell>
  );
}
