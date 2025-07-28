# Poker UI Style Guide

## CSS Architecture

### 1. Global Styles
Location: `src/styles/global.css`
```css
/* Variables */
:root {
  --chip-1: #3b82f6;    /* $1 chips */
  --felt-green: #0a5c36; /* Table color */
}

/* Animations */
@keyframes card-deal {
  0% { transform: translateY(-50px); opacity: 0; }
}
## Color Palette

### Chips
| Denomination | Hex      | CSS Variable  | Usage Example          |
|--------------|----------|---------------|------------------------|
| $1           | `#3b82f6`| `--chip-1`    | Low-value bets         |
| $5           | `#ef4444`| `--chip-5`    | Medium bets            |
| $25          | `#10b981`| `--chip-25`   | High bets              |
| $100         | `#000000`| `--chip-100`  | VIP tables             |

### Table
| Element      | Hex      | CSS Variable      | Usage                 |
|--------------|----------|-------------------|-----------------------|
| Felt         | `#0a5c36`| `--felt-green`    | Play surface          |
| Rail         | `#2a2118`| `--table-rail`    | Table edges           |
| Accent       | `#d4af37`| `--accent-gold`   | Decorations, text     |