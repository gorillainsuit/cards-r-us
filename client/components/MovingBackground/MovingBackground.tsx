import React from 'react';
import DayBackground from '../../images/bg.svg';
import NightBackground from '../../images/BG2.svg';
import styles from './MovingBackground.module.scss';

interface MovingBackgroundProps {
  night?: boolean;
}

const MovingBackground: React.FC<
  React.PropsWithChildren<MovingBackgroundProps>
> = ({ children, night = false }) => {
  return (
    <main
      className={styles.container}
      style={{ backgroundColor: night ? '#001320' : '#305C9A' }}>
      {night ? (
        <NightBackground className={styles.background} />
      ) : (
        <DayBackground className={styles.background} />
      )}
      <div className={styles.content}>{children}</div>
    </main>
  );
};

export default MovingBackground;
