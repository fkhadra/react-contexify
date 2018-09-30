import React, { Component } from 'react';

import Select from '../DemoList/Select';
import DemoList from '../components/DemoList';
import { selector, square, menuIds } from '../utils';
import 'react-contexify/dist/ReactContexify.css';

class IndexPage extends Component {
  state = {
    event: selector.events[0],
    theme: selector.themes[0],
    animation: selector.animations[0],
  };

  
  handleSelector = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  render() {
    return (
      <>
        <ul>
          <li>
            <label htmlFor="event">Event:</label>
            <Select
              name="event"
              value={this.state.event}
              data={selector.events}
              onChange={this.handleSelector}
            />
          </li>
          <li>
            <label htmlFor="theme">Theme:</label>
            <Select
              name="theme"
              value={this.state.theme}
              data={selector.themes}
              onChange={this.handleSelector}
            />
          </li>
          <li>
            <label htmlFor="animation">Animation:</label>
            <Select
              name="animation"
              value={this.state.animation}
              data={selector.animations}
              onChange={this.handleSelector}
            />
          </li>
        </ul>
        <DemoList {...this.state} />
        <DemoCanvas {...this.state} />
      </>
    );
  }
}

export default IndexPage;
