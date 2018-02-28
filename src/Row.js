import React, { PureComponent } from 'react';
import {ContextMenuProvider} from 'react-contexify';
import { Transition }  from 'react-transition-group';

export default class Row extends PureComponent {
  render() {
    const { id,avatar, firstname, lastname, email, companyName, event } = this.props;
    return (
        <React.Fragment>
        <td><img src={avatar} alt="avatar" /></td>
        <td>{firstname}</td>
        <td>{lastname}</td>
        <td>{email}</td>
        <td>{companyName}</td>
        </React.Fragment>
    )
  }
}