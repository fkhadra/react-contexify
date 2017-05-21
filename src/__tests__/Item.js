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
    'Should pass the targetNode, the refs and the data props to the provided callback when clicked',
    () => {
      const click = (targetNode, refs, data) => {
        expect(targetNode.foo).toBe('bar');
        expect(refs[0].baz).toBe('baz');
        expect(data).toBe('data');
      };

      component.setProps({
        onClick: click,
        targetNode: { foo: 'bar' },
        refsFromProvider: [{ baz: 'baz' }],
        data: 'data'
      });

      component.simulate('click');
    });

  it('Should remove click when disabled', () => {
    const click = jest.fn();
    component.setProps({ onClick: click, disabled: true });

    expect(click).not.toHaveBeenCalled();
    component.simulate('click', {
      stopPropagation: () => {}
    });
    expect(click).not.toHaveBeenCalled();
  });
});
