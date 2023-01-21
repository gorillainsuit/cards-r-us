import React from 'react';
import LoginForm from './LoginForm';

describe('<LoginForm />', () => {
  it('should render', () => {
    cy.mount(<LoginForm />);
  });

  it('should call /api/auth/login on submission', () => {
    cy.intercept('POST', '/api/auth/login').as('login');

    cy.mount(<LoginForm />);

    cy.get('input[name="email"]').type('a@a.a');
    cy.get('input[name="password"]').type('a');

    cy.get('button').contains('Sign In').click();

    cy.wait('@login').its('request.body').should('deep.equal', {
      email: 'a@a.a',
      password: 'a',
    });
  });

  it('should navigate to the signup page if signup button is clicked', () => {
    const additionalRoute = {
      path: '/signup',
      element: <div>Signup</div>,
    };

    cy.mount(<LoginForm />, {
      additionalRoutes: [additionalRoute],
    });

    cy.get('a').contains('Sign Up').click();

    cy.get('div').contains('Signup');
  });
});
