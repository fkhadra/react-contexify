/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Item from './../Component/Item';

describe('Menu Item', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Item>foo</Item>);
  });

  it('Should render without crashing', () => {
    expect(component.html()).toContain('foo');
  });

  it('Should handle click', () => {
    const click = jest.fn();
    component.setProps({ onClick: click });

    expect(click).not.toHaveBeenCalled();
    component.simulate('click');
    expect(click).toHaveBeenCalled();
  });

  it(
    'Should pass the target and the data props to the provided callback when clicked',
    () => {
      const click = (target, data) => {
        expect(target.foo).toBe('bar');
        expect(data).toBe('data');
      };
      component.setProps({
        onClick: click,
        disabled: true,
        target: { foo: 'bar' },
        data: 'data'
      });
      component.simulate('click');

    });

  it('Can handle click when disabled', () => {
    const click = jest.fn();
    component.setProps({ onClick: click, disabled: true });

    expect(click).not.toHaveBeenCalled();
    component.simulate('click');
    expect(click).toHaveBeenCalled();
  });
});