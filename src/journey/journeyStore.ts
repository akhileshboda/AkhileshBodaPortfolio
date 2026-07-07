import { useSyncExternalStore } from 'react';

/**
 * Tiny external store for journey state.
 *
 * The galaxy engine reads this every animation frame without triggering React
 * renders; UI components subscribe via `useJourneyState`.
 */

export interface JourneyState {
  /** Overall scroll progress through the voyage, 0..1 */
  progress: number;
  /** Index into `chapters` of the waypoint currently in view */
  chapterIndex: number;
}

type Listener = () => void;

let state: JourneyState = { progress: 0, chapterIndex: 0 };
const listeners = new Set<Listener>();

export const journeyStore = {
  getState: (): JourneyState => state,

  setState(partial: Partial<JourneyState>) {
    const next = { ...state, ...partial };
    if (
      next.progress === state.progress &&
      next.chapterIndex === state.chapterIndex
    ) {
      return;
    }
    state = next;
    listeners.forEach((listener) => listener());
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useJourneyState(): JourneyState {
  return useSyncExternalStore(journeyStore.subscribe, journeyStore.getState);
}
