import { useEffect } from 'react';
import { chapters } from '@/data/chapters';
import { journeyStore } from './journeyStore';

/** Smoothly scroll to a chapter by index (clamped), honouring reduced motion. */
export function scrollToChapter(index: number) {
  const clamped = Math.max(0, Math.min(chapters.length - 1, index));
  const el = document.getElementById(chapters[clamped].id);
  if (!el) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export function scrollToChapterId(id: string) {
  const index = chapters.findIndex((c) => c.id === id);
  if (index >= 0) scrollToChapter(index);
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    target.isContentEditable
  );
}

/**
 * Keyboard voyage controls — arrow keys (and j/k) jump between waypoints,
 * Home/End jump to launch pad / final chapter. Native scrolling keys
 * (space, PageUp/PageDown) are left untouched.
 */
export function useKeyboardVoyage() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const { chapterIndex } = journeyStore.getState();

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'j':
          event.preventDefault();
          scrollToChapter(chapterIndex + 1);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'k':
          event.preventDefault();
          scrollToChapter(chapterIndex - 1);
          break;
        case 'Home':
          event.preventDefault();
          scrollToChapter(0);
          break;
        case 'End':
          event.preventDefault();
          scrollToChapter(chapters.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
