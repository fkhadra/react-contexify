/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';

import ContextMenuProvider from '../../components/ContextMenuProvider';
import eventManager from '../../utils/eventManager';
import { DISPLAY_MENU } from "../../utils/actions";

const menuId = 'foo';

describe('ContextMenuProvider', () => {
  it('Should merge className and style', () => {
    const component = shallow(
      <ContextMenuProvider id={menuId} className="bar" style={{ width: '10px' }}>
        <div>baz</div>
      </ContextMenuProvider>
    );
    expect(component.hasClass('bar')).toBe(true);
    expect(component.html()).toContain('style');
  });

  it('Should be able to render any HtmlElement as component', () => {
    const component = shallow(
      <ContextMenuProvider id={menuId} component="span">
        baz
      </ContextMenuProvider>
    );

    expect(component.html()).toContain('<span>baz</span>');
  });

  it('Should be able to use a render props', () => {
    const component = shallow(
      <ContextMenuProvider id={menuId} render={() => <span>baz</span>}>
        baz
      </ContextMenuProvider>
    );
    expect(component.html()).toContain('<span>baz</span>');
  });

  it('Should trigger the contextMenu on right click by default', done => {
    const component = mount(
      <ContextMenuProvider id={menuId}>baz</ContextMenuProvider>
    );
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
      <ContextMenuProvider id={menuId} event="onClick">
        baz
      </ContextMenuProvider>
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
      <ContextMenuProvider id={menuId} storeRef>
        <div>foo</div>
        <div>bar</div>
      </ContextMenuProvider>
    );

    expect(component.instance().childrenRefs.length).toBe(2);
  });
});
