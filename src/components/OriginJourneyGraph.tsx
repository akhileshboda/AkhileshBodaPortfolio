import { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';

interface JourneyNode {
  number: string;
  label: string;
  text: string;
  /** Optional trailing clause rendered emphasised (italic, brighter) */
  emphasis?: string;
}

const journeyNodes: JourneyNode[] = [
  {
    number: '01',
    label: 'CARE-DRIVEN START',
    text: 'My path into technology started in an unexpected place — physical therapy and human-centered care. Working directly with people taught me to listen before acting.',
  },
  {
    number: '02',
    label: 'EMPATHY IN CODE',
    text: 'Technology is most powerful when it serves real human needs — built with the same empathy and precision that good care demands. I brought that mindset with me into IT.',
  },
  {
    number: '03',
    label: 'FUTURE MOMENTUM',
    text: 'Today, at Monash University, I build secure, product-focused systems. Every project is shaped by one question: ',
    emphasis: 'does this genuinely serve the person using it?',
  },
];

/** Horizontal step (px) applied to each marker so the connector reads as a path, not a spine */
const MARKER_STEP = [0, 16, 6];

/** scrollYProgress thresholds at which each node switches to its active state */
const ACTIVE_AT = [0.06, 0.5, 0.94];

type Point = { x: number; y: number };

/** Smooth cubic through the measured marker centres, with vertical tangents + small end extensions */
function buildPath(points: Point[]): string {
  if (points.length === 0) return '';
  const first = points[0];
  const last = points[points.length - 1];
  let d = `M ${first.x} ${first.y - 14} L ${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const midY = (a.y + b.y) / 2;
    d += ` C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
  }
  d += ` L ${last.x} ${last.y + 14}`;
  return d;
}

function MarkerCircle({
  number,
  active,
  frontier,
  reduce,
}: {
  number: string;
  active: boolean;
  frontier: boolean;
  reduce: boolean | null;
}) {
  return (
    <div
      className={`relative grid h-9 w-9 place-items-center rounded-full border bg-[#0b0f16]/85 backdrop-blur-sm transition-[border-color,color,box-shadow] duration-500 ${
        active
          ? 'border-cyan-300/70 text-cyan-100 shadow-[0_0_14px_2px_rgba(56,214,255,0.28)]'
          : 'border-white/[0.14] text-slate-500'
      }`}
    >
      {/* Pulsing halo on the current frontier node */}
      {active && frontier && !reduce && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-cyan-400/25"
          animate={{ scale: [1, 1.9, 1], opacity: [0.45, 0, 0.45] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span className="relative font-mono text-[11px] font-medium tracking-tight">
        {number}
      </span>
    </div>
  );
}

/**
 * Journey graph for the Origin section. A scroll-linked SVG path fills from
 * electric blue → cyan as the section scrolls past, and the numbered nodes
 * activate (glow) in order. Adapts the existing AboutStory scroll pattern
 * (useScroll + reduced-motion fallback), upgraded to SVG pathLength so the
 * connector can step like a graph rather than a straight timeline.
 */
function OriginJourneyGraph() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [geo, setGeo] = useState<{ width: number; height: number; centers: Point[] }>({
    width: 0,
    height: 0,
    centers: [],
  });
  const [activeIndex, setActiveIndex] = useState(reduce ? journeyNodes.length - 1 : -1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 78%', 'end 62%'],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Measure marker centres relative to the container so the SVG path stays
  // aligned with the content at any width / after fonts load.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const cRect = el.getBoundingClientRect();
      const centers = markerRefs.current.map((m) => {
        if (!m) return { x: 0, y: 0 };
        const r = m.getBoundingClientRect();
        return {
          x: r.left - cRect.left + r.width / 2,
          y: r.top - cRect.top + r.height / 2,
        };
      });
      setGeo({ width: cRect.width, height: cRect.height, centers });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return;
    let idx = -1;
    for (let i = 0; i < ACTIVE_AT.length; i++) {
      if (v >= ACTIVE_AT[i]) idx = i;
    }
    setActiveIndex(idx);
  });

  const hasGeo = geo.centers.length === journeyNodes.length && geo.height > 0;
  const d = hasGeo ? buildPath(geo.centers) : '';

  return (
    <div ref={containerRef} className="relative">
      {/* Connector — sits behind the markers + content */}
      {hasGeo && (
        <svg
          className="pointer-events-none absolute left-0 top-0 z-0"
          width={geo.width}
          height={geo.height}
          viewBox={`0 0 ${geo.width} ${geo.height}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="originJourneyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F80FF" />
              <stop offset="100%" stopColor="#38D6FF" />
            </linearGradient>
          </defs>
          {/* Unfilled track */}
          <path d={d} stroke="rgba(255,255,255,0.08)" strokeWidth={2} strokeLinecap="round" />
          {/* Scroll-filled gradient path */}
          <motion.path
            d={d}
            stroke="url(#originJourneyGrad)"
            strokeWidth={2}
            strokeLinecap="round"
            className="[filter:drop-shadow(0_0_5px_rgba(56,214,255,0.45))]"
            style={{ pathLength: reduce ? 1 : pathLength }}
          />
        </svg>
      )}

      {/* Nodes */}
      <ol className="relative z-10">
        {journeyNodes.map((node, i) => {
          const active = i <= activeIndex;
          return (
            <li
              key={node.number}
              className={`relative ${i > 0 ? 'pt-8' : ''} ${
                i < journeyNodes.length - 1 ? 'pb-8' : ''
              }`}
            >
              {/* Dashed grid divider between nodes */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 border-t border-dashed border-white/[0.06]"
                />
              )}

              <div className="flex items-start gap-3 md:gap-4">
                {/* Marker lane — fixed width so content never shifts with the step */}
                <div className="relative w-14 shrink-0">
                  <div
                    ref={(el) => {
                      markerRefs.current[i] = el;
                    }}
                    className="w-9"
                    style={{ transform: `translateX(${MARKER_STEP[i]}px)` }}
                  >
                    <MarkerCircle
                      number={node.number}
                      active={active}
                      frontier={i === activeIndex}
                      reduce={reduce}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-1.5">
                  <h3
                    className={`font-mono text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ${
                      active ? 'text-cyan-200/90' : 'text-slate-500'
                    }`}
                  >
                    {node.label}
                  </h3>
                  <div
                    className={`mt-3 rounded-lg border bg-white/[0.02] p-4 backdrop-blur-sm transition-colors duration-500 ${
                      active ? 'border-white/[0.10]' : 'border-white/[0.05]'
                    }`}
                  >
                    <p className="max-w-prose text-[15px] leading-relaxed text-slate-400">
                      {node.text}
                      {node.emphasis && (
                        <span className="italic text-slate-100">{node.emphasis}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default OriginJourneyGraph;
