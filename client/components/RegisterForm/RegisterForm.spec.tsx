import React from 'react';
import RegisterForm from './RegisterForm';

describe('<RegisterForm />', () => {
  beforeEach(() => {
    cy.viewport(500, 1000);
  });

  it('should render', () => {
    cy.mount(<RegisterForm />);
  });

  it('should call the api with valid credentials', () => {
    cy.intercept('POST', '/api/signup').as('signup');

    cy.mount(<RegisterForm />);

    cy.get('input[name="email"]').type('a@a.a');
    cy.get('input[name="password"]').type('a');
    cy.get('input[name="confirm-password"]').type('a');

    cy.get('button').contains('Create Account').click();

    cy.wait('@signup').its('request.body').should('deep.equal', {
      email: 'a@a.a',
      password: 'a',
    });
  });

  it('should navigate to the login page if login button is clicked', () => {
    const additionalRoute = {
      path: '/login',
      element: <div>Login</div>,
    };

    cy.mount(<RegisterForm />, {
      additionalRoutes: [additionalRoute],
    });

    cy.get('a').contains('Sign In').click();

    cy.get('div').contains('Login');
  });

  it('should show an error if the passwords do not match', () => {
    cy.mount(<RegisterForm />);

    cy.get('input[name="email"]').type('a@a.a');
    cy.get('input[name="password"]').type('a');
    cy.get('input[name="confirm-password"]').type('b');

    cy.get('button').contains('Create Account').click();

    cy.get('p').contains('Passwords do not match.');

    cy.get('input[name="confirm-password"]').clear().type('a');

    cy.get('button').contains('Create Account').click();

    cy.get('p').contains('Passwords do not match').should('not.exist');
  });
});
