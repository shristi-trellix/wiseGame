import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { GameProvider } from './context/GameContext';
import { PlayerProvider } from './context/PlayerContext';
import GameBoard from './components/GameBoard/GameBoard';
import AdminPanel from './components/Admin/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <GameProvider>
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<GameBoard />} />
          </Routes>
        </GameProvider>
      </PlayerProvider>
    </BrowserRouter>
  );
}

export default App;
