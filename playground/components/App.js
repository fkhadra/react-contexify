import React, { Component } from 'react';
import { Menu, Item, Separator, Submenu, contextMenu } from "../../src/index";
import "../../dist/ReactContexify.css";

const onClick = ({ event, ref, data, dataFromProvider }) => console.log('Hello');
const menuId = 1;
// create your menu first
const MyAwesomeMenu = () => (
    <Menu id={menuId}>
       <Item onClick={onClick}>Lorem</Item>
       <Item onClick={onClick}>Ipsum</Item>
       {null}
       <Separator />
       <Item disabled>Dolor</Item>
       <Separator />
       <Submenu label="Foobar">
        <Item onClick={onClick}>Foo</Item>
        {null}
        <Item onClick={onClick}>Bar</Item>
       </Submenu>
    </Menu>
);


class App extends Component {
  handleClick = e => {
    console.log('click')
    contextMenu.show({
      id: menuId,
      event: e.nativeEvent
    })
  }

  render() {
    return (
      <main>
        <div style={{ border: '1px solid red', width: '200px', height: '200px' }} onClick={this.handleClick}>
          yolo
        </div>
        <MyAwesomeMenu />
      </main>
    );
  }
}

export default App;
