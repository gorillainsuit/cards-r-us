import React from 'react';
import Card, { CardData } from './Card';

describe('Card', () => {
  it('should render', () => {
    const cardData: CardData = {
      image: {
        src: 'https://picsum.photos/200',
        alt: 'random image',
      },
      color: {
        back: 'red',
        banner: 'green',
      },
      text: {
        front: {
          value: 'front',
          color: 'black',
          position: 'top',
        },
        back: {
          value: 'back',
          color: 'white',
        },
      },
      authorId: '123',
    };

    cy.mount(<Card data={cardData} />);
  });
});
