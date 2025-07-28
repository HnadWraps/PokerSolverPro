const PlayerSeat = ({ position, name, chips, cards, isActive }) => {
  const positions = [
    { top: '10%', left: '50%' },  // Top
    { top: '50%', right: '5%' },   // Right
    { bottom: '10%', left: '50%' }, // Bottom
    { top: '50%', left: '5%' }      // Left
  ];

  return (
    <div 
      className={`player-seat ${isActive ? 'active' : ''}`}
      style={positions[position % 4]}
    >
      <div className="player-info">
        <span>{name}</span>
        <span>Chips: {chips}</span>
      </div>
      <div className="player-hand">
        {cards.map((card, i) => (
          <Card key={i} {...card} width="60px" />
        ))}
      </div>
    </div>
  );
};