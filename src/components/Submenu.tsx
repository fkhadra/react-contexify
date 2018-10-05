import React, { Component, ReactNode, SyntheticEvent } from 'react';
import cx from 'classnames';

import { cloneItem } from './cloneItem';
import { styles } from '../utils/styles';
import { EventHandlerCallback, TriggerEvent } from '../types/index';

interface SubMenuProps {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  style?: object;
  nativeEvent: MouseEvent | TouchEvent;
  arrow: ReactNode;
  disabled: boolean | ((args: EventHandlerCallback) => boolean);
}

interface SubMenuState {
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
}

class Submenu extends Component<SubMenuProps, SubMenuState> {
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

  private menu!: HTMLElement;

  setRef = (ref: HTMLDivElement) => {
    this.menu = ref;
  };

  componentDidMount() {
    const { innerWidth, innerHeight } = window;
    const rect = this.menu.getBoundingClientRect();
    const style: SubMenuState = {};

    if (rect.right < innerWidth) {
      style.left = '100%';
    } else {
      style.right = '100%';
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
      children
    } = this.props;

    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]:
        typeof disabled === 'function'
          ? disabled({
            event: nativeEvent
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
            nativeEvent
          })}
        </div>
      </div>
    );
  }
}

export { Submenu };
