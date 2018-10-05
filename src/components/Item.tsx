import React, { Component, ReactNode } from 'react';
//import PropTypes from 'prop-types';
import cx from 'classnames';

import { styles } from '../utils/styles';
import { EventHandlerCallback, TriggerEvent } from '../types/index';

interface Props {
  children: ReactNode;
  nativeEvent?: TriggerEvent;
  className?: string;
  style?: object;
  propsFromTrigger?: object;
  data?: object;
  disabled: boolean | ((args: EventHandlerCallback) => boolean);
  onClick: (args: EventHandlerCallback) => any;
}

const noop = () => { };

class Item extends Component<Props> {
  static defaultProps = {
    disabled: false,
    onClick: noop
  };

  private isDisabled: boolean;

  public constructor(props: Props) {
    super(props);
    const { disabled, nativeEvent, propsFromTrigger, data } = this.props;

    this.isDisabled =
      typeof disabled === 'function'
        ? disabled({
          event: nativeEvent as TriggerEvent,
          props: { ...propsFromTrigger, ...data }
        })
        : disabled;
  }

  private handleClick = (e: React.MouseEvent) => {
    this.isDisabled
      ? e.stopPropagation()
      : this.props.onClick({
        event: this.props.nativeEvent as TriggerEvent,
        props: { ...this.props.propsFromTrigger, ...this.props.data }
      });
  };

  public render() {
    const { className, style, children } = this.props;

    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]: this.isDisabled
    });

    return (
      <div
        className={cssClasses}
        style={style}
        onClick={this.handleClick}
        role="presentation"
      >
        <div className={styles.itemContent}>{children}</div>
      </div>
    );
  }
}

export { Item };
