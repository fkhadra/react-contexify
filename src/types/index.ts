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
 * Used both by `PredicatParams` and `ItemParams`
 */
interface HandlerParams<Props = any, Data = any> {
  /**
   * The event that triggered the context menu
   */
  triggerEvent: HandlerParamsEvent;

  /**
   * Any props supplied when triggering the menu
   */
  props?: Props;

  /**
   * Data object provided to item
   */
  data?: Data;
}

/**
 * Used in 2 cases:
 * - When passing a boolean predicate to `disabled`
 * - When passing a boolean predicate to `hidden`
 *
 * @param props The props passed when you called `show(e, {props: yourProps})`
 * @param data The data defined on the `Item`
 * @param triggerEvent The event that triggered the context menu
 *
 * ```
 * function isItemDisabled({ triggerEvent, props, data }: PredicateParams<type of props, type of data>): boolean
 * <Item disabled={isItemDisabled} data={data}>content</Item>
 * ```
 */
export type PredicateParams<Props = any, Data = any> = HandlerParams<
  Props,
  Data
>;

/**
 * Callback when the `Item` is clicked.
 *
 * @param event The event that occured on the Item node
 * @param props The props passed when you called `show(e, {props: yourProps})`
 * @param data The data defined on the `Item`
 * @param triggerEvent The event that triggered the context menu
 *
 * ```
 * function handleItemClick({ triggerEvent, event, props, data }: ItemParams<type of props, type of data>){
 *    // retrieve the id of the Item or any other dom attribute
 *    const id = e.currentTarget.id;
 *
 *    // access the props and the data
 *    console.log(props, data);
 *
 *    // access the coordinate of the mouse when the menu has been displayed
 *    const {  clientX, clientY } = triggerEvent;
 *
 * }
 *
 * <Item id="item-id" onClick={handleItemClick} data={{key: 'value'}}>Something</Item>
 * ```
 */
export interface ItemParams<Props = any, Data = any>
  extends HandlerParams<Props, Data> {
  event:
    | React.MouseEvent<HTMLElement>
    | React.TouchEvent<HTMLElement>
    | React.KeyboardEvent<HTMLElement>;
}

export interface InternalProps {
  /**
   * INTERNAL USE ONLY: The event that triggered the context menu
   */
  triggerEvent?: TriggerEvent;

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
