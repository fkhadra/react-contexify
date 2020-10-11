import React from 'react';
import cx from 'clsx';

import { STYLE } from '../constants';

const IconFont: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  style,
  children = '',
  ...rest
}) => (
  <i {...rest} className={cx(STYLE.itemIcon, className)} style={style}>
    {children}
  </i>
);

export { IconFont };
