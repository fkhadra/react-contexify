import React from 'react';
import cx from 'clsx';

import { CssClass } from '../constants';

export interface RightSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const RightSlot: React.FC<RightSlotProps> = ({ className, ...rest }) => (
  <div className={cx(CssClass.rightSlot, className)} {...rest} />
);
