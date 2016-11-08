import ContextMenuProvider from './Component/ContextMenuProvider';

export default function (menuId) {
  return function (TargetComponent, renderTag = 'div', event = 'onContextMenu') {
    return (
      <ContextMenuProvider menuId={menuId} renderTag={renderTag} event={event}>
        {TargetComponent}
      </ContextMenuProvider>
    )
  }
}
