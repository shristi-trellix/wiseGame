import React, { useState, useEffect } from 'react';
import { ScoreBreakdown } from '../../types/game';
import './ScoreDisplay.css';

interface ScoreDisplayProps {
  scoreBreakdown: ScoreBreakdown;
  scenarioId: string;
}

function useCountUp(target: number, duration: number = 1200, delay: number = 0): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return value;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ scoreBreakdown, scenarioId }) => {
  const accuracy = useCountUp(scoreBreakdown.accuracyScore, 1200, 300);
  const speed = useCountUp(scoreBreakdown.speedScore, 1200, 600);
  const raw = useCountUp(scoreBreakdown.rawScore, 1200, 900);
  const final = useCountUp(scoreBreakdown.finalScore, 1500, 1200);

  const isHard = scenarioId === 'plc-hijacking-manufacturing';
  const completionSeconds = Math.round(scoreBreakdown.completionTimeMs / 1000);
  const minutes = Math.floor(completionSeconds / 60);
  const seconds = completionSeconds % 60;

  // Per-question accuracy dots
  const questionIds = Object.keys(scoreBreakdown.questionResults).sort();

  return (
    <div className="score-display">
      <h2 className="score-title">Your Score</h2>

      <div className="score-grid">
        <div className="score-card accuracy">
          <div className="score-card-label">Accuracy</div>
          <div className="score-card-value">{accuracy}</div>
          <div className="score-card-max">/ 700</div>
        </div>

        <div className="score-card speed">
          <div className="score-card-label">Speed</div>
          <div className="score-card-value">{speed}</div>
          <div className="score-card-max">/ 300</div>
        </div>

        <div className="score-card base">
          <div className="score-card-label">Base Score</div>
          <div className="score-card-value">{raw}</div>
          <div className="score-card-max">/ 1000</div>
        </div>

        {isHard && (
          <div className="score-card multiplier">
            <div className="score-card-label">Multiplier</div>
            <div className="score-card-value multiplier-value">x{scoreBreakdown.multiplier}</div>
            <div className="score-card-max">Hard Mode</div>
          </div>
        )}
      </div>

      <div className="score-final">
        <div className="score-final-label">Final Score</div>
        <div className="score-final-value">{final}</div>
        <div className="score-final-max">/ {isHard ? '2000' : '1000'}</div>
      </div>

      <div className="score-details">
        <div className="score-time">
          Completed in {minutes > 0 ? `${minutes}m ` : ''}{seconds}s
        </div>

        <div className="score-questions">
          {questionIds.map((qId) => {
            const result = scoreBreakdown.questionResults[qId];
            const wrongCount = result.wrongGuesses;
            let dotClass = 'dot-perfect'; // 0 wrong
            if (wrongCount === 1) dotClass = 'dot-good';
            else if (wrongCount === 2) dotClass = 'dot-struggled';
            else if (wrongCount >= 3) dotClass = 'dot-brute';

            return (
              <div key={qId} className="question-dot-wrapper" title={`Q${qId.replace('q', '')}: ${wrongCount} wrong guesses`}>
                <div className={`question-dot ${dotClass}`} />
                <span className="question-dot-label">Q{qId.replace('q', '')}</span>
              </div>
            );
          })}
        </div>

        <div className="score-legend">
          <span className="legend-item"><span className="legend-dot dot-perfect" /> First try</span>
          <span className="legend-item"><span className="legend-dot dot-good" /> 1 wrong</span>
          <span className="legend-item"><span className="legend-dot dot-struggled" /> 2 wrong</span>
          <span className="legend-item"><span className="legend-dot dot-brute" /> 3+ wrong</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
