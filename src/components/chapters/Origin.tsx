import { HeartPulse, Users, TrendingUp } from 'lucide-react';
import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';

const carriedForward = [
  {
    icon: HeartPulse,
    title: 'Empathy as a working tool',
    copy: 'Care work meant reading people accurately — their needs, their frustrations, what they left unsaid. That skill translates directly to understanding users.',
  },
  {
    icon: Users,
    title: 'Users before systems',
    copy: 'Treatment plans only work when they fit a real life. Software is the same: the best architecture loses to the product people actually adopt.',
  },
  {
    icon: TrendingUp,
    title: 'Progress you can measure',
    copy: 'Rehabilitation is iterative — assess, adjust, repeat, in small honest increments. That is also exactly how good products get built.',
  },
];

/**
 * Waypoint 01 — First Light. Where the journey actually started:
 * physical therapy and human-centered care.
 */
export default function Origin() {
  return (
    <ChapterShell id="origin">
      <ChapterHeader
        id="origin"
        title="Before software, I worked with people."
        lede="My foundation is physical therapy — human-centered care in its most literal form. Sessions built on trust, plans adjusted to each person, progress measured in small, real improvements."
      />

      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-slate-400 md:text-lg">
            <p>
              Care work taught me things a computer science curriculum never
              could: how to listen properly, how to earn trust, and how to keep
              showing up when progress is slow. Every treatment plan was a
              product decision — designed for one person, tested against
              reality, revised the moment it stopped working.
            </p>
            <p>
              When I moved into technology, I didn&apos;t leave any of that
              behind. I changed the scale. Software let me take the same
              care-driven problem solving and apply it to products that can
              reach far more people than one clinic room ever could.
            </p>
            <p className="border-l-2 border-amber-300/40 pl-4 font-medium text-slate-300">
              Human-centered isn&apos;t a design buzzword to me — it was the
              literal job description.
            </p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {carriedForward.map(({ icon: Icon, title, copy }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <div className="card-glow rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-200/20 bg-amber-300/[0.06]">
                    <Icon className="h-4 w-4 text-amber-200/90" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{copy}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </ChapterShell>
  );
}
