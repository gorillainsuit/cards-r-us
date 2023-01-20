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

  it('responsively updates the layout', () => {
    cy.viewport(1000, 500).wait(500);
    cy.mount(<Head />);
    cy.get('nav').should('have.css', 'justify-content', 'normal');
    cy.get('img').should('have.css', 'width', '96px');
    cy.viewport(500, 1000).wait(500);
    cy.get('nav').should('have.css', 'justify-content', 'space-between');
    cy.get('img').should('have.css', 'width', '52px');
  });
});
