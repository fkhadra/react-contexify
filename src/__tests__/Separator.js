/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import Separator from './../components/Separator';
import styles from './../components/styles';

describe('Separator', () => {
  it('Render without crash', () => {
    const component = shallow(<Separator />);
    expect(component.contains(<div className={styles.separator} />)).toBe(
      true
    );
  });
});
