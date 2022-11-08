/*
 * css classes mapping
 * */
export const enum CssClass {
  menu = 'contexify',
  submenu = 'contexify_submenu',
  submenuOpen = 'contexify_submenu-isOpen',
  rightSlot = 'contexify_rightSlot',
  separator = 'contexify_separator',
  item = 'contexify_item',
  itemDisabled = 'contexify_item-disabled',
  itemContent = 'contexify_itemContent',
  itemClickedFeedback = 'contexify_item-feedback',
  theme = 'contexify_theme-',
  animationWillEnter = 'contexify_willEnter-',
  animationWillLeave = 'contexify_willLeave-',
}

export const enum EVENT {
  HIDE_ALL,
}

export const NOOP = () => {};

export const hideOnEvents: (keyof GlobalEventHandlersEventMap)[] = [
  'resize',
  'contextmenu',
  'click',
  'scroll',

  // comment blur in dev so you can toggle console without closing the menu
  'blur',
];
