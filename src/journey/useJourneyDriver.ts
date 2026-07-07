import { useEffect } from 'react';
import { chapters } from '@/data/chapters';
import { journeyStore } from './journeyStore';

/**
 * Drives the journey store from the page scroll position.
 *
 * Mounted once at app level. Updates are rAF-throttled and written to an
 * external store, so scrolling never causes React tree re-renders — only
 * subscribed components (nav rail, HUD) update.
 */
export function useJourneyDriver() {
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress =
        maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

      // Active chapter: the last waypoint whose section top has crossed the
      // viewport midline.
      const midline = window.innerHeight * 0.5;
      let chapterIndex = 0;
      for (let i = 0; i < chapters.length; i++) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.getBoundingClientRect().top <= midline) {
          chapterIndex = i;
        }
      }

      journeyStore.setState({ progress, chapterIndex });
    };

    const requestMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', requestMeasure, { passive: true });
    window.addEventListener('resize', requestMeasure);

    return () => {
      window.removeEventListener('scroll', requestMeasure);
      window.removeEventListener('resize', requestMeasure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
