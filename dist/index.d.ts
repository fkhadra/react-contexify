import React$1, { ReactNode } from 'react';

declare type BuiltInOrString<T> = T | (string & {});
/**
 * The event that triggered the context menu
 */
declare type HandlerParamsEvent = MouseEvent & TouchEvent & KeyboardEvent;
/**
 * Pass the event handler. It's used to determine the position of the cursor
 */
declare type TriggerEvent = MouseEvent | TouchEvent | KeyboardEvent | React.MouseEvent | React.TouchEvent | React.KeyboardEvent;
declare type BooleanPredicate = boolean | ((args: HandlerParams) => boolean);
/**
 * Unique id to identify the menu. Use to Trigger the corresponding menu
 */
declare type MenuId = string | number;
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
declare type PredicateParams<Props = any, Data = any> = HandlerParams<Props, Data>;
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
interface ItemParams<Props = any, Data = any> extends HandlerParams<Props, Data> {
    event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement> | React.KeyboardEvent<HTMLElement> | KeyboardEvent;
}
interface InternalProps {
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
declare type Theme = BuiltInOrString<'light' | 'dark'>;
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
declare type MenuAnimation = Animation | false | {
    enter: Animation | false;
    exit: Animation | false;
};
declare type Animation = BuiltInOrString<'fade' | 'scale' | 'flip' | 'slide'>;

interface MenuProps extends Omit<React$1.HTMLAttributes<HTMLElement>, 'id'> {
    /**
     * Unique id to identify the menu. Use to Trigger the corresponding menu
     */
    id: MenuId;
    /**
     * Any valid node that can be rendered
     */
    children: ReactNode;
    /**
     * Theme is appended to `contexify_theme-${given theme}`.
     *
     * Built-in theme are `light` and `dark`
     */
    theme?: Theme;
    /**
     * Animation is appended to
     * - `.contexify_willEnter-${given animation}`
     * - `.contexify_willLeave-${given animation}`
     *
     * - To disable all animations you can pass `false`
     * - To disable only the enter or the exit animation you can provide an object `{enter: false, exit: 'exitAnimation'}`
     *
     * - default is set to `fade`
     */
    animation?: MenuAnimation;
    /**
     * Disables menu repositioning if outside screen.
     * This may be neeeded in some cases when using custom position.
     */
    disableBoundariesCheck?: boolean;
    /**
     * Prevents scrolling the window on when typing. Defaults to true.
     */
    preventDefaultOnKeydown?: boolean;
    /**
     * Used to track menu visibility
     */
    onVisibilityChange?: (isVisible: boolean) => void;
}
declare const Menu: React$1.FC<MenuProps>;

interface ItemProps extends InternalProps, Omit<React$1.HTMLAttributes<HTMLElement>, 'hidden' | 'disabled' | 'onClick'> {
    /**
     * Any valid node that can be rendered
     */
    children: ReactNode;
    /**
     * Passed to the `Item` onClick callback. Accessible via `data`
     */
    data?: any;
    /**
     * Disable `Item`. If a function is used, a boolean must be returned
     *
     * @param id The item id, when defined
     * @param props The props passed when you called `show(e, {props: yourProps})`
     * @param data The data defined on the `Item`
     * @param triggerEvent The event that triggered the context menu
     *
     *
     * ```
     * function isItemDisabled({ triggerEvent, props, data }: PredicateParams<type of props, type of data>): boolean
     * <Item disabled={isItemDisabled} data={data}>content</Item>
     * ```
     */
    disabled?: BooleanPredicate;
    /**
     * Hide the `Item`. If a function is used, a boolean must be returned
     *
     * @param id The item id, when defined
     * @param props The props passed when you called `show(e, {props: yourProps})`
     * @param data The data defined on the `Item`
     * @param triggerEvent The event that triggered the context menu
     *
     *
     * ```
     * function isItemHidden({ triggerEvent, props, data }: PredicateParams<type of props, type of data>): boolean
     * <Item hidden={isItemHidden} data={data}>content</Item>
     * ```
     */
    hidden?: BooleanPredicate;
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
    onClick?: (args: ItemParams) => void;
    /**
     * Let you implement keyboard shortcut for the menu item. It will trigger the
     * `onClick` hander if the given callback returns `true`
     *
     * example:
     *
     * ```
     * function handleShortcut(e: React.KeyboardEvent<HTMLElement>){
     *   // let's say we want to match ⌘ + c
     *   return e.metaKey && e.key === "c";
     * }
     *
     * <Item onClick={doSomething}>Copy <RightSlot>⌘ C</RightSlot></Item>
     * ```
     */
    keyMatcher?: (e: KeyboardEvent) => boolean;
    /**
     * Useful when using form input inside the Menu
     *
     * default: `true`
     */
    closeOnClick?: boolean;
    /**
     * Let you specify another event for the `onClick` handler
     *
     * default: `onClick`
     */
    handlerEvent?: BuiltInOrString<'onClick' | 'onMouseDown' | 'onMouseUp'>;
}
declare const Item: React$1.FC<ItemProps>;

interface SeparatorProps extends InternalProps {
    /**
     * Passed to the `Separator` hidden predicate. Accessible via `data`
     */
    data?: any;
    /**
     * Hide the `Separator`. If a function is used, a boolean must be returned
     *
     * @param props The props passed when you called `show(e, {props: yourProps})`
     * @param data The data defined on the `Separator`
     * @param triggerEvent The event that triggered the context menu
     *
     *
     * ```
     * function isSeparatorHidden({ triggerEvent, props, data }: PredicateParams<type of props, type of data>): boolean
     * <Separator hidden={isSeparatorHidden} data={data}/>
     * ```
     */
    hidden?: BooleanPredicate;
}
declare const Separator: React$1.FC<SeparatorProps>;

interface SubMenuProps extends InternalProps, Omit<React$1.HTMLAttributes<HTMLElement>, 'hidden'> {
    /**
     * Any valid node that can be rendered
     */
    label: ReactNode;
    /**
     * Any valid node that can be rendered
     */
    children: ReactNode;
    /**
     * Render a custom arrow
     */
    arrow?: ReactNode;
    /**
     * Disable the `Submenu`. If a function is used, a boolean must be returned
     */
    disabled?: BooleanPredicate;
    /**
     * Hide the `Submenu` and his children. If a function is used, a boolean must be returned
     */
    hidden?: BooleanPredicate;
}
declare const Submenu: React$1.FC<SubMenuProps>;

interface RightSlotProps extends React$1.HTMLAttributes<HTMLDivElement> {
    children: React$1.ReactNode;
}
declare const RightSlot: React$1.FC<RightSlotProps>;

interface ContextMenu {
    show: <TProps>(params: ShowContextMenuParams<TProps>) => void;
    hideAll: () => void;
}
interface ShowContextMenuParams<TProps = unknown> {
    id: MenuId;
    event: TriggerEvent;
    props?: TProps;
    position?: {
        x: number;
        y: number;
    } | null;
}
declare const contextMenu: ContextMenu;

interface UseContextMenuParams<TProps = unknown> {
    id: MenuId;
    props?: TProps;
}
declare type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;
declare function useContextMenu<TProps>(params: UseContextMenuParams<TProps>): {
    show: (params: MakeOptional<ShowContextMenuParams, 'id'>) => void;
    hideAll: () => void;
};
declare function useContextMenu<TProps>(params?: Partial<UseContextMenuParams<TProps>>): {
    show: (params: ShowContextMenuParams) => void;
    hideAll: () => void;
};

export { BooleanPredicate, BuiltInOrString, ContextMenu, HandlerParamsEvent, InternalProps, Item, ItemParams, ItemProps, Menu, MenuAnimation, MenuId, MenuProps, PredicateParams, RightSlot, RightSlotProps, Separator, SeparatorProps, ShowContextMenuParams, SubMenuProps, Submenu, Theme, TriggerEvent, UseContextMenuParams, contextMenu, useContextMenu };
