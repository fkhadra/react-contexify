import React, {
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import cx from 'clsx';

import { ItemTrackerProvider } from './ItemTrackerProvider';

import { eventManager } from '../core/eventManager';
import { TriggerEvent, MenuId, MenuAnimation, Theme } from '../types';
import { useItemTracker } from '../hooks';
import { createKeyboardController } from './keyboardController';
import { CssClass, EVENT, hideOnEvents } from '../constants';
import { cloneItems, getMousePosition, isFn, isStr } from './utils';
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
   * Theme is appended to `contexify_theme-${given theme}`.
   *
   * Built-in theme are `light` and `dark`
   */
  theme?: Theme;

  /**
   * Animation is appended to
   * - `.contexify_willEnter-${given animation}`
   * - `.contexify_willLeave-${given animation}`
   *
   * - To disable all animations you can pass `false`
   * - To disable only the enter or the exit animation you can provide an object `{enter: false, exit: 'exitAnimation'}`
   *
   * - default is set to `fade`
   */
  animation?: MenuAnimation;

  /**
   * Disables menu repositioning if outside screen.
   * This may be neeeded in some cases when using custom position.
   */
  disableBoundariesCheck?: boolean;

  /**
   * Prevents scrolling the window on when typing. Defaults to true.
   */
  preventDefaultOnKeydown?: boolean;

  /**
   * Used to track menu visibility
   */
  onVisibilityChange?: (isVisible: boolean) => void;
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
  return { ...state, ...(isFn(payload) ? payload(state) : payload) };
}

export const Menu: React.FC<MenuProps> = ({
  id,
  theme,
  style,
  className,
  children,
  animation = 'fade',
  preventDefaultOnKeydown = true,
  disableBoundariesCheck = false,
  onVisibilityChange,
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
  const itemTracker = useItemTracker();
  const [menuController] = useState(() => createKeyboardController());
  const wasVisible = useRef<boolean>();
  const visibilityId = useRef<number>();

  // subscribe event manager
  useEffect(() => {
    eventManager.on(id, show).on(EVENT.HIDE_ALL, hide);

    return () => {
      eventManager.off(id, show).off(EVENT.HIDE_ALL, hide);
    };
    // hide rely on setState(dispatch), which is guaranted to be the same across render
  }, [id, animation, disableBoundariesCheck]);

  // collect menu items for keyboard navigation
  useEffect(() => {
    !state.visible ? itemTracker.clear() : menuController.init(itemTracker);
  }, [state.visible, menuController, itemTracker]);

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
    // state.visible and state{x,y} are updated together
    if (state.visible) setState(checkBoundaries(state.x, state.y));
  }, [state.visible]);

  // subscribe dom events
  useEffect(() => {
    function preventDefault(e: KeyboardEvent) {
      if (preventDefaultOnKeydown) e.preventDefault();
    }

    function handleKeyboard(e: KeyboardEvent) {
      switch (e.key) {
        case 'Enter':
        case ' ':
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
        default:
          menuController.matchKeys(e);
          break;
      }
    }

    if (state.visible) {
      nodeRef.current?.ownerDocument.addEventListener(
        'keydown',
        handleKeyboard
      );

      for (const ev of hideOnEvents) window.document.addEventListener(ev, hide);
    }

    return () => {
      nodeRef.current?.ownerDocument.removeEventListener(
        'keydown',
        handleKeyboard
      );

      for (const ev of hideOnEvents) window.document.removeEventListener(ev, hide);
    };
  }, [state.visible, menuController, preventDefaultOnKeydown]);

  function show({ event, props, position }: ShowContextMenuParams) {
    event.stopPropagation();
    const p = position || getMousePosition(event);
    // check boundaries when the menu is already visible
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

    clearTimeout(visibilityId.current);
    if (!wasVisible.current && isFn(onVisibilityChange)) {
      onVisibilityChange(true);
      wasVisible.current = true;
    }
  }

  function hide(e?: Event) {
    type SafariEvent = KeyboardEvent & MouseEvent;

    if (
      e != null &&
      // Safari trigger a click event when you ctrl + trackpad
      ((e as SafariEvent).button === 2 || (e as SafariEvent).ctrlKey) &&
      // Firefox trigger a click event when right click occur
      e.type !== 'contextmenu'
    )
      return;

    animation && (isStr(animation) || ('exit' in animation && animation.exit))
      ? setState((state) => ({ willLeave: state.visible }))
      : setState((state) => ({
          visible: state.visible ? false : state.visible,
        }));

    // @ts-expect-error setTimeout is not a number
    visibilityId.current = setTimeout(() => {
      isFn(onVisibilityChange) && onVisibilityChange(false);
      wasVisible.current = false;
    });
  }

  function handleAnimationEnd() {
    if (state.willLeave && state.visible) {
      flushSync(() => setState({ visible: false, willLeave: false }));
    }
  }

  function computeAnimationClasses() {
    if (isStr(animation)) {
      return cx.clsx({
        [`${CssClass.animationWillEnter}${animation}`]: visible && !willLeave,
        [`${CssClass.animationWillLeave}${animation} ${CssClass.animationWillLeave}'disabled'`]:
          visible && willLeave,
      });
    } else if (animation && 'enter' in animation && 'exit' in animation) {
      return cx.clsx({
        [`${CssClass.animationWillEnter}${animation.enter}`]:
          animation.enter && visible && !willLeave,
        [`${CssClass.animationWillLeave}${animation.exit} ${CssClass.animationWillLeave}'disabled'`]:
          animation.exit && visible && willLeave,
      });
    }

    return null;
  }

  const { visible, triggerEvent, propsFromTrigger, x, y, willLeave } = state;
  const cssClasses = cx.clsx(
    CssClass.menu,
    className,
    { [`${CssClass.theme}${theme}`]: theme },
    computeAnimationClasses()
  );

  // TODO: switch to translate instead of top left
  // requires an additional dom element around the menu
  return (
    <ItemTrackerProvider value={itemTracker}>
      {visible && (
        <div
          {...rest}
          className={cssClasses}
          onAnimationEnd={handleAnimationEnd}
          style={{
            ...style,
            left: x,
            top: y,
            opacity: 1,
          }}
          ref={nodeRef}
          role="menu"
        >
          {cloneItems(children, {
            propsFromTrigger,
            triggerEvent,
          })}
        </div>
      )}
    </ItemTrackerProvider>
  );
};
