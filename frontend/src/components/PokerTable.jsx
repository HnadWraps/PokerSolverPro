import Card from './Card';

const PokerTable = ({ communityCards, players }) => {
  return (
    <div className="poker-table">
      {/* Community Cards */}
      <div className="community-cards">
        {communityCards.map((card, i) => (
          <Card key={i} {...card} />
        ))}
      </div>

      {/* Player Seats */}
      {players.map((player, index) => (
        <PlayerSeat key={index} position={index} {...player} />
      ))}
    </div>
  );
};
import AnimatedCard from './AnimatedCard';

const PokerTable = ({ communityCards, players }) => {
  return (
    <div className="poker-table">
      {/* Animated Community Cards */}
      <div className="community-cards">
        {communityCards.map((card, index) => (
          <AnimatedCard 
            key={`community-${index}`}
            {...card}
            delay={index * 0.1} // Staggered animation
          />
        ))}
      </div>

      {/* Animated Player Cards */}
      {players.map((player) => (
        <div key={player.id} className="player-hand">
          {player.cards.map((card, index) => (
            <AnimatedCard
              key={`player-${player.id}-card-${index}`}
              {...card}
              delay={0.3 + index * 0.1} // Deal after community cards
              facedown={!player.isActive}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
// In your PokerTable.jsx
const [burnedCards, setBurnedCards] = useState([]);

const burnCard = () => {
  const newCard = { id: Date.now() };
  setBurnedCards([newCard]);
  setTimeout(() => setBurnedCards([]), 1000);
};

return (
  <div className="relative">
    {burnedCards.map(card => (
      <BurningCard 
        key={card.id} 
        onComplete={() => console.log('Burn complete')}
      />
    ))}
  </div>
);