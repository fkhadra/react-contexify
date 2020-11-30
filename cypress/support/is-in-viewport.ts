declare namespace Cypress {
  interface Chainable {
    isWithinViewport: () => Cypress.Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add('isWithinViewport', { prevSubject: true }, subject => {
  const windowInnerWidth = Cypress.config(`viewportWidth`);
  const windowInnerHeight = Cypress.config(`viewportHeight`);

  const bounding = subject[0].getBoundingClientRect();

  const rightBoundOfWindow = windowInnerWidth;
  const bottomBoundOfWindow = windowInnerHeight;

  Cypress.log({
    message: 'Checking bounding client rect',
  });
  expect(bounding.top).to.be.at.least(0);
  expect(bounding.left).to.be.at.least(0);
  expect(bounding.right).to.be.lessThan(rightBoundOfWindow);
  expect(bounding.bottom).to.be.lessThan(bottomBoundOfWindow);

  return subject;
});
