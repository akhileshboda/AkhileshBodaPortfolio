import type { RefObject } from 'react';
import { useScroll } from 'motion/react';
import { useSectionProgress, type ScrollOffset } from '@/hooks/useSectionProgress';

const ACTIVE_AT = [0.03, 0.2, 0.37, 0.54, 0.71, 0.88];
const TEMPLE_OFFSET: ScrollOffset = ['start 86%', 'end 52%'];
const STARFIELD_OFFSET: ScrollOffset = ['start end', 'start 22%'];

export function usePillarProgress(sectionRef: RefObject<HTMLElement | null>) {
  const {
    ref: templeRef,
    progress,
    activeIndex,
    reduce,
  } = useSectionProgress(ACTIVE_AT, TEMPLE_OFFSET);

  const { scrollYProgress: starfieldProgress } = useScroll({
    target: sectionRef,
    offset: STARFIELD_OFFSET,
  });

  return {
    templeRef,
    progress,
    activeIndex,
    reduce,
    starfieldProgress,
  };
}
