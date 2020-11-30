import { DATA_TEST } from '../../example/constants';

function showContextMenu() {
  cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
}

describe('Menu item', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Can be disabled by passing a boolean or a function that return a boolean', () => {
    showContextMenu();

    cy.getByDataTest(DATA_TEST.DISABLED_ITEM_VIA_BOOLEAN).should(
      'have.attr',
      'aria-disabled',
      'true'
    );

    cy.getByDataTest(DATA_TEST.DISABLED_ITEM_VIA_FUNCTION).should(
      'have.attr',
      'aria-disabled',
      'true'
    );
  });

  it('Can be hidden by passing a boolean or a function that return a boolean', () => {
    showContextMenu();
    cy.getByDataTest(DATA_TEST.MENU_FIRST_ITEM).should('be.visible');
    cy.getByDataTest(DATA_TEST.MENU_SECOND_ITEM).should('be.visible');

    cy.getByDataTest(DATA_TEST.TOGGLE_HIDE_ITEMS).check();
    showContextMenu();

    cy.getByDataTest(DATA_TEST.MENU_FIRST_ITEM).should('not.be.visible');
    cy.getByDataTest(DATA_TEST.MENU_SECOND_ITEM).should('not.be.visible');
  });

  it('Should pass payload when clicking on an Item', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    cy.getByDataTest(DATA_TEST.MENU_FIRST_ITEM).click();

    cy.getByDataTest(DATA_TEST.ONCLICK_PAYLOAD).then(el => {
      const payload = JSON.parse(el.text());
      expect(payload).to.deep.include({
        data: { id: 1 },
        props: { key: 'value' },
      });
    });
  });
});
