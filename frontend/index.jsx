// React imports
import React from 'react';
import { createRoot } from 'react-dom/client';

// React router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Page imports
import Landing from './pages/Landing.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

// Style import
import './styles/index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/customize/:cardId',
    element: <h1>Customize</h1>,
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
    path: '/cards',
    element: <h1>Cards</h1>,
  },
  {
    path: '/*',
    element: <ErrorPage />,
  },
]);

createRoot(document.querySelector('#App')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
