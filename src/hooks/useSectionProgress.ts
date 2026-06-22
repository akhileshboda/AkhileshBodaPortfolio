import { useEffect, useRef, useState } from 'react';
import {
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react';

interface SectionProgressOptions {
  /**
   * Viewport boundary used as the reading line. At 0.5, progress reaches 50%
   * when the tracked element's center reaches the viewport center.
   */
  boundary?: number;
}

const DEFAULT_BOUNDARY = 0.5;

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

/**
 * Scroll-linked section progress that follows what the user is actually
 * seeing. The chosen viewport boundary acts as a reading line: when the target
 * top crosses it progress is 0, when the target center crosses it progress is
 * 0.5, and when the target bottom crosses it progress is 1.
 *
 * Spring constants are intentionally identical to the Origin graph so the two
 * sections' progress animations read as one continuous system.
 */
export function useSectionProgress(
  activeAt: number[],
  { boundary = DEFAULT_BOUNDARY }: SectionProgressOptions = {},
) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const rawProgress = useMotionValue(reduce ? 1 : 0);
  const boundaryRatio = clampProgress(boundary);

  const progress = useSpring(rawProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeIndex, setActiveIndex] = useState(reduce ? activeAt.length - 1 : -1);

  useEffect(() => {
    if (reduce) {
      rawProgress.set(1);
      return;
    }

    let frame: number | null = null;

    const updateProgress = () => {
      frame = null;
      const target = ref.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const targetHeight = Math.max(rect.height, 1);
      const boundaryY = window.innerHeight * boundaryRatio;
      const nextProgress = clampProgress((boundaryY - rect.top) / targetHeight);

      rawProgress.set(nextProgress);

      let idx = -1;
      for (let i = 0; i < activeAt.length; i++) {
        if (nextProgress >= activeAt[i]) idx = i;
      }
      setActiveIndex(idx);
    };

    const requestUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    const observer = new ResizeObserver(requestUpdate);
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [activeAt, activeAt.length, boundaryRatio, rawProgress, reduce]);

  return {
    ref,
    progress,
    activeIndex: reduce ? activeAt.length - 1 : activeIndex,
    reduce,
  };
}
