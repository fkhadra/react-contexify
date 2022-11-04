/* global: window */
import React, {
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import cx from 'clsx';

import { RefTrackerProvider } from './RefTrackerProvider';

import { eventManager } from '../core/eventManager';
import { TriggerEvent, MenuId, MenuAnimation, Theme } from '../types';
import { usePrevious, useRefTracker } from '../hooks';
import { createMenuController } from './menuController';
import { NOOP, STYLE, EVENT, hideOnEvents } from '../constants';
import {
  cloneItems,
  getMousePosition,
  hasExitAnimation,
  isFn,
  isStr,
} from './utils';
import { flushSync } from 'react-dom';
import { ShowContextMenuParams } from '../core';

export interface MenuProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'id'> {
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
  theme?: Theme;

  /**
   * Animation is appended to
   * - `.react-contexify__will-enter--${given animation}`
   * - `.react-contexify__will-leave--${given animation}`
   *
   * - To disable all animations you can pass `false`
   * - To disable only the enter or the exit animation you can provide an object `{enter: false, exit: 'exitAnimation'}`
   *
   * - default is set to `scale`
   *
   * To use the built-in animation a helper in available
   * `import { animation } from 'react-contexify`
   *
   * animation.fade
   */
  animation?: MenuAnimation;

  /**
   * Disables menu repositioning if outside screen.
   * This may be neeeded in some cases when using custom position.
   */
  disableBoundariesCheck?: boolean;

  /**
   * Invoked after the menu is visible.
   */
  onShown?: () => void;

  /**
   * Invoked after the menu has been hidden.
   */
  onHidden?: () => void;

  /**
   * Prevents scrolling the window on when typing. Defaults to true.
   */
  preventDefaultOnKeydown?: boolean;
}

interface MenuState {
  x: number;
  y: number;
  visible: boolean;
  triggerEvent: TriggerEvent;
  propsFromTrigger: any;
  willLeave: boolean;
}

function reducer(
  state: MenuState,
  payload: Partial<MenuState> | ((state: MenuState) => Partial<MenuState>)
) {
  return isFn(payload)
    ? { ...state, ...payload(state) }
    : { ...state, ...payload };
}

export const Menu: React.FC<MenuProps> = ({
  id,
  theme,
  style,
  className,
  children,
  animation = 'scale',
  onHidden = NOOP,
  onShown = NOOP,
  preventDefaultOnKeydown = true,
  disableBoundariesCheck = false,
  ...rest
}) => {
  const [state, setState] = useReducer(reducer, {
    x: 0,
    y: 0,
    visible: false,
    triggerEvent: {} as TriggerEvent,
    propsFromTrigger: null,
    willLeave: false,
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
    // hide rely on setState(dispatch), which is guaranted to be the same across render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // handle show/ hide callback
  useEffect(() => {
    if (didMount.current && state.visible !== wasVisible) {
      state.visible ? onShown() : onHidden();
    }
    // wasWisible is a ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.visible, onHidden, onShown]);

  // collect menu items for keyboard navigation
  useEffect(() => {
    if (!state.visible) {
      refTracker.clear();
    } else {
      menuController.init(Array.from(refTracker.values()));
    }
  }, [state.visible, menuController, refTracker]);

  function checkBoundaries(x: number, y: number) {
    if (nodeRef.current && !disableBoundariesCheck) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = nodeRef.current;

      if (x + offsetWidth > innerWidth) x -= x + offsetWidth - innerWidth;

      if (y + offsetHeight > innerHeight) y -= y + offsetHeight - innerHeight;
    }

    return { x, y };
  }

  // when the menu is transitioning from not visible to visible,
  // the nodeRef is attached to the dom element this let us check the boundaries
  useEffect(() => {
    if (state.visible) setState(checkBoundaries(state.x, state.y));

    // state.visible and state{x,y} are updated together
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.visible]);

  // subscribe dom events
  useEffect(() => {
    function preventDefault(e: KeyboardEvent) {
      if (preventDefaultOnKeydown) {
        e.preventDefault();
      }
    }

    function handleKeyboard(e: KeyboardEvent) {
      switch (e.key) {
        case 'Enter':
          if (!menuController.openSubmenu()) hide();
          break;
        case 'Escape':
          hide();
          break;
        case 'ArrowUp':
          preventDefault(e);
          menuController.moveUp();
          break;
        case 'ArrowDown':
          preventDefault(e);
          menuController.moveDown();
          break;
        case 'ArrowRight':
          preventDefault(e);
          menuController.openSubmenu();
          break;
        case 'ArrowLeft':
          preventDefault(e);
          menuController.closeSubmenu();
          break;
      }
    }

    if (state.visible) {
      window.addEventListener('keydown', handleKeyboard);

      for (let i = 0; i < hideOnEvents.length; i++)
        window.addEventListener(hideOnEvents[i], hide);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyboard);

      for (let i = 0; i < hideOnEvents.length; i++)
        window.removeEventListener(hideOnEvents[i], hide);
    };
    // state.visible will let us get the right reference to `hide`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.visible, menuController, preventDefaultOnKeydown]);

  function show({ event, props, position }: ShowContextMenuParams) {
    event.stopPropagation();
    const p = position || getMousePosition(event);
    // check boundaries when the menu is already visible and just moving position
    const { x, y } = checkBoundaries(p.x, p.y);

    flushSync(() => {
      setState({
        visible: true,
        willLeave: false,
        x,
        y,
        triggerEvent: event,
        propsFromTrigger: props,
      });
    });
  }

  function hide(e?: Event) {
    type SafariEvent = KeyboardEvent & MouseEvent;

    if (
      e != null &&
      // Safari trigger a click event when you ctrl + trackpad
      ((e as SafariEvent).button === 2 ||
        (e as SafariEvent).ctrlKey === true) &&
      // Firefox trigger a click event when right click occur
      e.type !== 'contextmenu'
    )
      return;

    hasExitAnimation(animation)
      ? setState(state => ({ willLeave: state.visible }))
      : setState(state => ({ visible: state.visible ? false : state.visible }));
  }

  function handleAnimationEnd() {
    if (state.willLeave && state.visible) {
      flushSync(() => setState({ visible: false, willLeave: false }));
    }
  }

  function computeAnimationClasses() {
    if (!animation) return null;

    if (isStr(animation)) {
      return cx({
        [`${STYLE.animationWillEnter}${animation}`]:
          animation && visible && !willLeave,
        [`${STYLE.animationWillLeave}${animation} ${STYLE.animationWillLeave}'disabled'`]:
          animation && visible && willLeave,
      });
    } else if ('enter' in animation && 'exit' in animation) {
      return cx({
        [`${STYLE.animationWillEnter}${animation.enter}`]:
          animation.enter && visible && !willLeave,
        [`${STYLE.animationWillLeave}${animation.exit} ${STYLE.animationWillLeave}'disabled'`]:
          animation.exit && visible && willLeave,
      });
    }

    return null;
  }

  const { visible, triggerEvent, propsFromTrigger, x, y, willLeave } = state;
  const cssClasses = cx(
    STYLE.menu,
    className,
    { [`${STYLE.theme}${theme}`]: theme },
    computeAnimationClasses()
  );

  const menuStyle = {
    ...style,
    left: x,
    top: y,
    opacity: 1,
  };

  return (
    <RefTrackerProvider refTracker={refTracker}>
      {visible && (
        <div
          {...rest}
          className={cssClasses}
          onAnimationEnd={handleAnimationEnd}
          style={menuStyle}
          ref={nodeRef}
          role="menu"
        >
          {cloneItems(children, {
            propsFromTrigger,
            triggerEvent,
          })}
        </div>
      )}
    </RefTrackerProvider>
  );
};
