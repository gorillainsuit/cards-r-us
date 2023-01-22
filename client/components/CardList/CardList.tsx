import { FilterList } from '@mui/icons-material';
import { Button } from '@mui/joy';
import React from 'react';
import styles from './CardList.module.scss';

const FILTERS = ['All', 'Sent', 'Received'];

const CardList = () => {
  const [filterIndex, setFilterIndex] = React.useState(0);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const getCards = async () => {
      const response = await fetch('/api/cards');
      const data = await response.json();
      setCards(data);
    };
    getCards();
  }, []);

  React.useEffect(() => {
    setCards((cards) => {
      switch (filterIndex) {
        case 0:
          return cards;
        case 1:
          return cards; // TODO: Filter sent cards
        case 2:
          return cards; // TODO: Filter received cards
        default:
          return cards;
      }
    });
  }, [filterIndex, cards]);

  const handleFilter = () => {
    setFilterIndex((filterIndex) => (filterIndex + 1) % FILTERS.length);
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={handleFilter}
        startDecorator={<FilterList />}
        variant='soft'>
        {FILTERS[filterIndex]}
      </Button>
      <div className={styles.list}>
        <ul>{/* TODO: Display cards */}</ul>
      </div>
    </div>
  );
};

export default CardList;
