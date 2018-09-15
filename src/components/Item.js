import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from '../utils/styles';

class Item extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    nativeEvent: PropTypes.object,
    propsFromTrigger: PropTypes.object,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    onClick: PropTypes.func
  };

  static defaultProps = {
    className: null,
    style: {},
    disabled: false,
    onClick: () => {},
    nativeEvent: {},
    propsFromTrigger: {}
  };

  disabled = false;

  handleClick = e => {
    this.disabled
      ? e.stopPropagation()
      : this.props.onClick({
          event: this.props.nativeEvent,
          props: this.props.propsFromTrigger
        });
  };

  render() {
    const {
      className,
      disabled,
      style,
      children,
      nativeEvent,
      propsFromTrigger
    } = this.props;

    this.disabled =
      typeof disabled === 'function'
        ? disabled({
            event: nativeEvent,
            props: propsFromTrigger,
          })
        : disabled;

    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]: this.disabled
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

export default Item;
