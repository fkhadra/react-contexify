import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { isFn } from '../utils';

export interface PortalProps {
  mountNode?: Element | (() => Element);
}

export const Portal: React.FC<PortalProps> = ({ children, mountNode }) => {
  const [canRender, setCanRender] = useState(false);
  const node = useRef<HTMLDivElement>();

  useEffect(() => {
    node.current = document.createElement('div');
    let parentNode: Element = document.body;

    if (isFn(mountNode)) {
      parentNode = mountNode();
    } else if (mountNode instanceof Element) {
      parentNode = mountNode;
    }

    parentNode.appendChild(node.current);

    setCanRender(true);

    return () => {
      parentNode.removeChild(node.current!);
    };
  }, [mountNode]);

  return canRender ? createPortal(children, node.current!) : null;
};
