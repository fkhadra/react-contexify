import React from 'react';
import cx from 'classnames';

import { styles } from '../utils/styles';
import { StyleProps } from '../types';

const IconFont: React.FC<StyleProps> = ({
  className,
  style,
  children = '',
}) => (
  <i className={cx(styles.itemIcon, className)} style={style}>
    {children}
  </i>
);

export { IconFont };
