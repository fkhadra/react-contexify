import React, { ReactNode, useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import { cloneItem } from './cloneItem';
import { styles } from '../utils/styles';
import {
  MenuItemEventHandler,
  TriggerEvent,
  StyleProps,
  InternalProps,
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
  arrow?: ReactNode;

  /**
   * Disable or not the `Submenu`. If a function is used, a boolean must be returned
   */
  disabled?: boolean | ((args: MenuItemEventHandler) => boolean);
}

interface SubMenuState {
  left?: string | number;
  right?: string | number;
  top?: string | number;
  bottom?: string | number;
}

export const Submenu: React.FC<SubMenuProps> = ({
  arrow = '▶',
  children,
  disabled = false,
  label,
  className,
  nativeEvent,
  propsFromTrigger,
  style,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<SubMenuState>({
    left: '100%',
    top: 0,
    bottom: 'initial',
  });

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    const rect = nodeRef.current!.getBoundingClientRect();
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

    setPosition(style);
  }, []);

  function handleClick(e: React.SyntheticEvent) {
    e.stopPropagation();
    console.log('HERE');
  }

  const cssClasses = cx(styles.item, className, {
    [`${styles.itemDisabled}`]:
      typeof disabled === 'function'
        ? disabled({
            event: nativeEvent as TriggerEvent,
            props: { ...propsFromTrigger },
          })
        : disabled,
  });

  const submenuStyle = {
    ...style,
    ...position,
  };

  return (
    <div className={cssClasses} role="presentation">
      <div className={styles.itemContent} onClick={handleClick}>
        {label}
        <span className={styles.submenuArrow}>{arrow}</span>
      </div>
      <div className={styles.submenu} ref={nodeRef} style={submenuStyle}>
        {cloneItem(children, {
          propsFromTrigger,
          nativeEvent: nativeEvent as TriggerEvent,
        })}
      </div>
    </div>
  );
};
