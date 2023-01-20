import React from 'react';
import logoImage from '/client/images/logo.png';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <img
      src={logoImage}
      className={styles.image}
      alt='logo'
      draggable='false'
    />
  );
};

export default Logo;
