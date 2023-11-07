import { useRef } from 'react';

export interface ItemTrackerRecord {
  node: HTMLElement;
  isSubmenu: boolean;
  submenuRefTracker?: ItemTracker;
  setSubmenuPosition?: (event: any) => void;
  keyMatcher?: false | ((e: KeyboardEvent) => void);
}

export type ItemTracker = ReturnType<typeof useItemTracker>;

export const useItemTracker = () =>
  useRef<Map<HTMLElement, ItemTrackerRecord>>(new Map()).current;
