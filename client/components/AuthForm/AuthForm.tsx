import React from 'react';
import { Form, Link } from 'react-router-dom';
import useLoginState from '../../hooks/useLoginState';
import AuthIcons from '../AuthIcons/AuthIcons';
import styles from './AuthForm.module.scss';

export interface AuthProperty {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AuthAction {
  text: string;
  to?: string;
  type: 'submit' | 'link';
  
}

interface AuthFormProps {
  properties: AuthProperty[];
  actions: AuthAction[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm: React.FC<React.PropsWithChildren<AuthFormProps>> = ({
  properties,
  actions,
  onSubmit,
  children
}) => {
  return (
    <Form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.inputs}>
        {properties.map((property) => (
          <>
            <label htmlFor={property.name}>{property.label}</label>
            <input
              type={property.type}
              name={property.name}
              id={property.name}
              value={property.value}
              onChange={property.onChange}
            />
            <br />
          </>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {actions.map((action) => {
          if (action.type === 'submit') {
            return (
              <button type='submit' className={styles.button}>
                {action.text}
              </button>
            );
          } else {
            return (
              <Link className={styles.button} to={action.to || '#'}>
                {action.text}
              </Link>
            );
          }
        })}
      </div>

      <br />
      {children}
      {/* <Link to='findPw' className={styles.link}>
        {' '}
        Forgot password?
      </Link>
      <AuthIcons
        options={[
          {
            name: 'google',
            href: '#',
            className: 'fa-brands fa-google',
          },
          {
            name: 'github',
            href: 'http://localhost:8080/api/oauth/gh',
            className: 'fa-brands fa-github',
          },
          {
            name: 'apple',
            href: '#',
            className: 'fa-brands fa-apple',
          },
        ]}
      /> */}
    </Form>
  );
};

export default AuthForm;
