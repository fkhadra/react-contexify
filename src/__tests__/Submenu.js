/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Submenu from './../components/Submenu';
import styles from './../components/styles';

const Children = () => <div>foo</div>;
describe('Submenu', () => {
  it('Should render without crash 💥', () => {
    const component = mount(<Submenu label="bar"><Children /></Submenu>);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Should not go offscreen', () => {
    global.innerWidth = 100;
    global.innerHeight = 100;
    Element.prototype.getBoundingClientRect = () => ({ right: 200, bottom: 200 });
    const component = mount(<Submenu label="bar"><Children /></Submenu>);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('Can be disabled with true or a function', () => {
    let component  = mount(<Submenu label="bar" disabled><Children /></Submenu>);
    expect(component.html()).toMatch(styles.itemDisabled);

    component.unmount();
    component  = mount(<Submenu label="bar" disabled={() => true}><Children /></Submenu>);
    expect(component.html()).toMatch(styles.itemDisabled);
  });

  it('Should accept a custom arrow ➡️', () => {
    const component = mount(<Submenu label="bar" arrow="🦄"><Children /></Submenu>);
    expect(toJson(component)).toMatchSnapshot();
  });

});
