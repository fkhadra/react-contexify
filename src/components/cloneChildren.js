import { Children, cloneElement } from 'react';

export default function cloneChilren(children, props) {
  return Children.map(
    // remove null item
    Children.toArray(children).filter(child => Boolean(child)),
    item => cloneElement(item, props)
  );
}
