import React from 'react';
import styles from './Card.module.scss';

export interface CardData {
  image: {
    src: string;
    alt: string;
  };
  color: {
    back: string;
    front: string;
    banner?: string;
    texture?: string;
  };
  text: {
    front: {
      value: string;
      color: string;
      position: 'top' | 'middle' | 'bottom';
    };
    back: {
      value: string;
      color: string;
    };
  };
}

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [flipped, setFlipped] = React.useState(false);
  const [pivotDisabled, setPivotDisabled] = React.useState(false);
  const [xPivot, setXPivot] = React.useState(0);
  const [yPivot, setYPivot] = React.useState(0);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (pivotDisabled) return;

    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const offsetX = clientX - left;
    const offsetY = clientY - top;

    const rY = 50 * (offsetX / width - 0.5);
    const rX = 50 * (offsetY / height - 0.5);

    setXPivot(rX);
    setYPivot(rY);
  };

  const handleClick = () => {
    setFlipped((flipped) => !flipped);
    setXPivot(0);
    setYPivot(0);
    setPivotDisabled(true);
    setTimeout(() => setPivotDisabled(false), 700);
  };

  const handlePointerLeave = () => {
    setXPivot(0);
    setYPivot(0);
  };

  const yRotation = yPivot + (flipped ? 180 : 0);
  const xRotation = xPivot * (flipped ? 1 : -1);

  const frontBannerPosition = {
    top: '12%',
    middle: '42%',
    bottom: '75%',
  }[data.text.front.position];

  return (
    <div className={styles.outer}>
      <div
        className={styles.inner}
        style={{
          transform: `rotateY(${yRotation}deg) rotateX(${xRotation}deg)`,
        }}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}>
        <div className={styles.front}>
          <div
            className={styles.banner}
            style={{
              backgroundColor: data.color.banner || 'transparent',
              top: frontBannerPosition,
            }}>
            <h2 style={{ color: data.text.front.color }}>
              {data.text.front.value}
            </h2>
          </div>
          <img
            src={data.image.src}
            alt={data.image.alt}
            className={styles.image}
          />
        </div>
        <div className={styles.back}>back</div>
      </div>
    </div>
  );
};

export default Card;
