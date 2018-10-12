import { eventManager } from './eventManager';
import { HIDE_ALL, DISPLAY_MENU } from './actions';
import { TriggerEvent, MenuId } from '../types';
import { SyntheticEvent } from 'react';

export interface ContextMenu {
  show: (
    params: {
      id: MenuId;
      event: TriggerEvent & SyntheticEvent;
      props?: object;
    }
  ) => void;
  hideAll: () => void;
}

const contextMenu: ContextMenu = {
  show({ id, event, props }) {
    eventManager.emit(DISPLAY_MENU(id), event.nativeEvent || event, props);
  },
  hideAll() {
    eventManager.emit(HIDE_ALL);
  }
};

export { contextMenu };
