/* eslint-env jest */
import React from 'react';
import PropTypes from 'prop-types';

import { childrenOfType, withConditionnalRequire } from './../util/propValidator';
import Item from './../Component/Item';

describe('Custom PropTypes', () => {
    describe('childrenOfType', () => {
        it('Should return an Error if the given children type is not correct', () => {
            const rightProps = { children: <Item />};
            const wrongProps = { children: <div>plop</div> };
            
            expect(childrenOfType(Item)(wrongProps, 'children', 'TestComponent'))
            .toBeInstanceOf(Error)

            expect(childrenOfType(Item)(rightProps, 'children', 'TestComponent'))
            .toBeNull(); 
        });

        it('Can conditionnaly require prop', () => {
            const customString = withConditionnalRequire(PropTypes.string);

            console.log(PropTypes.string);
            const test = customString.isRequiredIf(
                    (props, propName, componentName) => {
                        const prop = props['children'];
                        return typeof prop === 'undefined';
                    }
                    )({label: 'plop'}, 'label', 'TestComponent');

        });
    });
});
