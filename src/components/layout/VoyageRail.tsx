import { navChapters, chapters } from '@/data/chapters';
import { useJourneyState } from '@/journey/journeyStore';
import { scrollToChapter } from '@/journey/navigation';

/**
 * Desktop waypoint rail — the flight path down the left edge.
 * A dot per chapter, a fill line showing distance travelled, labels on
 * hover and at the current waypoint.
 */
export default function VoyageRail() {
  const { chapterIndex } = useJourneyState();

  // Index within navChapters (chapter 0 is the launch pad, not on the rail)
  const activeNavIndex = Math.max(0, chapterIndex - 1);
  const onLaunchPad = chapterIndex === 0;
  const fill = onLaunchPad
    ? 0
    : (activeNavIndex / Math.max(1, navChapters.length - 1)) * 100;

  return (
    <nav
      aria-label="Journey waypoints"
      className="fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative flex flex-col gap-[26px] py-1">
        {/* Track + fill */}
        <span
          aria-hidden="true"
          className="absolute bottom-[9px] left-[4.5px] top-[9px] w-px bg-white/[0.10]"
        />
        <span
          aria-hidden="true"
          className="absolute left-[4.5px] top-[9px] w-px bg-gradient-to-b from-cyan-300/80 to-blue-500/80 transition-[height] duration-500 ease-out"
          style={{ height: `calc((100% - 18px) * ${fill / 100})` }}
        />

        {navChapters.map((chapter) => {
          const index = chapters.findIndex((c) => c.id === chapter.id);
          const isActive = index === chapterIndex;
          const isPassed = index < chapterIndex;

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollToChapter(index)}
              aria-label={`Chapter ${chapter.number}: ${chapter.label}`}
              aria-current={isActive ? 'true' : undefined}
              className="group relative flex cursor-pointer items-center focus-ring rounded-full"
            >
              <span
                className={`relative z-10 h-[10px] w-[10px] rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'scale-125 border-cyan-300 bg-cyan-300 shadow-[0_0_10px_rgba(56,214,255,0.8)]'
                    : isPassed
                      ? 'border-blue-400/70 bg-blue-500/50'
                      : 'border-white/25 bg-[#020611] group-hover:border-white/60'
                }`}
              />
              <span
                className={`chapter-label pointer-events-none absolute left-6 whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'translate-x-0 text-cyan-200 opacity-100'
                    : '-translate-x-1 text-slate-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100'
                }`}
              >
                {chapter.number} · {chapter.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
