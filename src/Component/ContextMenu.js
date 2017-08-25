/* global: window */
import React, { Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Proxy from './Proxy';
import Item from './Item';
import cssClasses from './../cssClasses';
import eventManager from '../util/eventManager';
import childrenOfType from '../util/childrenOfType';

class ContextMenu extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    children: childrenOfType(Item).isRequired,
    REF_CONTAINER: PropTypes.object.isRequired,
    theme: PropTypes.string,
    animation: PropTypes.string
  };

  static defaultProps = {
    theme: null,
    animation: null
  };

  static THEME = {
    light: 'light',
    dark: 'dark'
  };

  static ANIMATION = {
    fade: 'fade',
    flip: 'flip',
    pop: 'pop',
    zoom: 'zoom'
  };

  constructor(props) {
    super(props);
    this.menuState = {
      x: 0,
      y: 0,
      visible: false,
      targetNode: null
    };
    this.menu = null;
    this.refsFromProvider = null;
  }

  componentDidMount() {
    eventManager.on(`display::${this.props.id}`, (e, refsFromProvider) => this.show(e, refsFromProvider));
    eventManager.on('hideAll', this.hide);
  }

  componentWillUnmount() {
    eventManager.off(`display::${this.props.id}`);
    eventManager.off('hideAll');
  }

  bindWindowEvent = () => {
    window.addEventListener('resize', this.hide);
    window.addEventListener('contextmenu', this.hide);
    window.addEventListener('mousedown', this.hide);
    window.addEventListener('click', this.hide);
    window.addEventListener('scroll', this.hide);
  };

  unBindWindowEvent = () => {
    window.removeEventListener('resize', this.hide);
    window.removeEventListener('contextmenu', this.hide);
    window.removeEventListener('mousedown', this.hide);
    window.removeEventListener('click', this.hide);
    window.removeEventListener('scroll', this.hide);
  };

  onMouseEnter = () => window.removeEventListener('mousedown', this.hide);

  onMouseLeave = () => window.addEventListener('mousedown', this.hide);

  hide = e => {
    // Firefox trigger a click event when you mouse up on contextmenu event
    if (typeof e !== 'undefined' && e.button === 2 && e.type !== 'contextmenu') {
      return;
    }
    this.unBindWindowEvent();
    this.menuState.visible = false;
    this.props.REF_CONTAINER.proxyRender(null);
  };

  setRef = ref => {
    this.menu = ref;
  };

  setMenuPosition() {
    const browserSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const menuSize = {
      width: this.menu.offsetWidth,
      height: this.menu.offsetHeight
    };

    let { x, y } = this.menuState;

    if ((x + menuSize.width) > browserSize.width) {
      x -= ((x + menuSize.width) - browserSize.width);
    }

    if ((y + menuSize.height) > browserSize.height) {
      y -= ((y + menuSize.height) - browserSize.height);
    }

    this.menuState.x = x;
    this.menuState.y = y;
    this.bindWindowEvent();
  }

  getMousePosition(e) {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };

    if (e.type === 'touchend' && (pos.x === null || pos.y === null)) {
      const touches = e.changedTouches;

      if (touches !== null && touches.length > 0) {
        pos.x = touches[0].clientX;
        pos.y = touches[0].clientY;
      }
    }
    // just covering my ass I guess
    if (pos.x === null || pos.x < 0) {
      pos.x = 0;
    }

    if (pos.y === null || pos.y < 0) {
      pos.y = 0;
    }

    return pos;
  }

  cloneItem = item => React.cloneElement(item, {
    targetNode: this.menuState.targetNode,
    refsFromProvider: this.refsFromProvider
  });

  getMenuItem() {
    return React.Children.map(
      React.Children.toArray(this.props.children).filter(isValidElement),
      this.cloneItem,
    );
  }

  getMenuStyle() {
    return {
      left: this.menuState.x,
      top: this.menuState.y + 1,
      opacity: 1
    };
  }

  getMenuClasses() {
    const { theme, animation } = this.props;

    return cx(
      cssClasses.MENU,
      {
        [cssClasses.THEME + theme]: theme !== null,
        [cssClasses.ANIMATION_WILL_ENTER + animation]: animation !== null
      }
    );
  }

  show = (e, refsFromProvider) => {
    e.stopPropagation();
    eventManager.emit('hideAll');
    this.refsFromProvider = refsFromProvider;

    const { x, y } = this.getMousePosition(e);
    this.menuState = {
      visible: true,
      x,
      y,
      targetNode: e.target
    };
    // Render to get ref
    this.proxyRender();
    // Adjust position with ref and render again
    this.setMenuPosition();
    this.proxyRender();
  };

  proxyRender = () => {
    this.props.REF_CONTAINER.proxyRender(
      <div
        className={this.getMenuClasses()}
        style={this.getMenuStyle()}
        ref={this.setRef}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div>
          {this.getMenuItem()}
        </div>
      </div>
    );
  }

  render() {
    return null;
  }
}

export default Proxy(ContextMenu);
