import { CssVarsProvider } from '@mui/joy/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Card from './components/Card/Card';
import Headline from './components/Headline/Headline';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import CreateCard from './pages/CreateCardPage';
import ErrorPage from './pages/ErrorPage';
import GalleryPage from './pages/GalleryPage';
import LandingPage from './pages/LandingPage';
import './styles/index.scss';

const routes = [
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Headline>Make Cards That Pop</Headline>,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/signup',
        element: <RegisterForm />,
      },
    ],
  },

  {
    path: '/cards',
    element: <GalleryPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/cards',
        element: <Headline>Gallery</Headline>, //TODO: Add gallery element here
      },
      {
        path: '/cards/1',
        element: (
          <Card
            data={{
              image: {
                src: 'https://picsum.photos/200',
                alt: 'random image',
              },
              color: {
                back: 'beige',
                banner: 'white',
              },
              text: {
                front: {
                  value: 'Front Text',
                  color: 'black',
                  position: 'bottom',
                },
                back: {
                  value:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus recusandae, sequi molestias earum dolore ex voluptatem eius minus quia ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus recusandae, sequi molestias earum dolore ex voluptatem eius minus quia ad.',
                  color: 'black',
                },
              },
              texture: {
                pattern: 'leather',
                intensity: 0.6,
              },
              id: '123',
              authorId: '123',
              ownerId: '123',
              createdAt: new Date(),
            }}
          />
        ),
      },
    ],
  },
  // {
  //   path: '/card',
  //   element: <CardViewPage />,
  // },
  {
    path: '/create',
    element: <CreateCard />,
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
