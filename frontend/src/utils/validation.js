// utils/validation.js
export const isValidBet = (bet, currentBet, playerChips) => {
  return bet >= currentBet && bet <= playerChips;
}