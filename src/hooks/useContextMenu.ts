import { contextMenu } from '../core';
import { ContextMenuParams, TriggerEvent } from '../types';

export type UseContextMenuProps = Partial<
  Pick<ContextMenuParams, 'id' | 'props'>
>;

export function useContextMenu(props?: UseContextMenuProps) {
  return {
    show(event: TriggerEvent, params?: Omit<ContextMenuParams, 'event'>) {
      contextMenu.show({
        id: (params?.id || props?.id) as string,
        props: params?.props || props?.props,
        event: event,
        position: params?.position,
      });
    },
    hideAll() {
      contextMenu.hideAll();
    },
  };
}
