import React from 'react';

import Sponsers from '../components/landing/Sponsers';
import Head from '../components/landing/Head';
import Body from '../components/landing/body';


import Background from '../images/bg.svg';


const Landing = () => (
  <div className='LandingPage'>
    <Background className='background'/>
    <Head />
    <Body />
    <Sponsers />
  </div>
);

export default Landing;
