import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cssClasses from './../cssClasses';
import cx from 'classnames';

class Item extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    data: PropTypes.any,
    target: PropTypes.any
  };

  static defaultProps = {
    icon: '',
    disabled: false,
    onClick: null
  };

  constructor(props) {
    super(props);
    this.bindEvent();
  }

  bindEvent() {
    if (this.props.disabled !== true) {
      if (this.props.onClick !== null) {
        this.handleClick = () => this.props.onClick(this, this.props.target);
      } else {
                // Maybe it's unnecessary to warn
        this.handleClick = () => console.warn(`Did you forget to bind an event
                on the "${this.props.label}" item ? `);
      }
    } else {
      this.handleClick = e => e.stopPropagation();
    }
  }

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
