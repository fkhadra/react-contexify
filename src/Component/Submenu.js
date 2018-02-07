import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import cssClasses from './../cssClasses';

export default class Submenu extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    leftIcon: '',
    rightIcon: '',
    disabled: false,
    onClick: () => {},
    targetNode: {},
    data: null,
    refsFromProvider: []
  };

  render() {
    const className = cx(cssClasses.ITEM, {
      [`${cssClasses.ITEM_DISABLED}`]: this.props.disabled
    });

    return (
      <div className={className} role="presentation">
        <div className={cssClasses.ITEM_DATA}>
          {this.props.leftIcon}
          {this.props.title}
          {this.props.rightIcon}
          <span>▶</span>
        </div>
        <div className={cssClasses.SUBMENU}>{this.props.children}</div>
      </div>
    );
  }
}
