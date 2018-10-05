import { Children, cloneElement, ReactNode, ReactElement } from 'react';

export function cloneItem(
  children: ReactNode,
  props: { nativeEvent: MouseEvent | TouchEvent; propsFromTrigger?: any }
) {
  return Children.map(
    // remove null item
    Children.toArray(children).filter(child => Boolean(child)),
    item => cloneElement(item as ReactElement<any>, props)
  );
}
