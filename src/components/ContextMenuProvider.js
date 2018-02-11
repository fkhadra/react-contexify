import {
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.node.isRequired,
    renderTag: PropTypes.node,
    event: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    storeRef: PropTypes.bool,
    data: PropTypes.any
  };

  static defaultProps = {
    renderTag: 'div',
    event: 'onContextMenu',
    className: null,
    style: {},
    storeRef: false,
    data: null
  };

  childrenRefs = [];

  handleEvent = e => {
    e.preventDefault();
    eventManager.emit(
      `display::${this.props.id}`,
      e.nativeEvent,
      this.childrenRefs,
      this.props.data
    );
  };

  getChildren() {
    const {
      id,
      renderTag,
      event,
      children,
      className,
      style,
      storeRef,
      data,
      ...rest
    } = this.props;

    // reset refs
    this.childrenRefs = [];
    // use a new ref callback function each time, so that it is guaranteed to be called on each render
    const setChildRef = ref => ref === null || this.childrenRefs.push(ref);

    return Children.map(
      children,
      child =>
        isValidElement(child)
          ? cloneElement(child, {
              ...rest,
              ...(storeRef ? { ref: setChildRef } : {})
            })
          : child
    );
  }

  render() {
    const { renderTag, event, className, style } = this.props;
    const attributes = {
      [event]: this.handleEvent,
      className,
      style
    };

    return createElement(renderTag, attributes, this.getChildren());
  }
}

export default ContextMenuProvider;
