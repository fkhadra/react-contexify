import React, { createElement } from 'react';
import ContextMenuProvider from './Component/ContextMenuProvider';

export default function (id) {
  return function (TargetComponent, renderTag = 'div', event = 'onContextMenu') {
    return () => (<ContextMenuProvider id={id} renderTag={renderTag} event={event}>
      {createElement(TargetComponent)}
    </ContextMenuProvider>);
  };
}
