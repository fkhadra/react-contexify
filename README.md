# React-contexify [![npm](https://img.shields.io/npm/dt/react-contexify.svg)]() [![npm](https://img.shields.io/npm/v/react-contexify.svg)]() [![license](https://img.shields.io/github/license/fkhadra/react-contexify.svg?maxAge=2592000)]()

Context menu for your react component

# Installation

### npm : 

```
npm i react-contexify --save
```
Include also the css file provided. Otherwise it wont work as expected. 

### Script tag : 

``` 
<script src="/dist/ReactContexify.min.js"></script>
<link rel="stylesheet" href="/dist/ReactContexify.min.css"/>
``` 

# Features

- One menu can be triggered on multiple targets
- Create as many contextual menu as you want, as long as the id is unique
- Easily customizable. Theme are split into different sass file. Fifteen line of code can be enough to create a theme
- The context menu never leave the visible screen. You can reduce the window to check the behavior

# Demo

Available [here](https://fkhadra.github.io/react-contexify).

# Usage

1.Create a menu

```javascript
import { ContextMenu, Item, Separator } from 'react-contexify';

function onClick(item, target) {
    // item is the item component on which you clicked. You can access all the props
    console.log(item);
    // target refer to the html node on which the menu is triggered
    console.log(target);
}

// create your menu first
const MyAwesomeMenu = () => {
    return (
        <ContextMenu id='menu_id'>
            <Item label="Add" icon="fa fa-plus" onClick={onClick} />
            <Item label="Remove" icon="fa fa-trash" onClick={onClick} />
            <Separator/>
            <Item label="Paste" icon="fa fa-clipboard" disabled />
        </ContextMenu>
    );
};
```

2.Define which component can display the menu

```javascript
import { ContextMenuProvider, menuProvider } from 'react-contexify';

const Hodor = () => <div>Hodor</div>;
const Cersei = () => <div>Cersei</div>;
const Aria = () => <div>Aria</div>;

const CerseiWithContextMenu = () => {
    return (
        <ContextMenuProvider id="menu_id">
            <Cersei />
        </ContextMenuProvider>
    )
};
// or you can use the curried function to add the same menu for many components

const addContextMenu = menuProvider('menu_id'); 
const HodorWithContextMenu = addContextMenu(Hodor);
const AriaWithContextMenu = addContextMenu(Aria);
```

3.All together

```javascript
// import statement ...

const App = () => {
    return(
        <div>
            <CerseiWithContextMenu />
            <HodorWithContextMenu />
            <AriaWithContextMenu />
            <MyAwesomeMenu/>
        </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

# Add a context menu to a table

```javascript
import { ContextMenuProvider } from 'react-contexify';

//You need to use a tr as a render tag otherwise your browser console will bleed !
const Tr = (props) => {
    return (
        <ContextMenuProvider id="menu_id" renderTag="tr">
            <td>{props.cel1}</td>
            <td>{props.cel2}</td>
        </ContextMenuProvider>;
    )
}

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

# Api

## ContextMenu (Type : React Component)

|Props    |Type   |Default|Required|Possible Value                                 |	Description|
|---------|-------|:-----:|:------:|-----------------------------------------------|------------|
|id       |	string|-      |	✓      | -                                             |Used to trigger the corresponding menu|
|theme    |	string|	      |	✘     |	light &#124; dark                              |Style your context menu    |
|animation|	string|	      |	✘     |	fadeIn &#124; flipIn &#124; popIn &#124; zoomIn|Opening animation|

## Item (Type : React Component)

|Props    |Type    |Default|Required|Description|
|---------|--------|:-----:|:------:|------------|
|label	  |string  |-	   |✓	    |Menu item label
|icon	  |string  |	   |✘	    |Any css classes icon(work well with font awesome)
|disabled |bool    |false  |✘	    |Disable the item
|onClick  |function|	   |✘	    |Callback defined on the item. The callback return the current item and the target
|data	  |any	   |       |✘	    |Can be any additional data you want to pass

## Separator (Type : React Component)

Separator component don't expect any props. It's just a separator xD.

## ContextMenuProvider (Type : React Component)

|Props    |Type    |Default|Required|Possible Value |Description|
|---------|--------|:-----:|:------:|------------|----|
|id	      |string or int|	-|	✓|	-|	Id used to map your component to a context menu
|renderTag|node|	div|	✘|	-|	The render tag of the wrapper
|event|	string|	onContextMenu|	✘|	Same as React Event (onClick, onContextMenu ...)|	Event to trigger the context menu
|className|	string|	|	✘|	|	css classes, what else
|style|	object|	|	✘|	|	style object for inline style


## menuProvider (Type : function)

|Args    |Type    |Default|Required|Possible Value |Description|
|---------|--------|:-----:|:------:|------------|----|
|id	      |string|	-|	✓|	-|	Id used to map your component to a context menu

- Function returned by menuProvider expect :

|Args    |Type    |Default|Required|Possible Value |Description|
|---------|--------|:-----:|:------:|------------|----|
|targetComponent|React Component|	-|	✓|	-|	The component on which you want to add a context menu
|renderTag|node|	div|	✘|	-|	The render tag of the wrapper
|event|	string|	onContextMenu|	✘|	Same as React Event (onClick, onContextMenu ...)|	Event to trigger the context menu

## Release Notes

### 1.1.0

#### Features
    
- Added possibility to set the render tag for the wrapper
- Added a ContextMenuProvider component
- Added possibility to set className and style to ContextMenuProvider
- Removed ContextMenuProvider style.Was too unpredictable 

#### Bug Fixes

- fixed incorrect PropTypes used
- dead code elimination


# Thanks

Big thanks to [Tobias Reich](https://github.com/electerious). This project is based on [basicContext](https://github.com/electerious/basicContext). A vanilla js context menu.

# License

React Contexify is licensed under MIT. Do anything that you want.


