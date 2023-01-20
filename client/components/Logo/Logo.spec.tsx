import React from 'react';
import Logo from './Logo';

describe('<Logo />', () => {
  it('renders', () => {
    cy.mount(<Logo />);
  });

  it('has an alt tag', () => {
    cy.mount(<Logo />);
    cy.get('img').should('have.attr', 'alt', 'logo');
  });

  it('rotates on hover', () => {
    cy.mount(<Logo />);
    cy.get('img').realHover();
    cy.get('img').should('have.css', 'rotate').and('not.be', '0deg');
  });
});
