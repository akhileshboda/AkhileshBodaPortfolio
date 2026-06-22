import type { RefObject } from 'react';
import { useScroll } from 'motion/react';
import { useSectionProgress } from '@/hooks/useSectionProgress';

type ScrollOffset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>['offset']>;

const ACTIVE_AT = [0.03, 0.2, 0.37, 0.54, 0.71, 0.88];
const STARFIELD_OFFSET: ScrollOffset = ['start end', 'start 22%'];

export function usePillarProgress(sectionRef: RefObject<HTMLElement | null>) {
  const {
    ref: templeRef,
    progress,
    activeIndex,
    reduce,
  } = useSectionProgress(ACTIVE_AT);

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
