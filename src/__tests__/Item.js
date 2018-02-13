/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Item from './../components/Item';

describe('Menu Item', () => {
  it('Should render without crashing', () => {
    const component = shallow(<Item>foo</Item>);
    expect(component.html()).toContain('foo');
  });

  it('Should handle click', () => {
    const click = jest.fn();
    const component = shallow(<Item onClick={click}>foo</Item>)

    expect(click).not.toHaveBeenCalled();
    component.simulate('click');
    expect(click).toHaveBeenCalled();
  });

  it('Should pass an object when clicked', done => {
    const onClick = obj => {
      expect(Object.keys(obj)).toEqual([
        'event',
        'ref',
        'data',
        'dataFromProvider'
      ]);
      done();
    };

    const component = shallow(<Item 
      onClick={onClick} 
      event={{ foo: 'bar' }} 
      refsFromProvider={[{ baz: 'baz' }]}
      dataFromProvider='dataFromProvider'
      data='data'
      >foo</Item>)

    component.simulate('click');
  });

  it('Should prevent click when disabled', () => {
    const click = jest.fn();
    const component = shallow(<Item onClick={click} disabled>foo</Item>);

    expect(click).not.toHaveBeenCalled();
    component.simulate('click', {
      stopPropagation(){}
    });
    expect(click).not.toHaveBeenCalled();
  });

  it('Should allow disabled props to be a function', () => {
    const mock = jest.fn();
    const disabled = () => {
      mock();
      return true;
    };

    shallow(<Item disabled={disabled}>foo</Item>);
    expect(mock).toHaveBeenCalled();
  });
});
