import React from 'react';
import { Form, Link } from 'react-router-dom';

import Logo from '../images/logo.png';
import Background from '../images/bg.svg';
import useLoginState from '../hooks/useLoginHooke';

const Login = () => {
  const { updateLogin } = useLoginState();


  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    const info = { email, password};

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
    .then((res) => res.json())
    .then((data) => {
      updateLogin(data);
    });
  };



  return (
    <div className='LoginPage'>
      <Link className='logoContainer' to={'/'}>
        <img
          src={Logo}
          className='logo noSelect'
          alt='logo'
          draggable='false'
        />
      </Link>
      <Background className='background' />
      <Form onSubmit={handleLogin}>
        <div className='Inputs noSelect'>
          <label>Email:</label>
          <input type='email' name='email' id='email'/>
          <br />
          <label>Password:</label>
          <input type='password' name='password' id='password' />
          <br className='noSelect' />
        </div>

        <div className='buttons noSelect'>
          <button className='button'>Sign In</button>
          <Link className='button' to='/signup'>
            Sign Up
          </Link>
        </div>
        <br className='noSelect' />
        <Link className='noSelect' to='findPw'>
          {' '}
          Forget password?
        </Link>
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

export default Login;
