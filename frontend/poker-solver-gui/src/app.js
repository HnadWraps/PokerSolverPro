import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card, Spinner, Alert } from 'react-bootstrap';
import './App.css';

function App() {
  // State for solver inputs
  const [ranges, setRanges] = useState({
    hero: 'AA,KK,QQ,JJ,TT',
    villain: 'random'
  });
  const [board, setBoard] = useState('');
  const [gameType, setGameType] = useState('cash');
  const [stacks, setStacks] = useState('1000,1000');
  const [prizes, setPrizes] = useState('100,60,40');
  const [solverConfig, setSolverConfig] = useState({
    maxIterations: 10000,
    convergenceThreshold: 0.01
  });

  // State for results and UI
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('solver');

  // API call to backend
  const runSolver = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ranges,
          board,
          gameType,
          stacks: gameType === 'tournament' ? stacks : undefined,
          prizes: gameType === 'tournament' ? prizes : undefined,
          config: solverConfig
        })
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Example visualization component
  const RangeMatrix = ({ rangeData }) => (
    <div className="range-matrix">
      {rangeData.map((row, i) => (
        <div key={i} className="range-row">
          {row.map((cell, j) => (
            <div 
              key={j} 
              className="range-cell" 
              style={{ backgroundColor: `rgba(0, 100, 255, ${cell})` }}
            />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <Container fluid className="poker-solver-app">
      <Row className="header">
        <Col>
          <h1>Poker Solver Pro</h1>
          <p className="subtitle">Advanced GTO Analysis Tool</p>
        </Col>
      </Row>

      <Row className="main-content">
        <Col md={4} className="input-panel">
          <Card>
            <Card.Header>Solver Inputs</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Hero Range</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={ranges.hero}
                    onChange={(e) => setRanges({...ranges, hero: e.target.value})}
                    placeholder="AA,KK,QQ or 22+,A2s+,K9o+"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Villain Range</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={ranges.villain}
                    onChange={(e) => setRanges({...ranges, villain: e.target.value})}
                    placeholder="random or specific range"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Board</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    placeholder="AsKhQd (leave empty for preflop)"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Game Type</Form.Label>
                  <Form.Select 
                    value={gameType}
                    onChange={(e) => setGameType(e.target.value)}
                  >
                    <option value="cash">Cash Game</option>
                    <option value="tournament">Tournament (ICM)</option>
                  </Form.Select>
                </Form.Group>

                {gameType === 'tournament' && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Stacks</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={stacks}
                        onChange={(e) => setStacks(e.target.value)}
                        placeholder="1000,2000,3000"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Prizes</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={prizes}
                        onChange={(e) => setPrizes(e.target.value)}
                        placeholder="100,60,40"
                      />
                    </Form.Group>
                  </>
                )}

                <Button 
                  variant="primary" 
                  onClick={runSolver}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : 'Solve'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} className="results-panel">
          {error && (
            <Alert variant="danger" className="mt-3">
              Error: {error}
            </Alert>
          )}

          {results ? (
            <Card>
              <Card.Header>Solution Results</Card.Header>
              <Card.Body>
                <div className="results-tabs">
                  <Button 
                    variant={activeTab === 'solver' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('solver')}
                  >
                    Strategy
                  </Button>
                  <Button 
                    variant={activeTab === 'equity' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('equity')}
                  >
                    Equity
                  </Button>
                  <Button 
                    variant={activeTab === 'analysis' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('analysis')}
                  >
                    Analysis
                  </Button>
                </div>

                {activeTab === 'solver' && (
                  <div className="strategy-results">
                    <h4>Optimal Strategy</h4>
                    <RangeMatrix rangeData={results.strategy.matrix} />
                    <pre>{JSON.stringify(results.strategy.summary, null, 2)}</pre>
                  </div>
                )}

                {activeTab === 'equity' && (
                  <div className="equity-results">
                    <h4>Equity Analysis</h4>
                    <p>Hero Equity: {results.equity.hero}%</p>
                    <p>Villain Equity: {results.equity.villain}%</p>
                  </div>
                )}

                {activeTab === 'analysis' && (
                  <div className="analysis-results">
                    <h4>Detailed Analysis</h4>
                    <pre>{JSON.stringify(results.analysis, null, 2)}</pre>
                  </div>
                )}
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body className="empty-state">
                <h4>No Results Yet</h4>
                <p>Configure your solver inputs and click "Solve" to begin analysis</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
function App() {
  return <h1>Poker Solver Pro</h1>;
}
export default App;