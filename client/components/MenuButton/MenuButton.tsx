import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  Menu,
} from '@mui/icons-material';
import React from 'react';
import styles from './MenuButton.module.scss';

interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ open, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span className={styles.desktopIcon}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </span>
      <span className={styles.mobileIcon}>
        {open ? <ExpandLess /> : <Menu />}
      </span>
    </button>
  );
};

export default MenuButton;
