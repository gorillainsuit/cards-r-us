import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/joy';

import Placeholder from '../images/testImg/img0.jpg';

const CardViewPage = () => {
  const [cardInfo, setCardInfo] = useState(null);
  const { cardId } = JSON.parse(
    `{"cardId":"${useLocation().search.replaceAll('?', '')}"}`
  );

  useEffect(() => {
    setTimeout(() => {
      setCardInfo({
        message: 'Placeholder text is great.\n-Love Mom',
        imageUrl: Placeholder,
      });
    }, 600);
  });

  return (
    <div className='CardViewPage'>
      {cardInfo === null ? (
        // Loading
        <CircularProgress color='primary' value={25} variant='soft' />
      ) : (
        //Card prewview
        <div
          className='Content'
          style={{ backgroundImage: `url(${cardInfo.imageUrl})` }}>
          <div className='CardPreview'>
            <h2>{cardInfo.message}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardViewPage;
