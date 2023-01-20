import React from 'react';
import { Form, Link } from 'react-router-dom';

import logo from '../images/logo.png';
import Background from '../images/bg.svg';
import useLoginState from '../hooks/useLoginState';
import Logo from '../components/Logo/Logo';

const Login = () => {
  const { updateLogin } = useLoginState();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.target === null) return;
    const info = { email, password };

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
      <Logo />
      <Background className='background' />
      <Form onSubmit={handleLogin}>
        <div className='Inputs noSelect'>
          <label>Email:</label>
          <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <a className='icon' href='http://localhost:8080/api/oauth/gh'>
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
