/* global: window */
import React, {
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import cx from 'clsx';

import { Portal, PortalProps } from './Portal';
import { RefTrackerProvider } from './RefTrackerProvider';

import { eventManager } from '../core/eventManager';
import { MouseOrTouchEvent, MenuId, ContextMenuParams } from '../types';
import { usePrevious, useRefTracker } from '../hooks';
import { createMenuController } from './menuController';
import { NOOP, STYLE, EVENT } from '../constants';
import { cloneItems, getMousePosition } from './utils';

export interface MenuProps
  extends PortalProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'id'> {
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
  nativeEvent: MouseOrTouchEvent;
  propsFromTrigger: any;
}

function reducer(state: MenuState, payload: Partial<MenuState>) {
  return { ...state, ...payload };
}

export const Menu: React.FC<MenuProps> = ({
  id,
  theme,
  animation,
  style,
  className,
  children,
  mountNode,
  onHidden = NOOP,
  onShown = NOOP,
  ...rest
}) => {
  const [state, setState] = useReducer(reducer, {
    x: 0,
    y: 0,
    visible: false,
    nativeEvent: {} as MouseOrTouchEvent,
    propsFromTrigger: null,
  });
  const nodeRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);
  const wasVisible = usePrevious(state.visible);
  const refTracker = useRefTracker();
  const [menuController] = useState(() => createMenuController());

  // subscribe event manager
  useEffect(() => {
    didMount.current = true;
    eventManager.on(id, show).on(EVENT.HIDE_ALL, hide);

    return () => {
      eventManager.off(id, show).off(EVENT.HIDE_ALL, hide);
    };
  }, [id]);

  // handle show/ hide callback
  useEffect(() => {
    if (didMount.current && state.visible !== wasVisible) {
      state.visible ? onShown() : onHidden();
    }
  }, [state.visible, onHidden, onShown]);

  // collect menu items for keyboard navigation
  useEffect(() => {
    if (!state.visible) {
      refTracker.clear();
    } else {
      menuController.init(Array.from(refTracker.values()));
    }
  }, [state.visible, menuController, refTracker]);

  // compute menu position
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
    }
  }, [state.visible]);

  // subscribe dom events
  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      switch (e.key) {
        case 'Enter':
          if (!menuController.openSubmenu()) hide();
          break;
        case 'Escape':
          hide();
          break;
        case 'ArrowUp':
          menuController.moveUp();
          break;
        case 'ArrowDown':
          menuController.moveDown();
          break;
        case 'ArrowRight':
          menuController.openSubmenu();
          break;
        case 'ArrowLeft':
          menuController.closeSubmenu();
          break;
      }
    }

    if (state.visible) {
      window.addEventListener('resize', hide);
      window.addEventListener('contextmenu', hide);
      window.addEventListener('click', hide);
      window.addEventListener('scroll', hide);
      window.addEventListener('keydown', handleKeyboard);

      // This let us debug the menu in the console in dev mode
      if (process.env.NODE_ENV !== 'development') {
        window.addEventListener('blur', hide);
      }
    }

    return () => {
      window.removeEventListener('resize', hide);
      window.removeEventListener('contextmenu', hide);
      window.removeEventListener('click', hide);
      window.removeEventListener('scroll', hide);
      window.removeEventListener('keydown', handleKeyboard);

      if (process.env.NODE_ENV !== 'development') {
        window.removeEventListener('blur', hide);
      }
    };
  }, [state.visible, menuController]);

  function show({ event, props, position }: ContextMenuParams) {
    event.stopPropagation();
    const { x, y } = position || getMousePosition(event);

    // prevent react from batching the state update
    // if the menu is already visible we have to recompute bounding rect based on position
    setTimeout(() => {
      setState({
        visible: true,
        x,
        y,
        nativeEvent: event,
        propsFromTrigger: props,
      });
    }, 0);
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

  const cssClasses = cx(STYLE.menu, className, {
    [STYLE.theme + theme]: theme,
    [STYLE.animationWillEnter + animation]: animation,
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
      <RefTrackerProvider refTracker={refTracker}>
        {visible && (
          <div
            {...rest}
            className={cssClasses}
            style={menuStyle}
            ref={nodeRef}
            role="menu"
          >
            {cloneItems(children, {
              propsFromTrigger,
              nativeEvent: nativeEvent,
            })}
          </div>
        )}
      </RefTrackerProvider>
    </Portal>
  );
};
