import { DATA_TEST } from '../../example/constants';
import { STYLE, theme, animation } from '../../src/constants';

describe('Context menu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should not be mounted by default', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('not.be.visible');
  });

  it('Display the context menu', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');
  });

  it('Can mount on specified dom node', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');

    cy.getByDataTest(DATA_TEST.MOUNT_NODE).then(el => {
      expect(el.children().length).to.eq(0);
    });

    cy.getByDataTest(DATA_TEST.TOGGLE_MOUNT_NODE).check();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    cy.getByDataTest(DATA_TEST.MOUNT_NODE).then(el => {
      expect(el.children().length).to.greaterThan(0);
    });
  });

  it('Close on Escape', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');
    cy.get('body').type('{esc}');
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('not.be.visible');
  });

  it('Close on Enter', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');
    cy.get('body').type('{enter}');
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('not.be.visible');
  });

  it('Close on window resize', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');

    cy.viewport(123, 456);
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('not.be.visible');
  });

  it('Prevent from rendering outside of the viewport if possible', () => {
    cy.viewport(500, 500);
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick(10, 170);
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).isWithinViewport();
  });

  it('Can change trigger event', () => {
    cy.getByDataTest(DATA_TEST.EVENT_SELECTOR).select('onClick');
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('not.be.visible');

    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).click();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');

    cy.getByDataTest(DATA_TEST.EVENT_SELECTOR).select('onDoubleClick');
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('not.be.visible');

    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).dblclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');
  });

  it('Can use built-in theme', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    // no theme selected
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
      'have.class',
      `${STYLE.theme}none`
    );

    cy.getByDataTest(DATA_TEST.THEME_SELECTOR).select(theme.light);

    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
      'have.class',
      `${STYLE.theme}${theme.light}`
    );

    cy.getByDataTest(DATA_TEST.THEME_SELECTOR).select(theme.dark);

    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
      'have.class',
      `${STYLE.theme}${theme.dark}`
    );
  });

  it('Can use built-in animation', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
      'have.class',
      `${STYLE.animationWillEnter}none`
    );

    cy.getByDataTest(DATA_TEST.ANIMATION_SELECTOR).select(animation.fade);
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
      'have.class',
      `${STYLE.animationWillEnter}${animation.fade}`
    );

    cy.getByDataTest(DATA_TEST.ANIMATION_SELECTOR).select(animation.flip);
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
      'have.class',
      `${STYLE.animationWillEnter}${animation.flip}`
    );

    cy.getByDataTest(DATA_TEST.ANIMATION_SELECTOR).select(animation.pop);
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
      'have.class',
      `${STYLE.animationWillEnter}${animation.pop}`
    );

    cy.getByDataTest(DATA_TEST.ANIMATION_SELECTOR).select(animation.zoom);
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
      'have.class',
      `${STYLE.animationWillEnter}${animation.zoom}`
    );
  });

  it('Can specify a custom position', () => {
    cy.getByDataTest(DATA_TEST.TOGGLE_CUSTOM_POSITION).check();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');

    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).then(el => {
      const { x, y } = el[0].getBoundingClientRect();

      expect(x).to.be.eq(0, 'x match custom coordinate');
      expect(y).to.be.eq(0, 'y match custom coordinate');
    });
  });

  it('Should not close when clicking a disabled item', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');

    cy.getByDataTest(DATA_TEST.DISABLED_ITEM_VIA_BOOLEAN).click();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');

    cy.getByDataTest(DATA_TEST.DISABLED_ITEM_VIA_FUNCTION).click();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');
  });

  it('Should not close when clicking on submenu', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');

    cy.getByDataTest(DATA_TEST.SUBMENU).click();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');
  });

  it('Should close when clicking on an item', () => {
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('be.visible');

    cy.getByDataTest(DATA_TEST.MENU_FIRST_ITEM).click();
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should('not.be.visible');
  });
});
