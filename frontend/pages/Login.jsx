import React from 'react';
import { Form, Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='LoginPage'>
      <Form action='/' method='post'>
        <div className='Inputs'>
          <label>Email:</label>
          <input type='email' name='email' />
          <br />
          <label>Password:</label>
          <input type='password' name='password' />
          <br />
        </div>
       
        <div className='buttons'>
          <button>sign in</button>
          <button>sign up</button>
        </div>
        <br />
          <Link to="findPw" className='link'> Forget password?</Link>
        <div className='Icons'>
          <a className='icon' href='#' >
          <i class="fa-brands fa-google"></i> 
          </a>
          <a className='icon' href='#' >
          <i class="fa-brands fa-github"></i> 
          </a>
          <a className='icon' href='#' >
          <i class="fa-brands fa-apple"></i>
          </a>
        </div>
      </Form>
    </div>
  );
};

export default Login;
