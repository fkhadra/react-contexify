import React, { Component } from 'react';
import { ContextMenu, theme, animation } from 'react-contexify';
import { ToastContainer, toast } from 'react-toastify';

import data from './data.json';
import DemoTable from './DemoTable';
import Menu from './Menu';
import Roller from './Roller';

import 'react-contexify/dist/ReactContexify.min.css';

import logo from './logo.svg';
import './App.css';

const themeList = Object.keys(theme);
themeList.push('none');
const animationList = Object.keys(animation);
animationList.push('none');

class App extends Component {
  state = {
    data: data,
    theme: 'none',
    animation: 'none',
    event: 'onContextMenu'
  };

  handleRollerChange = ({ target }) =>
    this.setState({ [target.id]: target.value });

  removeEntry = ({ ref }) => {
    this.setState({
      data: this.state.data.filter(item => item.id !== ref.props.id)
    });
  };

  getRandomAvatar() {
    const randomString = Math.random()
      .toString(36)
      .substring(7);
    return `https://robohash.org/${randomString}.jpg?size=50x50`;
  }

  changeAvatar = ({ ref: { props } }) =>
    this.setState({
      data: this.state.data.map(item => {
        if (item.id === props.id) {
          item.avatar = this.getRandomAvatar();
        }
        return item;
      })
    });

  dontClick = () => {
   toast.warn("💩 You shall not click!");
  };

  render() {
    const { theme, animation, event, data } = this.state;
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>A declarative context menu for React</h3>
          <div>
            <a
              href="https://github.com/fkhadra/react-contexify"
              className="button button-primary"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/fkhadra/react-contexify/zipball/master"
              className="button button-primary"
            >
              Download .zip
            </a>
            <a
              href="https://github.com/fkhadra/react-contexify/tarball/master"
              className="button button-primary"
            >
              Download .tar.gz
            </a>
          </div>
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
            <DemoTable data={data} event={event} />
          </div>
        </div>
        <Menu
          theme={theme}
          animation={animation}
          removeEntry={this.removeEntry}
          changeAvatar={this.changeAvatar}
          dontClick={this.dontClick}
        />
        <ToastContainer />;
      </div>
    );
  }
}

export default App;
