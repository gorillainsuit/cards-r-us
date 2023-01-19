import React from 'react';
import { Form, Link } from 'react-router-dom';

import Background from '../images/bg.svg';
import Logo from '../images/logo.png';

const SignUp = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;

    const info = { email, password};

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringfy(info),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('Successfully created account');
    });
  };

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
      <Form action='/' method='post' onSubmit={handleSubmit}>
        <div className='Inputs noSelect'>
          <label>Email:</label>
          <input type='email' name='email' id='email' />
          <br />
          <label>Password:</label>
          <input type='password' name='password' />
          <br className='noSelect' />
          <label>Confirm Password:</label>
          <input type='password' name='password' id='password'/>
          <br className='noSelect' />
        </div>

        <div className='buttons noSelect'>
          <button className='button'>
          <Link className='button' to='/login'>
            Create Account
          </Link>
          </button>
        </div>
        <br className='noSelect' />
        <div className='Icons'>
          <a className='icon' href='#'>
            <i className='fa-brands fa-google'></i>
          </a>
          <a className='icon' href='#'>
            <i className='fa-brands fa-github'></i>
          </a>
          <a className='icon' href='#'>
            <i className='fa-brands fa-apple'></i>
          </a>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
