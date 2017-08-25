import React, { Component } from "react";

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: null
    };
  }

  proxyRender = element => this.setState({ element });

  render() {
    return this.state.element;
  }
}
