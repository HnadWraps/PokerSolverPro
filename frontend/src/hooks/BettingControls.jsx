const BettingControls = ({ onBet, onFold, onCheck }) => {
  const [betAmount, setBetAmount] = useState(0);

  return (
    <div className="betting-controls">
      <input 
        type="range" 
        min="0" 
        max="1000" 
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
      />
      <span>${betAmount}</span>
      <button onClick={() => onBet(betAmount)}>Bet</button>
      <button onClick={onCheck}>Check</button>
      <button onClick={onFold}>Fold</button>
    </div>
  );
};