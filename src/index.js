import ContextMenu from './Component/ContextMenu';
import withProxy from './util/withProxy';

export { default as Item } from './Component/Item';
export { default as Separator } from './Component/Separator';
export { default as ContextMenuProvider } from './Component/ContextMenuProvider';
export { default as menuProvider } from './menuProvider';
export { default as IconFont } from './Component/IconFont';

const Ctx = withProxy(ContextMenu);

export { Ctx as ContextMenu };
