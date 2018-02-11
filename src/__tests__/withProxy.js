/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import withProxy from './../util/withProxy';

describe('withProxy', () => {
  it('Wrapped component should render null', () => {
    const Foo = () => <div>Foobar</div>;
    const Component = withProxy(Foo);
    const renderedComponent = shallow(<Component />);
    expect(renderedComponent.html()).toBe(null);
  });
});
