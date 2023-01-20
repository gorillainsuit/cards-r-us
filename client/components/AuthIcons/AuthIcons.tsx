import React from 'react';
import styles from './AuthIcons.module.scss';

interface AuthOption {
  name: string;
  className: string;
  href: string;
}

interface AuthIconsProps {
  options: AuthOption[];
}

const AuthIcons: React.FC<AuthIconsProps> = ({ options }) => {
  return (
    <div className={styles.iconContainer}>
      {options.map((option) => (
        <a className={styles.icon} href={option.href}>
          <i className={option.className}></i>
        </a>
      ))}
    </div>
  );
};

export default AuthIcons;
