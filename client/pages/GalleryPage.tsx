import React from 'react';
import LandingHeader from '../components/PageHeader/PageHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import MovingBackground from '../components/MovingBackground/MovingBackground';
import { Outlet } from 'react-router';

const GalleryPage: React.FC = () => {
  return (
    <MovingBackground night>
      <LandingHeader includeNav={false} />
      <Sidebar />
      <Outlet />
    </MovingBackground>
  );
};

export default GalleryPage;
