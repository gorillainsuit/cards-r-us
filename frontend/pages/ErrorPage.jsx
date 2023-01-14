import React from 'react';
import { Link } from 'react-router-dom';
import errLoad from '../assets/404err.gif';

const ErrorPage = () => (
  <div className='ErrorPage'>
    <h1>Error 401 You are not Logged in</h1>
    <img src={errLoad} alt='' />
    <span>
      <Link to='/login' draggable='false'>
        Let's go Login
        <svg viewBox='0 0 70 36'>
          <path
            d='M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471
35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153
54.5169 -6.68469 23.489 9.31527'
          />
        </svg>
      </Link>
    </span>
  </div>
);

export default ErrorPage;
