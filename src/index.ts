export { default as Menu } from './components/Menu';
//import withProxy from './util/withProxy';
export { default as contextMenu } from './utils/contextMenu';

export { default as Item } from './components/Item';
export { default as Separator } from './components/Separator';
// export {
//   default as ContextMenuProvider
// } from './components/ContextMenuProvider';
export { default as IconFont } from './components/IconFont';
export { default as Submenu } from './components/Submenu';

//const Ctx = withProxy(Menu);
const theme = {
  light: 'light',
  dark: 'dark'
};
const animation = {
  fade: 'fade',
  flip: 'flip',
  pop: 'pop',
  zoom: 'zoom'
};

export { theme, animation };
