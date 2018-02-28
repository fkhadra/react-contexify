# React-contexify ![Build Status](https://travis-ci.org/fkhadra/react-contexify.svg?branch=master) [![npm](https://img.shields.io/npm/dm/react-contexify.svg)]() [![npm](https://img.shields.io/npm/v/react-contexify.svg)]() [![license](https://img.shields.io/github/license/fkhadra/react-contexify.svg?maxAge=2592000)]() [![Coverage Status](https://coveralls.io/repos/github/fkhadra/react-contexify/badge.svg?branch=master)](https://coveralls.io/github/fkhadra/react-contexify?branch=master)

A declarative context menu for React 😲 !

![readme-ctx](https://user-images.githubusercontent.com/5574267/29753912-43c54008-8b7b-11e7-9627-258fde1ffddd.gif)

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
    - [The gist](#the-gist)
    - [Wrap component with the html tag of your choice](#wrap-component-with-the-html-tag-of-your-choice)
    - [Disable an Item](#disable-an-item)
    - [Disable a submenu](#disable-a-submenu)
    - [Change the Submenu arrow](#change-the-submenu-arrow)
    - [The onClick callback](#the-onclick-callback)
        - [event](#event)
        - [ref](#ref)
        - [data](#data)
        - [dataFromProvider](#datafromprovider)
        - [Why use destructuring assignment?](#why-use-destructuring-assignment)
- [Api](#api)
    - [ContextMenuProvider](#contextmenuprovider)
    - [ContextMenu](#contextmenu)
    - [Submenu](#submenu)
    - [Item](#item)
    - [Separator](#separator)
    - [IconFont](#iconfont)
- [To-Do](#to-do)
- [Migration from v2 to v3](#migration-from-v2-to-v3)
- [Browser Support](#browser-support)
- [Release Notes](#release-notes)
- [Contribute](#contribute)
- [License](#license)


> ⚠️ The v3 introduces a lot of breaking changes. Please consider reading the migration guide.

## Demo
   
Live demo [here](https://fkhadra.github.io/react-contexify/)   

## Installation

```
$ yarn add react-contexify
or
$ npm install --save react-contexify
```

## Usage

### The gist

```javascript
import { ContextMenu, Item, Separator, Submenu, ContextMenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const onClick = ({ event, ref, data, dataFromProvider }) => console.log('Hello');
// create your menu first
const MyAwesomeMenu = () => (
    <ContextMenu id='menu_id'>
       <Item onClick={onClick}>Lorem</Item>
       <Item onClick={onClick}>Ipsum</Item>
       <Separator />
       <Item disabled>Dolor</Item>
       <Separator />
       <Submenu label="Foobar">
        <Item onClick={onClick}>Foo</Item>
        <Item onClick={onClick}>Bar</Item>
       </Submenu>
    </ContextMenu>
);

const App = () => (
    <div>
        <h1>Welcome to My App</h1>
        <ContextMenuProvider id="menu_id">
            <div>Some Content ... </div>
        </ContextMenuProvider>
        <MyAwesomeMenu />
    </div>
);

```

### Wrap component with the html tag of your choice

The `ContextMenuProvider` expose a `renderTag` prop to let you do that.

```js
const Tr = (props) => (
  <ContextMenuProvider id="menu_id" renderTag="tr">
    <td>{props.cel1}</td>
    <td>{props.cel2}</td>
  </ContextMenuProvider>
);
```

### Disable an Item 

You can disable an `Item` with a boolean or a callback. When a callback is used, a boolean must be returned. The callback has access to the same parameter as the `onClick` callback.

```js
const isDisabled = ({ event, ref, data, dataFromProvider }) => {
    return true;
}

<ContextMenu id='menu_id'>
    <Item disabled>Foo</Item>
    <Item disabled={isDisabled}>Bar</Item>
</ContextMenu>
```

### Disable a submenu

Disable a `Submenu` is simple as disabling an `Item`. The disabled callback is slightly different, there is no data param. 

```js
<ContextMenu id='menu_id'>
    <Item>Foo</Item>
    <Submenu label="Submenu" disabled>
        <Item>Bar</Item>
    </Submenu>
</ContextMenu>
```

### Change the Submenu arrow

```js
<ContextMenu id='menu_id'>
    <Item>Foo</Item>
    <Submenu label="Submenu" arrow="🦄">
        <Item>Bar</Item>
    </Submenu>
    <Separator />
    <Submenu label="Submenu" arrow={<i className="rocket">🚀</i>}>
        <Item>Bar</Item>
    </Submenu>
</ContextMenu>
```


### The onClick callback

The `onClick` callback of the `Item` component gives you access to an object with 4 properties:

#### event

The event property refers to the native event which triggered the menu. It can be used to access the mouse coordinate or any other event prop.

```js
const onClick = ({ event, ref, data, dataFromProvider }) => {
    // Accessing the mouse coordinate
    console.log(event.clientX, event.clientY);
}
```

#### ref

> If you wrap a single react component ref will be the mounted instance of the wrapped component.

> If you wrap more than one component ref will be an array containing a ref of every component.

**ref will be an instance of the react component only if the component is declared as a class**

For more details about ref please read [this](https://facebook.github.io/react/docs/refs-and-the-dom.html)

- With a single component

```js
const Wrapped = () => (
    <ContextMenuProvider id="id">
        <Avatar id="foobar" />
    </ContextMenuProdider>
);

const onClick = ({ event, ref, data, dataFromProvider }) => {
   // Retrieve the Avatar id
   console.log(ref.props.id); 
}

```

- With more than one component

```js
const Wrapped = () => (
    <ContextMenuProvider id="id">
        <Avatar id="foobar" />
        <Avatar id="plop" />
    </ContextMenuProdider>
);

const onClick = ({ event, ref, data, dataFromProvider }) => {
   // Print foobar
   console.log(ref[0].props.id); 

   // Print plop
   console.log(ref[1].props.id); 
}

```

- With an html node, the ref contains the html node 🤣

```js
const Wrapped = () => (
    <ContextMenuProvider id="id">
        <div id="foobar" data-xxx="plop">bar</div>
    </ContextMenuProdider>
);

const onClick = ({ event, ref, data, dataFromProvider }) => {
   // Retrieve the div id
   console.log(ref.id); 

   // Access the data attribue
   console.log(ref.dataset.xxx); 
}

```

With more than one html node wrapped you get an array as well.


#### data

```js
const onClick = ({ event, ref, data, dataFromProvider }) => {
   // Print Ada
   console.log(data.name); 
}

const YourMenu = () => (
    <ContextMenu>
        <Item data={name: 'Ada'} onClick={onClick}>Hello</Item>
    </ContextMenu>
);
```

#### dataFromProvider

The data prop passed to the `ContextMenuProvider` is accessible for every `Item` as `dataFromProvider`.

```js
const Wrapped = () => (
    <ContextMenuProvider id="id" data={name: 'Ada'}>
        <div id="foobar" data-xxx="plop">bar</div>
    </ContextMenuProdider>
);

const onClick = ({ event, ref, data, dataFromProvider }) => {
   // Print Ada Again 
   console.log(dataFromProvider.name); 
}

```

#### Why use destructuring assignment?

- As a developer, pick only what you want: `({ ref }) => {}`
- As a maintainer, easier to extend the library: `({ event, ref, data, dataFromProvider, theFithParameter }) => {}`
- `'destructuring'.substring(-1, 8)` 💥

## Api

### ContextMenuProvider 

| Props                | Default         | Required | Description                                                                              |
|----------------------|-----------------|----------|------------------------------------------------------------------------------------------|
| id: string \| number | -               | ✓        | Id used to map your component to a context menu                                          |
| renderTag: string    | 'div'           | ✘        | The tag used to wrap the child component                                                 |
| event: string        | 'onContextMenu' | ✘        | Same as React Event (onClick, onContextMenu ...).	Event used to trigger the context menu |
| data: any            | -               | ✘        | Data are passed to the Item onClick callback.                                            |
| storeRef: boolean    | true            | ✘        | Store ref of the wrapped component.                                                      |
| className: string    | -               | ✘        | Additional className                                                                     |
| style: object        | -               | ✘        | Additional style                                                                         |

```javascript
<ContextMenuProvider id="menu_id" data={foo: 'bar'}>
    <MyComponent />
</ContextMenuProvider>
```

### ContextMenu

| Props                | Required | Possible Value              | Description                                                                 |
|----------------------|----------|-----------------------------|-----------------------------------------------------------------------------|
| id: string \| number | ✓        | -                           | Used to identify the corresponding menu                                     |
| style: object        | ✘        | -                           | An optional style to apply                                                  |
| classname: string    | ✘        | -                           | An optional css class to apply                                              |
| theme: string        | ✘        | light \| dark               | Theme is appended to `react-contexify__theme--${given theme}`               |
| animation: string    | ✘        | fade \| flip \| pop \| zoom | Animation is appended to `.react-contexify__will-enter--${given animation}` |

```js
// You can set built-in theme and animation using the provided helpers as follow
import { ContextMenu, Item, theme, animation } from 'react-contexify';

<ContextMenu id="foo" theme={theme.dark} animation={animation.pop}>
    <Item>Foo</Item>
    <Item disabled>Bar</Item>
    {/* and so on  */}
</ContextMenu>    
```

### Submenu 

| Props                                                        | Default | Required | Description                                                                   |
|--------------------------------------------------------------|---------|----------|-------------------------------------------------------------------------------|
| label: node                                                  | -       | ✓        | Submenu label. It can be a string or any node element like `<div>hello</div>` |
| disabled: bool \| ({ event, ref, dataFromProvider }) => bool | false   | ✘        | Disable the item. If a function, it must return a boolean.                    |
| arrow: node                                                  | -       | ✘        | Define a custom arrow                                                         |

### Item 

| Props                                                              | Default | Required | Description                                                |
|--------------------------------------------------------------------|---------|----------|------------------------------------------------------------|
| disabled: bool \| ({ event, ref, data, dataFromProvider }) => bool | false   | ✘        | Disable the item. If a function, it must return a boolean. |
| onClick: ({ event, ref, data, dataFromProvider }) => void          | -       | ✘        | Callback when the item is clicked                          |
| data: any                                                          | -       | ✘        | Additional data that will be passed to the callback        |

### Separator 

Don't expect any props. It's just a separator xD.

`<Separator />`

### IconFont 

| Props             | Required | Description          |
|-------------------|----------|----------------------|
| className: string | ✘        | Additional className |
| style: object     | ✘        | Additional style     |

The icon font renders a i tag. It's just a helper

```javascript
//example with Font Awesome 
<Item>
    <IconFont className="fa fa-trash" />Delete
</Item>
//example with material icons
<Item>
    <IconFont className="material-icons">remove_circle</IconFont>Delete
<Item>
```

## To-Do

- [ ] Allow keyboard navigation
- [ ] Switch or not to styled component?
- [ ] Accessibility
- [ ] RTL support


## Migration from v2 to v3

A huge part of the code has been reviewed. The api has been simplified.

- There is no more `leftIcon` and `rightIcon` on the `Item` component. Do `<Item><IconFont className="fa fa-delete" /> delete</Item>` instead
- The `menuProvider` HOC has been removed. You can create yours easely
- The `onClick` callback use destructuring assignment over explicit parameter


## Browser Support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)
--- | --- | --- | --- | --- | --- |
IE 11+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Release Notes

### v3

- Support submenu
- Add typescript definition
- Reviewed the api
- Upgrade to react 16

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

## License

React Contexify is licensed under MIT. 
