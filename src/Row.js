import React, { PureComponent } from 'react';
import {ContextMenuProvider} from 'react-contexify';

export default class Row extends PureComponent {
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