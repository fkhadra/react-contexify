import {
  Component,
  createElement,
  Children,
  cloneElement,
  isValidElement
} from 'react';
import PropTypes from 'prop-types';

import eventManager from './../util/eventManager';

class ContextMenuProvider extends Component {
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
    storeRef: true,
    data: null
  };

  childrenRefs = [];

  handleEvent = e => {
    e.preventDefault();
    eventManager.emit(
      `display::${this.props.id}`,
      e.nativeEvent,
      this.childrenRefs.length === 1 ? this.childrenRefs[0] : this.childrenRefs,
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

    this.setChildRef = ref => ref === null || this.childrenRefs.push(ref);

    return Children.map(
      children,
      child =>
        isValidElement(child)
          ? cloneElement(child, {
              ...rest,
              ...(storeRef ? { ref: this.setChildRef } : {})
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
