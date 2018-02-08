import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import cssClasses from './../cssClasses';

class Item extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    targetNode: PropTypes.object,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    data: PropTypes.any,
    refsFromProvider: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ])
  };

  static defaultProps = {
    leftIcon: '',
    rightIcon: '',
    disabled: false,
    onClick: () => {
    },
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

  buildItem() {
    return (
      <div className={cssClasses.ITEM_DATA}>
        {this.props.leftIcon}
        {this.props.children}
        {this.props.rightIcon}
      </div>
    );
  }

  render() {
    const className = cx(cssClasses.ITEM, {
      [`${cssClasses.ITEM_DISABLED}`]: this.props.disabled
    });

    return (
      <div className={className} onClick={this.handleClick} role="presentation">
        {this.buildItem()}
      </div>
    );
  }
}

export default Item;
