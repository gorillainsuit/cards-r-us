describe('landing page tests', () => {
  it('passes', () => {
    cy.visit('/');
  });

  it('displays a hover transition on sponsors', () => {
    cy.visit('/');
    cy.get('.sponsers img').each((el) => {
      cy.wrap(el).should('have.css', 'transition');
      cy.wrap(el).trigger('mouseover');
      cy.wrap(el).should('have.css', 'width');
    });
  });

  it('navigates to login page when login is clicked', () => {
    cy.visit('/');
    cy.get('a').contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('navigates to signup page when signup is clicked', () => {
    cy.visit('/');
    cy.get('a').contains('Register').click();
    cy.url().should('include', '/signup');
  });
});
