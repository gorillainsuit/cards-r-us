// React import
import React, { useEffect, useState } from 'react';

// Card import
import Card from '../components/CardDisplayComponent';

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
import useIsMobile from '../hooks/isMobileHook';

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
];

const GalleryPage = () => {
  const [displaySideBar, setDisplaySideBar] = useState(true);
  const [filterCardsByAuthor, setFilterCardsByAuthor] = useState(false);
  const [cards, setCards] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // TODO: Replace this with a fetch to backend
    // TODO: fix bug where "fetch" occurs on every filter

    setTimeout(() => {
      setCards(
        testData.filter((card) => (filterCardsByAuthor ? card.authored : true))
      );
    }, 600);
  });

  // This will be used to delete cards
  const handleCardDelete = (e, id) => {
    e.preventDefault();
    // TODO: have delete card in database as well
    testData = testData.filter((card) => card.id !== id);
    setCards(testData);
  };

  // TODO: Refactor the jank responsiveness
  return (
    <div className='GalleryPage'>
      {/* Desktop Sidebar */}
      <div
        className='SideBar'
        style={{
          width: displaySideBar ? '' : '5em',
          display: isMobile ? 'none' : '',
        }}>
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

      {/* Mobile sidebar */}
      <div
        className='SideBarMobile'
        style={{
          display: isMobile ? '' : 'none',
          height: !displaySideBar ? '100vh' : '',
        }}>
        {/* User/expand and minify sidebar */}
        <div className='User'>
          <Avatar alt='Placeholder' src={Placeholder} />
          <h2>Placeholder</h2>
          <IconButton
            variant='plain'
            onClick={() => setDisplaySideBar(!displaySideBar)}>
            {!displaySideBar ? <ExpandLess /> : <Menu />}
          </IconButton>
        </div>

        {/* Expanded sidebar view */}
        <div
          className='SideBarContent'
          style={{ display: !displaySideBar ? '' : 'none' }}>
          <Divider orientation='horizontal' />
          <div className='MainControls'>
            <ul>
              <li>
                {!displaySideBar ? (
                  <Button
                    onClick={() => {
                      setFilterCardsByAuthor(!filterCardsByAuthor);
                      setTimeout(() => setDisplaySideBar(!displaySideBar), 200);
                    }}
                    startDecorator={<FilterList />}
                    variant='soft'>
                    {filterCardsByAuthor ? 'Show All' : 'Show Sent'}
                  </Button>
                ) : null}
              </li>
            </ul>
          </div>
          <div className='SecondaryControls'>
            {!displaySideBar ? (
              <Button onClick={() => {}} variant='soft'>
                Logout
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Gallary view */}
      <div className='Content'>
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
      </div>
    </div>
  );
};

export default GalleryPage;
