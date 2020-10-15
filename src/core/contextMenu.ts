import { eventManager } from './eventManager';
import { MenuId, MouseOrTouchEvent } from '../types';
import { SyntheticEvent } from 'react';

import { EVENT } from '../constants';

export interface ShowContextMenuParams {
  id: MenuId;
  event: MouseOrTouchEvent;
  props?: any;
}

export interface ContextMenu {
  show: (params: ShowContextMenuParams) => void;
  hideAll: () => void;
}

const contextMenu: ContextMenu = {
  show({ id, event, props }) {
    eventManager.emit(EVENT.HIDE_ALL).emit(id, {
      event: (event as SyntheticEvent).nativeEvent || event,
      props,
    });
  },
  hideAll() {
    eventManager.emit(EVENT.HIDE_ALL);
  },
};

export { contextMenu };
