import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cssClasses from './../cssClasses';
import cx from 'classnames';

class Item extends PureComponent {
  static propTypes = {
    label: PropTypes.node.isRequired,
    icon: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    data: PropTypes.any,
    target: PropTypes.any
  };

  static defaultProps = {
    icon: '',
    leftIcon: '',
    rightIcon: '',
    disabled: false,
    onClick: () => {}
  };

  handleClick = () => this.props.onClick(this, this.props.target);

  buildItem() {
    return (
      <div className={cssClasses.ITEM_DATA}>
        {this.hasIcon()}
        {this.props.label}
      </div>
    );
  }

  hasIcon() {
    return this.props.icon.length > 0
            ? <span className={`${cssClasses.ITEM_ICON} ${this.props.icon}`} />
            : '';
  }

  render() {
    const className = cx(cssClasses.ITEM, {
      [`${cssClasses.ITEM_DISABLED}`]: this.props.disabled
    });
    return (
      <div className={className} onClick={this.handleClick}>
        {this.buildItem()}
      </div>
    );
  }
}

export default Item;
