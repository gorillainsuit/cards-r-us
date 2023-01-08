import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '../components/CardDisplayComponent';

import MobileExpandIcon from '../images/icons/list.svg';
// TODO: add preview image based on S3 url instead of placeholder
import Placeholder from '../images/placeholder.jpg';

// TODO: have this data be fetched from backend
let testData = [
  {
    id: '1',
    image: Placeholder,
    prompt: 'Gorilla in suit',
  },
  {
    id: '2',
    image: Placeholder,
    prompt: 'Gorilla in suit',
  },
  {
    id: '3',
    image: Placeholder,
    prompt: 'Gorilla in suit',
  },
  {
    id: '4',
    image: Placeholder,
    prompt: 'Gorilla in suit',
  },
];

const App = ({ children }) => {
  const [displaySideBar, setDispalySideBar] = useState(true);
  const [cards, setCards] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // TODO: Replace this with a fetch to backend
    setTimeout(() => setCards(testData), 600);
  });

  const handleCardDelete = (e, id) => {
    e.preventDefault();
    // TODO: have delete card in database as well
    testData = testData.filter((card) => card.id !== id);
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className='MainContent'>
      <div className='SideBar'>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/cards'>Gallary</Link>
            </li>
          </ul>
          <div className='PopDown'>
            <a
              onClick={(e) => {
                e.preventDefault();
                setDispalySideBar(!displaySideBar);
              }}>
              <MobileExpandIcon />
            </a>
            <div
              className='PopDownContent'
              style={{ display: !displaySideBar ? 'flex' : 'none' }}>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/cards'>Gallary</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className='Content'>
        {location === '/customize' ? (
          <Outlet />
        ) : (
          <div className='Gallary'>
            {cards.length ? (
              cards.map((card) => (
                <Card
                  key={card.id}
                  cardId={card.id}
                  image={card.image}
                  prompt={card.prompt}
                  deleteFunction={handleCardDelete}
                />
              ))
            ) : (
              <h1>No Cards...</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
