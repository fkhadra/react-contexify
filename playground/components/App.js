import React, { Component } from 'react';
import { Menu, Item, Separator, Submenu, contextMenu } from "../../src/index";
import "../../dist/ReactContexify.css";

const onClick = (payload) => console.log(payload);
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

const MyAwesomeMenu2 = () => (
  <Menu id={2}>
     <Item onClick={onClick} data={{ xxx:'var' }} disable={() => true}>Lorem</Item>
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
    contextMenu.show({
      id: e.type === 'click' ? menuId : 2,
      event: e.nativeEvent,
      props: {
        foo:'bar',
        baz: 123
      }
    })
  }

  render() {
    return (
      <main style={{marginTop: '200px', transform: 'translate(0)'}}>
        <div style={{ border: '1px solid red', width: '200px', height: '200px' }} onClick={this.handleClick} onContextMenu={this.handleClick}>
          yolo
        </div>
        <MyAwesomeMenu />
        <MyAwesomeMenu2 />
      </main>
    );
  }
}

export default App;
