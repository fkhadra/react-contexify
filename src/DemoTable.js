import React, { PureComponent } from 'react';
import {default as Transition } from 'react-transition-group/TransitionGroup';

import Row from './Row';

export default class DemoTable extends PureComponent {
  render() {
    return (
      <table className="u-full-width">
        <thead>
        <tr>
          <th title="Avatar">Avatar</th>
          <th title="Firstname">Firstname</th>
          <th title="Lastname">Lastname</th>
          <th title="Email">Email</th>
          <th title="Company">Company</th>
        </tr>
        </thead>
        <Transition component="tbody">
          {this.props.data.map(item => <Row key={item.id} event={this.props.event} {...item}/>)}
        </Transition>
      </table>
    );
  }
}
