import React, { Component } from "react";
import eventManager from './../util/eventManager';

export default class ProxyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: []
    };
  }

  componentDidMount() {
    eventManager.on('PROXY_RENDER', this.proxyRender);
  }

  componentWillUnmount() {
    eventManager.off('PROXY_RENDER');
  }

  proxyRender = element => this.setState(prevState => ({ element: [...prevState.element, element] }));

  renderChildren() {
    return this.state.element.map(el => el);
  }

  render() {
    return <div>{this.renderChildren()}</div>;
  }
}
