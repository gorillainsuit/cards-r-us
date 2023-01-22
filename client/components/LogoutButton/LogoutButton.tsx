import { Logout } from '@mui/icons-material';
import { IconButton } from '@mui/joy';
import React from 'react';
import styles from './LogoutButton.module.scss';

interface LogoutButtonProps {
  collapsed: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ collapsed }) => {
  return (
    <div
      className={styles.container}
      style={{ justifyContent: collapsed ? 'flex-end' : 'center' }}>
      {collapsed ? (
        <IconButton variant='plain' className={styles.icon}>
          <Logout />
        </IconButton>
      ) : (
        <button className={styles.button}>Logout</button>
      )}
    </div>
  );
};

export default LogoutButton;
