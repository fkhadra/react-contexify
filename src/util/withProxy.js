import React, { PureComponent } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export default function(Component) {
  return class WithProxy extends PureComponent {
    node = null;

    componentWillMount() {
      this.appendToBody(this.props);
    }

    componentWillUnmount() {
      this.removeFromBody();
    }

    componentWillReceiveProps(nextProps) {
      this.removeFromBody();
      this.appendToBody(nextProps);
    }

    removeFromBody() {
      unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    }

    appendToBody(props) {
      const container = document.createElement('div');
      this.node = document.body.appendChild(container);
      render(<Component {...props} key={props.id} />, this.node);
    }

    render() {
      return null;
    }
  };
}
