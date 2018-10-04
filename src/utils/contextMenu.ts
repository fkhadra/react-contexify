import { eventManager } from './eventManager';
import { HIDE_ALL, DISPLAY_MENU } from './actions';
import { ContextMenu } from '../types/index';

const contextMenu: ContextMenu = {
  show({ id, event, props }) {
    eventManager.emit(DISPLAY_MENU(id), event.nativeEvent || event, props);
  },
  hideAll() {
    eventManager.emit(HIDE_ALL);
  }
};

export { contextMenu };
