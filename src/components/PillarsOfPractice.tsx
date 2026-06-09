import { motion } from 'motion/react';
import { fadeInUp, staggerContainer, defaultViewport } from '@/utils/animations';
import { useSectionProgress, type ScrollOffset } from '@/hooks/useSectionProgress';
import PillarStructure from '@/components/PillarStructure';

/** scrollYProgress thresholds at which each of the six pillars activates */
const ACTIVE_AT = [0.04, 0.21, 0.38, 0.55, 0.72, 0.89];

/**
 * Offset starts early ("start 88%") so the rail begins filling as the structure
 * enters — right as Origin's path finishes ("end 62%") — leaving no dead gap
 * between the two sections' progress animations.
 */
const OFFSET: ScrollOffset = ['start 88%', 'end 55%'];

const supportingValues = [
  { label: 'USER-CENTERED', copy: 'Everything starts with real needs.' },
  { label: 'ENGINEERED', copy: 'Thoughtful systems. Clean execution.' },
  { label: 'IMPACT-DRIVEN', copy: 'Technology that solves meaningful problems.' },
];

/**
 * Section 02 — "Pillars of Practice". A cinematic, Parthenon-inspired structure:
 * six principles arranged as temple columns that activate sequentially with
 * scroll. Reuses the Origin journey's scroll/spring pattern (via
 * useSectionProgress) and visual language so the progress reads as one
 * continuous system flowing out of section 01. Keeps id="pillars" so ChapterNav
 * scroll-spy continues to work.
 */
function PillarsOfPractice() {
  const { ref, progress, activeIndex, reduce } = useSectionProgress(ACTIVE_AT, OFFSET);

  return (
    <section id="pillars" aria-labelledby="pillars-heading" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* ── Identity header ──────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-2xl"
        >
          <motion.div variants={fadeInUp} className="mb-5 flex items-center gap-2.5">
            <span aria-hidden="true" className="h-3 w-px bg-accent-cyan/70" />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-tertiary">
              <span className="text-accent-cyan">02</span> / Pillars
            </span>
          </motion.div>

          <motion.h2
            id="pillars-heading"
            variants={fadeInUp}
            className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-50 md:text-5xl lg:text-[3.5rem]"
          >
            Pillars of Practice
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-4 max-w-md text-lg leading-relaxed text-slate-400"
          >
            Six principles that shape how I build, collaborate, and execute.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-human-spark/90"
          >
            Built on principles. Driven by outcomes.
          </motion.p>
        </motion.div>

        {/* ── Connector — Origin's path arriving into the temple ───────── */}
        <div aria-hidden="true" className="mt-12 flex justify-center md:mt-16">
          <div className="relative h-12 w-px md:h-16">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/70 via-blue-500/45 to-blue-500/25" />
            <span className="absolute -top-1 left-1/2 grid h-3 w-3 -translate-x-1/2 place-items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(56,214,255,0.5)]" />
              {!reduce && (
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-full bg-cyan-400/30"
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </span>
          </div>
        </div>

        {/* ── Temple structure (scroll-tracked) ────────────────────────── */}
        <div ref={ref} className="mt-2">
          <PillarStructure progress={progress} activeIndex={activeIndex} reduce={reduce} />
        </div>

        {/* ── Synthesis panel ──────────────────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="relative mt-14 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/40 p-6 backdrop-blur-md md:mt-16 md:p-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <h3 className="text-xl font-semibold text-slate-50 md:text-2xl">
                These six pillars work in concert.
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-400">
                Together, they support how I approach products, systems, and outcomes.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:self-center">
              {supportingValues.map((v) => (
                <li key={v.label}>
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-human-spark" />
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-human-spark/90">
                      {v.label}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{v.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PillarsOfPractice;
