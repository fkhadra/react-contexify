import React, { ReactNode } from 'react';
import cx from 'classnames';

import { styles } from '../utils/styles';
import {
  MenuItemEventHandler,
  TriggerEvent,
  StyleProps,
  InternalProps,
} from '../types';
import { useM } from './RefTrackerProvider';

export interface ItemProps extends StyleProps, InternalProps {
  /**
   * Any valid node that can be rendered
   */
  children: ReactNode;

  /**
   * Passed to the `Item` onClick callback. Accessible via `props`
   */
  data?: object;

  /**
   * Disable or not the `Item`. If a function is used, a boolean must be returned
   */
  disabled?: boolean | ((args: MenuItemEventHandler) => boolean);

  /**
   * Callback when the current `Item` is clicked. The callback give you access to the current event and also the data passed
   * to the `Item`.
   * `({ event, props }) => ...`
   */
  onClick: (args: MenuItemEventHandler) => any;
}

const noop = () => {};

export const Item: React.FC<ItemProps> = ({
  children,
  onClick = noop,
  className,
  style,
  nativeEvent,
  data,
  propsFromTrigger,
  disabled = false,
}) => {
  const refTracker = useM();
  const isDisabled =
    typeof disabled === 'function'
      ? disabled({
          event: nativeEvent as TriggerEvent,
          props: { ...propsFromTrigger, ...data },
        })
      : disabled;

  const cssClasses = cx(styles.item, className, {
    [`${styles.itemDisabled}`]: isDisabled,
  });

  function handleClick(e: React.MouseEvent) {
    console.log('HERE', e);

    isDisabled
      ? e.stopPropagation()
      : onClick({
          event: nativeEvent as TriggerEvent,
          props: { ...propsFromTrigger, ...data },
        });
  }

  function trackRef(node: HTMLElement | null) {
    if (node && !isDisabled)
      refTracker.set(node, {
        node,
        isSubmenu: false,
      });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      onClick({
        event: nativeEvent as TriggerEvent,
        props: { ...propsFromTrigger, ...data },
      });
    }
  }

  return (
    <div
      className={cssClasses}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="presentation"
      ref={trackRef}
      tabIndex={-1}
    >
      <div className={styles.itemContent}>{children}</div>
    </div>
  );
};
