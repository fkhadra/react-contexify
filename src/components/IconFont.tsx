import React, { SFC, ReactNode } from 'react';
import cx from 'classnames';

import { styles } from '../utils/styles';
import { StyleProps } from '../types';

export interface IconFontProps extends StyleProps {
  /**
   * Any valid node that can be rendered
   */
  children?: ReactNode;
}

const IconFont: SFC<IconFontProps> = ({ className, style, children }) => (
  <i className={cx(styles.itemIcon, className)} style={style}>
    {children}
  </i>
);

export { IconFont };
