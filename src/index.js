import ContextMenu from './components/ContextMenu';
import withProxy from './util/withProxy';

export { default as Item } from './components/Item';
export { default as Separator } from './components/Separator';
export { default as ContextMenuProvider } from './components/ContextMenuProvider';
export { default as menuProvider } from './menuProvider';
export { default as IconFont } from './components/IconFont';
export { default as Submenu } from './components/Submenu';

const Ctx = withProxy(ContextMenu);

export { Ctx as ContextMenu };
