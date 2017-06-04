import React, { createElement } from 'react';

import ContextMenuProvider from './Component/ContextMenuProvider';

export default function (id) {
  return function (
    TargetComponent,
    renderTag = 'div',
    event = 'onContextMenu',
    className = '',
    style = {}) {
    return props => (
      <ContextMenuProvider
        id={id}
        renderTag={renderTag}
        event={event}
        className={className}
        style={style}
      >
        {createElement(TargetComponent, props)}
      </ContextMenuProvider>);
  };
}
