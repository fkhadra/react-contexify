import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from '../utils/styles';

export default class Submenu extends Component {
  static propTypes = {
    label: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    arrow: PropTypes.node,
    nativeEvent: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  };

  static defaultProps = {
    arrow: '▶',
    nativeEvent: null,
    className: null,
    style: {},
    disabled: false
  };

  state = {
    style: {
      left: '100%',
      top: 0,
      bottom: 'initial'
    }
  };

  setRef = ref => {
    this.menu = ref;
  };

  componentDidMount() {
    const { innerWidth, innerHeight } = window;
    const rect = this.menu.getBoundingClientRect();
    const style = {};

    if (rect.right < innerWidth) {
      style.left = '100%';
    } else {
      style.right = '100%';
    }

    if (rect.bottom > innerHeight) {
      style.bottom = 0;
      style.top = 'initial';
    } else {
      style.bottom = 'initial';
      style.top = 0;
    }

    this.setState({
      style: style
    });
  }

  getMenuItem() {
    const { nativeEvent } = this.props;

    return React.Children.map(this.props.children, item =>
      React.cloneElement(item, {
        nativeEvent,
      })
    );
  }

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    const {
      arrow,
      disabled,
      className,
      style,
      label,
      nativeEvent,
    } = this.props;
    
    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]:
        typeof disabled === 'function'
          ? disabled({
              event: nativeEvent,
            })
          : disabled
    });
    const submenuStyle = {
      ...style,
      ...this.state.style
    };

    return (
      <div className={cssClasses} role="presentation">
        <div className={styles.itemContent} onClick={this.handleClick}>
          {label}
          <span className={styles.submenuArrow}>{arrow}</span>
        </div>
        <div className={styles.submenu} ref={this.setRef} style={submenuStyle}>
          {this.getMenuItem()}
        </div>
      </div>
    );
  }
}
