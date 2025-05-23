describe('Accessibility Checks', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
    cy.injectAxe();
  });

  it('Has no detectable a11y violations on load', () => {
    cy.checkA11y();
  });

  it('Has no a11y violations after focus', () => {
    cy.get('.sidebar a').first().focus();
    cy.checkA11y();
  });
});