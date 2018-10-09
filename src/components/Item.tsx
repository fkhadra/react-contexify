import React, { Component, ReactNode } from 'react';
//import PropTypes from 'prop-types';
import cx from 'classnames';

import { styles } from '../utils/styles';
import { EventHandlerCallback, TriggerEvent, StyleProps } from '../types';

export interface ItemProps extends StyleProps {
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
  disabled: boolean | ((args: EventHandlerCallback) => boolean);

  /**
   * Callback when the current `Item` is clicked. The callback give you access to the current event and also the data passed
   * to the `Item`.
   * `({ event, props }) => ...`
   */
  onClick: (args: EventHandlerCallback) => any;

  /**
   * INTERNAL USE ONLY: `MouseEvent` or `TouchEvent`
   */
  nativeEvent?: TriggerEvent;

  /**
   * INTERNAL USE ONLY: Passed to the Item onClick callback. Accessible via `props`
   */
  propsFromTrigger?: object;
}

const noop = () => {};

class Item extends Component<ItemProps> {
  static defaultProps = {
    disabled: false,
    onClick: noop
  };

  private isDisabled: boolean;

  public constructor(props: ItemProps) {
    super(props);
    const { disabled, nativeEvent, propsFromTrigger, data } = this.props;

    this.isDisabled =
      typeof disabled === 'function'
        ? disabled({
            event: nativeEvent as TriggerEvent,
            props: { ...propsFromTrigger, ...data }
          })
        : disabled;
  }

  private handleClick = (e: React.MouseEvent) => {
    this.isDisabled
      ? e.stopPropagation()
      : this.props.onClick({
          event: this.props.nativeEvent as TriggerEvent,
          props: { ...this.props.propsFromTrigger, ...this.props.data }
        });
  };

  public render() {
    const { className, style, children } = this.props;

    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]: this.isDisabled
    });

    return (
      <div
        className={cssClasses}
        style={style}
        onClick={this.handleClick}
        role="presentation"
      >
        <div className={styles.itemContent}>{children}</div>
      </div>
    );
  }
}

export { Item };
