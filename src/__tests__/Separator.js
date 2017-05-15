/* eslint-env jest */
import React from 'react';
import Separator from './../Component/Separator';
import cssClasses from './../cssClasses';
import { shallow } from 'enzyme';

describe('Separator', () => {
  it('Render without crash', () => {
    const component = shallow(<Separator />);
    expect(component.contains(<div className={cssClasses.SEPARATOR}/>))
      .toBe(true);
  });
});
