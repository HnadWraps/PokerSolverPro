export const cardAnimations = {
  // Card dealing animation (from dealer to position)
  deal: {
    hidden: { 
      x: -100, 
      y: -50, 
      rotate: -45,
      opacity: 0 
    },
    visible: { 
      x: 0, 
      y: 0, 
      rotate: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  },

  // Card flip animation (for revealing)
  flip: {
    hidden: { 
      rotateY: 180,
      opacity: 0.5 
    },
    visible: { 
      rotateY: 0,
      opacity: 1,
      transition: { 
        duration: 0.6 
      } 
    }
  },

  // Shuffling animation
  shuffle: {
    hidden: { x: 0 },
    visible: (i) => ({
      x: [0, 20, -20, 10, -10, 0],
      transition: {
        delay: i * 0.1,
        repeat: Infinity,
        duration: 0.8
      }
    })
  },

  // Winning hand highlight
  win: {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.1, 1],
      boxShadow: ["0 0 0px rgba(255,215,0,0)", "0 0 20px rgba(255,215,0,0.8)"],
      transition: {
        duration: 0.8,
        repeat: Infinity
      }
    }
  }
};

// Animation presets for different scenarios
export const animationPresets = {
  initialDeal: {
    type: "deal",
    stagger: 0.1
  },
  revealHand: {
    type: "flip",
    stagger: 0.3
  },
  showdown: {
    type: "win",
    delay: 0.5
  }
};