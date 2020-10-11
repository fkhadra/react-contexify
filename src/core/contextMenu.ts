import { eventManager } from './eventManager';
import { MenuId } from '../types';
import React, { SyntheticEvent } from 'react';

import { EVENT } from '../constants';

export interface ContextMenu {
  show: (params: {
    id: MenuId;
    event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent;
    props?: any;
  }) => void;
  hideAll: () => void;
}

const contextMenu: ContextMenu = {
  show({ id, event, props }) {
    eventManager.emit(EVENT.HIDE_ALL).emit(EVENT.SHOW_MENU + id, {
      event: (event as SyntheticEvent).nativeEvent || event,
      props,
    });
  },
  hideAll() {
    eventManager.emit(EVENT.HIDE_ALL);
  },
};

export { contextMenu };
