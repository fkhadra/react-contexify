/* eslint-env jest */
import React from 'react';
import { mount, shallow } from 'enzyme';

import ContextMenu from './../components/ContextMenu';
import Item from './../components/Item';
import eventManager from './../util/eventManager';

beforeEach(() => eventManager.eventList.clear());

describe('ContextMenu', () => {
  it('Should bind event when component did mount and unbind all the event related to the component when will unmount', () => {
    const component = mount(
      <ContextMenu id="foo">
        <Item>bar</Item>
      </ContextMenu>
    );
    expect(eventManager.eventList.get('display::foo').size).toBe(1);
    expect(eventManager.eventList.get('hideAll').size).toBe(1);
    component.unmount();
    expect(eventManager.eventList.get('display::foo').size).toBe(0);
    expect(eventManager.eventList.get('hideAll').size).toBe(0);
  });

  it('Should render null if the context menu is not visible', () => {
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
    const component = mount(
      <ContextMenu id="foo">
        <Item>bar</Item>
      </ContextMenu>
    );

    component.setState({ visible: true });
    component.instance().hide();

    expect(component.state('visible')).toBe(false);
    expect(component.html()).toBeNull();
  });

  it('Should remove the mousedown event on window object when mouse enter the context menu', () => {
    global.removeEventListener = jest.fn();

    const component = mount(
      <ContextMenu id="foo">
        <Item>bar</Item>
      </ContextMenu>
    );

    component.setState({ visible: true });
    component.simulate('mouseenter');
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('Should add the mousedown event on window object when mouse leave the context menu', () => {
    global.addEventListener = jest.fn();

    const component = mount(
      <ContextMenu id="foo">
        <Item>bar</Item>
      </ContextMenu>
    );

    component.setState({ visible: true });
    component.simulate('mouseleave');
    expect(global.addEventListener).toHaveBeenCalled();
  });

  it('Should display the menu when corresponding event is emitted', () => {
    global.innerWidth = 0;
    global.innerHeight = 0;

    const component = mount(
      <ContextMenu id="foo">
        <Item>bar</Item>
      </ContextMenu>
    );

     expect(component.html()).toBeNull();
     component.instance().menu = {
       offsetWidth: 100,
       offsetHeight: 100
     };
     eventManager.emit('display::foo', {stopPropagation(){}, clientX:1, clientY:1 }, [], []);
     expect(component.html()).not.toBeNull();
  });
});
