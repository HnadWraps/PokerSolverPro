// Optional: Extend expect with style matchers
expect.extend({
  toHaveStyleRule(received, property, value) {
    const style = getComputedStyle(received);
    const actual = style.getPropertyValue(property);
    return actual === value ? {
      pass: true,
      message: () => `Expected ${property} not to be ${value}`
    } : {
      pass: false,
      message: () => `Expected ${property}: ${value}, received ${actual}`
    };
  }
});
// Setup for Jest DOM extensions
import '@testing-library/jest-dom';

// Optional: Custom matchers
expect.extend({
  toHaveChipColor(received, expectedValue) {
    const expectedColor = {
      1: 'rgb(59, 130, 246)',    // $1 blue
      5: 'rgb(239, 68, 68)',     // $5 red
      25: 'rgb(16, 185, 129)',   // $25 green
      100: 'rgb(0, 0, 0)'        // $100 black
    }[expectedValue];

    const actualColor = getComputedStyle(received).backgroundColor;
    return actualColor === expectedColor ? {
      pass: true,
      message: () => `Expected chip not to be ${expectedColor}`
    } : {
      pass: false,
      message: () => `Expected ${expectedValue} chip (${expectedColor}), got ${actualColor}`
    };
  }
});
import '@testing-library/jest-dom'; // Adds .toHaveStyle() etc.
import 'jest-axe/extend-expect'; // For accessibility tests
// Mock CSS modules
jest.mock('^.+\\.module\\.(css|scss)$', () => ({
  __esModule: true,
  default: new Proxy({}, {
    get: (_, className) => className // Return class name as-is
  })
}));
// Poker-specific test helpers
global.getChipColor = (value) => ({
  1: 'var(--chip-1)',
  5: 'var(--chip-5)',
  25: 'var(--chip-25)',
  100: 'var(--chip-100)'
}[value]);
// In ChipStack.test.js
test('$25 chip uses correct green', () => {
  render(<ChipStack value={25} />);
  const chip = screen.getByTestId('chip-25');
  
  // Using custom matcher
  expect(chip).toHaveChipColor(25);
  
  // Alternative standard method
  expect(chip).toHaveStyle({
    backgroundColor: 'rgb(16, 185, 129)'
  });
});
global.dealTestHand = () => mockHand;
// Temporary test in setup file
console.log('Test setup loaded - poker colors ready!');
// src/setupTests.js
global.mockHands = {
  royalFlush: [
    { rank: 'A', suit: 'S' },
    { rank: 'K', suit: 'S' }
  ],
  fullHouse: [
    { rank: '8', suit: 'H' },
    { rank: '8', suit: 'D' }
  ],
  // Add more as needed
};

global.dealTestHand = (handType = 'royalFlush') => {
  return global.mockHands[handType];
};
test('shows royal flush animation', () => {
  const testHand = dealTestHand('royalFlush');
  render(<PlayerHand cards={testHand} />);
  expect(screen.getByText('Royal Flush')).toBeInTheDocument();
});
// src/setupTests.js
expect.extend({
  toHaveChipValue(received, expectedValue) {
    const chipColors = {
      1: 'rgb(59, 130, 246)',   // $1 blue
      5: 'rgb(239, 68, 68)',    // $5 red
      25: 'rgb(16, 185, 129)',  // $25 green
      100: 'rgb(0, 0, 0)',      // $100 black
      500: 'rgb(139, 92, 246)'  // $500 purple
    };

    const actualColor = getComputedStyle(received).backgroundColor;
    const expectedColor = chipColors[expectedValue];

    return {
      pass: actualColor === expectedColor,
      message: () => 
        `Expected ${expectedValue} chip (${expectedColor})\n` +
        `Received: ${actualColor}`
    };
  }
});
test('$500 chips show purple', () => {
  render(<ChipStack value={500} />);
  expect(screen.getByTestId('chip')).toHaveChipValue(500);
});
// src/setupTests.js
global.calculateTablePosition = (playerCount, playerIndex) => {
  const positions = [
    { top: '80%', left: '50%' },  // Bottom (You)
    { top: '20%', left: '50%' },   // Top
    { top: '50%', left: '10%' },   // Left
    { top: '50%', left: '90%' }    // Right
  ];
  return positions[playerIndex % playerCount];
};
test('positions 4 players correctly', () => {
  const position = calculateTablePosition(4, 2); // 3rd player
  expect(position).toEqual({ top: '50%', left: '10%' });
});
import '@testing-library/jest-dom';

// 1. Mock Poker Hands
global.mockHands = { /* ... */ };
global.dealTestHand = (handType) => { /* ... */ };

// 2. Chip Assertions
expect.extend({ 
  toHaveChipValue(received, expectedValue) { /* ... */ }
});

// 3. Table Positioning
global.calculateTablePosition = (playerCount, playerIndex) => { /* ... */ };

// Poker-specific mocks
jest.mock('../utils/pokerEngine', () => ({
  calculateOdds: jest.fn(() => 0.75)
}));