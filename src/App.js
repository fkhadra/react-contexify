import React, { Component } from 'react';
import { ContextMenu } from 'react-contexify';
import { ToastContainer, toast } from 'react-toastify';

import data from './data.json';
import DemoTable from './DemoTable';
import DemoContextMenu from './DemoContextMenu';
import Roller from './Roller';

import 'react-contexify/dist/ReactContexify.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import logo from './logo.svg';
import './App.css';

const themeList = Object.keys(ContextMenu.THEME);
themeList.push('none');
const animationList = Object.keys(ContextMenu.ANIMATION);
animationList.push('none');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      theme: 'none',
      animation: 'none',
      event: 'onContextMenu'
    };
  }

  handleRollerChange = ({ target }) => this.setState(
    { [target.id]: target.value });

  removeEntry = targetNode => this.setState({
    data: this.state.data.filter(item => item.id !== targetNode.dataset.id)
  });

  getRandomAvatar() {
    const randomString = Math.random().toString(36).substring(7);
    return `https://robohash.org/${randomString}.jpg?size=50x50`;
  }

  changeAvatar = targetNode => this.setState({
    data: this.state.data.map(item => {
      if (item.id === targetNode.dataset.id) {
        item.avatar = this.getRandomAvatar();
      }
      return item;
    })
  });

  handleHelp = () => {
    toast(<div>
      <img src={this.getRandomAvatar()} alt="help or not"/>
      <span style={{
        position: 'absolute',
        bottom: '15px'}}
      >Can't Help you sorry !</span>
    </div>);
  };

  render() {
    const { theme, animation, event, data } = this.state;
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h3>Welcome to React-Contexify</h3>
          <h6>Adding a context menu to your react app has never been
            easier!</h6>
          <div><a href="https://github.com/fkhadra/react-contexify"
                  className="button button-primary">View on GitHub</a>
            <a href="https://github.com/fkhadra/react-contexify/zipball/master"
               className="button button-primary">Download .zip</a>
            <a href="https://github.com/fkhadra/react-contexify/tarball/master"
               className="button button-primary">Download .tar.gz</a></div>
        </div>
        <div className="container">
          <div className="row">
            <Roller
              theme={theme}
              animation={animation}
              event={event}
              eventList={['onContextMenu', 'onClick', 'onDoubleClick']}
              themeList={themeList}
              animationList={animationList}
              onChange={this.handleRollerChange}
            />
          </div>
          <div className="row">
            <DemoTable data={data} event={event}/>
          </div>
        </div>
        <DemoContextMenu
          theme={theme}
          animation={animation}
          removeEntry={this.removeEntry}
          changeAvatar={this.changeAvatar}
          handleHelp={this.handleHelp}
        />
        <ToastContainer />;
      </div>
    );
  }
}

export default App;
