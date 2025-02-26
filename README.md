<img width="645" alt="screenshot 2018-10-31 at 13 32 57" src="https://user-images.githubusercontent.com/5574267/47815610-1806fa00-dd51-11e8-981b-2f680244ae29.png">

[![React-contexify CI](https://github.com/fkhadra/react-contexify/workflows/React-contexify%20CI/badge.svg)](https://github.com/fkhadra/react-contexify/actions/workflows/build.yaml)
[![npm Downloads](https://img.shields.io/npm/dm/react-contexify.svg)](https://npm-compare.com/react-contexify/#timeRange=FIVE_YEARS)
[![npm Version](https://img.shields.io/npm/v/react-contexify.svg)](https://npmjs.com/package/react-contexify)
[![License](https://img.shields.io/github/license/fkhadra/react-contexify.svg?maxAge=2592000)](https://github.com/fkhadra/react-contexify/blob/main/LICENSE)

<div style="text-align:center">

![contexify](https://user-images.githubusercontent.com/5574267/100552409-500dfd80-3287-11eb-96ee-fc1d17ef50b8.gif)

</div>

## Features

- Easy to set up for real, you can make it work in less than 10sec!
- Super easy to customize thanks to css variables 💅
- Custom position
- Sub menu support
- Does not go offscreen
- Dark mode 🌒
- Keyboard navigation + keyboard shortcut!
- Built-in animations
- Easy to test!
- Written in Typescript 💪
- Tiny! (3k gzipped)

Check the documentation for more!


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
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/ReactContexify.css';

const MENU_ID = 'blahblah';

function App() {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event){
      show({
        event,
        props: {
            key: 'value'
        }
      })
  }

  // I'm using a single event handler for all items
  // but you don't have too :)
  const handleItemClick = ({ id, event, props }) => {
    switch (id) {
      case "copy":
        console.log(event, props)
        break;
      case "cut";
        console.log(event, props);
        break;
      //etc...
    }
  }

  return (
    <div>
    <p onContextMenu={handleContextMenu}>lorem ipsum blabladhasi blaghs blah</p>  
    <Menu id={MENU_ID}>
      <Item id="copy" onClick={handleItemClick}>Copy</Item>
      <Item id="cut" onClick={handleItemClick}>Cut</Item>
      <Separator />
      <Item disabled>Disabled</Item>
      <Separator />
      <Submenu label="Foobar">
        <Item id="reload" onClick={handleItemClick}>Reload</Item>
        <Item id="something" onClick={handleItemClick}>Do something else</Item>
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
