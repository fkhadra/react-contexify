<img width="645" alt="screenshot 2018-10-31 at 13 32 57" src="https://user-images.githubusercontent.com/5574267/47815610-1806fa00-dd51-11e8-981b-2f680244ae29.png">

![Build Status](https://travis-ci.org/fkhadra/react-contexify.svg?branch=master) [![npm](https://img.shields.io/npm/dm/react-contexify.svg)]() [![npm](https://img.shields.io/npm/v/react-contexify.svg)]() [![license](https://img.shields.io/github/license/fkhadra/react-contexify.svg?maxAge=2592000)]() [![Coverage Status](https://coveralls.io/repos/github/fkhadra/react-contexify/badge.svg?branch=master)](https://coveralls.io/github/fkhadra/react-contexify?branch=master)

![readme-ctx](https://user-images.githubusercontent.com/5574267/29753912-43c54008-8b7b-11e7-9627-258fde1ffddd.gif)

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
import 'react-contexify/dist/ReactContexify.min.css';

const onClick = ({ event, props }) => console.log(event,props);

// create your menu first
const MyAwesomeMenu = () => (
    <Menu id='menu_id'>
       <Item onClick={onClick}>Lorem</Item>
       <Item onClick={onClick}>Ipsum</Item>
       <Separator />
       <Item disabled>Dolor</Item>
       <Separator />
       <Submenu label="Foobar">
        <Item onClick={onClick}>Foo</Item>
        <Item onClick={onClick}>Bar</Item>
       </Submenu>
    </Menu>
);

const App = () => (
    <div>
        <MenuProvider id="menu_id" style={{ border: '1px solid purple', display: 'inline-block' }}>
            Right click me...
        </MenuProvider>
        <MyAwesomeMenu />
    </div>
);
```

## To-Do

- [ ] Allow keyboard navigation
- [ ] Accessibility
- [ ] RTL support
- [ ] Add release notes


## Browser Support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- | --- | --- | --- |
IE 11+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |


## Contribute

Any idea and suggestions are welcome. There is a playground to help you start, just run `yarn start`.

## License

React Contexify is licensed under MIT. 
