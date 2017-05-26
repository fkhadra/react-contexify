import React from 'react';
import { ContextMenu, Item, Separator, IconFont } from 'react-contexify';

export default ({ theme, animation, removeEntry, changeAvatar, handleHelp }) => (
  <ContextMenu id="demo_id" theme={theme}
               animation={animation}>
    <Item
      onClick={removeEntry}
      leftIcon={<IconFont className="fa fa-trash"/>}
    >
      Delete
    </Item>
    <Item
      onClick={changeAvatar}
      leftIcon={<IconFont className="fa fa-user-circle"/>}
    >
      Change Avatar
    </Item>
    <Item disabled>Im disabled</Item>

    <Separator />
    <Item
      leftIcon={<IconFont className="fa fa-question"/>}
      onClick={handleHelp}
    >
      Help
    </Item>
  </ContextMenu>
);