// In src/components/PlayerHand.jsx
import Card from './Card';

const PlayerHand = ({ cards, onCardClick }) => {
  return (
    <div className="player-hand">
      {cards.map((card, index) => (
        <Card
          key={`${card.rank}${card.suit}`}
          rank={card.rank}
          suit={card.suit}
          onClick={() => onCardClick(index)}
          width="100px"
        />
      ))}
    </div>
  );
};