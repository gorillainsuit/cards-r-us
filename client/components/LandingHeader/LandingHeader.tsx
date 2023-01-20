import React from 'react';
import Logo from '../Logo/Logo';
import NeonCircleLink from '../NeonCircleLink/NeonCircleLink';

// import Logo from '../../images/logo.png';

const Head = () => (
  <div className='head'>
    <Logo />
    <div className='LogNReg noSelect'>
      <NeonCircleLink to='/login'>Login</NeonCircleLink>
      <NeonCircleLink to='/signup'>Register</NeonCircleLink>
    </div>
  </div>
);

export default Head;
