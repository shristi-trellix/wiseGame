import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { TimelineReplay } from '../TimelineReplay/TimelineReplay';
import './ROISummary.css';

const ROISummary: React.FC = () => {
  const { state, scenario } = useGame();
  const [replayComplete, setReplayComplete] = useState(false);

  const reachedConfidenceGoal = state.confidenceScore >= (scenario?.winConditions.minConfidenceScore || 95);
  const reachedTimeGoal = state.timeSaved >= (scenario?.winConditions.minTimeSaved || 12);
  const allQuestionsAnswered =
    state.completedQuestions.length === (scenario?.questions.length || 0);

  const isVictory = reachedConfidenceGoal && reachedTimeGoal && allQuestionsAnswered;

  return (
    <div className="roi-summary">
      <div className="summary-container">
        <div className={`summary-verdict ${isVictory ? 'victory' : 'incomplete'}`}>
          {isVictory ? '🎉 Investigation Complete!' : '⚠️ Investigation Incomplete'}
        </div>

        <h1 className="summary-title">
          {isVictory ? 'Threat Successfully Contained' : 'Additional Analysis Required'}
        </h1>
      </div>

      {/* Timeline Replay - Full Width */}
      {scenario && (
        <TimelineReplay
          state={state}
          scenario={scenario}
          onComplete={() => setReplayComplete(true)}
        />
      )}

      <div className="summary-container">
        <div
          className="summary-metrics"
          style={{
            animationDelay: replayComplete ? '0.5s' : '999s',
          }}
        >
          <div className="metric-card">
            <div className="metric-label">Confidence Score</div>
            <div className={`metric-value ${reachedConfidenceGoal ? 'success' : 'warning'}`}>
              {state.confidenceScore}%
            </div>
            <div className="metric-goal">
              Goal: {scenario?.winConditions.minConfidenceScore || 95}%
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Time Saved</div>
            <div className={`metric-value ${reachedTimeGoal ? 'success' : 'warning'}`}>
              {state.timeSaved.toFixed(1)} min
            </div>
            <div className="metric-goal">Goal: {scenario?.winConditions.minTimeSaved || 12} min</div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Questions Answered</div>
            <div className={`metric-value ${allQuestionsAnswered ? 'success' : 'warning'}`}>
              {state.completedQuestions.length}/{scenario?.questions.length || 0}
            </div>
            <div className="metric-goal">All questions required</div>
          </div>
        </div>

        {isVictory && (
          <div className="remediation-summary">
            <h3>Automated Remediation Actions Executed:</h3>
            <ul>
              <li>✓ Isolated dsquiller-finance-pc from network</li>
              <li>✓ Disabled Active Directory account for david.squiller</li>
              <li>✓ Revoked all active session tokens</li>
              <li>✓ Forced password reset with MFA re-enrollment</li>
              <li>✓ Blocked IP 178.23.145.92 at perimeter firewall</li>
              <li>✓ Initiated forensic imaging of endpoint</li>
              <li>✓ Notified Sales leadership and IR team</li>
            </ul>
          </div>
        )}

        <button
          className="replay-button"
          onClick={() => window.location.reload()}
        >
          {isVictory ? 'Investigate Another Case' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};

export default ROISummary;
