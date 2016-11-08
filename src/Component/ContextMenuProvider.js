import React, { Component, PropTypes, createElement, cloneElement } from 'react';
import eventManager from './../Utils/eventManager';
import cssClasses from './../cssClasses';

const propTypes = {
  menuId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  renderTag: PropTypes.node,
  event: PropTypes.string
};

const defaultProps = {
  renderTag: 'div',
  event: 'onContextMenu'
};

class ContextMenuProvider extends Component {

  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(e) {
    e.preventDefault();
    eventManager.emit(`display::${this.props.menuId}`, e.nativeEvent);
  }

  render() {
    const attributes = {
      [this.props.event]: this.handleEvent,
      className: cssClasses.PROVIDER
    };
    //pull out provider props
    const { menuId, renderTag, event, ...rest } = this.props;

    return createElement(
      this.props.renderTag,
      attributes,
      cloneElement(this.props.children, {...rest})
    );
  }
}

ContextMenuProvider.propTypes = propTypes;
ContextMenuProvider.defaultProps = defaultProps;

export default ContextMenuProvider;
