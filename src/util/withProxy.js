/**
 * TODO : Abstract the component
 */
import React, { PureComponent } from "react";
import { render } from "react-dom";

import ProxyContainer from './../Component/ProxyContainer';
import eventManager from './../util/eventManager';

const cache = [];

export default function ({ component, containerId }) {
  return class Proxy extends PureComponent {
    componentWillMount() {
      if (cache.indexOf(containerId) === -1) {
        const body = document.querySelector("body");
        const container = document.createElement("div");
        container.id = containerId;
        body.appendChild(container);
        render(<ProxyContainer />, document.getElementById(containerId));
        cache.push(containerId);
      }
    }

    componentDidMount() {
      this.attachToProxy(this.props);
    }

    // Maybe I need to shallow compare props
    componentWillReceiveProps(nextProps) {
      this.attachToProxy(nextProps);
    }

    attachToProxy(props) {
      const C = component;
      if (eventManager.has('PROXY_RENDER')) {
        eventManager.emit('PROXY_RENDER', {
          [props.id]: <C {...props} key={props.id} />
        });
      } else {
        setTimeout(() => this.attachToProxy(props), 250);
      }
    }

    render() {
      return null;
    }
  };
}
