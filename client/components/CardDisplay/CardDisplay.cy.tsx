import React from 'react';
import Card from './CardDisplay';
import { mount } from 'cypress/react18';

describe('<Card />', () => {
  const testImage = 'https://source.unsplash.com/random/?cat';
  it('renders', () => {
    mount(
      <Card
        image={testImage}
        cardId={'card-1'}
        message={'Test Message'}
        deleteFunction={() => {}}
      />
    );
  });

  it('renders with image', () => {
    mount(
      <Card
        image={testImage}
        cardId={'card-1'}
        message={'Test Message'}
        deleteFunction={() => {}}
      />
    );
    cy.get('img').should('have.attr', 'src', testImage);
    cy.get('img').should('have.attr', 'alt', 'Test Message');
  });

  it('calls delete function when delete icon clicked', () => {
    const deleteFunction = cy.stub();
    mount(
      <Card
        image={testImage}
        cardId={'card-1'}
        message={'Test Message'}
        deleteFunction={deleteFunction}
      />
    );
    cy.get('*[aria-label="delete"]').click();
    cy.wrap(deleteFunction).should('have.been.called');
  })

});
