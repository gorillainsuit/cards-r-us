import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/joy';

import Placeholder from '../images/testImg/img0.jpg';
import BG from '../images/BG2.svg';
import logo from '../images/logo.png';

const CardViewPage = () => {
  const [cardInfo, setCardInfo] = useState(null);
  const [err, setErr] = useState(false);
  const { cardId } = JSON.parse(
    `{"cardId":"${useLocation().search.replaceAll('?', '')}"}`
  );

  useEffect(() => {
    // Janky error handling!
    if (err) return;
    fetch(`/api/cards/card/${cardId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((d) => {
        if (d.status !== 200) setErr(true);
        return d.json();
      })
      .then((d) => setCardInfo(d))
      .catch((e) => {
        setErr(true);
        console.log(`OOPSIE: ${e}`);
      });
  });

  if (err) window.location.href = '/404';

  return (
    <div className='CardViewPage'>
      <div className='logoContainer' onClick={() => window.location.href = '/cards'}>
        <img className='logo noDrag' src={logo} alt='CardsRUs' />
      </div>
      <BG className='background' />
      {cardInfo === null ? (
        // Loading
        <CircularProgress color='primary' value={25} variant='soft' />
      ) : (
        //Card prewview
        <div
          className='Content'
          style={{ backgroundImage: `url(${cardInfo.imageUrl})` }}>
          <div className='CardPreview'>
            <h2 style={{ color: `${cardInfo.messageColor}` }}>
              {cardInfo.message}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardViewPage;
