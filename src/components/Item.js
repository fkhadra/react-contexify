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
    disable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    onClick: PropTypes.func,
    data: PropTypes.object
  };

  static defaultProps = {
    className: null,
    style: {},
    disable: false,
    onClick: () => {},
    nativeEvent: {},
    propsFromTrigger: {},
    data: {}
  };

  isDisabled = false;

  handleClick = e => {
    this.isDisabled
      ? e.stopPropagation()
      : this.props.onClick({
          event: this.props.nativeEvent,
          props: { ...this.props.propsFromTrigger, ...this.props.data }
        });
  };

  render() {
    const {
      className,
      disable,
      style,
      children,
      nativeEvent,
      propsFromTrigger,
      data
    } = this.props;

    this.isDisabled =
      typeof disable === 'function'
        ? disable({
            event: nativeEvent,
            props: { ...propsFromTrigger, ...data }
          })
        : disable;

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

export default Item;
