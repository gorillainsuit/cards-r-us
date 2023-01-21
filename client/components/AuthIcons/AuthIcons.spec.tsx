import React from 'react';
import AuthIcons from './AuthIcons';

describe('<AuthIcons />', () => {
  it('should render', () => {
    cy.mount(<AuthIcons />);
  });

  it('should navigate to github oauth route when github clicked', () => {
    cy.mount(<AuthIcons />);
    cy.get('a[aria-label="github"]')
      .should('have.attr', 'href')
      .should('include', '/api/oauth/gh');
  });
});
