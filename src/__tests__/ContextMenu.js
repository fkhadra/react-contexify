/* eslint-env jest */
import React from 'react';
import { mount, shallow } from 'enzyme';

import ContextMenu from './../Component/ContextMenu';
import eventManager from './../util/eventManager';

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

    it('Should render null if `visible` is false', () => {
      const component = shallow(
        <ContextMenu id="foo">
          <div>bar</div>
        </ContextMenu>
      );
      component.setState({ visible: true });
      expect(component.html()).not.toBeNull();

      component.setState({ visible: false });
      expect(component.html()).toBeNull();
    });

    it('Children must be instance of `Item`', () => {
      const component = shallow(
        <ContextMenu id="foo">
          <div>bar</div>
        </ContextMenu>
      );
      expect(component).to
    }); 
});