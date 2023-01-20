import React from 'react';
import styles from './Headline.module.scss';

interface HeadlineProps {
  children: string;
}

const Headline: React.FC<HeadlineProps> = ({ children }) => {
  const [character, setCharacter] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (character === children.length) {
        clearInterval(interval);
        return;
      }
      setCharacter((prev) => prev + 1);
    }, 85);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    // <div className={styles.container}>
      <div className={styles.headline}>
        <h1>{children.slice(0, character)}</h1>
      </div>

  );
};

export default Headline;
