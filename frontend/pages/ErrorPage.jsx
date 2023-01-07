import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <h1>
    An error occured.{' '}
    <span>
      <Link to='/'>Go home.</Link>
    </span>
  </h1>
);

export default ErrorPage;
