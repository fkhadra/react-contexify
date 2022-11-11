import { Children, cloneElement, ReactNode, ReactElement } from 'react';

import { BooleanPredicate, PredicateParams, TriggerEvent } from '../types';

export function isFn(v: any): v is Function {
  return typeof v === 'function';
}

export function isStr(v: any): v is String {
  return typeof v === 'string';
}

export function cloneItems(
  children: ReactNode,
  props: { triggerEvent: TriggerEvent; propsFromTrigger?: object }
) {
  return Children.map(
    // remove null item
    Children.toArray(children).filter(Boolean),
    (item) => cloneElement(item as ReactElement<any>, props)
  );
}

export function getMousePosition(e: TriggerEvent) {
  const pos = {
    x: (e as MouseEvent).clientX,
    y: (e as MouseEvent).clientY,
  };

  const touch = (e as TouchEvent).changedTouches;

  if (touch) {
    pos.x = touch[0].clientX;
    pos.y = touch[0].clientY;
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
