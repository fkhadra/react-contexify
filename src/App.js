import React, { Component } from 'react';
import {
  ContextMenu,
  Item,
  IconFont,
  Separator
} from 'react-contexify';
import { ToastContainer, toast } from 'react-toastify';
import data from './data.json';
import DemoTable from './DemoTable';
import FlipMove from 'react-flip-move';

import 'react-contexify/dist/ReactContexify.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import logo from './logo.svg';
import './App.css';

class User extends React.PureComponent {
  render() {
    const { id, firstname, lastname, companyName, email, avatar } = this.props;
    return (
      <div>
        <div><img src={avatar} alt="avatar" /></div>
        <div>{firstname}</div>
        <div>{lastname}</div>
        <div>{email}</div>
        <div>{companyName}</div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  removeEntry = targetNode => this.setState({
    data: data.filter(item => item.id !== targetNode.dataset.id)
  });

  handleHelp() {
    toast("Can't Help you muahaha");
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React-Contexify</h2>
        </div>
        <p className="App-intro">

        </p>
        <div className="container">
          <div className="row">
            <DemoTable data={this.state.data}/>
          </div>
        </div>
        <ContextMenu id="demo_id">
          <Item
            onClick={this.removeEntry}
            leftIcon={<IconFont className="fa fa-trash"/>}
          >
            Delete Row
          </Item>
          <Item disabled>Im disabled</Item>

          <Separator />
          <Item
            leftIcon={<IconFont className="fa fa-question"/>}
            onClick={this.handleHelp}
          >
            Help
          </Item>
        </ContextMenu>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
