import React from 'react';
import Logo from '../Logo/Logo';
import NeonCircleLink from '../NeonCircleLink/NeonCircleLink';
import styles from './LandingHeader.module.scss';

// import Logo from '../../images/logo.png';

const Head = () => (
  <header className={styles.header}>
    <Logo />
    <nav className={styles.navigation}>
      <NeonCircleLink to='/login'>Login</NeonCircleLink>
      <NeonCircleLink to='/signup'>Register</NeonCircleLink>
    </nav>
  </header>
);

export default Head;
