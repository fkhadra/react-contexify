import React from 'react';
import {
  ContextMenu,
  Item,
  Separator,
  IconFont,
  Submenu
} from 'react-contexify';

export default ({
  theme,
  animation,
  removeEntry,
  changeAvatar,
  dontClick
}) => (
  <ContextMenu id="demo_id" theme={theme} animation={animation}>
    <Item onClick={removeEntry}><IconFont className="fa fa-trash"/>Delete</Item>
    <Separator />
    <Item onClick={changeAvatar}><IconFont className="fa fa-cog"/>Change Avatar</Item>
    <Item disabled>Im disabled</Item>
    <Submenu label="I'm a submenu">
    <Item onClick={changeAvatar}>Change Avatar</Item>
    <Item disabled>Im disabled</Item>
    </Submenu>  
    <Separator />
    <Item onClick={dontClick}>⚠️ Don't click!</Item>
  </ContextMenu>
);
