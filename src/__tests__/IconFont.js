/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import IconFont from './../components/IconFont';

describe('IconFont', () => {
  it('Can render without props', () => {
    const component = shallow(<IconFont />);
    expect(component.html()).toContain('</i>');
  });

  it('Should merge className and style', () => {
    const component = shallow(<IconFont className="foo" />);
    expect(component.prop('className')).toContain('foo');

    component.setProps({ style: { width: '10px' } });
    expect(component.prop('style').width).toBe('10px');
  });

  it('Children can be either a string or a valid react element', () => {
    const component = shallow(<IconFont>foo</IconFont>);
    const Bar = () => <div>bar</div>;

    expect(component.html()).toContain('foo');

    component.setProps({ children: <Bar /> });
    expect(component.html()).toContain('<div>bar</div>');
  });
});
