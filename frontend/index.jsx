// React imports
import React from 'react';
import { createRoot } from 'react-dom/client';

// React router imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Page imports
import Landing from './pages/Landing';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import CreateImg from './pages/ImgCreatePage'; 

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
    element: <Login/>
  },
  {
    path: '/signup',
    element: <h1>Sign Up</h1>,
  },

  //is this route to image creation page ok?

  {
    path: '/createImage',
    element: <CreateImg/>,

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
