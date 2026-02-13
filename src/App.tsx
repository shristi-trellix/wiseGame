import './App.css';
import { GameProvider } from './context/GameContext';
import GameBoard from './components/GameBoard/GameBoard';

function App() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
}

export default App;
