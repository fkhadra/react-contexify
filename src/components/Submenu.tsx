import React, { ReactNode, useRef } from 'react';
import cx from 'clsx';

import { InternalProps, BooleanPredicate, HandlerParamsEvent } from '../types';
import {
  ItemTrackerProvider,
  useItemTrackerContext,
} from './ItemTrackerProvider';
import { useItemTracker } from '../hooks';
import { CssClass } from '../constants';
import { cloneItems, getPredicateValue } from './utils';
import { Arrow } from './Arrow';
import { RightSlot } from './RightSlot';

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
  const parentItemTracker = useItemTrackerContext();
  const itemTracker = useItemTracker();
  const submenuNode = useRef<HTMLDivElement>(null);
  const handlerParams = {
    triggerEvent: triggerEvent as HandlerParamsEvent,
    props: propsFromTrigger,
  };
  const isDisabled = getPredicateValue(disabled, handlerParams);
  const isHidden = getPredicateValue(hidden, handlerParams);

  function setPosition() {
    const node = submenuNode.current;
    if (node) {
      const bottom = `${CssClass.submenu}-bottom`;
      const right = `${CssClass.submenu}-right`;

      // reset to default position before computing position
      node.classList.remove(bottom, right);

      const rect = node.getBoundingClientRect();

      if (rect.right > window.innerWidth) node.classList.add(right);

      if (rect.bottom > window.innerHeight) node.classList.add(bottom);
    }
  }

  function trackRef(node: HTMLElement | null) {
    if (node && !isDisabled)
      parentItemTracker.set(node, {
        node,
        isSubmenu: true,
        submenuRefTracker: itemTracker,
        setSubmenuPosition: setPosition,
      });
  }

  if (isHidden) return null;

  const cssClasses = cx(CssClass.item, className, {
    [`${CssClass.itemDisabled}`]: isDisabled,
  });

  return (
    <ItemTrackerProvider value={itemTracker}>
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
        <div
          className={CssClass.itemContent}
          onClick={(e) => e.stopPropagation()}
        >
          {label}
          <RightSlot>{arrow || <Arrow />}</RightSlot>
        </div>
        <div
          className={`${CssClass.menu} ${CssClass.submenu}`}
          ref={submenuNode}
          style={style}
        >
          {cloneItems(children, {
            propsFromTrigger,
            // @ts-ignore: injected by the parent
            triggerEvent,
          })}
        </div>
      </div>
    </ItemTrackerProvider>
  );
};
