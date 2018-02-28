import React, { Component } from 'react';
import { ContextMenuProvider } from 'react-contexify';

import { TransitionGroup, Transition } from 'react-transition-group';

import Row from './Row';

export default class DemoTable extends Component {
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
        <TransitionGroup component="tbody">
          {this.props.data.map(item => (
            <Transition
              timeout={700}
              key={item.id}
              onExit={node => node.classList.add('zoomOut')}
            >
              <ContextMenuProvider
                id="demo_id"
                event={this.props.event}
                renderTag="tr"
              >
                <Row event={this.props.event} {...item} />
              </ContextMenuProvider>
            </Transition>
          ))}
        </TransitionGroup>
      </table>
    );
  }
}
