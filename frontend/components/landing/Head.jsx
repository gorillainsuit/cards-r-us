import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../images/logo.png';

const Head = () => (
  <div className='head'>
    <img src={Logo} className='logo noSelect' alt='logo' draggable='false' />
    <div className='LogNReg noSelect'>
      <Link to='/login' draggable='false'>
        Login
        <svg viewBox='0 0 70 36'>
          <path
            d='M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471
35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153
54.5169 -6.68469 23.489 9.31527'
          />
        </svg>
      </Link>
      <Link to='/signup' draggable='false'>
        Register
        <svg viewBox='0 0 70 36'>
          <path
            d='M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471
35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153
54.5169 -6.68469 23.489 9.31527'
          />
        </svg>
      </Link>
    </div>
  </div>
);

export default Head;
