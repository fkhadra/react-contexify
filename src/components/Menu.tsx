/* global: window */
import React, { ReactNode, useEffect, useReducer, useRef } from 'react';
import cx from 'classnames';

import { cloneItem } from './cloneItem';
import { Portal, PortalProps } from './Portal';

import { HIDE_ALL, DISPLAY_MENU } from '../utils/actions';
import { styles } from '../utils/styles';
import { eventManager } from '../core/eventManager';
import { TriggerEvent, StyleProps, MenuId } from '../types';
import { usePrevious } from '../hooks';

export interface MenuProps extends StyleProps, PortalProps {
  /**
   * Unique id to identify the menu. Use to Trigger the corresponding menu
   */
  id: MenuId;

  /**
   * Any valid node that can be rendered
   */
  children: ReactNode;

  /**
   * Theme is appended to `react-contexify__theme--${given theme}`.
   *
   * Built-in theme are `light` and `dark`
   */
  theme?: string;

  /**
   * Animation is appended to `.react-contexify__will-enter--${given animation}`
   *
   * Built-in animations are fade, flip, pop, zoom
   */
  animation?: string;

  /**
   * Invoked when the menu is shown.
   */
  onShown?: () => void;

  /**
   * Invoked when the menu is hidden.
   */
  onHidden?: () => void;
}

interface MenuState {
  x: number;
  y: number;
  visible: boolean;
  nativeEvent: TriggerEvent;
  propsFromTrigger: object;
}

function reducer(state: MenuState, payload: Partial<MenuState>) {
  return { ...state, ...payload };
}

function getMousePosition(e: TriggerEvent) {
  const pos = {
    x: e.clientX,
    y: e.clientY,
  };

  if (
    e.type === 'touchend' &&
    (!pos.x || !pos.y) &&
    e.changedTouches &&
    e.changedTouches.length > 0
  ) {
    pos.x = e.changedTouches[0].clientX;
    pos.y = e.changedTouches[0].clientY;
  }

  if (!pos.x || pos.x < 0) {
    pos.x = 0;
  }

  if (!pos.y || pos.y < 0) {
    pos.y = 0;
  }

  return pos;
}

const noop = () => {
  console.log('HERE UPDATE');
};

export const Menu: React.FC<MenuProps> = ({
  id,
  theme,
  animation,
  style,
  className,
  children,
  mountNode,
  onHidden = noop,
  onShown = noop,
}) => {
  const [state, setState] = useReducer(reducer, {
    x: 0,
    y: 0,
    visible: false,
    nativeEvent: {} as TriggerEvent,
    propsFromTrigger: {},
  });
  const nodeRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);
  const wasVisible = usePrevious(state.visible);

  useEffect(() => {
    if (didMount.current && state.visible !== wasVisible) {
      state.visible ? onShown() : onHidden();
    }
  }, [state.visible, onHidden, onShown]);

  useEffect(() => {
    didMount.current = true;

    eventManager.on(DISPLAY_MENU(id), show).on(HIDE_ALL, hide);

    return () => {
      eventManager.off(DISPLAY_MENU(id), show).off(HIDE_ALL, hide);
    };
  }, []);

  useEffect(() => {
    if (state.visible) {
      const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
      const {
        offsetWidth: menuWidth,
        offsetHeight: menuHeight,
      } = nodeRef.current!;
      let { x, y } = state;

      if (x + menuWidth > windowWidth) {
        x -= x + menuWidth - windowWidth;
      }

      if (y + menuHeight > windowHeight) {
        y -= y + menuHeight - windowHeight;
      }

      setState({
        x,
        y,
      });

      window.addEventListener('resize', hide);
      window.addEventListener('contextmenu', hide);
      window.addEventListener('click', hide);
      window.addEventListener('scroll', hide);
      window.addEventListener('keydown', handleKeyboard);
    } else {
      window.removeEventListener('resize', hide);
      window.removeEventListener('contextmenu', hide);
      window.removeEventListener('click', hide);
      window.removeEventListener('scroll', hide);
      window.removeEventListener('keydown', handleKeyboard);
    }
  }, [state.visible]);

  function handleKeyboard(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setState({ visible: false });
    }
  }

  function show({ event, props }: { event: TriggerEvent; props: object }) {
    event.stopPropagation();
    const { x, y } = getMousePosition(event);

    setState({
      visible: true,
      x,
      y,
      nativeEvent: event,
      propsFromTrigger: props,
    });
  }

  function hide(event?: Event) {
    // Safari trigger a click event when you ctrl + trackpad
    // Firefox:  trigger a click event when right click occur
    const e = event as KeyboardEvent & MouseEvent;

    if (
      typeof e !== 'undefined' &&
      (e.button === 2 || e.ctrlKey === true) &&
      e.type !== 'contextmenu'
    ) {
      return;
    }

    setState({ visible: false });
  }

  function onMouseEnter() {
    window.removeEventListener('mousedown', hide);
  }

  function onMouseLeave() {
    window.addEventListener('mousedown', hide);
  }

  const cssClasses = cx(styles.menu, className, {
    [styles.theme + theme]: theme,
    [styles.animationWillEnter + animation]: animation,
  });
  const { visible, nativeEvent, propsFromTrigger, x, y } = state;
  const menuStyle = {
    ...style,
    left: x,
    top: y + 1,
    opacity: 1,
  };

  return (
    <Portal mountNode={mountNode}>
      {visible && (
        <div
          className={cssClasses}
          style={menuStyle}
          ref={nodeRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div>
            {cloneItem(children, {
              nativeEvent,
              propsFromTrigger,
            })}
          </div>
        </div>
      )}
    </Portal>
  );
};
