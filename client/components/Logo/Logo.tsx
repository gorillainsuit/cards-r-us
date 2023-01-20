import React from 'react';
import logoImage from '/client/images/logo.png';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/'>
      <img
        src={logoImage}
        className={styles.image}
        alt='logo'
        draggable='false'
      />
    </Link>
  );
};

export default Logo;
