import { motion, type MotionValue } from 'motion/react';
import { TEMPLE_BAYS, TEMPLE_VIEWBOX, xPct } from '@/components/pillarGeometry';

interface PillarProgressRailProps {
  progress: MotionValue<number>;
  activeIndex: number;
  reduce: boolean;
}

const firstNode = TEMPLE_BAYS[0].centerX;
const lastNode = TEMPLE_BAYS[TEMPLE_BAYS.length - 1].centerX;
const trackWidth = `${((lastNode - firstNode) / TEMPLE_VIEWBOX.width) * 100}%`;

function PillarProgressRail({ progress, activeIndex, reduce }: PillarProgressRailProps) {
  return (
    <div aria-hidden="true" className="relative h-12 w-full">
      <div
        className="absolute top-1/2 h-px -translate-y-1/2 bg-white/[0.08]"
        style={{ left: xPct(firstNode), width: trackWidth }}
      >
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

      {TEMPLE_BAYS.map((bay, i) => {
        const completed = i < activeIndex;
        const current = i === activeIndex;
        const reached = i <= activeIndex;

        return (
          <span
            key={bay.number}
            className={`absolute top-1/2 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-bg-primary transition-all duration-500 ${
              current
                ? 'border-human-spark shadow-[0_0_14px_-3px_rgba(255,214,0,0.75)]'
                : completed
                  ? 'border-cyan-300/75'
                  : 'border-white/20'
            }`}
            style={{ left: xPct(bay.centerX) }}
          >
            {current && <span className="absolute -inset-1.5 rounded-full border border-human-spark/35" />}
            <span
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                current
                  ? 'bg-human-spark'
                  : reached
                    ? 'bg-cyan-300/85'
                    : 'bg-transparent'
              }`}
            />
          </span>
        );
      })}
    </div>
  );
}

export default PillarProgressRail;
