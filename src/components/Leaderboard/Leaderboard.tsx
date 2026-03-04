import React, { useState, useEffect } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { isAmplifyConfigured } from '../../lib/amplify';
import { subscribeToLeaderboard, getPlayerRank, LeaderboardEntry } from '../../lib/amplifyService';
import './Leaderboard.css';

interface LeaderboardProps {
  topN?: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ topN = 10 }) => {
  const { player } = usePlayer();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [playerRank, setPlayerRank] = useState<number>(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAmplifyConfigured()) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToLeaderboard(topN, (newEntries) => {
      setEntries(newEntries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [topN]);

  // Get current player's rank if not in top N
  useEffect(() => {
    if (!isAmplifyConfigured() || !player) return;

    const isInTopN = entries.some((e) => e.playerId === player.id);
    if (!isInTopN && player.id) {
      getPlayerRank(player.id).then(setPlayerRank).catch(() => setPlayerRank(-1));
    } else {
      setPlayerRank(-1);
    }
  }, [entries, player]);

  if (loading) {
    return (
      <div className="leaderboard">
        <div className="lb-loading">Loading leaderboard...</div>
      </div>
    );
  }

  if (!isAmplifyConfigured()) {
    return (
      <div className="leaderboard">
        <div className="lb-offline">Leaderboard unavailable offline</div>
      </div>
    );
  }

  const trophies = ['', '🥇', '🥈', '🥉'];

  return (
    <div className="leaderboard">
      <h2 className="lb-title">Leaderboard</h2>

      {entries.length === 0 ? (
        <div className="lb-empty">No scores yet. Be the first!</div>
      ) : (
        <div className="lb-table">
          <div className="lb-header-row">
            <span className="lb-col-rank">Rank</span>
            <span className="lb-col-name">Player</span>
            <span className="lb-col-company">Company</span>
            <span className="lb-col-score">Score</span>
          </div>

          {entries.map((entry) => {
            const isCurrentPlayer = player && entry.playerId === player.id;
            return (
              <div
                key={entry.playerId}
                className={`lb-row ${isCurrentPlayer ? 'lb-row-current' : ''} ${entry.rank <= 3 ? 'lb-row-top3' : ''}`}
              >
                <span className="lb-col-rank">
                  {entry.rank <= 3 ? trophies[entry.rank] : `#${entry.rank}`}
                </span>
                <span className="lb-col-name">
                  {entry.playerName}
                  {isCurrentPlayer && <span className="lb-you-badge">You</span>}
                </span>
                <span className="lb-col-company">{entry.company}</span>
                <span className="lb-col-score">{entry.combinedScore.toLocaleString()}</span>
              </div>
            );
          })}

          {/* Show current player's rank if outside top N */}
          {playerRank > 0 && playerRank > topN && player && (
            <>
              <div className="lb-separator">...</div>
              <div className="lb-row lb-row-current">
                <span className="lb-col-rank">#{playerRank}</span>
                <span className="lb-col-name">
                  {player.firstName} {player.lastName.charAt(0)}.
                  <span className="lb-you-badge">You</span>
                </span>
                <span className="lb-col-company">{player.company}</span>
                <span className="lb-col-score">{(player as any).combinedScore?.toLocaleString() || '0'}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
