import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthIcons.module.scss';

interface AuthOption {
  name: string;
  className: string;
  href: string;
}

const authOptions: AuthOption[] = [
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
];

const AuthIcons: React.FC = () => {
  return (
    <div className={styles.iconContainer}>
      {authOptions.map((option) => (
        <a aria-label={option.name} className={styles.icon} href={option.href}>
          <i className={option.className}></i>
        </a>
      ))}
    </div>
  );
};

export default AuthIcons;
