import { ShowContextMenuParams } from '../core';

/**
 * The event that triggered the context menu
 */
export type HandlerParamsEvent = MouseEvent & TouchEvent & KeyboardEvent;

/**
 * Pass the event handler. It's used to determine the position of the cursor
 */
export type TriggerEvent =
  | MouseEvent
  | TouchEvent
  | KeyboardEvent
  | React.MouseEvent
  | React.TouchEvent
  | React.KeyboardEvent;

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
  event: HandlerParamsEvent;

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
  nativeEvent?: TriggerEvent;

  /**
   * INTERNAL USE ONLY: Passed to the Item onClick callback. Accessible via `props`
   */
  propsFromTrigger?: any;
}

/**
 * Animation is appended to
 * - `.react-contexify__will-enter--${given animation}`
 * - `.react-contexify__will-leave--${given animation}`
 *
 * - To disable all animations you can pass `false`
 * - To disable only the enter or the exit animation you can provide an object `{enter: false, exit: 'exitAnimation'}`
 * - default is set to `scale`
 *
 * To use the built-in animation a helper in available
 * `import { animation } from 'react-contexify`
 *
 * animation.fade
 */
export type MenuAnimation =
  | string
  | false
  | { enter: string | false; exit: string | false };
