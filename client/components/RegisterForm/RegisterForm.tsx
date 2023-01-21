import { Alert } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm, { AuthAction, AuthProperty } from '../AuthForm/AuthForm';
import AuthIcons from '../AuthIcons/AuthIcons';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    const info = { email, password };

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Successfully created account');
      });
  };

  const formProperties: AuthProperty[] = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordError(false);
        setPassword(e.target.value);
      },
    },
    {
      label: 'Confirm Password',
      type: 'password',
      name: 'confirm-password',
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordError(false);
        setConfirmPassword(e.target.value);
      },
    },
  ];

  const formActions: AuthAction[] = [
    {
      text: 'Create Account',
      type: 'submit',
    },
  ];

  return (
    <AuthForm
      properties={formProperties}
      actions={formActions}
      onSubmit={handleSubmit}>
      <div className={styles.signin}>
        {passwordError && (
          <p className={styles.error}>Passwords do not match.</p>
        )}
        <p>Already have an account? </p>
        <Link to='/login' className={styles.link}>
          Sign In
        </Link>
      </div>
      <AuthIcons />
    </AuthForm>
  );
};

export default RegisterForm;
