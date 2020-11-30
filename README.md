<img width="645" alt="screenshot 2018-10-31 at 13 32 57" src="https://user-images.githubusercontent.com/5574267/47815610-1806fa00-dd51-11e8-981b-2f680244ae29.png">

![React-contexify CI](https://github.com/fkhadra/react-contexify/workflows/React-contexify%20CI/badge.svg) [![npm](https://img.shields.io/npm/dm/react-contexify.svg)]() [![npm](https://img.shields.io/npm/v/react-contexify.svg)]() [![license](https://img.shields.io/github/license/fkhadra/react-contexify.svg?maxAge=2592000)]()

<div style="text-align:center">

![contexify](https://user-images.githubusercontent.com/5574267/100552409-500dfd80-3287-11eb-96ee-fc1d17ef50b8.gif)

</div>


## Documentation

Go [here](https://fkhadra.github.io/react-contexify). 

## Installation

Using yarn

```sh
$ yarn add react-contexify
```

Using npm

```sh
$ npm install --save react-contexify
```

## The gist

```js
import React from 'react';
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const MENU_ID = 'blahblah';

function App() {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event){
      event.preventDefault();
      show({
        event,
        props: {
            key: 'value'
        }
      })
  }
  const handleItemClick = ({ event, props }) => console.log(event,props);

  return (
    <div>
    <p onContextMenu={handleContextMenu}>lorem ipsum blabladhasi blaghs blah</p>  
    <Menu id={MENU_ID}>
      <Item onClick={handleItemClick}>Item 1</Item>
      <Item onClick={handleItemClick}>Item 2</Item>
      <Separator />
      <Item disabled>Disabled</Item>
      <Separator />
      <Submenu label="Foobar">
        <Item onClick={handleItemClick}>Sub Item 1</Item>
        <Item onClick={handleItemClick}>Sub Item 2</Item>
      </Submenu>
    </Menu>
    </div>
  );
}
```

## Contribute

Any idea and suggestions are welcome. Please have a look at the contributing guide.

## License

React Contexify is licensed under MIT. 
