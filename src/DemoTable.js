import React, { PureComponent } from 'react';
import {ContextMenuProvider} from 'react-contexify';

export default class DemoTable extends PureComponent {
  getContent() {
      return this.props.data.map(item => (
        <ContextMenuProvider
          id="demo_id"
          renderTag="tr"
          key={item.id}
          data-id={item.id}
        >
          <td><img src={item.avatar} alt="avatar" /></td>
          <td>{item.firstname}</td>
          <td>{item.lastname}</td>
          <td>{item.email}</td>
          <td>{item.companyName}</td>
        </ContextMenuProvider>
      ));
  }

  render() {
    return (
      <table className="u-full-width">
        <thead>
        <tr>
          <th title="Field #1">avatar</th>
          <th title="Field #2">firstname</th>
          <th title="Field #3">lastname</th>
          <th title="Field #4">email</th>
          <th title="Field #5">skills</th>
          <th title="Field #6">city</th>
        </tr>
        </thead>
        <tbody>
        {this.getContent()}
        </tbody>
      </table>
    );
  }
}
