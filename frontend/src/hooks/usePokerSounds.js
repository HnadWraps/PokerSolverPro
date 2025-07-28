export const usePokerSounds = () => {
  const play = (type) => {
    const sounds = {
      chip: '/sounds/chip-stack.wav',
      burn: '/sounds/card-burn.mp3'
    };
    new Audio(sounds[type]).play();
  };

  return { play };
};

// Usage in components:
const { play } = usePokerSounds();
play('chip'); // When chips are added
play('burn'); // When burning cards