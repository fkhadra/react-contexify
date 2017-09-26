# React-contexify [![Build Status](https://travis-ci.org/fkhadra/react-contexify.svg?branch=master)](https://travis-ci.org/fkhadra/react-contexify) [![npm](https://img.shields.io/npm/dt/react-contexify.svg)]() [![npm](https://img.shields.io/npm/v/react-contexify.svg)]() [![license](https://img.shields.io/github/license/fkhadra/react-contexify.svg?maxAge=2592000)]()

![readme-ctx](https://user-images.githubusercontent.com/5574267/29753912-43c54008-8b7b-11e7-9627-258fde1ffddd.gif)

Add a context menu to your react application with ease !

* [Demo](#demo)
* [Installation](#installation)
* [Features](#features)
* [How it works ?](#how-it-works-)
* [Add a context menu to a table](#add-a-context-menu-to-a-table)
* [Api](#api)
* [Migration from v1 to v2](#migration-from-v1-to-v2)
* [Release Notes](#release-notes)

## Demo
   
Live demo [here](https://fkhadra.github.io/react-contexify/)   

## Installation

```
$ yarn add react-contexify
or
$ npm install --save react-contexify
```

You also need to include the css file provided. Otherwise it wont work as expected. 

### Style Loader :

```javascript
import 'react-contexify/dist/ReactContexify.min.css' 
```

### 1998 Script tag : 

``` 
<link rel="stylesheet" href="/dist/ReactContexify.min.css"/>
``` 

## Features

- The context menu never leave the visible screen. You can reduce the window to check the behavior
- The callback provide an access to the wrapped component
- One menu can be use for multiple targets
- Create as many contextual menu as you want, as long as the id is unique
- Easily customizable. Theme are split into different sass file. Fifteen line of code can be enough to create a theme
- Don't rely on `findDOMNode`

## How it works ?

### Create your menu

```javascript
import { ContextMenu, Item, Separator, IconFont } from 'react-contexify';

function onClick(targetNode, ref, data) {
    // targetNode refer to the html node on which the menu is triggered
    console.log(targetNode);
    //ref will be the mounted instance of the wrapped component
    //If you wrap more than one component, ref will be an array of ref
    console.log(ref);
    // Additionnal data props passed down to the `Item`
    console.log(data);
}

// create your menu first
const MyAwesomeMenu = () => (
    <ContextMenu id='menu_id'>
        <Item leftIcon={<IconFont className="fa fa-plus" />} onClick={onClick}>
            Add
        </Item>
        <Item leftIcon={<IconFont className="material-icons">remove_circle</IconFont>} onClick={onClick}>
            Remove
        </Item>
        <Item><IconFont className="fa fa-scissors" />cut</Item>
        <Separator/>
        <Item disabled>
            Paste
        </Item>
    </ContextMenu>
);

```

### Define which component can display the menu

```javascript
import { ContextMenuProvider, menuProvider } from 'react-contexify';

//wrap your component with the `ContextMenuProvider`

const Foo = () => <ContextMenuProvider id="menu_id">bar</ContextMenuProvider>;
const Bar = () => <ContextMenuProvider id="menu_id">baz</ContextMenuProvider>;

// or you can use the curried function to add the same menu for many components, it's up to you

const addContextMenu = menuProvider('menu_id'); 
const Foo = addContextMenu(YourComponent);
const Bar = addContextMenu(YourCompoenent);
```

### All together

```javascript
import React from 'react';

import MyAwesomeMenu from './MyAwesomeMenu';
import Foo from './Foo';
import Bar from './Bar';

const App = () => (
    <div>
        <Foo />
        <Bar />
        <MyAwesomeMenu/>
    </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## Add a context menu to a table

```javascript
import { ContextMenuProvider } from 'react-contexify';

//You need to use a tr as a render tag otherwise your browser console will bleed !
const Tr = (props) => (
  <ContextMenuProvider id="menu_id" renderTag="tr">
    <td>{props.cel1}</td>
    <td>{props.cel2}</td>
  </ContextMenuProvider>
);

class Table extends Component {
  render() {
    return (
      <table>
        <thead>
        <tr>
        <th>Cel 1</th>
        <th>Cel 2</th>
        </tr>
        </thead>
        <tbody>
          <Tr cel1="lorem" cel2="ipsum" />
          <Tr cel1="foo" cel2="bar" />
        </tbody>
      </table>
  )
  }
}

```

## Api

### ContextMenu (Type : React Component)

|Props    |Type   |Default|Required|Possible Value                                 |	Description|
|---------|-------|:-----:|:------:|-----------------------------------------------|------------|
|id       |	string\|int|-      |	✓      | -                                     |Used to identify the corresponding menu|
|children |	`Item`\|`null`|-      |	✓      | -                                     |Menu item|
|theme    |	string|	      |	✘     |	light \| dark                              |Theme is appended to `react-contexify__theme--${given theme}`   |
|animation|	string|	      |	✘     |	fade \| flip \| pop \| zoom|Animation is appended to `.react-contexify__will-enter--${given animation}`  |

You can set built-in theme and animation using ContextMenu constant as follow :

`
<ContextMenu id="foo" theme={ContextMenu.THEME.dark} animation={ContextMenu.ANIMATION.pop}>
    ...
</ContextMenu>    
`

### Item (Type : React Component)

|Props    |Type    |Default|Required|Description|
|---------|--------|:-----:|:------:|------------|
|children	  |node  |-	   |✓	    |Any valid node to render(string, react component...)
|leftIcon	  |node  |	   |✘	    |Any valid node to render(string, react component...)
|rightIcon  |node  |	   |✘	    |Any valid node to render(string, react component...)
|disabled   |bool    |false  |✘	    |Disable the item
|onClick    |function|	   |✘	    |Callback when the item is clicked
|data	  |any	   |       |✘	    |Additional data that will be passed to the callback

#### `onClick` 
 
When an you select an Item your callback will receive 3 parameters: `targetNode`, `refs`, `data`.

- if you wrap a single react component refs will be the mounted instance of the wrapped component
- If you wrap more than one component refs will be an array of ref

**ref will be an instance of the react component only if the component is declared as a class**

If you use any flux store like redux or mobx stick with it.

For more details about ref please read [this](https://facebook.github.io/react/docs/refs-and-the-dom.html)

### Separator (Type : React Component)

Don't expect any props. It's just a separator xD.

`<Separator />`

### IconFont (Type : React Component)

|Props    |Type   |Default|Required|	Description|
|---------|-------|:-----:|:------:|------------|
|children |	node|-      |✘	      |Menu item|
|className    |	string|	      |	✘     |	Additional className|
|style|	string|	      |	✘     |	Additional style |

The icon font render a i tag.

```javascript
//example with Font Awesome 
<IconFont className="fa fa-trash" />
//example with material icons
<IconFont className="material-icons">remove_circle</IconFont>
```

### ContextMenuProvider (Type : React Component)

|Props    |Type    |Default|Required|Possible Value |Description|
|---------|--------|:-----:|:------:|------------|----|
|id	      |string or int|	-|	✓|	-|	Id used to map your component to a context menu
|renderTag|node|	div|	✘|	-|	The render tag of the wrapper
|event|	string|	onContextMenu|	✘|	Same as React Event (onClick, onContextMenu ...)|	Event to trigger the context menu
|className|	string|	|	✘|	|	Additional className
|style|	object|	|	✘|	|	Additional style

```javascript
const Foo = () => <ContextMenuProvider id="menu_id"><MyComponent /></ContextMenuProvider>;
```

### menuProvider (Type : function)

|Args    |Type    |Default|Required|Possible Value |Description|
|---------|--------|:-----:|:------:|------------|----|
|id	      |string|	-|	✓|	-|	Id used to map your component to a context menu

- Function returned by menuProvider expect :

|Args    |Type    |Default|Required|Possible Value |Description|
|---------|--------|:-----:|:------:|------------|----|
|targetComponent|React Component|	-|	✓|	-|	The component on which you want to add a context menu
|renderTag|node|	div|	✘|	-|	The render tag of the wrapper
|event|	string|	onContextMenu|	✘|	Same as React Event (onClick, onContextMenu ...)|	Event to trigger the context menu
|className|	string|	|	✘|	|	Additional className
|style|	object|	|	✘|	|	Additional style

## Migration from v1 to v2

Breaking changes are a pain for developers but sometimes we have too. 

**Item Component:**
You can render whatever you want now, which gives you more control.
```javascript
//before
<Item label="foo" />
// now
<Item>foo</Item>
```
**onClick callback:**
Having access to the instance of the react component can be sometimes really useful.
```javascript
//before
onClick(targetNode, data)
// now
onClick(targetNode, refs, data)
```

## Release Notes

### 2.1.4

- [Fix child references](https://github.com/fkhadra/react-contexify/pull/36). Thanks to @kinke 

### 2.1.3

- Fixed [issue 33](https://github.com/fkhadra/react-contexify/issues/33)
- Removed Proxy Container.
 
### 2.1.2

- Fixed for real ! [issue 27](https://github.com/fkhadra/react-contexify/issues/27)

### 2.1.0

- Context menu is now rendered outside of the main react root component to avoid the fixed position being broken by the parent style. For more details please see [issue 27](https://github.com/fkhadra/react-contexify/issues/27)

### 2.0.7

- Simplified implementation [Pull Request #22](https://github.com/fkhadra/react-contexify/pull/22)

### 2.0.6

- Typo fix in documentation
- Pass props down to `menuProvider` function

### 2.0.5

- Will now hide menu on mousedown.Relate to [issue 19](https://github.com/fkhadra/react-contexify/issues/19)
- Added flag noIdents to cssnano to avoid animation name collision with other libs

#### Bug Fix

- Fixed zoom animation

### 2.0.4

- Minor code cleanup

### 2.0.3

#### Bug Fix

- Firefox trigger a click event also on context menu which was making the menu disappear. 
Relate to [issue 16](https://github.com/fkhadra/react-contexify/issues/16)

### 2.0.2

#### Bug Fixes

- Fix issue #14

### 2.0.1

#### Bug Fixes

- conditional rendering was badly tested, shame on me !

### 2.0.0

- This version introduce breaking changes for the item component
- Upgrade to `prop-types`
- Tested with jest and enzyme
- Reviewed build system

### Features

- The `onClick` callback provide a ref to the wrapped component
- Can now use condtionnal rendering for dynamic menu. Relate to [issue 12](https://github.com/fkhadra/react-contexify/issues/12)
- Added `IconFont` component

#### Bug Fixes

- Fixed right click behavior. Relate to [issue 11](https://github.com/fkhadra/react-contexify/issues/11)

### 1.1.0

#### Features
    
- Added possibility to set the render tag for the wrapper
- Added a ContextMenuProvider component
- Added possibility to set className and style to ContextMenuProvider
- Removed ContextMenuProvider style.Was too unpredictable 

#### Bug Fixes

- fixed incorrect PropTypes used
- dead code elimination

## Contribute

Any idea and suggestions are welcome.

## Thanks

Big thanks to [Tobias Reich](https://github.com/electerious). This project is based on [basicContext](https://github.com/electerious/basicContext). A vanilla js context menu.

## License

React Contexify is licensed under MIT. 
