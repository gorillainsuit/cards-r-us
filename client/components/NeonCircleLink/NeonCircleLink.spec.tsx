import React from 'react';
import NeonCircleLink from './NeonCircleLink';

describe('<NeonCircleLink />', () => {
  it('renders', () => {
    cy.mount(<NeonCircleLink to='/login'>Login</NeonCircleLink>);
  });

  it('navigates to the provided link when clicked', () => {

    const additionalRoute = {
      path: '/login',
      element: <div>Login</div>,
    };

    cy.mount(<NeonCircleLink to='/login'>Login</NeonCircleLink>, {
      additionalRoutes: [additionalRoute],
    });

    cy.get('a').click();
    cy.get('div').contains('Login');

  })
});
