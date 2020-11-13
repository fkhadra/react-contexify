/*
 * css classes mapping
 * */
export const enum STYLE {
  menu = 'react-contexify',
  submenu = 'react-contexify react-contexify__submenu',
  submenuArrow = 'react-contexify__submenu-arrow',
  submenuOpen = 'react-contexify__submenu--is-open',
  separator = 'react-contexify__separator',
  item = 'react-contexify__item',
  itemDisabled = 'react-contexify__item--disabled',
  itemContent = 'react-contexify__item__content',
  theme = 'react-contexify__theme--',
  animationWillEnter = 'react-contexify__will-enter--',
  animationWillLeave = 'react-contexify__will-leave--',
}

export const enum EVENT {
  HIDE_ALL,
}

export const theme = {
  light: 'light',
  dark: 'dark',
};

export const animation = {
  fade: 'fade',
  flip: 'flip',
  scale: 'scale',
  slide: 'slide',
};

export const NOOP = () => {};
