/* eslint-env jest */
import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Menu from './../components/Menu';
import Item from './../components/Item';
import eventManager from './../utils/eventManager';
import { HIDE_ALL, DISPLAY_MENU } from '../utils/actions';

beforeEach(() => eventManager.eventList.clear());

const menuId = 'foo';

describe('Menu', () => {
  it('Should bind event when component did mount and unbind all the event related to the component when will unmount', () => {
    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );
    expect(eventManager.eventList.get(DISPLAY_MENU(menuId)).size).toBe(1);
    expect(eventManager.eventList.get(HIDE_ALL).size).toBe(1);
    component.unmount();
    expect(eventManager.eventList.get(DISPLAY_MENU(menuId)).size).toBe(0);
    expect(eventManager.eventList.get(HIDE_ALL).size).toBe(0);
  });

  it('Should render null if the context menu is not visible', () => {
    const component = shallow(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );
    component.setState({ visible: true });
    expect(component.html()).not.toBeNull();

    component.setState({ visible: false });
    expect(component.html()).toBeNull();
  });

  it('Should hide Menu when `hide` method is called', () => {
    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );

    component.setState({ visible: true });
    component.instance().hide();

    expect(component.state('visible')).toBe(false);
    expect(component.html()).toBeNull();
  });

  it('Should remove null Item from menu', () => {
    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
        {null}
      </Menu>
    );
    component.setState({ visible: true });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Should remove the mousedown event on window object when mouse enter the context menu', () => {
    global.removeEventListener = jest.fn();

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );

    component.setState({ visible: true });
    component.simulate('mouseenter');
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('Should add the mousedown event on window object when mouse leave the context menu', () => {
    global.addEventListener = jest.fn();

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );

    component.setState({ visible: true });
    component.simulate('mouseleave');
    expect(global.addEventListener).toHaveBeenCalled();
  });

  it('Should display the menu when corresponding event is emitted', () => {
    global.innerWidth = 0;
    global.innerHeight = 0;

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );

    expect(component.html()).toBeNull();
    component.instance().menu = {
      offsetWidth: 100,
      offsetHeight: 100
    };
    eventManager.emit(
      DISPLAY_MENU(menuId),
      { stopPropagation() { }, clientX: 1, clientY: 1 },
      {}
    );
    expect(component.html()).not.toBeNull();
  });

  it('Should have the same behavior accross different browser', () => {
    global.innerWidth = 0;
    global.innerHeight = 0;

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );

    expect(component.html()).toBeNull();
    component.instance().menu = {
      offsetWidth: 100,
      offsetHeight: 100
    };

    eventManager.emit(
      DISPLAY_MENU(menuId),
      { stopPropagation() { }, clientX: 1, clientY: 1 },
      {}
    );

    expect(component.state('visible')).toBe(true);

    // Test for Firefox
    eventManager.emit(HIDE_ALL, {
      button: 2,
      type: 'click'
    });

    expect(component.state('visible')).toBe(true);

    // Test for Safari
    eventManager.emit(HIDE_ALL, {
      ctrlKey: true,
      type: 'click'
    });

    expect(component.state('visible')).toBe(true);
  });

  it('Should hide menu when `enter` or `escape` is pressed down', () => {
    const windowEvent = {};
    window.addEventListener = jest.fn((event, cb) => {
      windowEvent[event] = cb;
    });

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );
    component.setState({ visible: true });
    component.instance().bindWindowEvent();

    windowEvent.keydown({ keyCode: 13 })
    expect(component.state('visible')).toBe(false);

    component.setState({ visible: true });

    windowEvent.keydown({ keyCode: 27 })
    expect(component.state('visible')).toBe(false);
  })

});
