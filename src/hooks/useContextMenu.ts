import { contextMenu } from '../core';
import { ContextMenuParams, MouseOrTouchEvent } from '../types';

export type UseContextMenuProps = Partial<
  Pick<ContextMenuParams, 'id' | 'props'>
>;

export function useContextMenu(props: UseContextMenuProps = {}) {
  return {
    show(event: MouseOrTouchEvent, params: Omit<ContextMenuParams, 'event'>) {
      contextMenu.show({
        id: (props.id || params.id) as string,
        props: props.props || params.props,
        event: event,
        position: params.position,
      });
    },
    hideAll() {
      contextMenu.hideAll();
    },
  };
}
