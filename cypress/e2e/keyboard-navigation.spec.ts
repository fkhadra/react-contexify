import { DATA_TEST } from '../../example/constants';
import { STYLE, theme, animation } from '../../src/constants';

const [, submenuClassName] = STYLE.submenu.split(' ');

describe('Context menu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Select first menu item when pressing arrow down', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.get('body').type('{downarrow}');

    // TODO: need a more reliable way to capture focused element. document.activeElement not working as expected
    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'data-test',
      DATA_TEST.MENU_FIRST_ITEM
    );
  });

  it('Select the last item when pressing arrow up', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.get('body').type('{uparrow}');

    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'data-test',
      DATA_TEST.MENU_LAST_ITEM
    );
  });

  it('Should not select disabled items', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    //🙅‍♀️ go to item 4.
    cy.get('body').type('{downarrow}');
    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'aria-disabled',
      'false'
    );

    cy.get('body').type('{downarrow}');
    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'aria-disabled',
      'false'
    );

    cy.get('body').type('{downarrow}');
    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'aria-disabled',
      'false'
    );

    cy.get('body').type('{downarrow}');
    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'aria-disabled',
      'false'
    );
  });

  it('Open submenu on enter and focus first item', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    //🙅‍♀️ go to submenu
    cy.get('body').type('{uparrow}');
    cy.get('body').type('{uparrow}');

    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'data-test',
      DATA_TEST.SUBMENU
    );

    //until https://github.com/cypress-io/cypress/pull/8437 is merged
    cy.get(`.${submenuClassName}`).should('have.css', 'opacity', '0');
    cy.get('body').type('{enter}');

    cy.get(`.${submenuClassName}`).should('have.css', 'opacity', '1');

    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'data-test',
      DATA_TEST.SUBMENU_FIRST_ITEM
    );
  });

  it('Open submenu on right arrow and focus first item', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    //🙅‍♀️ go to submenu
    cy.get('body').type('{uparrow}');
    cy.get('body').type('{uparrow}');

    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'data-test',
      DATA_TEST.SUBMENU
    );

    //until https://github.com/cypress-io/cypress/pull/8437 is merged
    cy.get(`.${submenuClassName}`).should('have.css', 'opacity', '0');
    cy.get('body').type('{rightarrow}');

    cy.get(`.${submenuClassName}`).should('have.css', 'opacity', '1');

    cy.get(`.${STYLE.item}:focus`).should(
      'have.attr',
      'data-test',
      DATA_TEST.SUBMENU_FIRST_ITEM
    );
  });

  it('Close submenu on left arrow press', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    //🙅‍♀️ go to submenu
    cy.get('body').type('{uparrow}');
    cy.get('body').type('{uparrow}');

    cy.get('body').type('{rightarrow}');
    cy.get(`.${submenuClassName}`).should('have.css', 'opacity', '1');

    cy.get('body').type('{leftarrow}');
    cy.get(`.${submenuClassName}`).should('have.css', 'opacity', '0');
  });
});
