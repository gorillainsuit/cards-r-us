import React from 'react';
import Headline from './Headline';

describe('<Headline />', () => {
  it('should render', () => {
    cy.mount(<Headline>Make Cards That Pop</Headline>);
  });

  it('should animate typing text', () => {
    cy.mount(<Headline>12345</Headline>);
    cy.get('h1').should('have.text', '');
    cy.wait(500);
    cy.get('h1').should('have.text', '12345');
  });
});
