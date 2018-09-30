import React, { Component } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { contextMenu } from './../../../src';

import List from './List';
import Menu from './Menu';
import { demoData, menuIds } from '../../utils';

class DemoList extends Component {
  state = {
    rows: demoData,
  };

  handleTableMenu = e => {
    e.preventDefault();
    let payload;
    demoData.forEach(item => {
      if (item.id === parseInt(e.currentTarget.dataset.id, 10)) {
        payload = item;
      }
    })
    contextMenu.show({
      id: menuIds.table,
      event: e,
      props: {
        item: payload,
      },
    });
  };

  deleteRow = ({ props }) => {
    this.setState({
      rows: this.state.rows.filter(({ id }) => id !== parseInt(props.item.id, 10)),
    });
  };

  sendEmail({ props }) {
    toast(`Email sent at ${props.item.email}`);
  }

  throwAlert() {
    window.alert('Told ya!');
  }

  render() {
    return (
      <div>
        <List
          {...this.props}
          eventHandler={this.handleTableMenu}
          rows={this.state.rows}
        />
        <Menu
          {...this.props}
          menuId={menuIds.table}
          throwAlert={this.throwAlert}
          deleteRow={this.deleteRow}
          sendEmail={this.sendEmail}
        />
        <ToastContainer />
      </div>
    );
  }
}

export default DemoList;
