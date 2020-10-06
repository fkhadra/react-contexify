import { eventManager } from './eventManager';
import { HIDE_ALL, DISPLAY_MENU } from './actions';
import { MenuId } from '../types';
import React, { SyntheticEvent } from 'react';

export interface ContextMenu {
  show: (params: {
    id: MenuId;
    event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent;
    props?: object;
  }) => void;
  hideAll: () => void;
}

const contextMenu: ContextMenu = {
  show({ id, event, props }) {
    eventManager.emit(
      DISPLAY_MENU(id),
      (event as SyntheticEvent).nativeEvent || event,
      props
    );
  },
  hideAll() {
    eventManager.emit(HIDE_ALL);
  }
};

export { contextMenu };
