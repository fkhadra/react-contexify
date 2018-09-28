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
    onClick: PropTypes.func,
    data: PropTypes.object
  };

  static defaultProps = {
    className: null,
    style: {},
    disabled: false,
    onClick: () => {},
    nativeEvent: {},
    propsFromTrigger: {},
    data: {}
  };

  constructor(props){
    super(props);
    const {
      disabled,
      nativeEvent,
      propsFromTrigger,
      data
    } = this.props;
    this.isDisabled =
      typeof disabled === 'function'
        ? disabled({
            event: nativeEvent,
            props: { ...propsFromTrigger, ...data }
          })
        : disabled;
  }

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
      style,
      children,
    } = this.props;

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
        <div className={this.props.customize ? '' : styles.itemContent}>{children}</div>
      </div>
    );
  }
}

export default Item;
