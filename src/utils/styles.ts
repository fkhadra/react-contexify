/*
 * css classes mapping
 * */
export const styles = {
  menu: 'react-contexify',
  submenu: 'react-contexify react-contexify__submenu',
  submenuArrow: 'react-contexify__submenu-arrow',
  separator: 'react-contexify__separator',
  item: 'react-contexify__item',
  itemDisabled: 'react-contexify__item--disabled',
  itemContent: 'react-contexify__item__content',
  itemIcon: 'react-contexify__item__icon',
  theme: 'react-contexify__theme--',
  animationWillEnter: 'react-contexify__will-enter--',
  animationWillLeave: 'react-contexify__will-leave--'
};

// I could use enum instead for both interfaces

export interface BuiltInTheme {
  light: string;
  dark: string;
}

export interface BuiltInAnimation {
  fade: string;
  flip: string;
  pop: string;
  zoom: string;
}

export const theme: BuiltInTheme = {
  light: 'light',
  dark: 'dark'
};

export const animation: BuiltInAnimation = {
  fade: 'fade',
  flip: 'flip',
  pop: 'pop',
  zoom: 'zoom'
};
