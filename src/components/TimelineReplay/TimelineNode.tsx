import React, { useRef, useEffect, useCallback } from 'react';
import { TimelineEvent, AgentType } from '../../types/game';
import { ConfidenceBar } from './ConfidenceBar';

interface TimelineNodeProps {
  event: TimelineEvent;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  onComplete: () => void;
}

const getAgentIcon = (agent: AgentType): string => {
  const icons = {
    EDR: '🖥️',
    NDR: '🌐',
    Identity: '👤',
    IVX: '🔬',
    WISE: '🧠',
    Splunk: '🔍',
    Proxy: '🌍',
    S3: '☁️',
    Oracle: '🗄️',
    OTMonitor: '🏭',
  };
  return icons[agent] || '•';
};

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  event,
  isActive,
  isCompleted,
  isPending,
  onComplete,
}) => {
  const hasCompletedRef = useRef(false);

  // Reset completion flag when becoming active
  useEffect(() => {
    if (isActive) {
      hasCompletedRef.current = false;
    }
  }, [isActive]);

  // Wrap onComplete to prevent duplicate calls
  const handleComplete = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  };

  // Show text immediately when active, no streaming to keep animation fast
  useEffect(() => {
    if (isActive) {
      // Delay completion to allow animations to show
      const timer = setTimeout(() => {
        handleComplete();
      }, 800); // 800ms to show the card content
      return () => clearTimeout(timer);
    }
  }, [isActive, handleComplete]);

  const nodeClass = `timeline-node ${event.type} ${
    isActive ? 'active' : isCompleted ? 'completed' : 'pending'
  }`;

  return (
    <div className={nodeClass}>
      {/* Order Badge */}
      <div className="node-order">{event.order}</div>

      {/* Time Badge */}
      {event.timeSaved > 0 && (
        <div className="node-time">
          <span className="time-icon">⏱️</span>
          +{event.timeSaved} min
        </div>
      )}

      {/* Agent Icon */}
      {event.agentType ? (
        <div className={`node-agent-icon ${event.agentType}`}>
          {getAgentIcon(event.agentType)}
        </div>
      ) : event.type === 'alert' ? (
        <div className="node-agent-icon alert-icon">
          ⚠️
        </div>
      ) : null}

      {/* Question Text or Alert Title */}
      {event.questionText ? (
        <div className="node-question">{event.questionText}</div>
      ) : event.type === 'alert' ? (
        <div className="node-question">Initial Alert</div>
      ) : null}

      {/* Key Finding - show immediately, no streaming */}
      <div className="node-finding">
        {isActive || isCompleted ? event.keyFinding : ''}
      </div>

      {/* Confidence Progress */}
      {event.type !== 'alert' && (
        <div className="node-confidence">
          <div className="confidence-label">
            <span className="confidence-icon">📈</span>
            <span className="confidence-gained">+{event.confidenceGained}%</span>
          </div>
          <ConfidenceBar
            value={event.cumulativeConfidence}
            animate={isActive}
          />
          <span className="confidence-total">{event.cumulativeConfidence}%</span>
        </div>
      )}
    </div>
  );
};
