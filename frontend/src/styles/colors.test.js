import './colors.css';

describe('Color Variables', () => {
  test('--chip-1 equals #3b82f6', () => {
    const root = document.documentElement;
    const value = getComputedStyle(root)
      .getPropertyValue('--chip-1')
      .trim();
    expect(value).toBe('#3b82f6');
  });
});