import {
  Component,
  createElement,
  Children,
  cloneElement,
  isValidElement
} from 'react';
import PropTypes from 'prop-types';

import { DISPLAY_MENU } from '../utils/actions';
import eventManager from './../utils/eventManager';

class ContextMenuProvider extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: PropTypes.node.isRequired,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    render: PropTypes.func,
    event: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    storeRef: PropTypes.bool,
    data: PropTypes.any
  };

  static defaultProps = {
    component: 'div',
    render: null,
    event: 'onContextMenu',
    className: null,
    style: {},
    storeRef: true,
    data: null
  };

  childrenRefs = [];

  handleEvent = e => {
    e.preventDefault();
    e.stopPropagation();
    eventManager.emit(DISPLAY_MENU(this.props.id), e.nativeEvent, {
      ref:
        this.childrenRefs.length === 1
          ? this.childrenRefs[0]
          : this.childrenRefs,
      ...this.props.data
    });
  };

  getChildren() {
    // remove all the props specific to the provider
    const {
      id,
      component,
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
    const { component, render, event, className, style } = this.props;
    const attributes = {
      [event]: this.handleEvent,
      className,
      style
    };

    if (typeof render === 'function') {
      return render({ ...attributes, children: this.getChildren() });
    }

    return createElement(component, attributes, this.getChildren());
  }
}

export default ContextMenuProvider;
