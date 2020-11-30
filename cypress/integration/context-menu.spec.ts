import { DATA_TEST } from '../../example/constants';
import { STYLE, theme, animation } from '../../src/constants';

const builtInAnimationClasses = Object.keys(animation).map(k => ({
  name: k,
  enter: `${STYLE.animationWillEnter}${animation[k]}`,
  exit: `${STYLE.animationWillLeave}${animation[k]}`,
}));

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
    builtInAnimationClasses.forEach(builtInAnimation => {
      cy.getByDataTest(DATA_TEST.ANIMATION_SELECTOR).select(
        builtInAnimation.name
      );
      cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
      cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
        'have.class',
        builtInAnimation.enter
      );
      // close the menu
      cy.get('body').type('{esc}');

      cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
        'have.class',
        builtInAnimation.exit
      );

      // wait for exit animation to complete
      cy.wait(500);
    });
  });

  it('Can disable animation', () => {
    cy.getByDataTest(DATA_TEST.ANIMATION_SELECTOR).select('none');
    cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();

    builtInAnimationClasses.forEach(builtInAnimation => {
      cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
        'not.have.class',
        builtInAnimation.enter
      );
    });

    cy.get('body').type('{esc}');

    builtInAnimationClasses.forEach(builtInAnimation => {
      cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
        'not.have.class',
        builtInAnimation.exit
      );
    });
  });

  it('Can disable enter animation only', () => {
    cy.getByDataTest(DATA_TEST.TOGGLE_DISABLE_ENTER_ANIMATION).check();

    builtInAnimationClasses.forEach(builtInAnimation => {
      cy.getByDataTest(DATA_TEST.ANIMATION_SELECTOR).select(
        builtInAnimation.name
      );
      cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
      cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
        'not.have.class',
        builtInAnimation.enter
      );
      // close the menu
      cy.get('body').type('{esc}');

      cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
        'have.class',
        builtInAnimation.exit
      );

      // wait for exit animation to complete
      cy.wait(500);
    });
  });

  it('Can disable exit animation only', () => {
    cy.getByDataTest(DATA_TEST.TOGGLE_DISABLE_EXIT_ANIMATION).check();

    builtInAnimationClasses.forEach(builtInAnimation => {
      cy.getByDataTest(DATA_TEST.ANIMATION_SELECTOR).select(
        builtInAnimation.name
      );
      cy.getByDataTest(DATA_TEST.CONTEXT_MENU_TRIGGER).rightclick();
      cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
        'have.class',
        builtInAnimation.enter
      );
      // close the menu
      cy.get('body').type('{esc}');

      cy.getByDataTest(DATA_TEST.CONTEXT_MENU).should(
        'not.have.class',
        builtInAnimation.exit
      );

      // wait for exit animation to complete
      cy.wait(500);
    });
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
