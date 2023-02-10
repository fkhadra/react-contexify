import { eventManager } from './eventManager';
import { MenuId, TriggerEvent } from '../types';
import { SyntheticEvent } from 'react';

import { EVENT } from '../constants';

export interface ContextMenu {
  show: <TProps>(params: ShowContextMenuParams<TProps>) => void;
  hideAll: () => void;
}

export interface ShowContextMenuParams<TProps = unknown> {
  id: MenuId;
  event: TriggerEvent;
  disableEventPropagation?: boolean;
  props?: TProps;
  position?: {
    x: number;
    y: number;
  } | null;
}

const contextMenu: ContextMenu = {
  show({ event, id, props, position, disableEventPropagation }) {
    if (event.preventDefault) event.preventDefault();

    eventManager.emit(EVENT.HIDE_ALL).emit(id, {
      event: (event as SyntheticEvent).nativeEvent || event,
      props,
      position,
      disableEventPropagation,
    });
  },
  hideAll() {
    eventManager.emit(EVENT.HIDE_ALL);
  },
};

export { contextMenu };
