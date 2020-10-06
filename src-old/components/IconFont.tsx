import React, { SFC, ReactNode } from 'react';
import PropTypes from 'prop-types';
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
    {children || ''}
  </i>
);

IconFont.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
} as any;
// Hack till the typedef is fixed.

export { IconFont };
