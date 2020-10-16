import { eventManager } from './eventManager';
import { MenuId, MouseOrTouchEvent } from '../types';
import { SyntheticEvent } from 'react';

import { EVENT } from '../constants';

export interface ShowContextMenuParams {
  id: MenuId;
  event: MouseOrTouchEvent;
  props?: any;
  position?: {
    x: number;
    y: number;
  };
}

export interface ContextMenu {
  show: (params: ShowContextMenuParams) => void;
  hideAll: () => void;
}

const contextMenu: ContextMenu = {
  show({ id, event, props, position }) {
    eventManager.emit(EVENT.HIDE_ALL).emit(id, {
      event: (event as SyntheticEvent).nativeEvent || event,
      props,
      position,
    });
  },
  hideAll() {
    eventManager.emit(EVENT.HIDE_ALL);
  },
};

export { contextMenu };
