import { motion, useTransform, type MotionValue } from 'motion/react';

interface PillarStarfieldProps {
  /** 0 -> 1 as the section scrolls in; drives only local temple atmosphere. */
  progress: MotionValue<number>;
  reduce: boolean;
}

/**
 * Local Pillars atmosphere only. The app shell owns the star field now, so this
 * component adds a scroll-revealed glow behind the temple without double stars.
 */
function PillarStarfield({ progress, reduce }: PillarStarfieldProps) {
  const fade = useTransform(progress, [0, 1], [0, 1]);
  const glowOpacityValue = useTransform(progress, [0, 0.35, 1], [0, 0.45, 1]);
  const glowScaleValue = useTransform(progress, [0, 1], [0.82, 1]);
  const opacity = reduce ? 0.7 : fade;
  const glowOpacity = reduce ? 0.75 : glowOpacityValue;
  const glowScale = reduce ? 1 : glowScaleValue;

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 4%, rgba(17,32,68,0.18) 0%, rgba(4,8,22,0.5) 56%, rgba(2,5,15,0.82) 100%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-[6%] h-[44vh] w-[78vw] -translate-x-1/2 rounded-full blur-[120px] lg:w-[64vh]"
        style={{ opacity: glowOpacity, scale: glowScale }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(47,128,255,0.18) 0%, rgba(56,214,255,0.08) 42%, transparent 72%)',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-[32%] h-[30vh] w-[82vw] -translate-x-1/2 rounded-full blur-[95px] lg:w-[86vh]"
        style={{ opacity: glowOpacity }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(56,214,255,0.08) 0%, rgba(47,128,255,0.035) 52%, transparent 74%)',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-[20%] h-[44vh] w-[min(86vw,820px)] -translate-x-1/2 rounded-full border border-cyan-300/[0.035]"
        style={{ opacity: glowOpacity, scale: glowScale }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'linear-gradient(180deg, rgba(2,6,17,0) 0%, rgba(2,6,17,0.26) 70%, rgba(2,6,17,0.66) 100%)',
        }}
      />
    </motion.div>
  );
}

export default PillarStarfield;
