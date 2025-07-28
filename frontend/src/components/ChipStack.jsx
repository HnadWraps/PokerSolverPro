import { motion } from 'framer-motion';

const ChipStack = ({ count = 0, value = 100, position = 0 }) => {
  // Chip colors based on denomination
  const chipColor = {
    1: 'bg-blue-500',
    5: 'bg-red-500',
    25: 'bg-green-500',
    100: 'bg-black',
    500: 'bg-purple-500'
  }[value] || 'bg-gray-400';

  return (
    <motion.div 
      className="relative"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        delay: position * 0.05,
        type: "spring",
        damping: 10
      }}
    >
      {/* Individual chips in stack */}
      {[...Array(Math.min(count, 10))].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-8 h-8 rounded-full border-2 border-white ${chipColor}`}
          style={{
            bottom: `${i * 2}px`,
            left: `${Math.sin(i) * 2}px`, // Natural stack variance
            zIndex: i
          }}
          whileHover={{ y: -5 }}
        />
      ))}
      
      {/* Stack count badge */}
      {count > 10 && (
        <motion.div 
          className="absolute -top-2 -right-2 bg-yellow-500 text-xs rounded-full w-5 h-5 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          +{count - 10}
        </motion.div>
      )}
    </motion.div>
  );
};
// In ChipStack.jsx
<motion.div
  whileTap={{ y: -20 }}
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  onDragEnd={() => console.log('Chip dragged')}
/>
import './ChipStack.css';

function ChipStack() {
  return (
    <div className="chip-shadow">
      <div className="chip chip-25" /> 
    </div>
  );
}
function ChipStack({ value, count }) {
  return (
    <div 
      data-testid={`chip-${value}`}
      className={`chip chip-${value}`}
      style={{ 
        backgroundColor: `var(--chip-${value})`,
        // ...other styles
      }}
    >
      {/* ... */}
    </div>
  );
}