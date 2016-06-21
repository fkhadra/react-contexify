# React-contexify

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

Available [here](https://sniphpet.github.io/react-contexify).

# Usage

```
import { ContextMenu, Item, Separator, menuProvider } from 'react-contexify';

function onClick(item, target) {
    // item is the item component on which you clicked. You can access all the props
    console.log(item);
    // target refer to the html node on which the menu is triggered
    console.log(target);
}

// create your menu first
const MyAwesomeMenu = () => {
    return (
        <ContextMenu id='menu_id'> //id is mandatory
            <Item label="Add" icon="fa fa-plus" onClick={onClick} />
            <Item label="Remove" icon="fa fa-trash" onClick={onClick} />
            <Separator/>
            <Item label="Paste" icon="fa fa-clipboard" disabled />
        </ContextMenu>
    );
};

const Hodor = () => <div>Hodor</div>;

// wrap your component
const HodorWithContextMenu = menuProvider('menu_id')(Hodor);

// all together

const App = () => {
    return(
        <div>
            <HodorWithContextMenu />
            <MyAwesomeMenu/>
        </div>
    )
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

## menuProvider (Type : function)

|Props    |Type    |Default|Required|Possible Value |Description|
|---------|--------|:-----:|:------:|------------|----|
|id	      |string|	-|	✓|	-|	Id used to map your component to a context menu
|targetComponent|React Component|	-|	✓|	-|	The component on which you want to add a context menu
|event|	string|	contextmenu|	✘|	click &#124; contextmenu &#124; touchend &#124; dblclick|	Event listener to trigger the context menu

# Thanks

Big thanks to [Tobias Reich](https://github.com/electerious). This project is based on [basicContext](https://github.com/electerious/basicContext). A vanilla js context menu.

# License

React Contexify is licensed under MIT. Do anything that you want.


