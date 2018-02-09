/* global: window */
import React, { Component, isValidElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Item from './Item';
import styles from './styles';
import eventManager from '../util/eventManager';
import childrenOfType from '../util/childrenOfType';

class ContextMenu extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    children: childrenOfType(Item).isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    theme: PropTypes.string,
    animation: PropTypes.string
  };

  static defaultProps = {
    className: '',
    style: {},
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

  state = {
    x: 0,
    y: 0,
    visible: false,
    targetNode: null
  };

  menu = null;
  refsFromProvider = null;
  token = null;
  unsub = [];

  componentDidMount() {
    this.unsub.push(
      eventManager.on(`display::${this.props.id}`, (e, refsFromProvider) =>
        this.show(e, refsFromProvider)
      )
    );

    this.unsub.push(eventManager.on('hideAll', this.hide));
  }

  componentWillUnmount() {
    this.unsub.forEach(cb => cb());
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
    if (
      typeof e !== 'undefined' &&
      e.button === 2 &&
      e.type !== 'contextmenu'
    ) {
      return;
    }
    this.unBindWindowEvent();
    this.setState({ visible: false });
  };

  setRef = ref => {
    this.menu = ref;
  };

  setMenuPosition() {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    const { offsetWidth: menuWidth, offsetHeight: menuHeight } = this.menu;
    let { x, y } = this.state;

    if (x + menuWidth > windowWidth) {
      x -= x + menuWidth - windowWidth;
    }

    if (y + menuHeight > windowHeight) {
      y -= y + menuHeight - windowHeight;
    }

    this.setState(
      {
        x,
        y
      },
      this.bindWindowEvent
    );
  }

  getMousePosition(e) {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };

    if (
      e.type === 'touchend' &&
      (pos.x === null || pos.y === null) &&
      (e.changedTouches !== null && e.changedTouches.length > 0)
    ) {
      pos.x = e.changedTouches[0].clientX;
      pos.y = e.changedTouches[0].clientY;
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

  cloneItem = item =>
    React.cloneElement(item, {
      targetNode: this.state.targetNode,
      refsFromProvider: this.refsFromProvider
    });

  getMenuItem() {
    return React.Children.map(this.props.children, this.cloneItem);
  }

  show = (e, refsFromProvider) => {
    e.stopPropagation();
    eventManager.emit('hideAll');
    this.refsFromProvider = refsFromProvider;

    const { x, y } = this.getMousePosition(e);

    this.setState(
      {
        visible: true,
        x,
        y,
        targetNode: e.target
      },
      this.setMenuPosition
    );
  };

  render() {
    const { theme, animation, style, className } = this.props;
    const cssClasses = cx(styles.menu, className, {
      [styles.theme + theme]: theme !== null,
      [styles.animationWillEnter + animation]: animation !== null
    });
    const menuStyle = {
      ...style,
      left: this.state.x,
      top: this.state.y + 1,
      opacity: 1
    };

    return this.state.visible ? (
      <div
        className={cssClasses}
        style={menuStyle}
        ref={this.setRef}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div>{this.getMenuItem()}</div>
      </div>
    ) : null;
  }
}

export default ContextMenu;
