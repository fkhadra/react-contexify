import { PureComponent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

class Portal extends PureComponent<{ children: ReactNode }> {
  state = {
    canRender: false
  };
  container = {} as HTMLDivElement;

  componentDidMount() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.setState({
      canRender: true
    });
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }
  render() {
    return (
      this.state.canRender && createPortal(this.props.children, this.container)
    );
  }
}

export { Portal };
