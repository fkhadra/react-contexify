import React, { PureComponent } from "react";
import { render } from "react-dom";

import Container from './Container';

const containerId = "react-contexify-container";
let HAS_CONTAINER = false;
let REF_CONTAINER = null;

export default function (Menu) {
  return class Proxy extends PureComponent {
    componentWillMount() {
      if (!HAS_CONTAINER) {
        const body = document.querySelector("body");
        const container = document.createElement("div");
        container.id = containerId;
        body.appendChild(container);
        REF_CONTAINER = render(<Container />, document.getElementById(containerId));
        HAS_CONTAINER = true;
      }
    }

    render() {
      return <Menu {...this.props} REF_CONTAINER={REF_CONTAINER} />;
    }
  };
}
