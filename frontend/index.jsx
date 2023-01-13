// React imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssVarsProvider } from '@mui/joy/styles';

// React router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Page imports
import Landing from './pages/Landing';
import ErrorPage from './pages/ErrorPage';
import NotFound from './pages/NotFoundPage';
import Login from './pages/Login';
import CreateCard from './pages/CreateCardPage';
import SignUp from './pages/SignUp';

// Style import
import './styles/index.scss';
import GalleryPage from './pages/GalleryPage';

const routes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/cards',
    element: <GalleryPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/card/:id',
    element: <h1>Single card view</h1>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/create',
    element: <CreateCard />,
  },
  {
    path: '/test',
    element: (
      <button
        onClick={() =>
          (window.location.href = 'http://localhost:8080/api/oauth/gh')
        }>
        GH oauth
      </button>
    ),
  },
  {
    path: '/*',
    element: <ErrorPage />,
  },
];

createRoot(document.querySelector('#App')).render(
  <React.StrictMode>
    <CssVarsProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </CssVarsProvider>
  </React.StrictMode>
);
