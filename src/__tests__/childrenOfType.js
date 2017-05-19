/* eslint-env jest */
import React from 'react';

import childrenOfType from '../util/childrenOfType';
import Item from './../Component/Item';

describe('childrenOfType', () => {
  it('Should return an Error if the given children type is not correct',
    () => {
      const rightProps = { children: [<Item>plop</Item>, null] };
      const wrongProps = { children: <div>plop</div> };

      expect(childrenOfType(Item)(wrongProps, 'children', 'TestComponent'))
        .toBeInstanceOf(Error);

      expect(childrenOfType(Item)(rightProps, 'children', 'TestComponent'))
        .toBeNull();
    });
  // That test is here just for visibility
  it('Allow `null` for conditional rendering: condition && <component />',
    () => {
      const rightProps = { children: [<Item>plop</Item>, null] };
      expect(childrenOfType(Item)(rightProps, 'children', 'TestComponent'))
        .toBeNull();
    });
});
