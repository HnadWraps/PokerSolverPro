<motion.div
  className="absolute inset-0"
  animate={{
    background: [
      'radial-gradient(circle, transparent 0%, #000 100%)',
      'radial-gradient(circle, #ff6b00 0%, #000 100%)',
      'radial-gradient(circle, transparent 0%, #000 100%)'
    ],
    opacity: [0, 0.8, 0]
  }}
/>import './BurningCard.css';

function BurningCard() {
  return (
    <div className="burn-particle" 
      style={{ '--drift-x': `${randomX}px`, '--drift-y': `${randomY}px` }}
    />
  );
}