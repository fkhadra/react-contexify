import React, { SFC, ReactNode } from 'react';
import cx from 'classnames';

import { styles } from '../utils/styles';

interface IconFontProps {
  className?: string;
  style?: object;
  children?: ReactNode;
}

const IconFont: SFC<IconFontProps> = ({ className, style, children }) => (
  <i className={cx(styles.itemIcon, className)} style={style}>
    {children}
  </i>
);

export { IconFont };
