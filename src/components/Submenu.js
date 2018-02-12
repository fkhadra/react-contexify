import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles';

export default class Submenu extends PureComponent {
  static propTypes = {
    label: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    targetNode: PropTypes.object,
    dataFromProvider: PropTypes.any,
    refsFromProvider: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]),
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  };

  static defaultProps = {
    targetNode: null,
    dataFromProvider: null,
    refsFromProvider: null,
    className: null,
    style: {},
    disabled: false
  };

  state = {
    style: {}
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

  getMenuItem() {
    const { targetNode, refsFromProvider, dataFromProvider } = this.props;

    return React.Children.map(this.props.children, item =>
      React.cloneElement(item, {
        targetNode,
        refsFromProvider,
        dataFromProvider
      })
    );
  }

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    const {
      disabled,
      className,
      style,
      label,
      targetNode,
      refsFromProvider,
      dataFromProvider,
    } = this.props;
    const cssClasses = cx(styles.item, className, {
      [`${styles.itemDisabled}`]:
        typeof disabled === 'function'
          ? disabled({
              targetNode,
              dataFromProvider,
              refs: refsFromProvider
            })
          : disabled
    });
    const submenuStyle = {
      ...style,
      ...this.state.style
    };

    return (
      <div
        className={cssClasses}
        role="presentation"
      >
        <div className={styles.itemContent} onClick={this.handleClick}>
          {label}
          <span className={styles.submenuArrow}>▶</span>
        </div>
        <div
          className={styles.submenu}
          ref={this.setRef}
          style={submenuStyle}
        >
          {this.getMenuItem()}
        </div>
      </div>
    );
  }
}
