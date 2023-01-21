import './commands';
import '../../client/styles/index.scss';
import React from 'react';
import { MountOptions, MountReturn } from 'cypress/react';
import {
  createBrowserRouter,
  createMemoryRouter,
  MemoryRouter,
  MemoryRouterProps,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import 'cypress-real-events';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';
import { CssVarsProvider } from '@mui/joy';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: MountOptions & { additionalRoutes?: RouteObject[] }
      ): Cypress.Chainable<MountReturn>;
    }
  }
}

// Cypress.Commands.add('mount', (component: React.ReactNode, options = {}) => {
//   const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options;
//   const routerWrap = React.createElement(MemoryRouter, routerProps, component);
//   const varsWrap = React.createElement(CssVarsProvider, {}, routerWrap);
//   return mount(varsWrap, mountOptions);
// });

Cypress.Commands.add('mount', (component: React.ReactNode, options = {}) => {
  const { additionalRoutes = [], ...mountOptions } = options;

  const router = createMemoryRouter([
    { path: '/', element: component },
    ...additionalRoutes,
  ]);

  const routerProvider = React.createElement(RouterProvider, { router });
  const wrapped = React.createElement(CssVarsProvider, {}, routerProvider);

  return mount(wrapped, mountOptions);
});

// Cypress.Commands.add('mount', mount);

// Example use:
// cy.mount(<MyComponent />)
