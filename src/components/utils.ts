import { Children, cloneElement, ReactNode, ReactElement } from 'react';

import {
  BooleanPredicate,
  PredicateParams,
  MenuAnimation,
  TriggerEvent,
} from '../types';

export function isFn(v: any): v is Function {
  return typeof v === 'function';
}

export function isStr(v: any): v is String {
  return typeof v === 'string';
}

export function isTouchEvent(e: TriggerEvent): e is TouchEvent {
  return e.type === 'touchend';
}

export function cloneItems(
  children: ReactNode,
  props: { triggerEvent: TriggerEvent; propsFromTrigger?: object }
) {
  return Children.map(
    // remove null item
    Children.toArray(children).filter(Boolean),
    item => cloneElement(item as ReactElement<any>, props)
  );
}

export function getMousePosition(e: TriggerEvent) {
  const pos = {
    x: 0,
    y: 0,
  };

  if (isTouchEvent(e) && e.changedTouches && e.changedTouches.length > 0) {
    pos.x = e.changedTouches[0].clientX;
    pos.y = e.changedTouches[0].clientY;
  } else {
    pos.x = (e as MouseEvent).clientX;
    pos.y = (e as MouseEvent).clientY;
  }

  if (!pos.x || pos.x < 0) pos.x = 0;

  if (!pos.y || pos.y < 0) pos.y = 0;

  return pos;
}

export function getPredicateValue(
  predicate: BooleanPredicate,
  payload: PredicateParams
) {
  return isFn(predicate) ? predicate(payload) : predicate;
}

export function hasExitAnimation(animation: MenuAnimation) {
  return !!(
    animation &&
    (isStr(animation) || ('exit' in animation && animation.exit))
  );
}
