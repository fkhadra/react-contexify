import React from 'react';
import { shallow, mount } from 'enzyme';

import { MenuProvider } from '../../components/MenuProvider';
import { eventManager } from '../../utils/eventManager';
import { DISPLAY_MENU } from '../../utils/actions';

const menuId = 'foo';

describe('MenuProvider', () => {
  it('Should merge className and style', () => {
    const component = shallow(
      <MenuProvider id={menuId} className="bar" style={{ width: '10px' }}>
        <div>baz</div>
      </MenuProvider>
    );
    expect(component.hasClass('bar')).toBe(true);
    expect(component.html()).toContain('style');
  });

  it('Should be able to render any HtmlElement as component', () => {
    const component = shallow(
      <MenuProvider id={menuId} component="span">
        baz
      </MenuProvider>
    );

    expect(component.html()).toContain('<span>baz</span>');
  });

  it('Should be able to use a render props', () => {
    const component = shallow(
      <MenuProvider id={menuId} render={() => <span>baz</span>}>
        baz
      </MenuProvider>
    );
    expect(component.html()).toContain('<span>baz</span>');
  });

  it('Should trigger the contextMenu on right click by default', done => {
    const component = mount(<MenuProvider id={menuId}>baz</MenuProvider>);
    const handleEvent = jest.fn();

    eventManager.on(DISPLAY_MENU(menuId), () => {
      handleEvent();
      expect(handleEvent).toHaveBeenCalled();
      done();
    });

    component.find('div').simulate('contextmenu', { preventDefault() {} });
  });

  it('Should allow to use any mouse event to display the context menu', done => {
    const component = mount(
      <MenuProvider id={menuId} event="onClick">
        baz
      </MenuProvider>
    );
    const handleEvent = jest.fn();

    eventManager.on(DISPLAY_MENU(menuId), () => {
      handleEvent();
      expect(handleEvent).toHaveBeenCalled();
      done();
    });

    component.find('div').simulate('click', { preventDefault() {} });
  });

  it('Should be able to collect children ref', () => {
    const component = mount(
      <MenuProvider id={menuId} storeRef>
        <div>foo</div>
        <div>bar</div>
      </MenuProvider>
    );
    const instance = component.instance() as MenuProvider;

    expect(instance.childrenRefs.length).toBe(2);
  });
});
