// In src/components/CommunityCards.jsx
const CommunityCards = ({ cards }) => {
  return (
    <div className="community-cards">
      {cards.map((card) => (
        <Card key={`${card.rank}${card.suit}`} {...card} width="90px" />
      ))}
    </div>
  );
};