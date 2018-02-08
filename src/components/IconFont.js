import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import cssClasses from './../cssClasses';

class IconFont extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
  };

  static defaultProps = {
    className: '',
    style: {},
    children: ''
  };

  render() {
    const className = cx(cssClasses.ITEM_ICON, this.props.className);
    const attributes = Object.assign(
      { className },
      Object.keys(this.props.style).length > 0 ? { style: this.props.style } : {}
    );

    return <i {...attributes}>{this.props.children}</i>;
  }
}

export default IconFont;
