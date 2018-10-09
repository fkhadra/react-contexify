import { Children, cloneElement, ReactNode, ReactElement } from 'react';
import { TriggerEvent } from '../types';

export function cloneItem(
  children: ReactNode,
  props: { nativeEvent: TriggerEvent; propsFromTrigger?: object }
) {
  return Children.map(
    // remove null item
    Children.toArray(children).filter(child => Boolean(child)),
    item => cloneElement(item as ReactElement<any>, props)
  );
}
