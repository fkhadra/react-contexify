import React, { Component } from 'react';
import {
  Menu,
  Item,
  Separator,
  Submenu,
  contextMenu,
  theme,
  animation
} from '../../src/index';
import '../../dist/ReactContexify.css';
import Table from './Table';
import Select from './Select';

const selectorPayload = {
  events: ['onContextMenu', 'onClick', 'onDoubleClick'],
  themes: ['none', ...Object.values(theme)],
  animations: ['none', ...Object.values(animation)]
};

const square = {
  x: 50,
  y: 50,
  width: 100,
  height: 100
};

const Foo = () => <div>FOO</div>;

const onClick = payload => console.log(payload);
const menuId = 1;
// create your menu first
const MyAwesomeMenu = ({ theme, animation }) => (
  <Menu id={menuId} theme={theme} animation={animation}>
    <Item onClick={onClick}>
      <Foo />
    </Item>
    <Item onClick={onClick}>Ipsum</Item>
    {null}
    <Separator />
    <Item disabled>Dolor</Item>
    <Separator />
    <Submenu label="Foobar">
      {null}
      <Item onClick={onClick}>Bar</Item>
    </Submenu>
  </Menu>
);

class App extends Component {
  state = {
    event: selectorPayload.events[0],
    theme: selectorPayload.themes[0],
    animation: selectorPayload.animations[0]
  };
  canvasRef = null;

  componentDidMount() {
    const ctx = this.canvasRef.getContext('2d');
    ctx.fillRect(square.x, square.y, square.width, square.height);
    ctx.font = '16px arial';
    ctx.fillStyle = 'white';
    ctx.fillText("I'm a canvas", 55, 80);
  }

  handleClick = e => {
    e.preventDefault();
    if (e.target.tagName === 'CANVAS') {
      const rect = this.canvasRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const isColliding =
        x >= square.x &&
        x <= square.x + square.width &&
        y >= square.y &&
        y <= square.y + square.height;

      if (!isColliding) {
        return;
      }
    }

    contextMenu.show({
      id: menuId,
      event: e
    });
  };

  handleSelector = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <main>
        <ul>
          <li>
            <label htmlFor="event">Event:</label>
            <Select
              name="event"
              value={this.state.event}
              data={selectorPayload.events}
              onChange={this.handleSelector}
            />
          </li>
          <li>
            <label htmlFor="theme">Theme:</label>
            <Select
              name="theme"
              value={this.state.theme}
              data={selectorPayload.themes}
              onChange={this.handleSelector}
            />
          </li>
          <li>
            <label htmlFor="animation">Animation:</label>
            <Select
              name="animation"
              value={this.state.animation}
              data={selectorPayload.animations}
              onChange={this.handleSelector}
            />
          </li>
        </ul>
        <div
          {...{ [`${this.state.event}`]: this.handleClick }}
          style={{
            border: '1px solid red',
            backgroundColor: 'blue',
            width: '200px',
            height: '200px',
            color: 'white',
            textAlign: 'center'
          }}
        >
          Just a div
        </div>
        <hr />
        <canvas
          {...{ [`${this.state.event}`]: this.handleClick }}
          ref={ref => (this.canvasRef = ref)}
          width="200"
          height="200"
          style={{ border: '1px solid red' }}
        >
          this is a canvas
        </canvas>
        <hr />
        <Table event={this.state.event} handleEvent={this.handleClick} />
        <MyAwesomeMenu {...this.state} />
      </main>
    );
  }
}

export default App;
