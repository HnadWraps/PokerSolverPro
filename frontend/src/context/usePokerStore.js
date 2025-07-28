// src/store/usePokerStore.js
import { create } from 'zustand';

export const usePokerStore = create((set) => ({
  players: [],
  pot: 0,
  addToPot: (amount) => set(state => ({ pot: state.pot + amount })),
}));