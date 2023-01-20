import React from 'react';
import Sponsors from './Sponsors';

describe('<Sponsors />', () => {
  it('should render', () => {
    cy.mount(<Sponsors />);
  });
});
