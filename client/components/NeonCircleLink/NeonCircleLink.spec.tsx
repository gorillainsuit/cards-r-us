import React from 'react';
import NeonCircleLink from './NeonCircleLink';

describe('<NeonCircleLink />', () => {
  it('renders', () => {
    cy.mount(<NeonCircleLink to='/login'>Login</NeonCircleLink>);
  });

  it('animates svg dasharray on hover', () => {
    cy.viewport(1000, 500).wait(500);
    cy.mount(<NeonCircleLink to='/login'>Login</NeonCircleLink>);

    cy.get('svg').should('have.css', 'stroke-dasharray', '69px, 278px');
    cy.get('svg').realHover();
    cy.get('svg').should('have.css', 'stroke-dasharray', '180px, 278px');
  });
});
