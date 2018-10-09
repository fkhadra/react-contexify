import { CSSProperties } from 'react';
export type TriggerEvent = MouseEvent | TouchEvent;

export interface EventHandlerCallback {
  /**
   * The event that triggered the context menu
   */
  event: TriggerEvent;

  /**
   * Any props supplied
   */
  props?: object;
}

export interface StyleProps {
  /**
   * Append given css classes
   */
  className?: string;

  /**
   * Append given inline style
   */
  style?: CSSProperties;
}
