import React from 'react';
import MovingBackground from './MovingBackground';

describe('<MovingBackground />', () => {
  it('should render', () => {
    cy.mount(<MovingBackground />);
  });

  it('should move background', () => {
    cy.mount(<MovingBackground />);
    cy.get('svg').should('have.css', 'animation');
  });

  it('should not overlap its children', () => {
    const obj = {
      onClick() {},
    };

    cy.spy(obj, 'onClick').as('onClick');

    cy.mount(
      <MovingBackground>
        <div id="click" onClick={obj.onClick}>Test</div>
      </MovingBackground>
    );

    // check if the div can be clicked
    cy.get('#click').click();
    cy.get('@onClick').should('have.been.calledOnce');
  });
});
