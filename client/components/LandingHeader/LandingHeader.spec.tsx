import React from 'react';
import Head from './LandingHeader';

describe('<Head />', () => {
  it('renders', () => {
    cy.mount(<Head />);
  });

  it('links to the login page', () => {
    cy.mount(<Head />);
    cy.get('a').contains('Login').should('have.attr', 'href', '/login');
  });

  it('links to the signup page', () => {
    cy.mount(<Head />);
    cy.get('a').contains('Register').should('have.attr', 'href', '/signup');
  });
});
