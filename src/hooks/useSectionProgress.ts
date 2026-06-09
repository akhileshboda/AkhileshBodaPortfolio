import { useRef, useState } from 'react';
import {
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';

export type ScrollOffset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>['offset']>;

/**
 * Scroll-linked section progress. Lifts the pattern proven in the Origin
 * journey graph (src/components/OriginJourneyGraph.tsx): a section-scoped
 * `useScroll` feeds a `useSpring` for a smooth progress value, and crossing
 * each threshold in `activeAt` advances `activeIndex`. Reduced-motion users
 * jump straight to the fully-activated end state.
 *
 * Spring constants are intentionally identical to the Origin graph so the two
 * sections' progress animations read as one continuous system.
 */
export function useSectionProgress(activeAt: number[], offset: ScrollOffset) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeIndex, setActiveIndex] = useState(reduce ? activeAt.length - 1 : -1);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce) return;
    let idx = -1;
    for (let i = 0; i < activeAt.length; i++) {
      if (v >= activeAt[i]) idx = i;
    }
    setActiveIndex(idx);
  });

  return { ref, progress, activeIndex, reduce };
}
