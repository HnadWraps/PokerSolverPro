import React from 'react';

const suits = ['S', 'H', 'D', 'C']; // Spades, Hearts, Diamonds, Clubs
const ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

const CardGallery = ({ onSelectCard }) => {
  return (
    <div className="card-gallery">
      <h2>Card Gallery</h2>
      <div className="cards-grid">
        {suits.map((suit) => (
          <div key={suit} className="suit-group">
            <h3>{getSuitName(suit)}</h3>
            <div className="cards-row">
              {ranks.map((rank) => (
                <img
                  key={`${rank}${suit}`}
                  src={`/cards/${rank}${suit}.png`}
                  alt={`${rank} of ${getSuitName(suit)}`}
                  className="gallery-card"
                  onClick={() => onSelectCard(`${rank}${suit}`)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper: Convert suit codes to names
const getSuitName = (suit) => {
  switch (suit) {
    case 'S': return 'Spades ♠';
    case 'H': return 'Hearts ♥';
    case 'D': return 'Diamonds ♦';
    case 'C': return 'Clubs ♣';
    default: return '';
  }
};

export default CardGallery;