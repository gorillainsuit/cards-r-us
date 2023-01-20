import React, { useState } from 'react';
import DeleteIcon from '../../images/icons/trash.svg';
import ShareIcon from '../../images/icons/box-arrow-up.svg';

interface CardProps {
  cardId: string ;
  message: string ;
  deleteFunction:  (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, cardId: string) => void ;
  image: string;
}

const Card: React.FC <CardProps> = ({ cardId, image, message, deleteFunction }) => {
  const [shouldDisplayShare, setDisplayShare] = useState(false);

  return (
    <div className='Card'>
      <div
        className='Preview'
        onClick={() => (window.location.href = `/card?${cardId}`)}>
        <img className='noDrag' src={image} alt={message ?? 'Card Preview'} />
      </div>
      <div className='Buttons'>
        <a onClick={(e) => deleteFunction(e, cardId)}>
          <DeleteIcon aria-label='delete' />
        </a>

        <a onClick={() => setDisplayShare(!shouldDisplayShare)}>
          <ShareIcon aria-label='share' />
        </a>

        <div className='ShareCardPopup' hidden={!shouldDisplayShare}></div>
      </div>
    </div>
  );
};

export default Card;
