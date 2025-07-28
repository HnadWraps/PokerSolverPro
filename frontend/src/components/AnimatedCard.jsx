import { motion } from 'framer-motion';
import Card from './Card';

const AnimatedCard = ({ 
  rank, 
  suit, 
  facedown = false, 
  delay = 0,
  animationType = 'deal'
}) => {
  // Animation variants
  const animations = {
    deal: {
      hidden: { rotate: -90, y: -100, opacity: 0 },
      visible: { rotate: 0, y: 0, opacity: 1 }
    },
    flip: {
      hidden: { rotateY: 180 },
      visible: { rotateY: 0 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animations[animationType]}
      transition={{ 
        type: 'spring', 
        stiffness: 500,
        damping: 15,
        delay 
      }}
      whileHover={{ y: -10 }}
    >
      <Card rank={rank} suit={suit} facedown={facedown} />
    </motion.div>
  );
};

export default AnimatedCard;
import { motion } from 'framer-motion';
import { cardAnimations } from '../animations/cardAnimations';

const AnimatedCard = ({
  rank,
  suit,
  facedown = false,
  animation = 'deal',
  custom = 0, // Used for stagger/index
  ...props
}) => {
  const getAnimation = () => {
    if (typeof animation === 'string') {
      return cardAnimations[animation] || cardAnimations.deal;
    }
    return animation; // Allow custom animation objects
  };

  return (
    <motion.div
      custom={custom}
      initial="hidden"
      animate="visible"
      variants={getAnimation()}import { AnimatePresence } from 'framer-motion';
import { animationPresets } from '../animations/cardAnimations';

const DealingArea = ({ cards }) => (
  <AnimatePresence>
    {cards.map((card, index) => (
      <AnimatedCard
        key={card.id}
        {...card}
        animation={animationPresets.initialDeal}
        custom={index} // Uses for stagger delay
      />
    ))}
  </AnimatePresence>
);
const FlopCards = ({ cards }) => (
  <>
    {cards.map((card, index) => (
      <AnimatedCard
        key={`flop-${index}`}
        {...card}
        animation={{
          ...cardAnimations.flip,
          transition: { delay: index * 0.2 }
        }}
      />
    ))}
  </>
);
const WinningHand = ({ cards }) => (
  <div className="winning-hand">
    {cards.map(card => (
      <AnimatedCard
        key={`winner-${card.id}`}
        {...card}
        animation="win"
      />
    ))}
  </div>
);
// In your game hook
const [animationState, setAnimationState] = useState({
  type: 'deal',
  isAnimating: false
});

const runAnimation = (type) => {
  setAnimationState({ type, isAnimating: true });
  setTimeout(() => setAnimationState(prev => ({ ...prev, isAnimating: false })), 1000);
};
const sequence = [
  { type: 'deal', delay: 0 },
  { type: 'flip', delay: 1 },
  { type: 'win', delay: 2 }
];

sequence.forEach(({ type, delay }) => {
  setTimeout(() => runAnimation(type), delay * 1000);
});
const ANIMATION_TYPES = {
  // ... existing animations ...
  
  burn: {
    hidden: { 
      opacity: 1,
      scale: 1 
    },
    visible: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(5px)",
      transition: {
        duration: 0.6,
        ease: "easeIn"
      }
    }
  }
};

// New burn component
export const BurningCard = ({ onComplete }) => {
  return (
    <motion.div
      variants={ANIMATION_TYPES.burn}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}
      className="absolute"
      style={{
        originX: 0.5,
        originY: 0.5,
        zIndex: 100
      }}
    >
      <Card facedown />
      <motion.div 
        className="absolute inset-0 bg-orange-500 rounded-lg mix-blend-multiply"
        animate={{ opacity: [0, 0.8, 0] }}
      />
    </motion.div>
  );
};

      whileHover={{ y: -10 }}
      {...props}
    >
      <Card rank={rank} suit={suit} facedown={facedown} />
    </motion.div>
  );
};
