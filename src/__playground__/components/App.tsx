import React, { Component, ChangeEvent, MouseEvent } from 'react';
import {
  Menu,
  Item,
  Separator,
  Submenu,
  contextMenu,
  theme,
  animation
} from './../..';
import Table from './Table';
import Select from './Select';
import { BuiltInTheme } from '../../utils/styles';
import { MenuItemEventHandler } from '../../types';

const selector = {
  events: ['onContextMenu', 'onClick', 'onDoubleClick'],
  themes: [
    'none',
    ...Object.keys(theme).map(k => theme[k as keyof BuiltInTheme])
  ],
  animations: [
    'none',
    ...Object.keys(animation).map(k => animation[k as keyof typeof animation])
  ]
};

const square = {
  x: 50,
  y: 50,
  width: 100,
  height: 100
};

const menuId = 1;
const MyAwesomeMenu: React.SFC<{
  theme: string;
  animation: string;
  onClick: (p: any) => void;
}> = ({ theme, animation, onClick }) => (
  <Menu id={menuId} theme={theme} animation={animation}>
    <Item onClick={onClick}>
      <span role="role">💩</span>
      Foo
    </Item>
    <Item onClick={onClick}>Ipsum</Item>
    <Item disabled>Sit</Item>
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
    event: selector.events[0],
    theme: selector.themes[0],
    animation: selector.animations[0],
    payload: {}
  };

  canvasRef!: HTMLCanvasElement;

  componentDidMount() {
    const ctx = this.canvasRef.getContext('2d')!;
    ctx.fillRect(square.x, square.y, square.width, square.height);
    ctx.font = '16px arial';
    ctx.fillStyle = 'black';
    ctx.fillText('only the black box', 10, 20);
    ctx.fillText('trigger the event', 10, 40);
  }

  handleMenuItem = (payload: MenuItemEventHandler) => {
    const { clientX, clientY } = payload.event;
    this.setState({
      payload: {
        event: { clientX, clientY },
        props: payload.props
      }
    });
  };

  handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if ((e.target as HTMLElement).tagName === 'CANVAS') {
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
      event: e,
      props: {
        now: Date.now()
      }
    });
  };

  handleSelector = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <main>
        <div className="settings-container">
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
          <pre>{JSON.stringify(this.state.payload, null, 2)}</pre>
        </div>
        <hr />
        <div className="boxes-container">
          <div
            className="box"
            {...{ [`${this.state.event}`]: this.handleClick }}
          >
            event is triggered everywhere in the box
          </div>
          <hr />
          <div>
            <div>This is a canvas</div>
            <canvas
              {...{ [`${this.state.event}`]: this.handleClick }}
              ref={(ref: HTMLCanvasElement) => (this.canvasRef = ref)}
              width="200"
              height="200"
              style={{ border: '1px solid red' }}
            >
              this is a canvas
            </canvas>
          </div>
          <hr />
          <Table event={this.state.event} handleEvent={this.handleClick} />
        </div>

        <MyAwesomeMenu {...this.state} onClick={this.handleMenuItem} />
      </main>
    );
  }
}

export default App;
