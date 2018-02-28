/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';


import withProxy from './../util/withProxy';

beforeEach(() => (document.body.innerHTML = ''));

describe('withProxy', () => {
  it('Wrapped component should render null', () => {
    const Foo = () => <div>Foobar</div>;
    const Component = withProxy(Foo);
    const renderedComponent = shallow(<Component />);
    expect(renderedComponent.html()).toBe(null);
  });

  it('Should remove the Html node when unmount', () => {
    const Foo = () => <div>Foobar</div>;
    const Component = withProxy(Foo);
    const renderedComponent = mount(<Component />);
    expect(document.body.innerHTML).toBe('<div><div>Foobar</div></div>');
    renderedComponent.unmount();
    expect(document.body.innerHTML.length).toBe(0);
  });

  it('Should update the component when receive new props', () => {
    const Foo = ({ param }) => <div>Foobar {param}</div>;
    const Component = withProxy(Foo);
    const renderedComponent = mount(<Component param="coucou"/>);
    renderedComponent.setProps({ param: 'plop' });

    expect(toJson(renderedComponent)).toMatchSnapshot();
  });
});
