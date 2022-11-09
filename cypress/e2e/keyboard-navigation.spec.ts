import { DATA_TEST } from '../../example/constants';

describe('Context menu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Select first menu item when pressing arrow down', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.get('body').type('{downarrow}');

    cy.focused().should('have.attr', 'data-test', DATA_TEST.MENU_FIRST_ITEM);
  });

  it('Select the last item when pressing arrow up', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.get('body').type('{uparrow}');

    cy.focused().should('have.attr', 'data-test', DATA_TEST.MENU_LAST_ITEM);
  });

  it('Should not select disabled items', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    //🙅‍♀️ go to item 4 and skip disabled items
    for (let i = 0; i < 4; i++) {
      cy.get('body').type('{downarrow}');
      cy.focused().should('have.attr', 'aria-disabled', 'false');
    }
  });

  describe('Open submenu and focus first item', () => {
    for (const key of ['{enter}', ' ', '{rightarrow}']) {
      it(`When ${key} is pressed`, () => {
        cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

        //🙅‍♀️ go to submenu
        cy.get('body').type('{uparrow}');
        cy.get('body').type('{uparrow}');

        cy.focused().should('have.attr', 'data-test', DATA_TEST.SUBMENU);

        cy.getByDataTest(DATA_TEST.SUBMENU_FIRST_ITEM).should('not.be.visible');
        cy.get('body').type(key);

        // wait for transition
        cy.wait(500);
        cy.focused().should(
          'have.attr',
          'data-test',
          DATA_TEST.SUBMENU_FIRST_ITEM
        );
      });
    }
  });

  it('Close submenu on left arrow press', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    //🙅‍♀️ go to submenu
    cy.get('body').type('{uparrow}');
    cy.get('body').type('{uparrow}');

    cy.get('body').type('{rightarrow}');

    // wait for transition
    cy.wait(500);
    cy.focused().should('have.attr', 'data-test', DATA_TEST.SUBMENU_FIRST_ITEM);

    cy.get('body').type('{leftarrow}');
    cy.focused().should('have.attr', 'data-test', DATA_TEST.SUBMENU);
  });
});
