import React from 'react';
import Background from '../../images/bg.svg';
import styles from './MovingBackground.module.scss';

const MovingBackground: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.container}>
      <Background className={styles.background} />
      <div className={styles.content}>
        {children}
        </div>
    </main>
  );
};

export default MovingBackground;
