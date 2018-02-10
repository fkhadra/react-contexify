import React, { createElement } from 'react';

import ContextMenuProvider from './../components/ContextMenuProvider';

export default function(id) {
  return function(
    TargetComponent,
    {
      renderTag = 'div',
      event = 'onContextMenu',
      className = null,
      style = {},
      data = null
    }
  ) {
    return props => (
      <ContextMenuProvider
        id={id}
        renderTag={renderTag}
        event={event}
        className={className}
        style={style}
        data={data}
      >
        {createElement(TargetComponent, props)}
      </ContextMenuProvider>
    );
  };
}
