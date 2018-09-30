import React from "react";
import {
  Menu,
  Item,
  Separator,
  Submenu
} from './../../../src';
import {toast } from "react-toastify";

import Emoji from "./Emoji";

export default ({ menuId, theme, animation , throwAlert, deleteRow, sendEmail}) => (
  <Menu id={menuId} theme={theme} animation={animation}>
    <Item onClick={deleteRow}><Emoji>🗑</Emoji>Remove Row</Item>
    <Item onClick={sendEmail}><Emoji>💌</Emoji>Send Email</Item>
    <Item disabled>I'm disabled</Item>
    <Separator />
    <Item onClick={() => toast.error('You shall not click 💩')}><Emoji>⚠️</Emoji>Don't Click!</Item>
    <Separator />
    <Submenu label="More...">
      <Item onClick={throwAlert}>Alert!</Item>
    </Submenu>
  </Menu>
)