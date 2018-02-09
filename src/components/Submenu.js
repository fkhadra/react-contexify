import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles';

export default class Submenu extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.oneOfType(PropTypes.bool, PropTypes.func)
  };

  static defaultProps = {
    className: '',
    style: {},
    disabled: false,
    targetNode: {},
    data: null,
    refsFromProvider: []
  };

  state = {
    styles: {}
  };

  setRef = ref => {
    this.menu = ref;
  };

  componentDidMount() {
    const { innerWidth, innerHeight } = window;
    const rect = this.menu.getBoundingClientRect();
    const style = {
      left: rect.right < innerWidth ? '100%' : '-100%'
    };

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

  render() {
    const { disabled, className, style } = this.props;
    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]:
        typeof disabled === 'function' ? disabled() : disabled
    });
    const submenuStyle = {
      ...style,
      ...this.state.style
    };

    return (
      <div className={cssClasses} role="presentation">
        <div className={styles.itemContent}>
          {this.props.title}
          <span>▶</span>
        </div>
        <div
          className={styles.submenu}
          ref={this.setRef}
          style={this.state.style}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
