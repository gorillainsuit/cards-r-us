import React from 'react';
import Sponsors from '../components/Sponsors/Sponsors';
import LandingHeader from '../components/LandingHeader/LandingHeader';
import Headline from '../components/Headline/Headline';
import MovingBackground from '../components/MovingBackground/MovingBackground';
import { Outlet } from 'react-router';

const Landing = () => (
  <MovingBackground>
    <LandingHeader />
    {/* <Headline>Make Cards That Pop</Headline> */}
    <Outlet />
    <Sponsors />
  </MovingBackground>
);

export default Landing;
