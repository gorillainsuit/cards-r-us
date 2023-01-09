import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '../components/CardDisplayComponent';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import FilterList from '@mui/icons-material/FilterList';
import Divider from '@mui/joy/Divider';
import CircularProgress from '@mui/joy/CircularProgress';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import Logout from '@mui/icons-material/Logout';

import MobileExpandIcon from '../images/icons/list.svg';
// TODO: add preview image based on S3 url instead of placeholder
import Placeholder from '../images/placeholder.jpg';

// TODO: have this data be fetched from backend
let testData = [
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit1',
    authored: true,
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit2',
    authored: false,
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit3',
    authored: true,
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit4',
    authored: false,
  },
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit1',
    authored: true,
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit2',
    authored: false,
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit3',
    authored: true,
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit4',
    authored: false,
  },
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit1',
    authored: true,
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit2',
    authored: false,
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit3',
    authored: true,
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit4',
    authored: false,
  },
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit1',
    authored: true,
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit2',
    authored: false,
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit3',
    authored: true,
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit4',
    authored: false,
  },
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit1',
    authored: true,
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit2',
    authored: false,
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit3',
    authored: true,
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit4',
    authored: false,
  },
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit1',
    authored: true,
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit2',
    authored: false,
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit3',
    authored: true,
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit4',
    authored: false,
  },
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit1',
    authored: true,
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit2',
    authored: false,
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit3',
    authored: true,
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit4',
    authored: false,
  },
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit1',
    authored: true,
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit2',
    authored: false,
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit3',
    authored: true,
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit4',
    authored: false,
  },
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit1',
    authored: true,
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit2',
    authored: false,
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit3',
    authored: true,
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit4',
    authored: false,
  },
];

const App = ({ children }) => {
  const [displaySideBar, setDisplaySideBar] = useState(true);
  const [filterCardsByAuthor, setFilterCardsByAuthor] = useState(false);
  const [cards, setCards] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // TODO: Replace this with a fetch to backend
    // TODO: fix bug where "fetch" occurs on every filter

    setTimeout(
      () =>
        setCards(
          testData.filter((card) =>
            filterCardsByAuthor ? card.authored : true
          )
        ),
      600
    );
  });

  const handleCardDelete = (e, id) => {
    e.preventDefault();
    // TODO: have delete card in database as well
    testData = testData.filter((card) => card.id !== id);
    setCards(testData);
  };

  // TODO: Refactor the jank responsiveness

  return (
    <div className='MainContent'>
      {/* Sidebar */}
      <div className='SideBar' style={{ width: displaySideBar ? '' : '5em' }}>
        {/* User/expand and minify sidebar */}
        <div className='User'>
          <Avatar
            style={{ display: displaySideBar ? '' : 'none' }}
            alt='Placeholder'
            src={Placeholder}
          />
          <h2 style={{ display: displaySideBar ? '' : 'none' }}>Placeholder</h2>
          <IconButton
            variant='plain'
            onClick={() => setDisplaySideBar(!displaySideBar)}>
            {displaySideBar ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>

        {/* Expanded sidebar view */}
        <div className='SideBarContent'>
          <Divider orientation='horizontal' />
          <div className='MainControls'>
            <ul>
              <li>
                {displaySideBar ? (
                  <Button
                    onClick={() => setFilterCardsByAuthor(!filterCardsByAuthor)}
                    startDecorator={<FilterList />}
                    variant='soft'>
                    {filterCardsByAuthor ? 'Show All' : 'Show Sent'}
                  </Button>
                ) : (
                  <IconButton
                    onClick={() =>
                      setFilterCardsByAuthor(!filterCardsByAuthor)
                    }>
                    <FilterList />
                  </IconButton>
                )}
              </li>
            </ul>
          </div>
          <div className='SecondaryControls'>
            {displaySideBar ? (
              <Button onClick={() => {}} variant='soft'>
                Logout
              </Button>
            ) : (
              <IconButton variant='soft'>
                <Logout />
              </IconButton>
            )}
          </div>
        </div>
      </div>

      {/* Page content or gallary view */}
      <div className='Content'>
        {location === '/customize' ? (
          <Outlet />
        ) : (
          <div className='Gallary'>
            {(cards ?? false) && cards.length ? (
              cards.map((card, i) => (
                <Card
                  key={i}
                  cardId={card.id}
                  image={card.image}
                  prompt={card.prompt}
                  deleteFunction={handleCardDelete}
                />
              ))
            ) : cards === null ? (
              <CircularProgress color='primary' value={25} variant='soft' />
            ) : (
              <h1>No Cards.</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
