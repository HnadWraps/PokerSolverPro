import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChipStack from '../ChipStack';

describe('ChipStack Component', () => {
  test('renders $1 chip with correct blue color', () => {
    render(<ChipStack value={1} count={3} />);
    
    const chip = screen.getByTestId('chip-1');
    expect(chip).toBeInTheDocument();
    expect(getComputedStyle(chip).backgroundColor).toBe('rgb(59, 130, 246)'); // --chip-1
  });

  test('$5 chips use correct red color', () => {
    render(<ChipStack value={5} count={2} />);
    expect(getComputedStyle(screen.getByTestId('chip-5')).backgroundColor)
      .toBe('rgb(239, 68, 68)'); // --chip-5
  });
});