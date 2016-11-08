import React, { Component, PropTypes, createElement, Children, cloneElement } from 'react';
import eventManager from './../Utils/eventManager';
import cssClasses from './../cssClasses';

const propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  renderTag: PropTypes.node,
  event: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

const defaultProps = {
  renderTag: 'div',
  event: 'onContextMenu',
  className: '',
  style: ''
};

class ContextMenuProvider extends Component {

  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(e) {
    e.preventDefault();
    eventManager.emit(`display::${this.props.id}`, e.nativeEvent);
  }

  getChildren() {
    const { id, renderTag, event, children, className, style, ...rest } = this.props;
    return Children.map(this.props.children, child => cloneElement(child, {...rest}));
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

ContextMenuProvider.propTypes = propTypes;
ContextMenuProvider.defaultProps = defaultProps;

export default ContextMenuProvider;
