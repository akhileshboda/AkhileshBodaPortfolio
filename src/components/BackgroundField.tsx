import type { CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SpaceStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  peak: number;
  delay: number;
  duration: number;
  cyan: boolean;
}

function makeStars(seed: number, count: number, scale: number): SpaceStar[] {
  const rand = mulberry32(seed);

  return Array.from({ length: count }, () => {
    const sizeRoll = rand();
    const size = (sizeRoll > 0.94 ? 2.2 : sizeRoll > 0.76 ? 1.4 : 0.85) * scale;
    const opacity = 0.2 + rand() * 0.38;

    return {
      x: 1 + rand() * 98,
      y: 1 + rand() * 98,
      size,
      opacity,
      peak: Math.min(0.9, opacity + 0.22 + rand() * 0.22),
      delay: rand() * 8,
      duration: 4.8 + rand() * 6.5,
      cyan: rand() > 0.88,
    };
  });
}

const STAR_LAYERS = [
  { stars: makeStars(0x1a2b, 58, 0.9), opacity: 0.5 },
  { stars: makeStars(0x3c4d, 78, 1), opacity: 0.64 },
  { stars: makeStars(0x5e6f, 42, 1.25), opacity: 0.46 },
] as const;

function OrbitalAccent({
  className,
  reduce,
  reverse = false,
  duration = 110,
}: {
  className: string;
  reduce: boolean;
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute ${className}`}
      animate={reduce ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={reduce ? undefined : { duration, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '50% 50%' }}
    >
      <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible">
        {[184, 248, 292].map((r, i) => (
          <circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            fill="none"
            stroke={i === 0 ? 'rgba(56,214,255,0.18)' : 'rgba(148,163,184,0.11)'}
            strokeDasharray={i === 2 ? '2 12' : undefined}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <circle cx="534" cy="250" r="4" fill="rgba(56,214,255,0.7)" />
        <circle cx="132" cy="380" r="3" fill="rgba(96,165,250,0.58)" />
        <circle cx="386" cy="42" r="2.5" fill="rgba(255,214,0,0.35)" />
      </svg>
    </motion.div>
  );
}

/**
 * BackgroundField — fixed, full-viewport space backdrop.
 * Deterministic star layers drift with page scroll using Motion. Reduced-motion
 * users get the same starry depth as a static composition.
 */
function BackgroundField() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const farYValue = useTransform(scrollYProgress, [0, 1], [0, -38]);
  const midYValue = useTransform(scrollYProgress, [0, 1], [0, -82]);
  const nearYValue = useTransform(scrollYProgress, [0, 1], [0, -132]);
  const farXValue = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const midXValue = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const nearXValue = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const primaryGlowYValue = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const secondaryGlowYValue = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const transforms = [
    { x: reduce ? 0 : farXValue, y: reduce ? 0 : farYValue },
    { x: reduce ? 0 : midXValue, y: reduce ? 0 : midYValue },
    { x: reduce ? 0 : nearXValue, y: reduce ? 0 : nearYValue },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-primary"
      style={{ contain: 'layout paint' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,128,255,0.12),transparent_38%),linear-gradient(180deg,#030815_0%,#020611_58%,#01040c_100%)]" />

      {STAR_LAYERS.map((layer, layerIndex) => (
        <motion.div
          key={layerIndex}
          className="absolute"
          style={{
            inset: 0,
            opacity: layer.opacity,
            ...transforms[layerIndex],
          }}
        >
          {layer.stars.map((star, starIndex) => (
            <span
              key={starIndex}
              className="absolute rounded-full"
              style={
                {
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                  backgroundColor: star.cyan
                    ? 'rgba(125,222,255,0.95)'
                    : 'rgba(226,238,255,0.9)',
                  boxShadow: star.cyan
                    ? '0 0 7px 1px rgba(56,214,255,0.55)'
                    : star.size > 1.5
                      ? '0 0 4px rgba(226,238,255,0.32)'
                      : 'none',
                  '--star-base': star.opacity,
                  '--star-peak': star.peak,
                  animation: reduce
                    ? undefined
                    : `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                } as CSSProperties
              }
            />
          ))}
        </motion.div>
      ))}

      <OrbitalAccent
        reduce={Boolean(reduce)}
        className="-right-[16rem] top-[6vh] hidden h-[42rem] w-[42rem] opacity-[0.16] blur-[0.1px] md:block"
        duration={150}
      />
      <OrbitalAccent
        reduce={Boolean(reduce)}
        reverse
        className="-left-[18rem] bottom-[-12rem] hidden h-[38rem] w-[38rem] opacity-[0.1] md:block"
        duration={190}
      />

      <motion.div
        className="absolute -top-1/4 left-1/4 h-[80vh] w-[80vh] rounded-full blur-[160px] opacity-40"
        style={{ y: reduce ? 0 : primaryGlowYValue }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(47,128,255,0.18) 0%, rgba(47,128,255,0.04) 45%, transparent 70%)',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute right-[-10vw] top-[36vh] h-[64vh] w-[64vh] rounded-full blur-[150px] opacity-25"
        style={{ y: reduce ? 0 : secondaryGlowYValue }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(56,214,255,0.035) 42%, transparent 72%)',
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,214,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(56,214,255,0.035) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(circle at 50% 38%, black 0%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 38%, black 0%, transparent 72%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(2,6,17,0.55) 100%)',
        }}
      />
    </div>
  );
}

export default BackgroundField;
