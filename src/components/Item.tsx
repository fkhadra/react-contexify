import React, { ReactNode, useRef } from 'react';
import cx from 'clsx';

import {
  ItemParams,
  InternalProps,
  BooleanPredicate,
  HandlerParamsEvent,
  BuiltInOrString,
} from '../types';
import { useRefTrackerContext } from './RefTrackerProvider';
import { NOOP, STYLE } from '../constants';
import { getPredicateValue } from './utils';
import { contextMenu } from '../core';

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
  data?: any;

  /**
   * Disable `Item`. If a function is used, a boolean must be returned
   *
   * @param id The item id, when defined
   * @param props The props passed when you called `show(e, {props: yourProps})`
   * @param data The data defined on the `Item`
   * @param triggerEvent The event that triggered the context menu
   *
   *
   * ```
   * function isItemDisabled({ triggerEvent, props, data }: PredicateParams<type of props, type of data>): boolean
   * <Item disabled={isItemDisabled} data={data}>content</Item>
   * ```
   */
  disabled?: BooleanPredicate;

  /**
   * Hide the `Item`. If a function is used, a boolean must be returned
   *
   * @param id The item id, when defined
   * @param props The props passed when you called `show(e, {props: yourProps})`
   * @param data The data defined on the `Item`
   * @param triggerEvent The event that triggered the context menu
   *
   *
   * ```
   * function isItemHidden({ triggerEvent, props, data }: PredicateParams<type of props, type of data>): boolean
   * <Item hidden={isItemHidden} data={data}>content</Item>
   * ```
   */
  hidden?: BooleanPredicate;

  /**
   * Callback when the `Item` is clicked.
   *
   * @param id The item id, when defined
   * @param event The event that occured on the Item node
   * @param props The props passed when you called `show(e, {props: yourProps})`
   * @param data The data defined on the `Item`
   * @param triggerEvent The event that triggered the context menu
   *
   * ```
   * function handleItemClick({ id, triggerEvent, event, props, data }: ItemParams<type of props, type of data>){
   *    // retrieve the id of the Item
   *    console.log(id) // item-id
   *
   *    // access any other dom attribute
   *    console.log(event.currentTarget.dataset.foo) // 123
   *
   *    // access the props and the data
   *    console.log(props, data);
   *
   *    // access the coordinate of the mouse when the menu has been displayed
   *    const {  clientX, clientY } = triggerEvent;
   * }
   *
   * <Item id="item-id" onClick={handleItemClick} data={{key: 'value'}} data-foo={123} >Something</Item>
   * ```
   */
  onClick?: (args: ItemParams) => void;

  /**
   * Useful when using form input inside the Menu
   *
   * default: `true`
   */
  closeOnClick?: boolean;

  /**
   * Let you specify another event for the `onClick` handler
   *
   * default: `onClick`
   */
  handlerEvent?: BuiltInOrString<'onClick' | 'onMouseDown' | 'onMouseUp'>;
}

export const Item: React.FC<ItemProps> = ({
  id,
  children,
  className,
  style,
  triggerEvent,
  data,
  propsFromTrigger,
  onClick = NOOP,
  disabled = false,
  hidden = false,
  closeOnClick = true,
  handlerEvent = 'onClick',
  ...rest
}) => {
  const nodeRef = useRef<HTMLElement>();
  const refTracker = useRefTrackerContext();
  const handlerParams = {
    id,
    data,
    triggerEvent: triggerEvent as HandlerParamsEvent,
    props: propsFromTrigger,
  } as ItemParams;
  const isDisabled = getPredicateValue(disabled, handlerParams);
  const isHidden = getPredicateValue(hidden, handlerParams);

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    handlerParams.event = e;
    e.stopPropagation();

    if (!isDisabled) {
      !closeOnClick ? onClick(handlerParams) : dispatchUserHanlder();
    }
  }

  // provide a feedback to the user that the item has been clicked before closing the menu
  function dispatchUserHanlder() {
    const node = nodeRef.current!;
    node.addEventListener('animationend', contextMenu.hideAll, { once: true });
    node.classList.add(STYLE.itemClickedFeedback);
    onClick(handlerParams);
  }

  function trackRef(node: HTMLElement | null) {
    if (node && !isDisabled) {
      nodeRef.current = node;
      refTracker.set(node, {
        node,
        isSubmenu: false,
      });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter') {
      e.stopPropagation();
      handlerParams.event = e;
      dispatchUserHanlder();
    }
  }

  if (isHidden) return null;

  return (
    <div
      {...{ ...rest, [handlerEvent]: handleClick }}
      className={cx(STYLE.item, className, {
        [`${STYLE.itemDisabled}`]: isDisabled,
      })}
      style={style}
      onKeyDown={handleKeyDown}
      ref={trackRef}
      tabIndex={-1}
      role="menuitem"
      aria-disabled={isDisabled}
    >
      <div className={STYLE.itemContent}>{children}</div>
    </div>
  );
};
