import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useStreamingText } from '../../hooks/useStreamingText';
import './TransparencyLog.css';

interface StreamingLogEntryProps {
  text: string;
  shouldStream: boolean;
  onComplete: () => void;
}

const StreamingLogEntry: React.FC<StreamingLogEntryProps> = ({ text, shouldStream, onComplete }) => {
  const { displayedText, isTyping } = useStreamingText({
    text: shouldStream ? text : text, // Always use full text
    speed: shouldStream ? 30 : 0, // 30ms per character for smooth streaming
    onComplete: shouldStream ? onComplete : undefined,
  });

  // If not streaming, show full text immediately
  const finalText = shouldStream ? displayedText : text;

  return (
    <div className="log-entry">
      <span className="log-prefix">[Wise]</span>
      <span className="log-text">
        {finalText}
        {shouldStream && isTyping && <span className="typing-cursor">▊</span>}
      </span>
    </div>
  );
};

const TransparencyLog: React.FC = () => {
  const { state } = useGame();
  const logEndRef = useRef<HTMLDivElement>(null);
  const [streamingIndex, setStreamingIndex] = useState(0);

  // Auto-scroll to bottom as text streams
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.transparencyLog, streamingIndex]);

  // Reset streaming when new batch of logs arrive
  useEffect(() => {
    if (state.transparencyLog.length > 0) {
      // If we have more entries than we've streamed, start streaming
      if (streamingIndex < state.transparencyLog.length) {
        // Streaming will continue automatically via onComplete callbacks
      }
    } else {
      // Reset if logs are cleared
      setStreamingIndex(0);
    }
  }, [state.transparencyLog.length]);

  const handleEntryComplete = () => {
    setStreamingIndex((prev) => prev + 1);
  };

  return (
    <div className="transparency-log">
      {state.transparencyLog.length === 0 ? (
        <div className="log-empty">
          <div className="log-empty-icon">💭</div>
          <div className="log-empty-text">Waiting for investigation to begin...</div>
          <div className="log-empty-subtext">Wise's reasoning steps will appear here in real-time</div>
        </div>
      ) : (
        <div className="log-entries">
          {state.transparencyLog.map((entry, index) => {
            const isCurrentlyStreaming = index === streamingIndex;
            const hasStreamed = index < streamingIndex;
            const shouldStream = isCurrentlyStreaming;

            // Only render entries that have been streamed or are currently streaming
            if (index > streamingIndex) {
              return null; // Don't render entries that haven't streamed yet
            }

            return (
              <StreamingLogEntry
                key={entry.id}
                text={entry.text}
                shouldStream={shouldStream}
                onComplete={handleEntryComplete}
              />
            );
          })}
          <div ref={logEndRef} />
        </div>
      )}
    </div>
  );
};

export default TransparencyLog;
