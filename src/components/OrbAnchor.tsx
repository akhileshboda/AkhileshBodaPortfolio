import { motion, useReducedMotion } from 'motion/react';

/**
 * OrbAnchor — large glowing orb with orbital rings + nodes, right side of the hero.
 * CSS / SVG / Motion only. Positioned absolutely inside the Hero section.
 */
function OrbAnchor() {
  const reduce = useReducedMotion();

  // Ring geometry (SVG viewBox is 600x600, center 300,300)
  const rings = [
    { r: 210, opacity: 0.20 },
    { r: 264, opacity: 0.14 },
    { r: 298, opacity: 0.09 },
  ];

  // Orbital nodes placed on ring radii (angle in degrees, radius in viewBox units)
  const nodes = [
    { angle: -32, r: 264, size: 7, color: 'rgba(56,214,255,0.95)' },
    { angle: 150, r: 210, size: 5, color: 'rgba(139,92,246,0.9)' },
    { angle: 64, r: 298, size: 4, color: 'rgba(96,165,250,0.85)' },
  ];

  const toXY = (angle: number, r: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: 300 + r * Math.cos(rad), y: 300 + r * Math.sin(rad) };
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[2vw] top-8 z-0 hidden md:block"
    >
      <div className="relative aspect-square w-[clamp(340px,38vw,600px)]">
        {/* Rotating rings + nodes */}
        <motion.div
          className="absolute inset-0"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={
            reduce
              ? undefined
              : { duration: 90, repeat: Infinity, ease: 'linear' }
          }
        >
          <svg
            viewBox="0 0 600 600"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {rings.map((ring) => (
              <circle
                key={ring.r}
                cx={300}
                cy={300}
                r={ring.r}
                fill="none"
                stroke={`rgba(148,163,184,${ring.opacity})`}
                strokeWidth={1}
              />
            ))}
            {nodes.map((node, i) => {
              const { x, y } = toXY(node.angle, node.r);
              return (
                <g key={i}>
                  {/* soft glow */}
                  <circle cx={x} cy={y} r={node.size * 2.4} fill={node.color} opacity={0.18} />
                  <circle cx={x} cy={y} r={node.size} fill={node.color} />
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Outer rim halo behind the orb (transparent center so the sphere stays dark) */}
        <div
          className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
          style={{
            background:
              'radial-gradient(circle at 30% 72%, rgba(47,128,255,0.40) 0%, transparent 48%),' +
              'radial-gradient(circle at 72% 28%, rgba(139,92,246,0.34) 0%, transparent 48%)',
          }}
        />

        {/* The orb sphere */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 26% 74%, rgba(47,128,255,0.65), transparent 40%),' +
              'radial-gradient(circle at 74% 26%, rgba(139,92,246,0.55), transparent 40%),' +
              'radial-gradient(circle at 50% 50%, #0a1326 0%, #050b18 48%, #02060d 80%)',
            boxShadow:
              '0 0 100px rgba(47,128,255,0.22), 0 0 50px rgba(139,92,246,0.16),' +
              'inset 16px -18px 60px rgba(47,128,255,0.5),' +
              'inset -18px 16px 60px rgba(139,92,246,0.42),' +
              'inset 0 0 55px rgba(2,6,13,0.95)',
          }}
          animate={reduce ? undefined : { scale: [1, 1.03, 1], opacity: [0.96, 1, 0.96] }}
          transition={
            reduce ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          {/* Inner dotted surface texture */}
          <div
            className="absolute inset-0 rounded-full opacity-[0.12]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
              backgroundSize: '14px 14px',
              maskImage: 'radial-gradient(circle at 50% 50%, black 60%, transparent 78%)',
              WebkitMaskImage:
                'radial-gradient(circle at 50% 50%, black 60%, transparent 78%)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default OrbAnchor;
