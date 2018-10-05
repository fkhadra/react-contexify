import { SyntheticEvent } from 'react';

export type MenuId = string | number;

export type TriggerEvent = MouseEvent | TouchEvent;

export interface ContextMenu {
  show: (
    params: { id: MenuId; event: SyntheticEvent; props: any }
  ) => void;
  hideAll: () => void;
}

export interface EventHandlerCallback {
  event: TriggerEvent;
  props?: object;
}
