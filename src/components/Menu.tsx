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
import {
  TriggerEvent,
  MenuId,
  ContextMenuParams,
  MenuAnimation,
} from '../types';
import { usePrevious, useRefTracker } from '../hooks';
import { createMenuController } from './menuController';
import { NOOP, STYLE, EVENT } from '../constants';
import {
  cloneItems,
  getMousePosition,
  hasExitAnimation,
  isFn,
  isStr,
} from './utils';

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
  theme?: string;

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
   * Invoked after the menu is visible.
   */
  onShown?: () => void;

  /**
   * Invoked after the menu has been hidden.
   */
  onHidden?: () => void;
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

    // state.visible and state{x,y} are updated together
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.visible]);

  // subscribe dom events
  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      e.preventDefault();
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
    // state.visible will let us get the right reference to `hide`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.visible, menuController]);

  function show({ event, props, position }: ContextMenuParams) {
    event.stopPropagation();
    const { x, y } = position || getMousePosition(event);

    // prevent react from batching the state update
    // if the menu is already visible we have to recompute bounding rect based on position
    setTimeout(() => {
      setState({
        visible: true,
        willLeave: false,
        x,
        y,
        triggerEvent: event,
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

    hasExitAnimation(animation)
      ? setState(state => ({ willLeave: state.visible }))
      : setState(state => ({ visible: state.visible ? false : state.visible }));
  }

  function handleAnimationEnd() {
    if (state.willLeave && state.visible) {
      setState({ visible: false, willLeave: false });
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
