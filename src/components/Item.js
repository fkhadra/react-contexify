import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles';

class Item extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    targetNode: PropTypes.object,
    disabled: PropTypes.oneOfType(PropTypes.bool, PropTypes.func),
    onClick: PropTypes.func,
    data: PropTypes.any,
    refsFromProvider: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ])
  };

  static defaultProps = {
    className: '',
    style: {},
    disabled: false,
    onClick: () => {},
    targetNode: {},
    data: null,
    refsFromProvider: []
  };

  handleClick = e => {
    this.props.disabled
      ? e.stopPropagation()
      : this.props.onClick(
          this.props.targetNode,
          this.props.refsFromProvider,
          this.props.data
        );
  };

  render() {
    const { className, disabled, style, children, data } = this.props;
    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]:
        typeof disabled === 'function' ? disabled(data) : disabled
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
