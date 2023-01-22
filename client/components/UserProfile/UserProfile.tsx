import { Avatar, CircularProgress } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import useUser from '../../hooks/useUser';
import styles from './UserProfile.module.scss';

const UserProfile: React.FC = () => {
  const { user, error } = useUser();
  const navigate = useNavigate();

  if (error) {
    // navigate('/login');
  }

  return (
    <div className={styles.user}>
      {user ? (
        <>
          {/* <Avatar src={user.avatar} placeholder='P' /> */}
          <img src={user.avatar} className={styles.avatar} />
          <h2>{user.username || 'Test User'}</h2>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default UserProfile;
