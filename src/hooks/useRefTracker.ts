import { useRef } from 'react';

export interface RefTrackerValue {
  node: HTMLElement;
  isSubmenu: boolean;
  submenuRefTracker?: RefTracker;
}

export type RefTracker = ReturnType<typeof useRefTracker>;

/**
 * Used to store children refs
 */
export function useRefTracker() {
  return useRef<Map<HTMLElement, RefTrackerValue>>(new Map()).current;
}
