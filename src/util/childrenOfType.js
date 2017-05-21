import { Children } from 'react';

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

const childrenOfType = type => withRequired(
  (props, propName, componentName) => {
    const prop = props[propName];
    let check = null;

    Children.forEach(prop, child => {
      // Allow null for conditional rendering: condition && <item>foo</item>
      if (child !== null && child.type !== type) {
        check = new Error(
          `${componentName} expect children to be of type ${type}`);
      }
    });

    return check;
  }
);

export default childrenOfType;
