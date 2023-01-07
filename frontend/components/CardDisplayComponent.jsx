import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '../images/icons/pencil.svg';
import DeleteIcon from '../images/icons/trash.svg';
import ShareIcon from '../images/icons/box-arrow-up.svg';
import CopyIcon from '../images/icons/clipboard.svg';
import CopiedIcon from '../images/icons/clipboard-check.svg';

import Placeholder from '../images/placeholder.jpg';

// TODO: add preview image based on S3 url instead of placeholder

const Card = ({ cardId }) => {
  const [shouldDisplayShare, setDisplayShare] = useState(false);
  const [isCardUrlCopied, setCardUrlCopied] = useState(false);

  const handleCardDelete = (e) => {
    e.preventDefault();
    // TODO: remove the card using the cardId... Needs backend route.
    console.log({ cardId });
  };

  return (
    <div className='Card'>
      <div className='Preview'>
        <img
          src={Placeholder}
          alt='This should be the prompt used to generate the image.'
          className='PreviewImage'
        />
      </div>

      <div className='Buttons'>
        <Link to={`/customize/${cardId}`}>
          <EditIcon />
        </Link>

        <a onClick={handleCardDelete}>
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
