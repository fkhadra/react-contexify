/* eslint-env jest */
import React from 'react';
import { mount, shallow } from 'enzyme';

import ContextMenu from './../Component/ContextMenu';
import Item from './../Component/Item';
import eventManager from './../util/eventManager';

describe('ContextMenu', () => {
  it(
    'Should bind event when component did mount and unbind them when will unmount',
    () => {
      const component = mount(
        <ContextMenu id="foo">
          <Item>bar</Item>
        </ContextMenu>
      );
      expect(eventManager.eventList.has('display::foo')).toBe(true);

      component.unmount();
      expect(eventManager.eventList.has('display::foo')).toBe(false);
    });

  it('Should render null if `visible` is false', () => {
    const component = shallow(
      <ContextMenu id="foo">
        <Item>bar</Item>
      </ContextMenu>
      );
    component.setState({ visible: true });
    expect(component.html()).not.toBeNull();

    component.setState({ visible: false });
    expect(component.html()).toBeNull();
  });

  it('Should hide ContextMenu when `hide` method is called', () => {
    const component = shallow(
      <ContextMenu id="foo">
        <Item>bar</Item>
      </ContextMenu>
      );

    component.setState({ visible: true });
    component.instance().hide();

    expect(component.state('visible')).toBe(false);
    expect(component.html()).toBeNull();
  });

  it('Should merge theme and animation when defined', () => {
    const component = shallow(
      <ContextMenu id="foo" animation="foo" theme="bar">
        <Item>bar</Item>
      </ContextMenu>
      );
    component.setState({ visible: true });

    expect(component.find('.react-contexify-menu')
        .hasClass('foo'))
        .toBe(true);

    expect(component.find('.react-contexify-menu')
        .hasClass('react-contexify-menu__theme--bar'))
        .toBe(true);
  });
});
