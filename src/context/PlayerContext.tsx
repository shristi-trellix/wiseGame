import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { isAmplifyConfigured } from '../lib/amplify';
import { PlayerData, getPlayerById, createPlayer, getPlayerByEmail } from '../lib/amplifyService';

const STORAGE_KEY = 'wiseGame_playerId';

interface PlayerContextType {
  player: PlayerData | null;
  isRegistered: boolean;
  isLoading: boolean;
  registerPlayer: (data: { firstName: string; lastName: string; email: string; company: string }) => Promise<PlayerData>;
  refreshPlayer: () => Promise<void>;
  logout: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check localStorage for existing player ID
  useEffect(() => {
    const loadPlayer = async () => {
      if (!isAmplifyConfigured()) {
        setIsLoading(false);
        return;
      }

      const storedId = localStorage.getItem(STORAGE_KEY);
      if (storedId) {
        try {
          const existing = await getPlayerById(storedId);
          if (existing) {
            setPlayer(existing);
          } else {
            // Player was deleted (admin reset), clear localStorage
            localStorage.removeItem(STORAGE_KEY);
          }
        } catch (err) {
          console.warn('Failed to load player:', err);
        }
      }
      setIsLoading(false);
    };

    loadPlayer();
  }, []);

  const registerPlayer = useCallback(async (data: { firstName: string; lastName: string; email: string; company: string }) => {
    if (!isAmplifyConfigured()) {
      // Offline mode: create local-only player
      const localPlayer: PlayerData = {
        id: `local-${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        createdAt: new Date().toISOString(),
        lastPlayedAt: new Date().toISOString(),
        bestScores: { 'david-squiller-case': null, 'plc-hijacking-manufacturing': null },
        combinedScore: 0,
        totalPlays: 0,
      };
      setPlayer(localPlayer);
      localStorage.setItem(STORAGE_KEY, localPlayer.id);
      return localPlayer;
    }

    // Check if player with this email already exists
    const existing = await getPlayerByEmail(data.email);
    if (existing) {
      setPlayer(existing);
      localStorage.setItem(STORAGE_KEY, existing.id);
      return existing;
    }

    // Create new player
    const newPlayer = await createPlayer(data);
    setPlayer(newPlayer);
    localStorage.setItem(STORAGE_KEY, newPlayer.id);
    return newPlayer;
  }, []);

  const refreshPlayer = useCallback(async () => {
    if (!player || !isAmplifyConfigured()) return;
    try {
      const updated = await getPlayerById(player.id);
      if (updated) setPlayer(updated);
    } catch (err) {
      console.warn('Failed to refresh player:', err);
    }
  }, [player]);

  const logout = useCallback(() => {
    setPlayer(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <PlayerContext.Provider value={{
      player,
      isRegistered: !!player,
      isLoading,
      registerPlayer,
      refreshPlayer,
      logout,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
