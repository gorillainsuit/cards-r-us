import React from 'react';
import { Link } from 'react-router-dom';
import errLoad from '../assets/404err.gif';

const ErrorPage = () => (
  <>
    <h1>
      An error occured.{' '}
      <span>
        <Link to='/'>Go home.</Link>
      </span>
    </h1>
    <img src={errLoad} alt='' />
  </>
);

export default ErrorPage;
