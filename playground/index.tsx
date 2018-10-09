import { render } from 'react-dom';
import React from 'react';
import { Menu, Item, Separator, Submenu, contextMenu } from "react-contexify";

//import App from './components/App';
import './index.css';

function plop(e: Event){
}

const App = () => {
  
  return (
    <div>
    <Menu id="id" >
      <Item >
        foo
      </Item>
      <Separator />
    </Menu>

    </div>
  )
}

render(<App />, document.getElementById('root'));
