/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Separator from './../Component/Separator';
import cssClasses from './../cssClasses';

describe('Separator', () => {
  it('Render without crash', () => {
    const component = shallow(<Separator />);
    expect(
      component
      .contains(<div className={cssClasses.SEPARATOR} />)
    ).toBe(true);
  });

  it('Should not accept additional props', () => {
    const component = shallow(<Separator foo="bar" />);
    expect(typeof component.prop('foo') === 'undefined').toBeTruthy();
  });
});
