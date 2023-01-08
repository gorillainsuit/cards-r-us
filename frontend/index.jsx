// React imports
import React from 'react';
import { createRoot } from 'react-dom/client';

// React router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Page imports
import Landing from './pages/Landing';
import ErrorPage from './pages/ErrorPage';
import NotFound from './pages/NotFoundPage';

// Style import
import './styles/index.scss';
import App from './containers/App';

const routes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: 'cards',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'customize/:cardId',
        element: <h1>Customize</h1>,
      },
    ],
  },
  {
    path: '/card',
    element: <h1>Single card view</h1>,
  },
  {
    path: '/login',
    element: <h1>Login</h1>,
  },
  {
    path: '/signup',
    element: <h1>Sign Up</h1>,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
];

createRoot(document.querySelector('#App')).render(
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </React.StrictMode>
);
