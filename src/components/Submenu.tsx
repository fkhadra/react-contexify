import React, { ReactNode, useRef } from 'react';
import cx from 'clsx';

import { InternalProps, BooleanPredicate, HandlerParamsEvent } from '../types';
import { RefTrackerProvider, useRefTrackerContext } from './RefTrackerProvider';
import { useRefTracker } from '../hooks';
import { STYLE } from '../constants';
import { cloneItems, getPredicateValue } from './utils';
import { Arrow } from './Arrow';

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

export const Submenu: React.FC<SubMenuProps> = ({
  arrow,
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
  const handlerParams = {
    triggerEvent: triggerEvent as HandlerParamsEvent,
    props: propsFromTrigger,
  };
  const isDisabled = getPredicateValue(disabled, handlerParams);
  const isHidden = getPredicateValue(hidden, handlerParams);

  function setPosition() {
    const node = nodeRef.current;
    if (node) {
      node.style.left = '100%';
      node.style.top = '0';

      const { innerWidth, innerHeight } = window;
      const rect = node.getBoundingClientRect();

      node.style.left = rect.right < innerWidth ? '100%' : '-100%';

      if (rect.bottom > innerHeight) {
        node.style.bottom = '0';
        node.style.top = 'initial';
      } else {
        node.style.bottom = 'initial';
      }
    }
  }

  function handleClick(e: React.SyntheticEvent) {
    e.stopPropagation();
  }

  function trackRef(node: HTMLElement | null) {
    if (node && !isDisabled)
      menuRefTracker.set(node, {
        node,
        isSubmenu: true,
        submenuRefTracker: refTracker,
        setSubmenuPosition: setPosition,
      });
  }

  if (isHidden) return null;

  const cssClasses = cx(STYLE.item, className, {
    [`${STYLE.itemDisabled}`]: isDisabled,
  });

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
        onMouseEnter={setPosition}
        onTouchStart={setPosition}
      >
        <div className={STYLE.itemContent} onClick={handleClick}>
          {label}
          <span className={STYLE.submenuArrow}>{arrow || <Arrow />}</span>
        </div>
        <div className={STYLE.submenu} ref={nodeRef} style={style}>
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
