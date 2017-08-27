import React, { Component } from "react";
import eventManager from './../util/eventManager';

export default class ProxyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: {}
    };
  }

  componentDidMount() {
    eventManager.on('PROXY_RENDER', this.proxyRender);
  }

  componentWillUnmount() {
    eventManager.off('PROXY_RENDER');
  }

  proxyRender = element => this.setState({ element: { ...this.state.element, ...element } });

  renderChildren() {
    return Object.keys(this.state.element).map(k => this.state.element[k]);
  }

  render() {
    return <div>{this.renderChildren()}</div>;
  }
}
