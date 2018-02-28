import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles';

class Item extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    nativeEvent: PropTypes.object,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    onClick: PropTypes.func,
    data: PropTypes.any,
    dataFromProvider: PropTypes.any,
    refsFromProvider: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ])
  };

  static defaultProps = {
    className: null,
    style: {},
    disabled: false,
    onClick: () => {},
    nativeEvent: {},
    data: null,
    refsFromProvider: [],
    dataFromProvider: null
  };

  handleClick = e => {
    this.props.disabled
      ? e.stopPropagation()
      : this.props.onClick({
          event: this.props.nativeEvent,
          ref: this.props.refsFromProvider,
          data: this.props.data,
          dataFromProvider: this.props.dataFromProvider
        });
  };

  render() {
    const {
      className,
      disabled,
      style,
      children,
      data,
      refsFromProvider,
      dataFromProvider,
      nativeEvent
    } = this.props;

    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]:
        typeof disabled === 'function'
          ? disabled({
              event: nativeEvent,
              ref: refsFromProvider,
              data: data,
              dataFromProvider: dataFromProvider
            })
          : disabled
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
