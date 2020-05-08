import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { styles } from '../utils/styles';
import {
  MenuItemEventHandler,
  TriggerEvent,
  StyleProps,
  InternalProps
} from '../types';

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
  disabled: boolean | ((args: MenuItemEventHandler) => boolean);

  /**
   * Hide or not the `Item`. If a function is used, a boolean must be returned
   */
  hidden: boolean | ((args: MenuItemEventHandler) => boolean);

  /**
   * Callback when the current `Item` is clicked. The callback give you access to the current event and also the data passed
   * to the `Item`.
   * `({ event, props }) => ...`
   */
  onClick: (args: MenuItemEventHandler) => any;
}

const noop = () => {};

class Item extends Component<ItemProps> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.object,
    disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    hidden: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onClick: PropTypes.func,
    nativeEvent: PropTypes.object,
    propsFromTrigger: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    disabled: false,
    hidden: false,
    onClick: noop
  };

  isDisabled: boolean;
  isHidden: boolean;

  constructor(props: ItemProps) {
    super(props);
    const { disabled, hidden, nativeEvent, propsFromTrigger, data } = this.props;

    this.isDisabled =
      typeof disabled === 'function'
        ? disabled({
            event: nativeEvent as TriggerEvent,
            props: { ...propsFromTrigger, ...data }
          })
        : disabled;

    this.isHidden =
      typeof hidden === "function"
        ? hidden({
            event: nativeEvent as TriggerEvent,
            props: { ...propsFromTrigger, ...data },
          })
        : hidden;
  }

  handleClick = (e: React.MouseEvent) => {
    this.isDisabled
      ? e.stopPropagation()
      : this.props.onClick({
          event: this.props.nativeEvent as TriggerEvent,
          props: { ...this.props.propsFromTrigger, ...this.props.data }
        });
  };

  render() {
    const { className, style, children } = this.props;

    if (this.isHidden) {
      return null
    }

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
