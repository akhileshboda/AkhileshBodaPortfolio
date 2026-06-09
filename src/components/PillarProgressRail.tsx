import { motion, type MotionValue } from 'motion/react';
import { pillars } from '@/data/skills';

interface PillarProgressRailProps {
  progress: MotionValue<number>;
  activeIndex: number;
  reduce: boolean;
}

/**
 * Horizontal progression rail beneath the columns. A blue→cyan gradient fills
 * left→right with scroll (the same gradient as the Origin journey path), and
 * six nodes — aligned under the six columns — light up as each pillar
 * activates. The frontier node carries the yellow accent; inactive nodes stay
 * hollow so activation reads by shape, not colour alone.
 */
function PillarProgressRail({ progress, activeIndex, reduce }: PillarProgressRailProps) {
  return (
    <div className="relative w-full py-2">
      {/* Track + scroll-filled gradient */}
      <div className="relative h-px w-full bg-white/[0.08]">
        <motion.div
          className="absolute inset-y-0 left-0 w-full rounded-full"
          style={{
            scaleX: reduce ? 1 : progress,
            transformOrigin: 'left',
            background: 'linear-gradient(90deg, #2F80FF 0%, #38D6FF 100%)',
            filter: 'drop-shadow(0 0 5px rgba(56,214,255,0.45))',
          }}
        />
      </div>

      {/* Nodes — one per column */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 grid -translate-y-1/2 grid-cols-6">
        {pillars.map((p, i) => {
          const active = i <= activeIndex;
          const frontier = i === activeIndex;
          return (
            <div key={p.number} className="flex justify-center">
              <span
                className={`grid h-4 w-4 place-items-center rounded-full border bg-bg-primary transition-all duration-500 ${
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PillarProgressRail;
