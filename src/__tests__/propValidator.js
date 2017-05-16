/* eslint-env jest */
import React from 'react';

import { childrenOfType } from './../util/propValidator';
import Item from './../Component/Item';

describe('Custom PropTypes', () => {
    describe('childrenOfType', () => {
        it('Should return an Error if the given children type is not correct', () => {
            const rightProps = { children: <Item label="foo" />};
            const wrongProps = { children: <div>plop</div> };
            
            expect(childrenOfType(Item)(wrongProps, 'children', 'TestComponent'))
            .toBeInstanceOf(Error)

            expect(childrenOfType(Item)(rightProps, 'children', 'TestComponent'))
            .toBeNull(); 
        });
    });
});
