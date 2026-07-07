import { chapters } from '@/data/chapters';
import { useJourneyState } from '@/journey/journeyStore';

/**
 * Cockpit readout — bottom-left on desktop. Current waypoint, distance
 * travelled, and a reminder that the ship answers to the arrow keys.
 */
export default function WaypointHUD() {
  const { progress, chapterIndex } = useJourneyState();
  const chapter = chapters[chapterIndex];
  const percent = Math.round(progress * 100);

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 left-7 z-40 hidden select-none font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 lg:block"
    >
      <p className="text-cyan-200/80">
        WPT {chapter.number}/{chapters[chapters.length - 1].number} — {chapter.waypoint}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <span className="block h-px w-24 bg-white/10">
          <span
            className="block h-px bg-cyan-300/70 transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </span>
        <span>{percent}% travelled</span>
      </div>
      <p className="mt-2 text-slate-600">↑ ↓ to navigate</p>
    </aside>
  );
}
