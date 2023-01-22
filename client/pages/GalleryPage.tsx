// React import
import React, { useEffect, useState } from 'react';

// Card import
import Card from '../components/CardDisplay/CardDisplay';

// mui component imports
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import CircularProgress from '@mui/joy/CircularProgress';

// mui icon imports
import FilterList from '@mui/icons-material/FilterList';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import Menu from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Logout from '@mui/icons-material/Logout';

// Hook imports
import useIsMobile from '../hooks/useIsMobile';

// TODO: add preview image based on S3 url instead of img0
import Placeholder from '../images/testImg/img0.jpg';

import logo from '../images/logo.png';
import BG from '../images/BG2.svg';

import useLoginState from '../hooks/useLoginState';
import Logo from '../components/Logo/Logo';
import LandingHeader from '../components/PageHeader/PageHeader';
import Sidebar from '../components/Sidebar/Sidebar';

let filterCardsByAuthor = false;
// This will be used to hold the un-filtered cards

let tmpCards: Card[] = []; //needs a type

let isError = false;

interface Card {
  message: string;
  imageUrl: string;
  cardId: string;
  author: string;
}

interface User {
  avatar: string;
  username: string;
}

const GalleryPage: React.FC = () => {
  const [displaySideBar, setDisplaySideBar] = useState(true);
  // const [filterCardsByAuthor, setFilterCardsByAuthor] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const isMobile = useIsMobile();
  const [error, setError] = useState(false);
  // const [user, setUser] = useState<User | null>(null);
  // const { isLoggedIn, user } = useLoginState();

  // if (!isLoggedIn) window.location.href = '/login';
  // if (error) throw new Error('An error occured.');

  useEffect(() => {
    // TODO: Replace this with a fetch to backend
    // TODO: fix bug where "fetch" occurs on every filter
    // if (!cards) {
    //   fetch('/api/cards/', { method: 'GET' })
    //     .then((d) => {
    //       if (d.status !== 200) {
    //         setError(true);
    //       }
    //       return d.json();
    //     })
    //     .then((d) => {
    //       // Create a copy of the cards.
    //       tmpCards = [...d];
    //       // Set the card state
    //       setCards(d);
    //     })
    //     .catch((e) => {
    //       setError(true);
    //       console.log('Error occured: ', e);
    //     });
    // }
    // if (!user) {
    //   // fetch('/api/auth/user', { method: 'GET' })
    //   //   .then((d) => {
    //   //     if (d.status !== 200) {
    //   //       setError(true);
    //   //     }
    //   //     return d.json();
    //   //   })
    //   //   .then((d) => {
    //   //     // Set the card state
    //   //     setUser(d);
    //   //   })
    //   //   .catch((e) => {
    //   //     setError(true);
    //   //     console.log('Error occured: ', e);
    //   //   });
    // }
  });

  // This will be used to delete cards
  const handleCardDelete = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    console.log('delete ', id);
    const filtered = cards.filter((card) => card.cardId !== id);
    tmpCards = filtered;
    // TODO: have delete card in database as well
    fetch('/api/cards', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id }),
    }).catch((e) => {
      setError(true);
    });
    setCards(filtered);
  };

  // This will handle card filtering
  const doCardFilter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    filterCardsByAuthor = !filterCardsByAuthor;
    // if (!tmpCards) tmpCards = [...cards];
    if (filterCardsByAuthor) {
      setCards(cards.filter((card) => card.author));
    } else {
      setCards(tmpCards);
    }
  };

  // TODO: Refactor the jank responsiveness
  return (
    <div className='GalleryPage'>
      <BG className='background' />
      <LandingHeader includeNav={false} />
      {/* Desktop Sidebar */}
      <Sidebar />
      {/* Gallary view */}
      <div className='Content'>
        <div className='Gallary'>
          {(cards ?? false) && cards.length ? (
            cards.map((card, i) => (
              <Card
                key={i}
                cardId={card.cardId}
                image={card.imageUrl}
                message={card.message}
                deleteFunction={handleCardDelete}
              />
            ))
          ) : cards === null ? (
            <CircularProgress color='primary' value={25} variant='soft' />
          ) : (
            <h1>No Cards.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
