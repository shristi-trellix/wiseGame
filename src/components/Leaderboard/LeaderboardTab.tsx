import React, { useState } from 'react';
import Leaderboard from './Leaderboard';
import './LeaderboardTab.css';

const LeaderboardTab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="lb-tab-button" onClick={() => setIsOpen(true)}>
        Leaderboard
      </button>

      {isOpen && (
        <div className="lb-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="lb-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lb-modal-close" onClick={() => setIsOpen(false)}>
              &times;
            </button>
            <Leaderboard topN={10} />
          </div>
        </div>
      )}
    </>
  );
};

export default LeaderboardTab;
