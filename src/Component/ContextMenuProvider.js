import React, { PureComponent, createElement, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import eventManager from './../Utils/eventManager';

class ContextMenuProvider extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    renderTag: PropTypes.node,
    event: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    renderTag: 'div',
    event: 'onContextMenu',
    className: '',
    style: ''
  };

  handleEvent = e => {
    e.preventDefault();
    eventManager.emit(`display::${this.props.id}`, e.nativeEvent);
  };

  getChildren() {
    const { id, renderTag, event, children, className, style, ...rest } = this.props;
    return Children.map(this.props.children, child => cloneElement(child, { ...rest }));
  }

  render() {
    const { renderTag, event, className, style } = this.props;
    const attributes = Object.assign({}, {
      [event]: this.handleEvent,
      className,
      style
    });

    return createElement(
      renderTag,
      attributes,
      this.getChildren()
    );
  }
}

export default ContextMenuProvider;
