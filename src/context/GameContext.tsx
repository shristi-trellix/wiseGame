import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { GameState, GameAction, Scenario } from '../types/game';
import { gameReducer, initialGameState } from './gameReducer';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  setScenario: (scenario: Scenario) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const setScenario = useCallback((scenario: Scenario) => {
    dispatch({ type: 'SET_SCENARIO', payload: scenario });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, setScenario }}>
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
