import { CSSProperties } from 'react';

/**
 *
 */
export type TriggerEvent = MouseEvent & TouchEvent;

/**
 * Unique id to identify the menu. Use to Trigger the corresponding menu
 */
export type MenuId = string | number;

export interface MenuItemEventHandler {
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

export interface InternalProps {
  /**
   * INTERNAL USE ONLY: `MouseEvent` or `TouchEvent`
   */
  nativeEvent?: TriggerEvent;

  /**
   * INTERNAL USE ONLY: Passed to the Item onClick callback. Accessible via `props`
   */
  propsFromTrigger?: object;
}
