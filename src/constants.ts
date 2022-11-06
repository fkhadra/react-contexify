/*
 * css classes mapping
 * */
export const enum CssClass {
  menu = 'react-contexify',
  submenu = 'react-contexify__submenu',
  submenuArrow = 'react-contexify__submenu-arrow',
  submenuOpen = 'react-contexify__submenu--is-open',
  separator = 'react-contexify__separator',
  item = 'react-contexify__item',
  itemDisabled = 'react-contexify__item--disabled',
  itemContent = 'react-contexify__item__content',
  itemClickedFeedback = 'react-contexify__item--feedback',
  theme = 'react-contexify__theme--',
  animationWillEnter = 'react-contexify__will-enter--',
  animationWillLeave = 'react-contexify__will-leave--',
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
