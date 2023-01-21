import React from 'react';
import { Form, Link } from 'react-router-dom';
import styles from './AuthForm.module.scss';

export interface AuthProperty {
  label: string;
  type: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AuthAction {
  text: string;
  to?: string;
  type: 'submit' | 'link';
}

export interface AuthFormProps {
  properties: AuthProperty[];
  actions: AuthAction[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthForm: React.FC<React.PropsWithChildren<AuthFormProps>> = ({
  properties,
  actions,
  onSubmit,
  children,
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
              required={Boolean(property.required)}
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
    </Form>
  );
};

export default AuthForm;
