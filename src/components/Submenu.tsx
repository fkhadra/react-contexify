import React, { ReactNode, useEffect, useRef, useState } from 'react';
import cx from 'clsx';

import { InternalProps, BooleanPredicate, HandlerParamsEvent } from '../types';
import { RefTrackerProvider, useRefTrackerContext } from './RefTrackerProvider';
import { useRefTracker } from '../hooks';
import { STYLE } from '../constants';
import { cloneItems, getPredicateValue } from './utils';

export interface SubMenuProps
  extends InternalProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'hidden'> {
  /**
   * Any valid node that can be rendered
   */
  label: ReactNode;

  /**
   * Any valid node that can be rendered
   */
  children: ReactNode;

  /**
   * Render a custom arrow
   */
  arrow?: ReactNode;

  /**
   * Disable the `Submenu`. If a function is used, a boolean must be returned
   */
  disabled?: BooleanPredicate;

  /**
   * Hide the `Submenu` and his children. If a function is used, a boolean must be returned
   */
  hidden?: BooleanPredicate;
}

interface SubMenuState {
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
}

export const Submenu: React.FC<SubMenuProps> = ({
  arrow = '▶',
  children,
  disabled = false,
  hidden = false,
  label,
  className,
  triggerEvent,
  propsFromTrigger,
  style,
  ...rest
}) => {
  const menuRefTracker = useRefTrackerContext();
  const refTracker = useRefTracker();
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<SubMenuState>({
    left: '100%',
    top: 0,
    bottom: 'initial',
  });
  const handlerParams = {
    triggerEvent: triggerEvent as HandlerParamsEvent,
    props: propsFromTrigger,
  };
  const isDisabled = getPredicateValue(disabled, handlerParams);
  const isHidden = getPredicateValue(hidden, handlerParams);

  useEffect(() => {
    if (nodeRef.current) {
      const { innerWidth, innerHeight } = window;
      const rect = nodeRef.current.getBoundingClientRect();
      const style: SubMenuState = {};

      if (rect.right < innerWidth) {
        style.left = '100%';
        style.right = undefined;
      } else {
        style.right = '100%';
        style.left = undefined;
      }

      if (rect.bottom > innerHeight) {
        style.bottom = 0;
        style.top = 'initial';
      } else {
        style.bottom = 'initial';
      }

      setPosition(style);
    }
  }, []);

  function handleClick(e: React.SyntheticEvent) {
    e.stopPropagation();
  }

  function trackRef(node: HTMLElement | null) {
    if (node && !isDisabled)
      menuRefTracker.set(node, {
        node,
        isSubmenu: true,
        submenuRefTracker: refTracker,
      });
  }

  if (isHidden) return null;

  const cssClasses = cx(STYLE.item, className, {
    [`${STYLE.itemDisabled}`]: isDisabled,
  });

  const submenuStyle = {
    ...style,
    ...position,
  };

  return (
    <RefTrackerProvider refTracker={refTracker}>
      <div
        {...rest}
        className={cssClasses}
        ref={trackRef}
        tabIndex={-1}
        role="menuitem"
        aria-haspopup
        aria-disabled={isDisabled}
      >
        <div className={STYLE.itemContent} onClick={handleClick}>
          {label}
          <span className={STYLE.submenuArrow}>{arrow}</span>
        </div>
        <div className={STYLE.submenu} ref={nodeRef} style={submenuStyle}>
          {cloneItems(children, {
            propsFromTrigger,
            // injected by the parent
            triggerEvent: triggerEvent!,
          })}
        </div>
      </div>
    </RefTrackerProvider>
  );
};
