import { eventManager } from './eventManager';
import { MenuId } from '../types';
import React, { SyntheticEvent } from 'react';

import { EVENT } from '../constants';

export interface ShowContextMenuParams {
  id: MenuId;
  event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent;
  props?: any;
}

export interface ContextMenu {
  show: (params: ShowContextMenuParams) => void;
  hideAll: () => void;
}

const contextMenu: ContextMenu = {
  show({ id, event, props }) {
    if (!id) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `You need to provide the id belonging to the menu in order to display it. [LINK TO DOC HERE]`
        );
      }
      return;
    }
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
