import { ShowContextMenuParams } from '../core';

/**
 * The event that triggered the context menu
 */
export type MouseAndTouchEvent = MouseEvent & TouchEvent;

/**
 * Pass the event handler. It's used to determine the position of the cursor
 */
export type MouseOrTouchEvent =
  | MouseEvent
  | TouchEvent
  | React.MouseEvent
  | React.TouchEvent;

export interface ContextMenuParams extends Omit<ShowContextMenuParams, 'id'> {
  id?: MenuId;
}

export type BooleanPredicate = boolean | ((args: HandlerParams) => boolean);

/**
 * Unique id to identify the menu. Use to Trigger the corresponding menu
 */
export type MenuId = string | number;

/**
 * Used in 3 cases:
 * - When you pass a callback to the `Item` `onClick` event
 * - When passing a boolean predicate to `disabled`
 * - When passing a boolean predicate to `hidden`
 *
 *
 * `function onClick({ event, props, data }: ItemEvent<type of props, type of data>)`
 */
export interface HandlerParams<Props = any, Data = any> {
  /**
   * The event that triggered the context menu
   */
  event: MouseAndTouchEvent;

  /**
   * Any props supplied when triggering the menu
   */
  props?: Props;

  /**
   * Data object provided to item
   */
  data?: Data;
}

export interface InternalProps {
  /**
   * INTERNAL USE ONLY: `MouseEvent` or `TouchEvent`
   */
  nativeEvent?: MouseOrTouchEvent;

  /**
   * INTERNAL USE ONLY: Passed to the Item onClick callback. Accessible via `props`
   */
  propsFromTrigger?: any;
}
