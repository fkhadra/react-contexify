import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal: React.FC = ({ children }) => {
  const [canRender, setCanRender] = useState(false);
  const node = useRef<HTMLDivElement>();

  useEffect(() => {
    node.current = document.createElement('div');
    document.body.appendChild(node.current);
    setCanRender(true);

    return () => {
      document.body.removeChild(node.current!);
    };
  }, []);

  return canRender ? createPortal(children, node.current!) : null;
};
