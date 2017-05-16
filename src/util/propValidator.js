import { isValidElement, Children } from 'react';
import {checkPropTypes} from 'prop-types';

function withRequired(fn) {
  fn.isRequired = function (props, propName, componentName) {
    const prop = props[propName];

    if (typeof prop === 'undefined') {
      return new Error(`The prop ${propName} is marked as required in 
      ${componentName}, but its value is undefined.`);
    }

    fn(props, propName, componentName);
  };
  return fn;
}

export function withConditionnalRequire(fn) {
    fn.isRequiredIf = function (cb) {
        if (Object.prototype.toString.call(cb).slice(8, -1) === 'Function') {
                return function (props, propName, componentName) {
                    console.log(cb(props, propName, componentName));
                if (cb(props, propName, componentName)) {
                   
                   fn.isRequired(props, propName, componentName);
                   // const prop = props[propName];

                   // if (typeof prop === 'undefined') {
                   //     return new Error(`The prop ${propName} is marked as required in 
                     //   ${componentName}, but its value is undefined.`);
                    //}
                }

             //   fn(props, propName, componentName);
            };
        }
    }
    return fn;
}

export const childrenOfType = type => withConditionnalRequire(
    withRequired(
    (props, propName, componentName) => {
        const prop = props[propName];
        let check = null;
        Children.forEach(prop, child => {
            if (child.type !== type) {
                 check = new Error(`${componentName} expect children to be of type ${type}`);
            }
        });
        return check;
    }
));
