import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
import React, { useState } from 'react';
import { calculateOdds } from 'poker-odds-calculator';

function App() {
  const [odds, setOdds] = useState(null);

  const calculate = () => {
    // Example: Calculate odds for two players
    const playerHands = ['As Ks', 'Qd Qh']; // Player 1: AK suited, Player 2: QQ
    const communityCards = ['Js', 'Ts', '2d']; // Flop: Js Ts 2d
    const iterations = 100000; // Monte Carlo simulations

    const results = calculateOdds(playerHands, communityCards, iterations);
    setOdds(results);
  };

  return (
    <div>
      <h1>Poker Odds Calculator</h1>
      <button onClick={calculate}>Calculate Odds</button>
      {odds && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(odds, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import CardGallery from './components/CardGallery';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div>
      <h1>PokerSolverPro</h1>
      {selectedCard && (
        <div>
          <p>Selected: <img src={`/cards/${selectedCard}.png`} alt="Selected" style={{ height: '40px' }} /></p>
        </div>
      )}
      
      <CardGallery onSelectCard={setSelectedCard} />
    </div>
  );
}
const [searchTerm, setSearchTerm] = useState('');
const filteredRanks = ranks.filter(rank => 
  rank.toLowerCase().includes(searchTerm.toLowerCase())
);
<div className="cards-row">
  <img 
    src="/cards/back.png" 
    alt="Card Back" 
    className="gallery-card"
    onClick={() => onSelectCard('back')}
  />
</div>
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') /* ... */;
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
const [showGallery, setShowGallery] = useState(false);

// In your button/UI:
<button onClick={() => setShowGallery(true)}>Select Card</button>

{showGallery && (
  <div className="modal">
    <CardGallery 
      onSelectCard={(card) => {
        setSelectedCard(card);
        setShowGallery(false);
      }} 
    />
  </div>
)}
import Card from './components/Card';

function App() {
  return (
    <div className="poker-table">
      <Card rank="A" suit="S" />
      <Card rank="10" suit="H" />
      <Card facedown width="100px" />
    </div>
  );
}
import PokerTable from './components/PokerTable';
import BettingControls from './components/BettingControls';
import usePokerGame from './hooks/usePokerGame';

function App() {
  const { game, dealCards } = usePokerGame();

  return (
    <div className="app">
      <PokerTable 
        communityCards={game.communityCards} 
        players={game.players} 
      />
      <BettingControls
        onBet={(amount) => console.log('Bet:', amount)}
        onCheck={() => console.log('Check')}
        onFold={() => console.log('Fold')}
      />
      <button onClick={dealCards}>Deal Cards</button>
    </div>
  );
}
