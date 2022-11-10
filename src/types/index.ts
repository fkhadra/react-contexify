export type BuiltInOrString<T> = T | (string & {});

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
   * The id of the item when provided
   */
  id?: string;

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
 * @param id The item id, when defined
 * @param event The event that occured on the Item node
 * @param props The props passed when you called `show(e, {props: yourProps})`
 * @param data The data defined on the `Item`
 * @param triggerEvent The event that triggered the context menu
 *
 * ```
 * function handleItemClick({ id, triggerEvent, event, props, data }: ItemParams<type of props, type of data>){
 *    // retrieve the id of the Item
 *    console.log(id) // item-id
 *
 *    // access any other dom attribute
 *    console.log(event.currentTarget.dataset.foo) // 123
 *
 *    // access the props and the data
 *    console.log(props, data);
 *
 *    // access the coordinate of the mouse when the menu has been displayed
 *    const {  clientX, clientY } = triggerEvent;
 * }
 *
 * <Item id="item-id" onClick={handleItemClick} data={{key: 'value'}} data-foo={123} >Something</Item>
 * ```
 */
export interface ItemParams<Props = any, Data = any>
  extends HandlerParams<Props, Data> {
  event:
    | React.MouseEvent<HTMLElement>
    | React.TouchEvent<HTMLElement>
    | React.KeyboardEvent<HTMLElement>
    | KeyboardEvent;
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
 * Theme is appended to `react-contexify__theme--${given theme}`.
 *
 * Built-in theme are `light` and `dark`
 */
export type Theme = BuiltInOrString<'light' | 'dark'>;

/**
 * Animation is appended to
 * - `.react-contexify__will-enter--${given animation}`
 * - `.react-contexify__will-leave--${given animation}`
 *
 * - To disable all animations you can pass `false`
 * - To disable only the enter or the exit animation you can provide an object `{enter: false, exit: 'exitAnimation'}`
 * - default is set to `fade`
 *
 * Built-in animations are `fade`, `scale`, `flip`, `slide`
 */
export type MenuAnimation =
  | Animation
  | false
  | { enter: Animation | false; exit: Animation | false };

type Animation = BuiltInOrString<'fade' | 'scale' | 'flip' | 'slide'>;
