import React, { Component, ReactNode, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { cloneItem } from './cloneItem';
import { styles } from '../utils/styles';
import {
  MenuItemEventHandler,
  TriggerEvent,
  StyleProps,
  InternalProps
} from '../types';

export interface SubMenuProps extends StyleProps, InternalProps {
  /**
   * Any valid node that can be rendered
   */
  label: ReactNode;

  /**
   * Any valid node that can be rendered
   */
  children: ReactNode;

  /**
   * Render a custom arrow
   */
  arrow: ReactNode;

  /**
   * Disable or not the `Submenu`. If a function is used, a boolean must be returned
   */
  disabled: boolean | ((args: MenuItemEventHandler) => boolean);
}

interface SubMenuState {
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
}

class Submenu extends Component<SubMenuProps, SubMenuState> {
  static propTypes = {
    label: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    nativeEvent: PropTypes.object,
    arrow: PropTypes.node,
    disabled: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    className: PropTypes.string,
    style: PropTypes.object
  };
  static defaultProps = {
    arrow: '▶',
    disabled: false,
    nativeEvent: {} as TriggerEvent
  };

  state = {
    left: '100%',
    top: 0,
    bottom: 'initial'
  };

  menu!: HTMLElement;

  setRef = (ref: HTMLDivElement) => {
    this.menu = ref;
  };

  componentDidMount() {
    const { innerWidth, innerHeight } = window;
    const rect = this.menu.getBoundingClientRect();
    const style: SubMenuState = {};

    if (rect.right < innerWidth) {
      style.left = '100%';
      style.right = undefined;
    } else {
      style.right = '100%';
      style.left = undefined;
    }

    if (rect.bottom > innerHeight) {
      style.bottom = 0;
      style.top = 'initial';
    } else {
      style.bottom = 'initial';
      style.top = 0;
    }

    this.setState(style);
  }

  handleClick(e: SyntheticEvent) {
    e.stopPropagation();
  }

  render() {
    const {
      arrow,
      disabled,
      className,
      style,
      label,
      nativeEvent,
      children,
      propsFromTrigger
    } = this.props;

    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]:
        typeof disabled === 'function'
          ? disabled({
              event: nativeEvent as TriggerEvent,
              props: { ...propsFromTrigger }
            })
          : disabled
    });

    const submenuStyle = {
      ...style,
      ...this.state
    };

    return (
      <div className={cssClasses} role="presentation">
        <div className={styles.itemContent} onClick={this.handleClick}>
          {label}
          <span className={styles.submenuArrow}>{arrow}</span>
        </div>
        <div className={styles.submenu} ref={this.setRef} style={submenuStyle}>
          {cloneItem(children, {
            propsFromTrigger,
            nativeEvent: nativeEvent as TriggerEvent
          })}
        </div>
      </div>
    );
  }
}

export { Submenu };
