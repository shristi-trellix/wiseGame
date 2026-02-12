import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { GameState, Scenario, TimelineEvent } from '../../types/game';
import { TimelineNode } from './TimelineNode';
import { TimelineConnector } from './TimelineConnector';
import './TimelineReplay.css';

interface TimelineReplayProps {
  state: GameState;
  scenario: Scenario;
  onComplete?: () => void;
}

// Extract first sentence from answer text (handling IPs and file extensions)
const extractKeyFinding = (text: string): string => {
  // Find first sentence ending: period followed by space (or end of string)
  // This properly handles IPs (178.23.145.92) and file extensions (.exe)
  const match = text.match(/^.+?\.\s+/);

  if (match) {
    const sentence = match[0].trim();
    // Limit to 180 chars if still too long
    return sentence.length > 180 ? text.substring(0, 177) + '...' : sentence;
  }

  // No sentence boundary found, check if ends with period
  if (text.endsWith('.')) {
    return text.length > 180 ? text.substring(0, 177) + '...' : text;
  }

  // Fallback: take first 180 chars
  return text.length > 180 ? text.substring(0, 177) + '...' : text;
};

// Build timeline events array from game state
const buildTimelineEvents = (state: GameState, scenario: Scenario): TimelineEvent[] => {
  const events: TimelineEvent[] = [];

  // Add initial alert (0% confidence baseline)
  events.push({
    id: 'alert',
    type: 'alert',
    order: 0,
    confidenceGained: 0,
    cumulativeConfidence: 0,
    timeSaved: 0,
    cumulativeTime: 0,
    keyFinding: scenario.initialAlert.title,
  });

  // Build events for each completed question
  let cumulativeConfidence = 0;
  let cumulativeTime = 0;

  state.completedQuestions.forEach((qId, index) => {
    const question = scenario.questions.find(q => q.id === qId);
    if (!question) return;

    const agentType = state.agentAssignments[qId];
    const answer = question.answers[agentType];

    cumulativeConfidence += answer.confidence;
    cumulativeTime += question.timeSaved;

    events.push({
      id: qId,
      type: qId === 'q6' ? 'decision' : 'question',
      order: index + 1,
      questionId: qId,
      questionText: question.text,
      agentType: agentType,
      confidenceGained: answer.confidence,
      cumulativeConfidence: cumulativeConfidence,
      timeSaved: question.timeSaved,
      cumulativeTime: cumulativeTime,
      keyFinding: extractKeyFinding(answer.text),
      isCorrect: answer.isCorrect,
      transparencySteps: answer.transparencySteps || [],
    });
  });

  return events;
};

interface Particle {
  id: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export const TimelineReplay: React.FC<TimelineReplayProps> = ({
  state,
  scenario,
  onComplete,
}) => {
  const events = useMemo(() => buildTimelineEvents(state, scenario), [state, scenario]);

  const [currentEventIndex, setCurrentEventIndex] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Start animation on mount - show initial alert immediately
  useEffect(() => {
    setCurrentEventIndex(0);
  }, []);

  // Generate streaming particles as timeline progresses
  useEffect(() => {
    if (currentEventIndex < 0 || isComplete) return;

    // Generate burst of particles when new card activates
    const newParticles: Particle[] = [];
    const particleCount = 50; // 50 particles per card activation

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + i + Math.random() * 1000,
        top: 30 + Math.random() * 40, // Random vertical position (30-70%)
        size: 2 + Math.random() * 3, // Random size (2-5px)
        duration: 1.5 + Math.random() * 1.5, // Random duration (1.5-3s)
        delay: Math.random() * 0.5, // Random delay (0-0.5s)
      });
    }

    setParticles(prev => [...prev, ...newParticles]);

    // Clean up old particles after animation completes
    const cleanup = setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 4000);

    return () => clearTimeout(cleanup);
  }, [currentEventIndex, isComplete]);

  // Advance to next event - 500ms gap between cards for smoother flow
  const handleEventComplete = useCallback(() => {
    if (currentEventIndex < events.length - 1) {
      setTimeout(() => {
        setCurrentEventIndex(prev => prev + 1);
      }, 500); // 500ms gap between events
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [currentEventIndex, events.length, onComplete]);

  return (
    <div className="timeline-replay">
      <div className="timeline-header">
        <h2>Investigation Timeline</h2>
        <p>Wise's Automated Investigation Flow</p>
      </div>

      <div className="timeline-track">
        {/* Streaming particles background */}
        <div className="timeline-stream-particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="stream-particle active"
              style={{
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        {events.map((event, index) => {
          const isActive = index === currentEventIndex;
          const isCompleted = index < currentEventIndex;
          const showCallouts = isActive || isCompleted;

          // Extract key actions from transparency steps
          const extractActions = (steps: string[] = []) => {
            const actions: string[] = [];
            steps.forEach(step => {
              const lower = step.toLowerCase();
              if (lower.includes('querying') || lower.includes('query')) {
                if (lower.includes('edr')) actions.push('Queried EDR');
                else if (lower.includes('ndr') || lower.includes('network')) actions.push('Queried NDR');
                else if (lower.includes('identity')) actions.push('Queried Identity');
                else if (lower.includes('ivx') || lower.includes('sandbox')) actions.push('Queried IVX');
              }
              if (lower.includes('90-day') || lower.includes('lookback')) actions.push('90-Day Lookback');
              if (lower.includes('sandbox') || lower.includes('detonat')) actions.push('Sandbox Detonation');
              if (lower.includes('correlat')) actions.push('Data Correlation');
              if (lower.includes('baseline') || lower.includes('behavior')) actions.push('Behavioral Analysis');
              if (lower.includes('authenticat')) actions.push('Auth Verification');
            });
            return [...new Set(actions)]; // Remove duplicates
          };

          const actions = extractActions(event.transparencySteps);

          return (
            <React.Fragment key={event.id}>
              {index > 0 && (
                <TimelineConnector
                  isActive={isActive}
                  isCompleted={index <= currentEventIndex}
                />
              )}
              <div className="timeline-node-wrapper">
                <TimelineNode
                  event={event}
                  isActive={isActive}
                  isCompleted={isCompleted}
                  isPending={index > currentEventIndex}
                  onComplete={handleEventComplete}
                />
                {/* Action callouts below card */}
                {showCallouts && actions.length > 0 && (
                  <div className="node-callouts">
                    {actions.map((action, idx) => (
                      <div key={idx} className="action-callout">
                        {action}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
