import React, { ReactNode } from 'react';
import cx from 'clsx';

import { HandlerParams, InternalProps, BooleanPredicate } from '../types';
import { useRefTrackerContext } from './RefTrackerProvider';
import { NOOP, STYLE } from '../constants';
import { getPredicateValue } from './utils';

export interface ItemProps
  extends InternalProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'hidden' | 'disabled' | 'onClick'> {
  /**
   * Any valid node that can be rendered
   */
  children: ReactNode;

  /**
   * Passed to the `Item` onClick callback. Accessible via `data`
   */
  data?: object;

  /**
   * Disable `Item`. If a function is used, a boolean must be returned
   */
  disabled?: BooleanPredicate;

  /**
   * Hide the `Item`. If a function is used, a boolean must be returned
   */
  hidden?: BooleanPredicate;

  /**
   * Callback when the current `Item` is clicked. The callback give you access to the current `event`, the `props` and the `data` passed
   * to the `Item`.
   * `({ event, props, data }) => ...`
   */
  onClick: (args: HandlerParams) => void;
}

export const Item: React.FC<ItemProps> = ({
  children,
  className,
  style,
  nativeEvent,
  data,
  propsFromTrigger,
  onClick = NOOP,
  disabled = false,
  hidden = false,
  ...rest
}) => {
  const refTracker = useRefTrackerContext();
  const handlerParams = {
    data,
    event: nativeEvent!,
    props: propsFromTrigger,
  };
  const isDisabled = getPredicateValue(disabled, handlerParams);
  const isHidden = getPredicateValue(hidden, handlerParams);

  function handleClick(e: React.MouseEvent) {
    isDisabled ? e.stopPropagation() : onClick(handlerParams);
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
      onClick(handlerParams);
    }
  }

  if (isHidden) return null;

  const cssClasses = cx(STYLE.item, className, {
    [`${STYLE.itemDisabled}`]: isDisabled,
  });

  return (
    <div
      role="presentation"
      {...rest}
      className={cssClasses}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={trackRef}
      tabIndex={-1}
    >
      <div className={STYLE.itemContent}>{children}</div>
    </div>
  );
};
