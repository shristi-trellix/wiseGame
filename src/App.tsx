import { useState, useEffect } from 'react';
import './App.css';
import { GameProvider } from './context/GameContext';
import { Scenario } from './types/game';
import GameBoard from './components/GameBoard/GameBoard';

function App() {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load scenario data
    fetch('/scenario-david-squiller.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load scenario');
        }
        return response.json();
      })
      .then(data => {
        setScenario(data.scenario);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading scenario:', err);
        setError('Failed to load game scenario');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading Investigation...</div>
      </div>
    );
  }

  if (error || !scenario) {
    return (
      <div className="loading-container">
        <div className="loading-text" style={{ color: 'var(--color-error)' }}>
          {error || 'Failed to load scenario'}
        </div>
      </div>
    );
  }

  return (
    <GameProvider scenario={scenario}>
      <GameBoard />
    </GameProvider>
  );
}

export default App;
