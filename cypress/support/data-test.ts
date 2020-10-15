declare namespace Cypress {
  interface Chainable {
    getByDataTest: (dataTest: string) => Cypress.Chainable<JQuery<HTMLElement>>;
    findByDataTest: (
      dataTest: string
    ) => Cypress.Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add("getByDataTest", (dataTest) => {
  cy.get(`[data-test="${dataTest}"]`);
});

Cypress.Commands.add(
  "findByDataTest",
  { prevSubject: true },
  (subject, dataTest) => subject.find(`[data-test="${dataTest}"]`)
);
