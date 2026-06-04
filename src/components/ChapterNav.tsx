import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { BookOpen, X } from 'lucide-react';

interface Chapter {
  number: string;
  label: string;
  id: string;
}

const chapters: Chapter[] = [
  { number: '01', label: 'Origin', id: 'about' },
  { number: '02', label: 'What I Bring', id: 'pillars' },
  { number: '03', label: 'AIVA', id: 'experience' },
  { number: '04', label: 'Purdue', id: 'purdue' },
  { number: '05', label: 'Projects', id: 'projects' },
  { number: '06', label: 'Mobile', id: 'mobile' },
  { number: '07', label: 'Systems & AI', id: 'systems' },
  { number: '08', label: 'Athlete', id: 'athletics' },
  { number: '09', label: 'Journey', id: 'journey' },
  { number: '10', label: 'Contact', id: 'contact' },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ─── Desktop Side Nav ──────────────────────────────────────────── */
function DesktopChapterNav({ active }: { active: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.nav
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-label="Chapter navigation"
      className="fixed left-0 top-[60px] bottom-0 z-40 hidden w-60 flex-col lg:flex"
    >
      {/* Right edge divider */}
      <div className="absolute right-0 top-1/2 h-[64%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />

      <div className="relative px-8 pt-8">
        <ul className="relative space-y-0.5" role="list">
          {/* Vertical spine line */}
          <div className="pointer-events-none absolute left-1 top-1 bottom-1 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent" />

          {chapters.map((ch) => {
            const isActive = active === ch.id;
            return (
              <li key={ch.id}>
                <button
                  onClick={() => scrollToSection(ch.id)}
                  aria-label={`Go to ${ch.label} section`}
                  aria-current={isActive ? 'location' : undefined}
                  className="group relative flex w-full cursor-pointer items-center gap-3 rounded-lg py-1.5 pl-6 pr-2 text-left"
                >
                  {/* Glowing active dot on the spine */}
                  {isActive && (
                    <motion.span
                      layoutId="chapterIndicator"
                      className="absolute left-1 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_10px_2px_rgba(56,214,255,0.7)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    >
                      {/* Pulsing halo */}
                      <motion.span
                        className="absolute inset-0 rounded-full bg-blue-400/40"
                        animate={reduce ? undefined : { scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                      />
                    </motion.span>
                  )}

                  {/* Number */}
                  <span
                    className={`chapter-label w-5 shrink-0 transition-colors duration-200 ${
                      isActive ? 'text-blue-400' : 'text-slate-700 group-hover:text-slate-600'
                    }`}
                  >
                    {ch.number}
                  </span>

                  {/* Label */}
                  <span
                    className={`chapter-label leading-normal transition-colors duration-200 ${
                      isActive
                        ? 'text-slate-100'
                        : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  >
                    {ch.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Quote block — lower left */}
      <div className="absolute bottom-10 left-8 max-w-[180px]">
        <span className="block font-mono text-3xl leading-none text-blue-400/60">
          &ldquo;
        </span>
        <p className="mt-1 font-mono text-[11px] leading-relaxed text-slate-500">
          Empathy is the interface. Impact is the outcome.
        </p>
        <span className="mt-3 block h-px w-8 bg-blue-500/60" />
      </div>
    </motion.nav>
  );
}

/* ─── Mobile Floating Button + Drawer ──────────────────────────── */
function MobileChapterMenu({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        onClick={() => setOpen(true)}
        aria-label="Open chapter navigation"
        className="fixed bottom-6 right-5 z-40 flex items-center gap-2 glass-strong rounded-full px-4 py-2.5 text-slate-300 hover:text-slate-100 transition-colors duration-200 lg:hidden border border-white/[0.08]"
      >
        <BookOpen className="h-3.5 w-3.5" />
        <span className="chapter-label">Chapters</span>
      </motion.button>

      {/* Full-screen drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#0A0A0F]/95 backdrop-blur-xl lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[60px] border-b border-white/[0.05]">
              <span className="chapter-label text-slate-400">Chapters</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chapter navigation"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/[0.06] transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chapter list */}
            <motion.ul
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-1 flex flex-col justify-center px-8 gap-1"
            >
              {chapters.map((ch) => {
                const isActive = active === ch.id;
                return (
                  <li key={ch.id}>
                    <button
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => scrollToSection(ch.id), 150);
                      }}
                      className="flex items-center gap-4 w-full py-3 group cursor-pointer"
                    >
                      <span className={`chapter-label w-6 shrink-0 ${isActive ? 'text-blue-500' : 'text-slate-700'}`}>
                        {ch.number}
                      </span>
                      <span
                        className={`text-lg font-medium transition-colors duration-200 ${
                          isActive ? 'text-slate-100' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                        style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
                      >
                        {ch.label}
                      </span>
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Root ChapterNav component ─────────────────────────────────── */
function ChapterNav() {
  const [activeSection, setActiveSection] = useState<string>('about');

  const updateActive = useCallback((entries: IntersectionObserverEntry[]) => {
    // Find the entry that is most visible (highest intersectionRatio) and is intersecting
    let best: IntersectionObserverEntry | null = null;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!best || entry.intersectionRatio > best.intersectionRatio) {
          best = entry;
        }
      }
    }
    if (best) {
      setActiveSection(best.target.id);
    }
  }, []);

  useEffect(() => {
    const sectionIds = chapters.map((ch) => ch.id);
    const observers: IntersectionObserver[] = [];

    // Use a single observer for all sections
    const observer = new IntersectionObserver(updateActive, {
      threshold: [0.3, 0.5],
      rootMargin: '-10% 0px -40% 0px',
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    observers.push(observer);
    return () => observers.forEach((obs) => obs.disconnect());
  }, [updateActive]);

  return (
    <>
      <DesktopChapterNav active={activeSection} />
      <MobileChapterMenu active={activeSection} />
    </>
  );
}

export default ChapterNav;
