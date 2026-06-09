import { motion, type MotionValue } from 'motion/react';
import { pillars } from '@/data/skills';
import PillarCard from '@/components/PillarCard';
import PillarProgressRail from '@/components/PillarProgressRail';

interface PillarStructureProps {
  progress: MotionValue<number>;
  activeIndex: number;
  reduce: boolean;
}

/**
 * The Parthenon. A shallow pediment + entablature beam sit atop the six column
 * cards, which rest on a stylobate line and the progression rail. The temple
 * is implied through thin linework + layout rather than literal illustration.
 *
 * md+ renders the full horizontal temple (3 columns on tablet, 6 on desktop).
 * Below md it collapses to stacked cards threaded by a vertical progress rail,
 * preserving the sequential-activation idea without horizontal overflow.
 */
function PillarStructure({ progress, activeIndex, reduce }: PillarStructureProps) {
  return (
    <div className="relative">
      {/* ── Pediment + entablature (md+) ─────────────────────────────── */}
      <div aria-hidden="true" className="hidden md:block">
        <svg
          viewBox="0 0 1000 56"
          preserveAspectRatio="none"
          className="h-10 w-full lg:h-12"
          fill="none"
        >
          <defs>
            <linearGradient id="pillarPediment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38D6FF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2F80FF" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <path
            d="M44 54 L500 6 L956 54"
            stroke="url(#pillarPediment)"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Entablature — a brighter architrave over a faint cornice */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.16] to-transparent" />
        <div className="mt-1.5 h-px w-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </div>

      {/* ── Columns (md+) ────────────────────────────────────────────── */}
      <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {pillars.map((p, i) => (
          <PillarCard
            key={p.number}
            number={p.number}
            title={p.title}
            copy={p.copy}
            icon={p.icon}
            active={i <= activeIndex}
            frontier={i === activeIndex}
          />
        ))}
      </div>

      {/* ── Stylobate + progression rail (md+) ───────────────────────── */}
      <div className="mt-6 hidden md:block">
        <div
          aria-hidden="true"
          className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
        />
        <div className="mt-5">
          <PillarProgressRail progress={progress} activeIndex={activeIndex} reduce={reduce} />
        </div>
      </div>

      {/* ── Mobile: stacked cards on a vertical rail (<md) ───────────── */}
      <div className="relative md:hidden">
        {/* Vertical track + scroll-filled gradient */}
        <div aria-hidden="true" className="absolute bottom-4 left-2 top-4 w-px bg-white/[0.08]">
          <motion.div
            className="absolute inset-x-0 top-0 h-full"
            style={{
              scaleY: reduce ? 1 : progress,
              transformOrigin: 'top',
              background: 'linear-gradient(180deg, #2F80FF 0%, #38D6FF 100%)',
            }}
          />
        </div>

        <ol className="space-y-3">
          {pillars.map((p, i) => {
            const active = i <= activeIndex;
            const frontier = i === activeIndex;
            return (
              <li key={p.number} className="relative pl-9">
                {/* Rail node — aligned to the card's number row */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-6 grid h-4 w-4 place-items-center rounded-full border bg-bg-primary transition-all duration-500 ${
                    frontier
                      ? 'border-human-spark'
                      : active
                        ? 'border-cyan-300/70'
                        : 'border-white/20'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                      frontier
                        ? 'bg-human-spark shadow-[0_0_8px_1px_rgba(255,214,0,0.55)]'
                        : active
                          ? 'bg-cyan-300/80'
                          : 'bg-transparent'
                    }`}
                  />
                </span>
                <PillarCard
                  number={p.number}
                  title={p.title}
                  copy={p.copy}
                  icon={p.icon}
                  active={active}
                  frontier={frontier}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default PillarStructure;
