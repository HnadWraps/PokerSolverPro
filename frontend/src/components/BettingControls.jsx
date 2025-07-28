// In your BettingControls.jsx
const [bets, setBets] = useState([]);

const addBet = (amount) => {
  setBets(prev => [
    ...prev,
    { id: Date.now(), value: amount, x: Math.random() * 100 }
  ]);
};

return (
  <div className="relative">
    {/* Chip stacks */}
    {bets.map((bet, i) => (
      <motion.div
        key={bet.id}
        initial={{ x: -50, y: -20 }}
        animate={{ x: bet.x, y: 0 }}
      >
        <ChipStack 
          count={Math.floor(bet.value / 25)} 
          value={25}
          position={i}
        />
      </motion.div>
    ))}
  </div>
);