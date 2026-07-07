import { ChapterShell, ChapterHeader } from '@/components/ChapterShell';
import Reveal from '@/components/Reveal';
import { timelineEvents, type TimelineEvent } from '@/data/timeline';

const categoryColor: Record<TimelineEvent['category'], string> = {
  origin: 'bg-amber-300',
  education: 'bg-blue-400',
  project: 'bg-emerald-400',
  experience: 'bg-orange-300',
  direction: 'bg-violet-400',
};

/**
 * Waypoint 09 — the Flight Log. Every recorded burn of the voyage,
 * in order.
 */
export default function FlightLog() {
  return (
    <ChapterShell id="flight-log">
      <ChapterHeader
        id="flight-log"
        title="The flight log."
        lede="Every course change so far, recorded in order — from the first career to the current heading."
      />

      <ol className="relative ml-3 space-y-8 border-l border-white/[0.09] pl-8 md:ml-6 md:space-y-10">
        {timelineEvents.map((event, index) => (
          <li key={`${event.year}-${event.title}`} className="relative list-none">
            <Reveal delay={Math.min(index * 0.05, 0.3)}>
              {/* Node */}
              <span
                aria-hidden="true"
                className={`absolute -left-[38px] top-1.5 h-3 w-3 rounded-full ring-4 ring-[#020611] md:-left-[38px] ${categoryColor[event.category]}`}
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-200/70">
                {event.year}
              </p>
              <h3 className="mt-1.5 text-base font-semibold text-slate-100 md:text-lg">
                {event.title}
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-400">
                {event.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </ChapterShell>
  );
}
