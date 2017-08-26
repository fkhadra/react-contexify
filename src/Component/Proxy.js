import React, { PureComponent } from "react";
import { render } from "react-dom";
import eventManager from './../util/eventManager';

import ProxyContainer from './Container';

const containerId = "react-contexify-container";
let HAS_CONTAINER = false;

export default function (Component) {
  return class Proxy extends PureComponent {
    componentWillMount() {
      if (!HAS_CONTAINER) {
        const body = document.querySelector("body");
        const container = document.createElement("div");
        container.id = containerId;
        body.appendChild(container);
        render(<ProxyContainer />, document.getElementById(containerId));
        HAS_CONTAINER = true;
      }
    }
    componentDidMount() {
      this.attachToProxy(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.attachToProxy(nextProps);
    }

    attachToProxy(props) {
      eventManager.emit('PROXY_RENDER', {
        [props.id]: <Component {...props} key={props.id} />
      });
    }

    render() {
      return null;
    }
  };
}
