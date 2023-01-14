import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '../images/icons/trash.svg';
import ShareIcon from '../images/icons/box-arrow-up.svg';
import CopyIcon from '../images/icons/clipboard.svg';
import CopiedIcon from '../images/icons/clipboard-check.svg';

const Card = ({ cardId, image, prompt, deleteFunction }) => {
  const [shouldDisplayShare, setDisplayShare] = useState(false);
  const [isCardUrlCopied, setCardUrlCopied] = useState(false);

  return (
    <div className='Card'>
      <div
        className='Preview'
        onClick={() => (window.location.href = `/card?${cardId}`)}>
        <img className='noDrag' src={image} alt={prompt ?? 'Card Preview'} />
      </div>
      <div className='Buttons'>
        <a onClick={(e) => deleteFunction(e, cardId)}>
          <DeleteIcon />
        </a>

        <a onClick={() => setDisplayShare(!shouldDisplayShare)}>
          <ShareIcon />
        </a>

        <div className='ShareCardPopup' hidden={!shouldDisplayShare}></div>
      </div>
    </div>
  );
};

export default Card;
