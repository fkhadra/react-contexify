import React, {
  PureComponent,
  createElement,
  Children,
  cloneElement,
  isValidElement
} from 'react';
import PropTypes from 'prop-types';

import eventManager from './../util/eventManager';

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
    style: {}
  };

  constructor(props) {
    super(props);
    this.childrenRefs = [];
  }

  handleEvent = e => {
    e.preventDefault();
    eventManager.emit(
      `display::${this.props.id}`,
      e.nativeEvent,
      this.childrenRefs.length === 1
        ? this.childrenRefs[0]
        : this.childrenRefs
    );
  };

  setChildrenRefs = ref => this.childrenRefs.push(ref);

  getChildren() {
    const {
      id,
      renderTag,
      event,
      children,
      className,
      style,
      ...rest
    } = this.props;

    // reset refs
    this.childrenRefs = [];

    return Children.map(this.props.children,
      child => (
        isValidElement(child)
          ? cloneElement(child, { ...rest, ref: this.setChildrenRefs })
          : child
      ));
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
