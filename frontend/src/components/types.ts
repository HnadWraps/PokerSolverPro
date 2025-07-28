interface CardProps {
  rank: string;
  suit: 'S' | 'H' | 'D' | 'C';
  facedown?: boolean;
  width?: string;
  onClick?: () => void;
}