import React from 'react';
import Sponsers from '../components/Sponsers/Sponsers';
import LandingHeader from '../components/LandingHeader/LandingHeader';
import LandingBody from '../components/LandingBody/LandingBody';
import Background from '../images/bg.svg';

const Landing = () => (
  <div className='LandingPage'>
    <Background className='background' />
    <LandingHeader />
    <LandingBody />
    <Sponsers />
  </div>
);

export default Landing;
