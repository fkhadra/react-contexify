import * as React from 'react';

type ItemCallback = {
  /**
   * Same as html node element
   */
  event: object;

  /**
   * Ref collected from the context menu provider
   */
  ref: Array<any> | any;
  /**
   * Data passed to the item
   */
  data: any;

  /**
   * Data passed to the context menu provider
   */
  dataFromProvider: any;
};

interface IStyle {
  /**
   * Optional css class to append
   */
  className?: string;

  /**
   * Optional style to append
   */
  style?: object;
}

interface IContextMenuProvider extends IStyle {
  /**
   * The id is used to bind the children to the corresponding context menu
   */
  id: string | number;

  /**
   * Children which will be able to trigger the context menu
   */
  children: React.ReactNode;

  /**
   * Any valid html tag to wrap your component. `Default: div`
   */
  renderTag?: string;

  /**
   * Any valid react event. `Default: onContextMenu`.
   * Most common: `onClick`, `onContextMenu`, `onDoubleClick`
   */
  event?: string;

  /**
   * Store the children refs. Those refs are passed to the Item onClick callback.
   * `Default: true`
   */
  storeRef?: boolean;

  /**
   * Those data are passed to the Item onClick callback.
   */
  data?: any;
}

interface IContextMenu extends IStyle {
  /**
   * id used to identify the context menu. It must be unique
   */
  id: string | number;

  /**
   * Expect Item, Submenu or a component wrapping Item and/or Submenu
   */
  children: React.ReactNode;

  /**
   * Use a built-in theme or a custom one. The theme is appended to react-contexify__theme--${given theme}.
   * `Built-in: 'light', 'dark'`
   */
  theme?: string;

  /**
   * Use a built-in animation or a custom one. The animation is appended to react-contexify__will-enter--${given animation}.
   * `Built-in: 'fade', 'pop', 'zoom', 'flip'`
   */
  animation?: string;
}

interface IIconFont extends IStyle {
  /**
   * Just something that render
   */
  children?: React.ReactNode;
}

interface IItem extends IStyle {
  /**
   * String or any react component
   */
  children: React.ReactNode;

  /**
   * A function or a boolean to disable or not the current Item
   */
  disabled?: boolean | ((params?: ItemCallback) => boolean);

  /**
   * Callback when the given item is clicked
   */
  onClick?: (params?: ItemCallback) => void;

  /**
   * Will be accessible by the `onClick` callback
   */
  data?: any;
}

interface ISubmenu extends IStyle {
  /**
   * Any renderable element
   */
  label: React.ReactNode;

  /**
   * Item for the submenu
   */
  children: React.ReactNode;

  /**
   * Render a custom arrow
   */
  arrow: React.ReactNode;

  /**
   * A function or a boolean to disable or not the current Item
   */
  disabled?: boolean | ((
    params?: {
      /**
       * Same as html node element
       */
      event: object;

      /**
       * Ref collected from the context menu provider
       */
      ref: Array<any>;

      /**
       * Data passed to the context menu provider
       */
      dataFromProvider: any;
    }
  ) => boolean);
}

/**
 * Helper to set the context menu theme
 */
interface Itheme {
  /**
   * Use the light theme
   */
  light: string;

  /**
   * Use the dark theme
   */
  dark: string;
}

/**
 * Helper to set the context menu animation
 */
interface Ianimation {
  /**
   * Fade in when appear
   */
  fade: string;

  /**
   * Flip when appear
   */
  flip: string;

  /**
   * Pop when appear
   */
  pop: string;

  /**
   * Zoom when appear
   */
  zoom: string;
}

/**
 * Wrap a component to give them the ability to display the context menu
 */
export class ContextMenuProvider extends React.Component<IContextMenuProvider> {};

/**
 * Context menu container
 */
export class ContextMenu extends React.Component<IContextMenu> {};

/**
 * Helper to display icon. Work with classname and without like material icon
 */
export class IconFont extends React.Component<IIconFont> {};

/**
 * Context menu Item
 */
export class Item extends React.Component<IItem> {};

/**
 * Context menu item separator
 */
export class Separator extends React.Component<> {};

/**
 * Submenu container
 */
export class Submenu extends React.Component<ISubmenu> {};

/**
 * Helper to define the theme
 */
export let theme: Itheme;

/**
 * Helper to define the animation
 */
export let animation: Ianimation;
