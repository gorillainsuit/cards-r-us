// React import
import React, { useState } from 'react';
import Divider from '@mui/joy/Divider';
import styles from './Sidebar.module.scss';
import UserProfile from '../UserProfile/UserProfile';
import MenuButton from '../MenuButton/MenuButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import CardList from '../CardList/CardList';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const containerStyles = `${styles.sidebar} ${
    open ? styles.open : styles.closed
  }`;

  return (
    <section className={containerStyles}>
      <div>
        <nav className={styles.nav}>
          <UserProfile />
          <MenuButton open={open} onClick={() => setOpen((open) => !open)} />
        </nav>
        <Divider orientation='horizontal' />
      </div>
      <CardList />
      <div>
        <Divider orientation='horizontal' />
        <LogoutButton collapsed={!open} />
      </div>
    </section>
  );
};

export default Sidebar;
