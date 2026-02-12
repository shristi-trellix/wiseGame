import React from 'react';

interface ConfidenceBarProps {
  value: number; // 0-100
  animate: boolean;
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ value, animate }) => {
  const getConfidenceColor = (val: number): string => {
    if (val >= 95) return 'var(--color-success)';
    if (val >= 70) return 'var(--color-agent-glow)';
    if (val >= 50) return '#FFA500';
    return '#FF4444';
  };

  return (
    <div className="confidence-bar-container">
      <div
        className="confidence-bar-fill"
        style={{
          width: animate ? `${value}%` : '0%',
          backgroundColor: getConfidenceColor(value),
          transition: animate ? 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }}
      />
    </div>
  );
};
