/* global: window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

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
    theme: PropTypes.string,
    animation: PropTypes.string
  };

  static defaultProps = {
    theme: null,
    animation: null
  };

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      visible: false,
      target: null
    };
    this.menu = null;
  }

  componentDidMount() {
    eventManager.on(`display::${this.props.id}`, e => this.show(e));
  }

  componentWillUnmount() {
    eventManager.off(`display::${this.props.id}`);
  }

  bindWindowEvent = () => {
    window.addEventListener('resize', this.hide);
    window.addEventListener('contextmenu', this.hide);
    window.addEventListener('click', this.hide);
    window.addEventListener('scroll', this.hide);
  };

  unBindWindowEvent = () => {
    window.removeEventListener('resize', this.hide);
    window.removeEventListener('contextmenu', this.hide);
    window.removeEventListener('click', this.hide);
    window.removeEventListener('scroll', this.hide);
  };

  hide = () => {
    this.unBindWindowEvent();
    this.setState({ visible: false });
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

    let { x, y } = this.state;

    if ((x + menuSize.width) > browserSize.width) {
      x -= ((x + menuSize.width) - browserSize.width);
    }

    if ((y + menuSize.height) > browserSize.height) {
      y -= ((y + menuSize.height) - browserSize.height);
    }

    this.setState({
      x,
      y
    });
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

  getMenuItem() {
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, { target: this.state.target })
    );
  }

  getMenuStyle() {
    return {
      left: this.state.x,
      top: this.state.y + 1,
      opacity: 1
    };
  }

  getMenuClasses() {
    const { theme, animation } = this.props;

    return cx(
      cssClasses.MENU,
      {
        [`react-contexify-menu__theme--${theme}`]: theme !== null,
        [`${animation}`]: animation !== null
      }
    );
  }

  show = e => {
    e.stopPropagation();
    const { x, y } = this.getMousePosition(e);
    this.bindWindowEvent();
    this.setState({
      visible: true,
      x,
      y,
      target: e.target
    }, this.setMenuPosition);

  };

  render() {
    return this.state.visible
      ?
        <div
          className={this.getMenuClasses()}
          style={this.getMenuStyle()}
          ref={this.setRef}
        >
          <div>
            {this.getMenuItem()}
          </div>
        </div>
      : null;
  }
}

export default ContextMenu;
