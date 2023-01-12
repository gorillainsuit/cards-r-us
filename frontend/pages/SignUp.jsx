import React from 'react';
import { Form, Link } from 'react-router-dom';

import Background from '../images/bg.svg';
import Logo from '../images/logo.png';

const SignUp = () => {
  return (
    <div className='SignUpPage'>
      <Link className='logoContainer' to={'/'}>
        <img
          src={Logo}
          className='logo noSelect'
          alt='logo'
          draggable='false'
        />
      </Link>
      <Background className='background' />
      <Form action='/' method='post'>
        <div className='Inputs noSelect'>
          <label>Email:</label>
          <input type='email' name='email' />
          <br />
          <label>Password:</label>
          <input type='password' name='password' />
          <br className='noSelect' />
          <label>Confirm Password:</label>
          <input type='password' name='password' />
          <br className='noSelect' />
        </div>

        <div className='buttons noSelect'>
          <button className='button'>Create</button>
          <Link className='button' to='/login'>
            Sign In
          </Link>
        </div>
        <br className='noSelect' />
        <div className='Icons'>
          <a className='icon' href='#'>
            <i class='fa-brands fa-google'></i>
          </a>
          <a className='icon' href='#'>
            <i class='fa-brands fa-github'></i>
          </a>
          <a className='icon' href='#'>
            <i class='fa-brands fa-apple'></i>
          </a>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
