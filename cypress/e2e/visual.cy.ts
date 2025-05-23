describe('Visual Regression', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('Dashboard layout matches snapshot', () => {
    cy.get('.dashboard-container').matchImageSnapshot();
  });
});