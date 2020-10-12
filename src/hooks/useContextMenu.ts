import { contextMenu, ShowContextMenuParams } from '../core';
import { MenuId } from '../types';

export interface UseContextMenuProps {
  id?: MenuId;
  props?: any;
}

export type ContextMenuParams = UseContextMenuProps &
  Pick<ShowContextMenuParams, 'event'>;

export function useContextMenu(props: UseContextMenuProps) {
  return {
    show(params: ContextMenuParams) {
      contextMenu.show({
        id: (props.id || params.id) as string,
        props: props.props || params.props,
        event: params.event,
      });
    },
    hideAll() {
      contextMenu.hideAll();
    },
  };
}
