// In src/utils/pokerLogic.js
export const calculateHandOdds = (playerCards, communityCards, opponentCount = 1) => {
  // Integrate with poker-odds-calculator
  const results = calculateOdds(
    [playerCards.map(c => `${c.rank}${c.suit}`).join(' ')],
    communityCards.map(c => `${c.rank}${c.suit}`),
    100000 // Monte Carlo simulations
  );
  return results;
};