export const playSound = (type) => {
  const sounds = {
    deal: '/sounds/card-deal.mp3',
    chip: '/sounds/chip-stack.wav',
    win: '/sounds/victory.mp3'
  };
  new Audio(sounds[type]).play();
};