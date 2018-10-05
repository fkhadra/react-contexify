import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Menu } from '../../components/Menu';
import { Item } from '../../components/Item';
import { eventManager } from '../../utils/eventManager';
import { HIDE_ALL, DISPLAY_MENU } from '../../utils/actions';

beforeEach(() => eventManager.eventList.clear());

const menuId = 'foo';

describe('Menu', () => {
  it('Should bind event when component did mount and unbind all the event related to the component when will unmount', () => {
    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );
    expect(eventManager.eventList.get(DISPLAY_MENU(menuId))!.size).toBe(1);
    expect(eventManager.eventList.get(HIDE_ALL)!.size).toBe(1);
    component.unmount();
    expect(eventManager.eventList.get(DISPLAY_MENU(menuId))!.size).toBe(0);
    expect(eventManager.eventList.get(HIDE_ALL)!.size).toBe(0);
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
    const instance = component.instance() as Menu;
    instance.hide();

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
    window.removeEventListener = jest.fn();

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );

    component.setState({ visible: true });
    component.simulate('mouseenter');
    expect(window.removeEventListener).toHaveBeenCalled();
  });

  it('Should add the mousedown event on window object when mouse leave the context menu', () => {
    window.addEventListener = jest.fn();

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );

    component.setState({ visible: true });
    component.simulate('mouseleave');
    expect(window.addEventListener).toHaveBeenCalled();
  });

  it('Should display the menu when corresponding event is emitted', () => {
    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );
    expect(component.html()).toBeNull();

    eventManager.emit(
      DISPLAY_MENU(menuId),
      { stopPropagation() {}, clientX: 1, clientY: 1 },
      {}
    );

    expect(component.html()).not.toBeNull();
  });

  it('Should be able to handle MouseEvent and TouchEvent', () => {
    let position = {} as {
      x: number;
      y: number;
    };

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );
    const instance = component.instance() as Menu;

    const mouseEvent = new MouseEvent('click', {
      clientX: 10,
      clientY: 10
    });

    const touchInit = {
      clientX: 12,
      clientY: 12
    } as Touch;

    const touchEvent = new TouchEvent('touchend', {
      changedTouches: [touchInit]
    });

    position = instance.getMousePosition(mouseEvent);
    expect(position).toMatchObject({ x: 10, y: 10 });

    position = instance.getMousePosition(touchEvent);
    expect(position).toMatchObject({ x: 12, y: 12 });
  });

  it("Should set a default position if not able to determine one", () => {
    let position = {} as {
      x: number;
      y: number;
    };

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );
    const instance = component.instance() as Menu;

    position = instance.getMousePosition(new MouseEvent('click', {
      clientX: -1,
      clientY: -1
    }));
    expect(position).toMatchObject({ x: 0, y: 0 });

    position = instance.getMousePosition(new MouseEvent('click', {
      clientX: undefined,
      clientY: undefined
    }));
    expect(position).toMatchObject({ x: 0, y: 0 });
  });

  it('Should have the same behavior accross different browser', () => {
    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );

    expect(component.html()).toBeNull();

    eventManager.emit(
      DISPLAY_MENU(menuId),
      { stopPropagation() {}, clientX: 1, clientY: 1 },
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
    const windowEvent: {
      [key: string]: (arg: any) => any;
    } = {};
    // mock to simulate keyboard events
    window.addEventListener = jest.fn((event, cb) => {
      windowEvent[event] = cb;
    });

    const component = mount(
      <Menu id={menuId}>
        <Item>bar</Item>
      </Menu>
    );
    component.setState({ visible: true });
    const instance = component.instance() as Menu;
    instance.bindWindowEvent();

    windowEvent.keydown({ keyCode: 13 });
    expect(component.state('visible')).toBe(false);

    component.setState({ visible: true });

    windowEvent.keydown({ keyCode: 27 });
    expect(component.state('visible')).toBe(false);
  });
});
