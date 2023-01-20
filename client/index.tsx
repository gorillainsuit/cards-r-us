// React imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssVarsProvider } from '@mui/joy/styles';

// React router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Page imports
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import NotFound from './pages/NotFoundPage';
import Login from './pages/Login';
import CreateCard from './pages/CreateCardPage';
import SignUp from './pages/SignUp';
import CardViewPage from './pages/CardViewPage';

// Style import
import './styles/index.scss';
import GalleryPage from './pages/GalleryPage';
import Headline from './components/Headline/Headline';

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    children: [
      {
        path: '/',
        element: <Headline>Make Cards That Pop</Headline>,
      },
    ],
  },
  {
    path: '/cards',
    element: <GalleryPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/card',
    element: <CardViewPage />,
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
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/*',
    element: <ErrorPage />,
  },
];

const element = document.querySelector('#App');
if (element === null) throw new Error('Root element not found');
const root = createRoot(element);

root.render(
  <React.StrictMode>
    <CssVarsProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </CssVarsProvider>
  </React.StrictMode>
);
