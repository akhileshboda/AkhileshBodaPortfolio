import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Map, X } from 'lucide-react';
import { chapters, navChapters } from '@/data/chapters';
import { useJourneyState } from '@/journey/journeyStore';
import { scrollToChapter } from '@/journey/navigation';

/**
 * Touch navigation: a thin progress hairline at the very top (all viewports)
 * plus, below lg, a floating chapter chip that opens a full voyage map sheet.
 */
export default function MobileVoyage() {
  const { progress, chapterIndex } = useJourneyState();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const chipRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const chapter = chapters[chapterIndex];

  // Lock page scroll and move focus while the map is open
  useEffect(() => {
    if (!open) return;
    const chip = chipRef.current;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    sheetRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
      chip?.focus();
    };
  }, [open]);

  const travelTo = (id: string) => {
    setOpen(false);
    // Let the sheet close and scroll unlock before travelling
    requestAnimationFrame(() => {
      const index = chapters.findIndex((c) => c.id === id);
      if (index >= 0) scrollToChapter(index);
    });
  };

  return (
    <>
      {/* Journey progress hairline — all viewports */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Floating chapter chip — touch viewports */}
      <button
        ref={chipRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="focus-ring fixed bottom-4 right-4 z-50 flex cursor-pointer items-center gap-2.5 rounded-full border border-white/10 bg-[#070d1f]/85 py-2.5 pl-4 pr-3.5 text-xs font-medium text-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl lg:hidden"
      >
        <span className="font-mono text-[10px] tracking-[0.15em] text-cyan-300/90">
          {chapter.number}
        </span>
        <span>{chapter.label}</span>
        <Map className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
      </button>

      {/* Voyage map sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label="Voyage map"
              tabIndex={-1}
              initial={reduce ? { opacity: 0 } : { y: '100%' }}
              animate={reduce ? { opacity: 1 } : { y: 0 }}
              exit={reduce ? { opacity: 0 } : { y: '100%' }}
              transition={{ type: 'tween', duration: reduce ? 0.1 : 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-x-0 bottom-0 z-[75] max-h-[78dvh] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-[#060c1d]/97 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-2xl outline-none lg:hidden"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15" aria-hidden="true" />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  Voyage map
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close voyage map"
                  className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/[0.06] hover:text-slate-100"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <ul className="space-y-1">
                {navChapters.map((c) => {
                  const index = chapters.findIndex((ch) => ch.id === c.id);
                  const isActive = index === chapterIndex;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => travelTo(c.id)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`focus-ring flex w-full cursor-pointer items-baseline gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-150 ${
                          isActive
                            ? 'bg-cyan-400/[0.08] text-cyan-100'
                            : 'text-slate-300 hover:bg-white/[0.04]'
                        }`}
                      >
                        <span
                          className={`font-mono text-[11px] tracking-[0.15em] ${
                            isActive ? 'text-cyan-300' : 'text-slate-500'
                          }`}
                        >
                          {c.number}
                        </span>
                        <span className="flex-1 text-sm font-medium">{c.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                          {c.waypoint}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
