/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import ContextMenuProvider from './../Component/ContextMenuProvider';

describe('ContextMenuProvider', () => {
  it('Should merge className and style', () => {
    const component = shallow(
      <ContextMenuProvider
        id="foo"
        className="bar"
        style={{ width: '10px' }}
      >
        <div>baz</div>
      </ContextMenuProvider>
    );
    expect(component.hasClass('bar')).toBe(true);
    expect(component.html()).toContain('style');
  });
});
