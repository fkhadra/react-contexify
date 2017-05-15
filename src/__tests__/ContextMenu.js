/* eslint-env jest */
import React from 'react';
import { mount, shallow } from 'enzyme';

import ContextMenu from './../Component/ContextMenu';
import eventManager from './../Utils/eventManager';

describe('ContextMenu', () => {
  it(
    'Should bind event when component did mount and unbind them when will unmount',
    () => {
      const component = mount(
        <ContextMenu id="foo">
          <div>bar</div>
        </ContextMenu>
      );
      expect(eventManager.eventList.has('display::foo')).toBeTruthy();

      component.unmount();
      expect(eventManager.eventList.has('display::foo')).toBeFalsy();
    });
    it("Should only rerender when nextState is different from previous state " , () => {
      ContextMenu.prototype.shouldComponentUpdate = (nextProps, nextState) => {
        return !(this.state.visible === false && nextState.visible === false);
      }
      const component = shallow(
        <ContextMenu id="foo">
          <div>bar</div>
        </ContextMenu>
      );

    });

});