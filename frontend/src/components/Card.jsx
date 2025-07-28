import React from 'react';
import './Card.css'; // We'll create this next

const SuitIcon = ({ suit }) => {
  const suitSymbols = {
    S: '♠',
    H: '♥',
    D: '♦',
    C: '♣'
  };
  return <span className={`suit-icon ${suit.toLowerCase()}`}>{suitSymbols[suit]}</span>;
};

const Card = ({ rank, suit, facedown = false, width = '80px' }) => {
  return (
    <div className="card-container" style={{ width }}>
      {!facedown && (
        <>
          <div className="card-corner top-left">
            <span className="card-rank">{rank}</span>
            <SuitIcon suit={suit} />
          </div>
          <div className="card-corner bottom-right">
            <span className="card-rank">{rank}</span>
            <SuitIcon suit={suit} />
          </div>
        </>
      )}
      <img 
        src={`/cards/${facedown ? 'back' : `${rank}${suit}`}.png`} 
        alt={facedown ? 'Card Back' : `${rank} of ${suit}`}
        className="card-image"
      />
    </div>
  );
};

export default Card;
<motion.div
  initial={{ rotate: -90, y: -100 }}
  animate={{ rotate: 0, y: 0 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  <Card {...card} />
</motion.div>