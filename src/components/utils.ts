import { Children, cloneElement, ReactNode, ReactElement } from 'react';

import { BooleanPredicate, HandlerParams, TriggerEvent } from '../types';

export function isFn(v: any): v is Function {
  return typeof v === 'function';
}

export function cloneItems(
  children: ReactNode,
  props: { nativeEvent: TriggerEvent; propsFromTrigger?: object }
) {
  return Children.map(
    // remove null item
    Children.toArray(children).filter(Boolean),
    item => cloneElement(item as ReactElement<any>, props)
  );
}

export function getMousePosition(e: TriggerEvent) {
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

export function getPredicateValue(
  predicate: BooleanPredicate,
  payload: HandlerParams
) {
  return isFn(predicate) ? predicate(payload) : predicate;
}
