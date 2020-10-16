import { contextMenu } from '../core';
import { ContextMenuParams } from '../types';

export type UseContextMenuProps = Pick<ContextMenuParams, 'id' | 'props'>;

export function useContextMenu(props: UseContextMenuProps) {
  return {
    show(params: ContextMenuParams) {
      contextMenu.show({
        id: (props.id || params.id) as string,
        props: props.props || params.props,
        event: params.event,
        position: params.position,
      });
    },
    hideAll() {
      contextMenu.hideAll();
    },
  };
}
