import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameAction, Scenario } from '../types/game';
import { gameReducer, initialGameState } from './gameReducer';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  scenario: Scenario | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
  scenario: Scenario;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children, scenario }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameContext.Provider value={{ state, dispatch, scenario }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
