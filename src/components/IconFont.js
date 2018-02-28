import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './styles';

const IconFont = ({ className, style, children }) => (
  <i className={cx(styles.itemIcon, className)} style={style}>
    {children}
  </i>
);

IconFont.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};

IconFont.defaultProps = {
  className: '',
  style: {},
  children: ''
};

export default IconFont;
