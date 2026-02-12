import React from 'react';

interface TimelineConnectorProps {
  isActive: boolean;
  isCompleted: boolean;
}

export const TimelineConnector: React.FC<TimelineConnectorProps> = ({
  isActive,
  isCompleted,
}) => {
  const lineClass = isActive ? 'animating' : isCompleted ? 'completed' : 'pending';
  const connectorClass = `timeline-connector ${lineClass}`;

  return (
    <svg className={connectorClass} width="40" height="4" viewBox="0 0 40 4">
      <defs>
        <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-agent-glow)" />
          <stop offset="100%" stopColor="rgba(40, 20, 255, 0.3)" />
        </linearGradient>
      </defs>
      <line
        x1="0"
        y1="2"
        x2="40"
        y2="2"
        stroke="url(#connector-gradient)"
        strokeWidth="2"
        className={lineClass}
      />
    </svg>
  );
};
