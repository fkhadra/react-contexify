/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';

import ContextMenuProvider from './../components/ContextMenuProvider';
import eventManager from './../util/eventManager';

describe('ContextMenuProvider', () => {
  it('Should merge className and style', () => {
    const component = shallow(
      <ContextMenuProvider id="foo" className="bar" style={{ width: '10px' }}>
        <div>baz</div>
      </ContextMenuProvider>
    );
    expect(component.hasClass('bar')).toBe(true);
    expect(component.html()).toContain('style');
  });

  it('Should be able to choose the render tag', () => {
    const component = shallow(
      <ContextMenuProvider id="foo" renderTag='span'>
        baz
      </ContextMenuProvider>
    );

    expect(component.html()).toContain('<span>baz</span>');
  });

  it('Should emit the event to display the context menu on right click', done => {
    const component = shallow(
      <ContextMenuProvider id="foo">
        baz
      </ContextMenuProvider>
    );
    const handleEvent = jest.fn();

    eventManager.on('display::foo', () => {
      handleEvent();
      expect(handleEvent).toHaveBeenCalled();
      done();
    });

    component.find('div').simulate('contextmenu', { preventDefault(){} });
  });

  it('Should allow to use any mouse event to display the context menu', done => {
    const component = shallow(
      <ContextMenuProvider id="foo" event='onClick'>
        baz
      </ContextMenuProvider>
    );
    const handleEvent = jest.fn();
    
    eventManager.on('display::foo', () => {
      handleEvent();
      expect(handleEvent).toHaveBeenCalled();
      done();
    });

    component.find('div').simulate('click', { preventDefault(){} });
  });

  it('Should be able to collect children ref', () => {
    const component = mount(
      <ContextMenuProvider id="foo" storeRef>
        <div>foo</div>
        <div>bar</div>
      </ContextMenuProvider>
    );
    
    expect(component.instance().childrenRefs.length).toBe(2);
  });
});
