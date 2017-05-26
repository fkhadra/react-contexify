import React, { PureComponent } from 'react';
import {ContextMenuProvider} from 'react-contexify';
import {default as Transition } from 'react-transition-group/TransitionGroup';

class Row extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leaving: false
    };
  }

  componentWillLeave(cb) {
    this.setState({leaving: true});
    setTimeout(() => cb(), 580)
  }

  render() {
    const { id,avatar, firstname, lastname, email, companyName, event } = this.props;
    return (
      <ContextMenuProvider
        id="demo_id"
        renderTag="tr"
        event={event}
        data-id={id}
        className={this.state.leaving ? 'zoomOut' : ''}
      >
        <td><img src={avatar} alt="avatar" /></td>
        <td>{firstname}</td>
        <td>{lastname}</td>
        <td>{email}</td>
        <td>{companyName}</td>
      </ContextMenuProvider>
    )
  }
}

export default class DemoTable extends PureComponent {
  render() {
    return (
      <table className="u-full-width">
        <thead>
        <tr>
          <th title="Field #1">avatar</th>
          <th title="Field #2">firstname</th>
          <th title="Field #3">lastname</th>
          <th title="Field #4">email</th>
          <th title="Field #5">company</th>
        </tr>
        </thead>
        <Transition component="tbody">
          {this.props.data.map(item => <Row key={item.id} event={this.props.event} {...item}/>)}
        </Transition>
      </table>
    );
  }
}
